<script lang="ts">
	import { mintQuotesStore } from '$lib/stores/persistent/mintquotes';
	import { onMount } from 'svelte';
	import { MediaQuery } from 'runed';
	import * as Pagination from '$lib/components/ui/pagination';
	import { transactionsStore } from '$lib/stores/persistent/transactions';
	import TransactionListItem from './TransactionListItem.svelte';

	const isDesktop = new MediaQuery('(min-width: 768px)');

	const count = $derived($transactionsStore.length);

	const perPage = $derived(isDesktop.matches ? 10 : 10);
	const siblingCount = $derived(isDesktop.matches ? 3 : 3);
	let page = $state(1);
	let currentTxs = $derived($transactionsStore.slice((page - 1) * perPage, page * perPage));

	let time = $state(new Date());

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="flex h-full w-80 flex-col gap-2 xl:w-[600px]">
	<p class="text-lg font-bold">Ecash transactions</p>
	{#if $transactionsStore.length}
		{#each currentTxs as tx}
			<TransactionListItem {tx}></TransactionListItem>
		{/each}

		<Pagination.Root {count} {perPage} {siblingCount} bind:page>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item isVisible={currentPage === page.value}>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton />
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	{:else}
		<div class="h-20">
			<p>No transactions yet.</p>
		</div>
	{/if}
</div>
