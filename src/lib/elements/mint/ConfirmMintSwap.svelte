<script lang="ts">
	import { getBy } from '$lib/stores/persistent/helper/storeHelper';
	import { swapsStore } from '$lib/stores/persistent/swap';
	import { params } from 'svelte-spa-router';
	import { mintQuotesStore } from '$lib/stores/persistent/mintquotes';
	import { meltQuotesStore } from '$lib/stores/persistent/meltquotes';
	import CompactHistoryItem from '../data/history/CompactHistoryItem.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ensureError } from '$lib/helpers/errors';
	import { toast } from 'svelte-sonner';
	import { meltProofs, mintProofs } from '$lib/actions/actions';
	import { delay } from '$lib/util/utils';
	import { ArrowLeftRight, LoaderCircle } from 'lucide-svelte';
	import {
		check_swap,
		confirm_swap,
		continue_swap,
		swap_completed,
		swap_invoice_could_not_be_paid,
		t_not_found,
		t_swap,
		t_to
	} from '$lib/paraglide/messages';

	let swap = $derived(getBy($swapsStore, $params?.mintquote ?? '', 'mintQuoteId'));
	let mintquote = $derived(getBy($mintQuotesStore, swap?.mintQuoteId ?? '', 'quote'));
	let meltquote = $derived(getBy($meltQuotesStore, swap?.meltQuoteId ?? '', 'quote'));

	let isLoading = $state(false);

	const confirmSwap = async () => {
		try {
			isLoading = true;
			if (!meltquote || !mintquote) {
				throw new Error(t_not_found());
			}
			const updatedMeltquote = await meltProofs(meltquote);
			if (updatedMeltquote.quoteToStore.state !== 'PAID') {
				toast.warning(swap_invoice_could_not_be_paid());
				return;
			}
			await delay(2000);
			await mintProofs(mintquote);
			toast.success(swap_completed());
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
	<p class="text-lg font-bold">{t_swap()}</p>
	{#if mintquote && meltquote}
		<div class="pointer-events-none">
			<CompactHistoryItem item={meltquote}></CompactHistoryItem>
		</div>
		<p class="w-full text-center">{t_to()}</p>
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
				{confirm_swap()}
			</Button>
		{:else if meltquote.state === 'PAID' && mintquote.state === 'UNPAID'}
			<Button>{check_swap()}</Button>
		{:else if meltquote.state === 'PAID' && mintquote.state === 'PAID'}
			<Button>{continue_swap()}</Button>
		{:else if meltquote.state === 'PAID' && mintquote.state === 'ISSUED'}
			<Button disabled>{swap_completed()}</Button>
		{/if}
	{:else}
		{t_not_found()}
	{/if}
</div>
