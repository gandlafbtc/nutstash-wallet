<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import MintSelector from "$lib/elements/ui/MintSelector.svelte";
    import UnitSelector from "$lib/elements/ui/UnitSelector.svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import { formatAmount, getUnitsForMints, isNumeric } from "$lib/util/walletUtils";
    import { QrCode, Zap, LoaderCircle } from "lucide-svelte";
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import NumericKeys from "$lib/elements/ui/NumericKeys.svelte";
    import { unit } from "$lib/stores/persistent/settings";
    import { createMintQuote } from "$lib/actions/receiveActions";

    let { openScannerDrawer = $bindable(), openReceiveDrawer = $bindable() } = $props();

    let entered: string = $state("");

    let mint = $state($mints[0]);

    let token = $state("");
    let amount = $state("");
    const getCurrentUnit = () => {
        return  getUnitsForMints([mint]).find((u)=>u === $unit)? $unit : "sat";
    };
    let currentUnit: string = $state(getCurrentUnit());


    let inputFocus: HTMLTextAreaElement | null = $state(null);
    let thisDrawer: HTMLDivElement | null = $state(null);

    let isLoading = $state(false);

    onMount(() => {
        setTimeout(() => {
            thisDrawer?.addEventListener("keydown", (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    openReceiveDrawer = false
                }
                if (e.key === 'Backspace') {
                    entered = entered.slice(0, -1);
                }
                else if (e.key === 'Enter') {
                    if (entered.length && isNumeric(entered)) {
                        receiveLN()
                    }
                }
                else if (isNumeric(e.key)) {
                    entered = entered + e.key;
                }
                else {
                    e.preventDefault()
                }
            });
        }, 0);
    });

    $effect(() => {
        if (entered === "") {
            token = "";
            amount = "";
        } else if (
            entered.startsWith("cashuA") ||
            entered.startsWith("cashuB")
        ) {
            token = entered;
            amount = "";
            receiveCashu()
        } else if (isNumeric(entered)) {
            amount = entered;
            token = "";
        } else {
            console.log("invalid");
            token = "";
            amount = "";
        }
    });

    const receiveLN = async () => {
        try {
            isLoading = true;
            const q = await createMintQuote(mint.url, amount, {unit: currentUnit});
            openReceiveDrawer = false
            // wallet.unit =

            //Show QR screen
            push("/wallet/receive/ln/"+q.quote);
        } catch (error) {
        } finally {
            isLoading = false;
        }
        //Create Invoice
    };

    const receiveCashu = () => {

    }

    const onKeypadPress = (value: string | { delete: boolean }) => {
        if (value.delete) {
            entered = entered.slice(0, -1);
        } else {
            entered = entered + value;
        }
    };
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="w-full flex gap-3 flex-col items-center justify-between h-full" bind:this={thisDrawer} tabindex="0">
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
            oninput={(e)=> {e.preventDefault()}}
            
            placeholder="- Paste a Cashu token (cashuA... , cashuB... )                           - Or enter amount to mint"
        ></Textarea>
    </div>
    <div>
        <div class="flex items-start justify-center {entered.length && isNumeric(entered)
            ? 'h-80'
            : 'h-60'} min-h-40">
            {#if token.length}
                token
            {:else if amount.length}
                <div class="flex flex-col gap-2 items-center justify-center">
                    <div class="flex gap-2 justify-between w-80 items-center">
                        <button
                            class="text-2xl break-all cursor-text w-full text-start"
                            onclick={() => inputFocus?.focus()}
                        >
                            {formatAmount(amount, currentUnit)}
                        </button>
                        <UnitSelector bind:currentUnit selectedMints={[mint]}
                        ></UnitSelector>
                    </div>
                    <div class="text-sm text-secondary">via</div>
                    <div class="w-80">
                        <MintSelector bind:mint></MintSelector>
                    </div>
                    <div class="w-80 py-5">
                        <Button
                            disabled={isLoading}
                            class="w-full border-2 border-pink-600"
                            onclick={receiveLN}
                        >
                            {#if isLoading}
                            <LoaderCircle class='animate-spin'></LoaderCircle>
                            {:else}
                            <Zap></Zap>
                            {/if}
                            Receive via Lightning
                        </Button>
                    </div>
                </div>
            {:else}
            <div>

                <button
                class="rounded-full bg-pink-600 p-8 transition-all duration-300 hover:bg-pink-700 hover:p-10 flex-shrink active:bg-pink-500"
                onclick={() => (openScannerDrawer = !openScannerDrawer)}
                >
                <QrCode></QrCode>
            </button>
        </div>
            {/if}
        </div>
    </div>
    <div class="w-80 h-64 ">
        <NumericKeys onkeypressed={onKeypadPress} isDecimal={false}
        ></NumericKeys>
    </div>
</div>
