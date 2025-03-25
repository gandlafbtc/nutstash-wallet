<script lang="ts">
	import { createMeltQuote, createMintQuote, getFeeForProofs } from '$lib/actions/actions';
	import FormButton from '$lib/components/ui/form/form-button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { ensureError } from '$lib/helpers/errors';
	import { mints } from '$lib/stores/persistent/mints';
	import { proofsStore } from '$lib/stores/persistent/proofs';
	import { unit } from '$lib/stores/persistent/settings';
	import { formatAmount, getAmountForTokenSet, getProofsOfMintUnit } from '$lib/util/walletUtils';
	import { toast } from 'svelte-sonner';
	import MintSelector from '../ui/MintSelector.svelte';
	import UnitSelector from '../ui/UnitSelector.svelte';
	import { swapsStore } from '$lib/stores/persistent/swap';
	import { push } from 'svelte-spa-router';
	import CompactSwap from './CompactSwap.svelte';
	let swapOutMint = $state($mints[0]);
	let swapInMint = $state($mints[0]);

	let swapOutUnit = $state($unit);
	let swapInUnit = $state($unit);

	let swapAmount: number | undefined = $state();

	let balance = $derived(
		getAmountForTokenSet(getProofsOfMintUnit(swapOutMint, $proofsStore, swapOutUnit))
	);

	let isPreparing = $state(false);

	//prepared

	const prepareSwap = async () => {
		try {
			isPreparing = true;
			if (!swapAmount || swapAmount === 0) {
				return;
			}
			if (isNaN(swapAmount)) {
				return;
			}
			if (swapAmount > balance) {
				toast.warning('Not enough funds available');
				return;
			}
			const mintquote = await createMintQuote(swapInMint.url, swapAmount, { unit: swapInUnit });
			const meltquote = await createMeltQuote(swapOutMint.url, mintquote.request, {
				unit: swapOutUnit
			});
			if (meltquote.amount + meltquote.fee_reserve > balance) {
				toast.warning('Currently not enough funds available to fulfill this swap');
			}
			await swapsStore.addOrUpdate(
				mintquote.quote,
				{ mintQuoteId: mintquote.quote, meltQuoteId: meltquote.quote },
				'mintQuoteId'
			);
			push('/wallet/settings/mints/swap/' + mintquote.quote);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isPreparing = false;
		}
	};
</script>

<div class="flex w-80 xl:w-[600px] flex-col gap-2">
	<p class="font-bold">Mint swap</p>

	<p class="pt-2 text-sm font-bold opacity-35">From</p>
	<div class="flex gap-1">
		<MintSelector disabled={isPreparing} bind:mint={swapOutMint}></MintSelector>
		<UnitSelector
			disabled={isPreparing}
			bind:currentUnit={swapOutUnit}
			selectedMints={[swapOutMint]}
		></UnitSelector>
	</div>
	<div class="mb-4 mt-1 flex flex-col gap-1 text-sm opacity-35">
		<div class="flex gap-1">
			<p class="">Available:</p>
			<p>{formatAmount(balance, swapOutUnit)}</p>
		</div>
		<div class="flex gap-1 font-bold">
			<p class="flex flex-col">
				<span> Available for swap: </span>
				<span> ( - fee reserve ) </span>
			</p>
			<p>
				~ {formatAmount(
					Math.floor(
						(getAmountForTokenSet(getProofsOfMintUnit(swapOutMint, $proofsStore, swapOutUnit)) ??
							0) * 0.98
					),
					swapOutUnit
				)}
			</p>
		</div>
	</div>
	<p class="text-sm font-bold opacity-35">To</p>
	<div class="flex gap-1">
		<MintSelector disabled={isPreparing} bind:mint={swapInMint}></MintSelector>
		<UnitSelector disabled={isPreparing} bind:currentUnit={swapInUnit} selectedMints={[swapInMint]}
		></UnitSelector>
	</div>

	<p class="pt-4 text-sm font-bold opacity-35">Amount</p>
	<form
		class="flex flex-col gap-2"
		onsubmit={(e) => {
			e.preventDefault();
			prepareSwap();
		}}
	>
		<div class="">
			<Input
				disabled={isPreparing}
				required
				bind:value={swapAmount}
				placeholder="Swap amount"
				type="number"
			/>
		</div>

		<FormButton type="submit" class="w-full" disabled={isPreparing}>Prepare swap</FormButton>
	</form>
	<p class="pt-4 font-bold">Previous swaps</p>
	<div class="flex flex-col gap-2">
		{#each $swapsStore as swap}
			<CompactSwap {swap}></CompactSwap>
		{/each}
	</div>
</div>
