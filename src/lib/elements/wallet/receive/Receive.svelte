<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import MintSelector from "$lib/elements/ui/MintSelector.svelte";
    import UnitSelector from "$lib/elements/ui/UnitSelector.svelte";
    import { mints } from "$lib/stores/mints";
    import { cashuWallets } from "$lib/stores/wallets";
    import { formatAmount, isNumeric } from "$lib/util/walletUtils";
    import { QrCode, Zap } from "lucide-svelte";
    import { onMount } from "svelte";
    import { pop, push } from "svelte-spa-router";
    import { walk } from "svelte/compiler";
    import * as Drawer from "$lib/components/ui/drawer";

    let entered: string = $state("");

    let mint = $state($mints[0]);

    let token = $state("");
    let amount = $state("");
    let currentUnit = $state(mint.keysets.map((k) => k.unit)[0] ?? "sat");

    let inputFocus: HTMLTextAreaElement | null = $state(null);

    let isLoading = $state(false);

    onMount(() => {
        setTimeout(() => {
            console.log(inputFocus);
            inputFocus?.focus();
        }, 0);
    });

    $effect(() => {
        console.log(entered);
        if (entered === "") {
            console.log("empty");
            token = "";
            amount = "";
        } else if (
            entered.startsWith("cashuA") ||
            entered.startsWith("cashuB")
        ) {
            token = entered;
            amount = "";
        } else if (isNumeric(entered)) {
            amount = entered;
            token = "";
        } else {
            console.log("invalid");
            token = "";
            amount = "";
        }
    });

    const receiveLN = () => {
        try {
            const wallet = cashuWallets.getByUrl(mint.mintURL);

            // wallet.unit =

            //Show QR screen
            push("/wallet/receive/ln");
        } catch (error) {
        } finally {
            isLoading = false;
        }
        //Create Invoice
    };
</script>

<div class="w-full flex gap-3 flex-col items-center justify-center">
    <Textarea
        class="w-80"
        bind:value={entered}
        bind:ref={inputFocus}
        placeholder="- Paste a Cashu token (cashuA... , cashuB... )                           - Or enter amount to mint"
    ></Textarea>
    <div>
        <div class="flex items-center justify-center h-60">
            {#if token.length}
                token
            {:else if amount.length}
                <div class="flex flex-col gap-2 items-center justify-center">
                    <div class="flex gap-2 justify-between w-80 items-center">
                        <p class="text-2xl break-all">
                            {formatAmount(amount, currentUnit)}
                        </p>
                        <UnitSelector bind:currentUnit selectedMints={[mint]}
                        ></UnitSelector>
                    </div>
                    <div class="text-sm text-secondary">via</div>
                    <div class="w-80">
                        <MintSelector bind:mint></MintSelector>
                    </div>
                    <div class="w-80">
                        <Button class="w-full" onclick={receiveLN}>
                            <Zap></Zap>
                            Receive via Lightning
                        </Button>
                    </div>
                </div>
            {:else}
                <button
                    class="rounded-full bg-pink-600 p-8 transition-all duration-300 hover:bg-pink-700 hover:p-10 flex-shrink active:bg-pink-500"
                >
                    <QrCode></QrCode>
                </button>
            {/if}
        </div>
    </div>
</div>
