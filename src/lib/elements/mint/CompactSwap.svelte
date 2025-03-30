<script lang="ts">
	import type { StoredSwap } from '$lib/db/models/types';
	import { t_not_found } from '$lib/paraglide/messages';
	import { getBy } from '$lib/stores/persistent/helper/storeHelper';
	import { meltQuotesStore } from '$lib/stores/persistent/meltquotes';
	import { mintQuotesStore } from '$lib/stores/persistent/mintquotes';
	import { swapsStore } from '$lib/stores/persistent/swap';
	import { formatAmount } from '$lib/util/walletUtils';
	import { ArrowDown, CheckCircle } from 'lucide-svelte';

	interface Props {
		swap: StoredSwap;
	}

	let { swap }: Props = $props();

	let mintquote = $derived(getBy($mintQuotesStore, swap?.mintQuoteId ?? '', 'quote'));
	let meltquote = $derived(getBy($meltQuotesStore, swap?.meltQuoteId ?? '', 'quote'));
</script>

{#if mintquote && meltquote}
	<a
		href={`/#/wallet/settings/mints/swap/${swap.mintQuoteId}`}
		class="relative flex flex-col rounded-lg border p-4"
	>
		<div class="absolute right-2 top-2">
			{#if mintquote.state === 'ISSUED'}
				<CheckCircle class="h-5 w-5 text-green-500"></CheckCircle>
			{/if}
		</div>
		<div class="flex gap-1">
			<p class="w-48 overflow-clip text-ellipsis text-nowrap">
				{meltquote.mintUrl}
			</p>
			{formatAmount(meltquote.amount, meltquote.unit)}
		</div>
		<div class="flex w-full justify-center">
			<ArrowDown></ArrowDown>
		</div>
		<div class="flex gap-1">
			<p class="w-48 overflow-clip text-ellipsis text-nowrap">
				{mintquote.mintUrl}
			</p>
			{formatAmount(mintquote.amount, mintquote.unit)}
		</div>
	</a>
{:else}
	{t_not_found()}
{/if}

<style>
</style>
