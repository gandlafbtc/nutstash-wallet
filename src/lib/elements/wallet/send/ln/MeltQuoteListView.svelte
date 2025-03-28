<script lang="ts">
	import { meltQuotesStore } from '$lib/stores/persistent/meltquotes';
	import { MediaQuery } from 'runed';
	import * as Pagination from '$lib/components/ui/pagination';
	import MeltQuoteListItem from './MeltQuoteListItem.svelte';
	import { nothing_here_yet, t_payments } from '$lib/paraglide/messages';

	const isDesktop = new MediaQuery('(min-width: 768px)');

	const count = $derived($meltQuotesStore.length);

	const perPage = $derived(isDesktop.matches ? 10 : 10);
	const siblingCount = $derived(isDesktop.matches ? 3 : 3);
	let page = $state(1);
	let currentQuotes = $derived($meltQuotesStore.slice((page - 1) * perPage, page * perPage));
</script>

<div class="h-full">
	<p class="text-lg font-bold">{t_payments()}</p>
	{#if $meltQuotesStore.length}
		{#each currentQuotes as quote}
			<MeltQuoteListItem {quote}></MeltQuoteListItem>
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
			<p>{nothing_here_yet()}</p>
		</div>
	{/if}
</div>
