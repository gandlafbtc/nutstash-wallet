<script lang="ts">
	import { meltQuotesStore } from '$lib/stores/persistent/meltquotes';
	import { mintQuotesStore } from '$lib/stores/persistent/mintquotes';
	import { offlineTransactionsStore } from '$lib/stores/persistent/offlineTransactions';
	import { transactionsStore } from '$lib/stores/persistent/transactions';
	import { AlertCircle } from 'lucide-svelte';

	import CompactHistoryItem from './CompactHistoryItem.svelte';
	import { formatAmount } from '$lib/util/walletUtils';
	let items = $derived([...$transactionsStore, ...$mintQuotesStore, ...$meltQuotesStore]);

	let limit = $state(2);

	let latest = $derived(
		[...items].sort((a, b) => b.lastChangedAt - a.lastChangedAt).slice(0, limit)
	);
</script>

<div class="mt-6 flex w-full gap-2">
	<div class="flex w-full flex-col gap-2">
		{#if $offlineTransactionsStore.length}
			<a
				href="/#/wallet/receive-offline-tokens"
				class="flex w-full items-center justify-between gap-2 rounded-xl border border-nutstash p-3"
			>
				<div class="flex-shrink">
					<AlertCircle class="text-nutstash"></AlertCircle>
				</div>
				<div class="flex-grow">
					<div class="text-sm">Unclaimed ecash</div>
					<div class="flex-grow text-start text-xs text-muted-foreground">Redeem now!</div>
				</div>
				<div>
					{formatAmount($offlineTransactionsStore.reduce((acc, curr) => acc + curr.amount, 0))}
				</div>
			</a>
		{/if}
		{#each latest as item}
			<CompactHistoryItem {item}></CompactHistoryItem>
		{/each}
		{#if latest.length >= items.length}
			<button class="flex w-full rounded-xl border p-5 opacity-45">
				<span class="text-xs">
					{#if !items.length}
						No history items yet ...
					{/if}
				</span>
			</button>
		{:else}
			<button
				class="flex w-full rounded-xl border p-5"
				onclick={() => {
					if (limit + 5 < items.length) {
						limit += 5;
					} else {
						limit = items.length;
					}
				}}
			>
				<span class="text-xs">Load more...</span>
			</button>
		{/if}
	</div>
</div>
