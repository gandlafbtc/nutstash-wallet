<script lang="ts">
	import { getBy } from '$lib/stores/persistent/helper/storeHelper';
	import { swapsStore } from '$lib/stores/persistent/swap';
	import { params } from 'svelte-spa-router';
	import CompactHistory from '../data/history/CompactHistory.svelte';
	import { mintQuotesStore } from '$lib/stores/persistent/mintquotes';
	import { meltQuotesStore } from '$lib/stores/persistent/meltquotes';
	import CompactHistoryItem from '../data/history/CompactHistoryItem.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ensureError } from '$lib/helpers/errors';
	import { toast } from 'svelte-sonner';
	import { meltProofs, mintProofs } from '$lib/actions/actions';
	import { delay } from '$lib/util/utils';
	import { TransactionStatus } from '$lib/db/models/types';
	import { ArrowLeftRight, LoaderCircle } from 'lucide-svelte';

	let swap = $derived(getBy($swapsStore, $params?.mintquote ?? '', 'mintQuoteId'));
	let mintquote = $derived(getBy($mintQuotesStore, swap?.mintQuoteId ?? '', 'quote'));
	let meltquote = $derived(getBy($meltQuotesStore, swap?.meltQuoteId ?? '', 'quote'));

	let isLoading = $state(false);

	const confirmSwap = async () => {
		try {
			isLoading = true;
			if (!meltquote || !mintquote) {
				throw new Error('Quote not found');
			}
			const updatedMeltquote = await meltProofs(meltquote);
			if (updatedMeltquote.quoteToStore.state !== 'PAID') {
				toast.warning('Swap invoice could not be paid. Try again later.');
				return;
			}
			await delay(2000);
			await mintProofs(mintquote);
			toast.success('Swap completed');
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex flex-col gap-2">
	<p class="text-lg font-bold">Swap</p>
	{#if mintquote && meltquote}
		<div class="pointer-events-none">
			<CompactHistoryItem item={meltquote}></CompactHistoryItem>
		</div>
		<p class="w-full text-center">To</p>
		<div class="pointer-events-none">
			<CompactHistoryItem item={mintquote}></CompactHistoryItem>
		</div>
		{#if meltquote.state === 'UNPAID'}
			<Button onclick={confirmSwap} disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="animate-spin"></LoaderCircle>
				{:else}
					<ArrowLeftRight></ArrowLeftRight>
				{/if}
				Confirm swap
			</Button>
		{:else if meltquote.state === 'PAID' && mintquote.state === 'UNPAID'}
			<Button>Check swap</Button>
		{:else if meltquote.state === 'PAID' && mintquote.state === 'PAID'}
			<Button>Continue swap</Button>
		{:else if meltquote.state === 'PAID' && mintquote.state === 'ISSUED'}
			<Button disabled>Swap has completed</Button>
		{/if}
	{:else}
		Swap not found
	{/if}
</div>
