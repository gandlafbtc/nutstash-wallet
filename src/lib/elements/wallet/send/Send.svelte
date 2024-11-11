<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import MintSelector from "$lib/elements/ui/MintSelector.svelte";
    import UnitSelector from "$lib/elements/ui/UnitSelector.svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import {
        formatAmount,
        getAmountForTokenSet,
        getAproxAmount,
        getProofsOfMintUnit,
        getUnitsForMints,
        isNumeric,
    } from "$lib/util/walletUtils";
    import { QrCode, Zap, LoaderCircle, Banknote, Copy } from "lucide-svelte";
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import NumericKeys from "$lib/elements/ui/NumericKeys.svelte";
    import { unit } from "$lib/stores/persistent/settings";
    import { proofsStore } from "$lib/stores/persistent/proofs";
    import { getByMany } from "$lib/stores/persistent/helper/storeHelper";
    import TokenOptions from "./TokenOptions.svelte";
    import { toast } from "svelte-sonner";
    import { createMeltQuote, getFeeForProofs, sendEcash } from "$lib/actions/actions";
    import { getEncodedTokenV4, type Token } from "@cashu/cashu-ts";
    import { openScannerDrawer, openSendDrawer } from "$lib/stores/session/drawer";
    import { decode } from "@gandlaf21/bolt11-decode";
    import { copyTextToClipboard } from "$lib/util/utils";
    import type { Proof } from "$lib/db/models/types";
    import Switch from "$lib/components/ui/switch/switch.svelte";

    let entered: string = $state("");

    const getCurrentUnit = () => {
        return getUnitsForMints([mint]).find((u) => u === $unit)
            ? $unit
            : "sat";
    };

    let mint = $state($mints[0]);
    let currentUnit: string = $state(getCurrentUnit());


    let unitProofs: Proof[] = $derived(getProofsOfMintUnit(mint, $proofsStore , currentUnit))
    let balance = $derived(getAmountForTokenSet(unitProofs));
    let invoice = $derived.by(()=> {
        if (
            entered.toLowerCase().startsWith("lnbc") ||
            entered.toLowerCase().startsWith("lightning:lnbc")
        ) {
            return entered
        }
        else {
            return ''
        }
    });

    let amount = $derived.by(()=> {
        if (isNumeric(entered)) {
            return parseInt(entered);
        }
    });

    let tokenOptions = $state({
        p2pk: false,
        customIn: false,
        customOut: false,
        includeReceiverFees: false,
    });
    let selectedProofs: Proof[] = $derived(getAproxAmount(amount??0, unitProofs, tokenOptions.includeReceiverFees)??[])



    let inputFocus: HTMLTextAreaElement | null = $state(null);
    let thisDrawer: HTMLDivElement | null = $state(null);

    let isLoading = $state(false);

    onMount(() => {
        setTimeout(() => {
            thisDrawer?.addEventListener("keydown", (e: KeyboardEvent) => {
                e.preventDefault();
                if (e.key === "Escape") {
                    openScannerDrawer.set(false);
                }
                if (e.key === "Backspace") {
                    if (invoice) {
                        entered = ''
                    }
                    entered = entered.slice(0, -1);
                } else if (e.key === "Enter") {
                    if (entered.length && isNumeric(entered)) {
                        sendCashu();
                    }
                } else if (isNumeric(e.key)) {
                    entered = entered + e.key;
                } else {
                }
            });
        }, 0);
    });


    const createQuote = async () => {
        try {
          isLoading = true  
          const {quote}= await createMeltQuote(mint.url, invoice, {unit: currentUnit})
          openSendDrawer.set(false)
          push('/wallet/send/ln/'+quote)
        }  catch (error) {
			console.error(error)
        }
        finally {
            isLoading = false;
        }
    }

    const sendLN = async () => {

    };

    const sendCashu = async () => {
        try {
             isLoading = true;
             if (!amount) {
                toast("Please enter amount");
                return
             }
             if (amount>balance) {
                toast.warning("Not enough funds");
                return
             }
             const {txId} = await sendEcash(mint.url, amount??0, currentUnit, tokenOptions.includeReceiverFees)
             openSendDrawer.set(false)
             push('/wallet/send/cashu/'+txId)
        } catch (error) {
			console.error(error)
        }
        finally
        {
            isLoading = false;   
        }
    };

    const onKeypadPress = (value: string | { delete: boolean }) => {
        if (typeof value !== "string" && value.delete) {
            if (invoice) {
                        entered = ''
            }
            entered = entered.slice(0, -1);
        } else {
            entered = entered + value;
        }
    };
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
    class="w-full flex gap-3 flex-col items-center justify-center h-full"
    bind:this={thisDrawer}
    tabindex="0"
