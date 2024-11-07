<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import MintSelector from "$lib/elements/ui/MintSelector.svelte";
    import UnitSelector from "$lib/elements/ui/UnitSelector.svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import {
        formatAmount,
        getUnitsForMints,
        isNumeric,
    } from "$lib/util/walletUtils";
    import { QrCode, Zap, LoaderCircle, Banknote } from "lucide-svelte";
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import NumericKeys from "$lib/elements/ui/NumericKeys.svelte";
    import { unit } from "$lib/stores/persistent/settings";
    import { proofsStore } from "$lib/stores/persistent/proofs";
    import { getByMany } from "$lib/stores/persistent/helper/storeHelper";
    import TokenOptions from "./TokenOptions.svelte";
    import { toast } from "svelte-sonner";
    import { sendEcash } from "$lib/actions/actions";
    import { getEncodedTokenV4, type Token } from "@cashu/cashu-ts";
    import { openScannerDrawer, openSendDrawer } from "$lib/stores/session/drawer";

    let entered: string = $state("");

    let mint = $state($mints[0]);

    let invoice = $state("");

    let amount = $state("");
    let tokenOptions = $state({
        p2pk: false,
        customIn: false,
        customOut: false,
    });

    const getCurrentUnit = () => {
        return getUnitsForMints([mint]).find((u) => u === $unit)
            ? $unit
            : "sat";
    };
    let currentUnit: string = $state(getCurrentUnit());

    let inputFocus: HTMLTextAreaElement | null = $state(null);
    let thisDrawer: HTMLDivElement | null = $state(null);

    let keysetIds = $derived(
        mint.keysets.keysets
            .filter((k) => k.unit === currentUnit)
            .map((k) => k.id),
    );
    let balance = $derived(
        getByMany($proofsStore, keysetIds, "id").reduce(
            (a, b) => a + b.amount,
            0,
        ),
    );

    let isLoading = $state(false);

    onMount(() => {
        setTimeout(() => {
            thisDrawer?.addEventListener("keydown", (e: KeyboardEvent) => {
                e.preventDefault();
                if (e.key === "Escape") {
                    openScannerDrawer.set(false);
                }
                if (e.key === "Backspace") {
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

    $effect(() => {
        if (entered === "") {
            invoice = "";
            amount = "";
        } else if (
            entered.startsWith("ln") ||
            entered.startsWith("lightning")
        ) {
            invoice = entered;
            amount = "";
            sendLn();
        } else if (isNumeric(entered)) {
            amount = entered;
            invoice = "";
        } else {
            console.log("invalid");
            invoice = "";
            amount = "";
        }
    });

    const sendLn = async () => {};

    const sendCashu = async () => {
        try {
             isLoading = true;
             const amountInt = parseInt(amount);
             if (amountInt>balance) {
                toast.warning("Not enough funds");
                return
             }
             const {txId} = await sendEcash(mint.url, amountInt, currentUnit)
             openSendDrawer.set(false)
             push('/wallet/send/cashu/'+txId)
        } catch (error) {
            
        }
        finally
        {
            isLoading = false;   
        }
    };

    const onKeypadPress = (value: string | { delete: boolean }) => {
        if (typeof value !== "string" && value.delete) {
            entered = entered.slice(0, -1);
        } else {
            entered = entered + value;
        }
    };
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
    class="w-full flex gap-3 flex-col items-center justify-between h-full"
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
    <div>
        <div
            class="flex items-start justify-center {entered.length &&
            isNumeric(entered)
                ? 'h-40'
                : 'h-20'}"
        >
            {#if amount.length}
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
                    <div class="h-14">
                        
                    </div>
                    <Button class="w-full" onclick={sendCashu}>
                        <Banknote></Banknote>
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
                <div class="flex flex-col gap-2 items-center justify-center">
                    <div class="text-sm text-secondary">via</div>

                    <div class="w-80 py-5">
                        <Button
                            disabled={isLoading}
                            class="w-full border-2 border-pink-600"
                            onclick={sendLn}
                        >
                            {#if isLoading}
                                <LoaderCircle class="animate-spin"
                                ></LoaderCircle>
                            {:else}
                                <Zap></Zap>
                            {/if}
                            Send via Lightning
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
