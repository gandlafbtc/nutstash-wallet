<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import AmountInput from "$lib/elements/ui/AmountInput.svelte";
	import MintSelector from "$lib/elements/ui/MintSelector.svelte";
	import NumericKeys from "$lib/elements/ui/NumericKeys.svelte";
	import UnitSelector from "$lib/elements/ui/UnitSelector.svelte";
	import { amount_too_small, no_mint_found, receive_via_lightning } from "$lib/paraglide/messages";
	import { createMintQuote, ensureError, type types } from "@gandlaf21/cashu-wallet-engine";
	import { selectedMint, mintsStore as mints, unit } from "@gandlaf21/cashu-wallet-engine/stores";
	import { getUnitsForMints } from "@gandlaf21/cashu-wallet-engine/util";
	import { LoaderCircle, Zap } from "lucide-svelte";
	import { toast } from "svelte-sonner";
	import { push } from "svelte-spa-router";
	let mint: types.Mint = $state($selectedMint !== -1 ? $mints[$selectedMint] : $mints[0]);
	let isLoading = $state(false);
    let amount: number | undefined = $state();
    let useConversion: boolean = $state(false);
    let conversionAmount: number | undefined = $state();
    let entered = $state('');
    
    const getCurrentUnit = () => {
        if (!mint) return "sat";
		return getUnitsForMints([mint]).find((u) => u === $unit) ? $unit : 'sat';
	};
    let currentUnit: string = $state(getCurrentUnit());
    const receiveLN = async () => {
    try {
        if (!mint) {
            toast.warning(no_mint_found());
            return;
        }
        if (!amount) {
            toast.warning(amount_too_small());
            return;
        }
        
        isLoading = true;
        const q = await createMintQuote(mint.url, amount, {
            unit: currentUnit
        });
        // wallet.unit =

        //Show QR screen
        push('/wallet/receive/ln/' + q.quote);
    } catch (error) {
        const err = ensureError(error);
        console.error(err);
        toast.error(err.message);
    } finally {
        isLoading = false;
    }
		//Create Invoice
	};
    const onKeypadPress = (value: string) => {
        if (value === 'delete') {
            entered = entered.slice(0, -1);
        } else if (value === 'clear') {
            entered = '';
        } else {
            entered = entered + value;
        }
        try {
            const newAmount = parseInt(entered)
            amount =Number.isNaN(newAmount)?0 :newAmount;
        } catch (error) {
            amount = 0
        }
    };

</script>
<svelte:body onkeydown={(e)=> {
    if (e.key === 'Backspace') {
        onKeypadPress('delete');
    }
    else if (e.key === 'Enter') {
        if (isLoading) {
            return;
        }
        receiveLN()
    }
    else if (e.key >= '0' && e.key <= '9') {
        onKeypadPress(e.key);
    }
    }
} />
<div class="flex flex-col gap-2 p-2">
    <p class="flex gap-1 font-bold text-lg items-center pb-5">
        <Zap class=' w-6 h-6 text-yellow-500'></Zap>
        {receive_via_lightning()}
    </p>
    <div class="w-80 xl:w-[600px] gap-2 flex">
        <MintSelector bind:mint></MintSelector>
        <UnitSelector bind:currentUnit selectedMints={[mint
        ]}></UnitSelector>
    </div>
    <div class="flex items-center justify-between gap-2 mb-4">
        <div class="flex-grow relative">
            <AmountInput bind:amount {currentUnit}></AmountInput>
        </div>
    </div>
    <Button
    disabled={isLoading}
    class="w-full"
    onclick={receiveLN}
    >
    {#if isLoading}
    <LoaderCircle class="animate-spin"></LoaderCircle>
    {:else}
    <Zap></Zap>
    {/if}
    {receive_via_lightning()}
</Button>
</div>
        <!-- Numeric keypad -->
        <div class="fixed w-80 lg:w-[600px] bottom-10 h-64">
            <NumericKeys onkeypressed={onKeypadPress}></NumericKeys>
        </div>