>
    <div class="w-80">
        <MintSelector bind:mint></MintSelector>
    </div>
    <div class="flex gap-2 justify-between items-center w-80">
        <span>
            {formatAmount(balance, currentUnit)}
            <span class="text-secondary text-xs italic"> available </span>
        </span>
        <UnitSelector bind:currentUnit selectedMints={[mint]}></UnitSelector>
    </div>
    {#if !invoice}
         <!-- content here -->
         <div
         class="{entered.length && isNumeric(entered)
            ? 'h-0'
            : 'h-20'} overflow-hidden"
    >
    <Textarea
    class="w-80 border-dashed resize-none rounded-none"
    inputmode="none"
    bind:value={entered}
    bind:ref={inputFocus}
    oninput={(e) => {
        e.preventDefault();
    }}
            placeholder="- Paste invoice or address (lnbc... , lnurl... )                           - Or enter amount to send"
            ></Textarea>
        </div>
        {/if}
        <div>
        <div
            class="flex items-start justify-center {invoice ||amount
                ? 'h-40'
                : 'h-20'}"
        >
            {#if amount}
                <div
                    class="flex flex-col gap-2 justify-between w-80 items-center"
                >
                    <div class="flex gap-2 justify-between items-center w-full border rounded-lg">
                        <button
                            class="text-2xl break-all cursor-text w-full text-start pl-2"
                            onclick={() => inputFocus?.focus()}
                        >
                            {formatAmount(amount, currentUnit)}

                        </button>
                        <TokenOptions bind:tokenOptions></TokenOptions>
                    </div>

                    <div class="h-16 text-xs flex flex-col gap-1 w-full items-start justify-start">
                        <span>
                            {#if tokenOptions.includeReceiverFees}
                            Include {formatAmount(1, currentUnit)} receiver fee
                            {:else}
                            Receiver fee is not included
                            {/if}
                        </span>
                            <span>
                            Selected coins: {selectedProofs.map(p=>p.amount).join(', ')}
                        </span>
                        <span>
                            {#if getAmountForTokenSet(selectedProofs)>amount+(tokenOptions.includeReceiverFees?1:0)}
                            <span class="text-yellow-500">
                                Token requires split: 
                                {#await getFeeForProofs(selectedProofs)}
                                <LoaderCircle class='animate-spin w-2 h-2'></LoaderCircle>
                                {:then fee}
                                {formatAmount(fee, currentUnit)} fee
                                {/await}
                            </span>
                            {:else if getAmountForTokenSet(selectedProofs)<amount+(tokenOptions.includeReceiverFees?1:0)}
                            <span class="text-red-500">
                               Not enough funds
                            </span>
                            {:else}
                            <span class="text-green-500">
                                Token can be sent offline
                            </span>
                            {/if}
                        </span>
                    </div>
                    <Button class="w-full" onclick={sendCashu} disabled={isLoading}>
                        {#if isLoading}
                            <LoaderCircle class='animate-spin'></LoaderCircle>
                        {:else}
                             <Banknote></Banknote>
                        {/if}
                        <span>
                            Create
                            {#if tokenOptions.customOut}
                                <span> custom </span>
                            {/if}
                            {#if tokenOptions.p2pk}
                                <span> locked </span>
                            {/if}

                            cashu token
                        </span>
                    </Button>
                </div>
            {:else if invoice.length}
                <div class="flex flex-col gap-2 items-center justify-center h-40">
                    <button class=" italic text-xs text-secondary " onclick={()=>copyTextToClipboard(invoice)}>
                        <div class="w-80 flex gap-1 items-center justify-center">

                            <Copy class='w-4 h-4'></Copy>
                            <span class="w-60 text-ellipsis overflow-clip">

                                {invoice}
                            </span>
                        </div>
                    </button>
                    <span>
                        {formatAmount(decode(invoice).sections[2].value/1000, 'sat')}
                    </span>
                    <div class="w-80 py-5">
                        <Button
                            disabled={isLoading}
                            class="w-full border-2 border-pink-600"
                            onclick={createQuote}
                        >
                            {#if isLoading}
                                <LoaderCircle class="animate-spin"
                                ></LoaderCircle>
                            {:else}
                                <Zap></Zap>
                            {/if}
                            Create Lightning payment
                        </Button>
                    </div>
                </div>
            {:else}
                <div>
                    <button
                        class="rounded-full bg-pink-600 p-5 transition-all duration-300 hover:bg-pink-700 flex-shrink active:bg-pink-500"
                        onclick={() => (openScannerDrawer.update(ctx=> !ctx))}
                    >
                        <QrCode></QrCode>
                    </button>
                </div>
            {/if}
        </div>
    </div>
    <div class="w-80 h-64">
        <NumericKeys onkeypressed={onKeypadPress} isDecimal={false}
        ></NumericKeys>
    </div>
</div>
