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
    import { QrCode, Zap, LoaderCircle } from "lucide-svelte";
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import NumericKeys from "$lib/elements/ui/NumericKeys.svelte";
    import { unit } from "$lib/stores/persistent/settings";
    import { createMintQuote } from "$lib/actions/actions";
    import {
        openReceiveDrawer,
        openScannerDrawer,
    } from "$lib/stores/session/drawer";
    import type { Mint } from "$lib/db/models/types";
    import AddMint from "$lib/elements/mint/AddMint.svelte";
    import { toast } from "svelte-sonner";
    import { selectedMint } from "$lib/stores/local/selectedMints";

    let entered: string = $state("");

    let mint: Mint | undefined = $state($selectedMint!==-1?$mints[$selectedMint]: $mints[0]);

    let token = $state("");
    let amount = $state("");
    const getCurrentUnit = () => {
        return getUnitsForMints([mint]).find((u) => u === $unit)
            ? $unit
            : "sat";
    };
    let currentUnit: string = $state(getCurrentUnit());

    let inputFocus: HTMLTextAreaElement | null = $state(null);
    let thisDrawer: HTMLDivElement | null = $state(null);

    let isLoading = $state(false);

    onMount(() => {
        setTimeout(() => {
            thisDrawer?.addEventListener("keydown", (e: KeyboardEvent) => {
                e.preventDefault();
                if (e.key === "Escape") {
                    openReceiveDrawer.set(false);
                }
                if (e.key === "Backspace") {
                    entered = entered.slice(0, -1);
                } else if (e.key === "Enter") {
                    if (entered.length && isNumeric(entered)) {
                        receiveLN();
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
            token = "";
            amount = "";
        } else if (
            entered.startsWith("cashuA") ||
            entered.startsWith("cashuB")
        ) {
            token = entered;
            amount = "";
            receiveCashu();
        } else if (isNumeric(entered)) {
            amount = entered;
            token = "";
        } else {
            token = "";
            amount = "";
        }
    });

    const receiveLN = async () => {
        try {
            if (!mint) {
                toast.warning("no mint available");
                return;
            }
            isLoading = true;
            const amountInt = parseInt(amount);
            const q = await createMintQuote(mint.url, amountInt, {
                unit: currentUnit,
            });
            openReceiveDrawer.set(false);
            // wallet.unit =

            //Show QR screen
            push("/wallet/receive/ln/" + q.quote);
        } catch (error) {
            console.error(error);
        } finally {
            isLoading = false;
        }
        //Create Invoice
    };

    const receiveCashu = () => {
        // scannedTokenStore.set(entered)
        openReceiveDrawer.set(false);
        push("/wallet/receive/cashu/" + entered);
    };

    const onKeypadPress = (value: string | { delete: boolean }) => {
        if (value.delete) {
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
            placeholder="- Paste a Cashu token (cashuA... , cashuB... )                           - Or enter amount to mint"
        ></Textarea>
    </div>
    <div>
        <div
            class="flex items-start justify-center {entered.length &&
            isNumeric(entered)
                ? 'h-60'
                : 'h-40'}"
        >
            {#if token.length}
                token
            {:else if amount.length}
                <div class="flex flex-col gap-2 items-center justify-center">
                    {#if !mint}
                        <p class="text-destructive">
                            No mint added to wallet! add a mint first:
                        </p>

                        <AddMint></AddMint>
                    {:else}
                        <div class="w-80">
                            <MintSelector bind:mint></MintSelector>
                        </div>
                        <div
                            class="flex gap-2 justify-between w-80 items-center"
                        >
                            <button
                                class="text-2xl break-all cursor-text w-full text-start"
                                onclick={() => inputFocus?.focus()}
                            >
                                {formatAmount(amount, currentUnit)}
                            </button>
                            <UnitSelector
                                bind:currentUnit
                                selectedMints={[mint]}
                            ></UnitSelector>
                        </div>
                    {/if}
                    <div class="w-80 py-5">
                        <Button
                            disabled={isLoading}
                            class="w-full border-2 border-nutstash"
                            onclick={receiveLN}
                        >
                            {#if isLoading}
                                <LoaderCircle class="animate-spin"
                                ></LoaderCircle>
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
                        class=""
                        onclick={() => openScannerDrawer.update((ctx) => !ctx)}
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
