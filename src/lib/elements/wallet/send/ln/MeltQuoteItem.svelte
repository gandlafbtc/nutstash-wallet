<script lang="ts">
	import { params } from 'svelte-spa-router';
	import { meltQuotesStore } from '@gandlaf21/cashu-wallet-engine/stores';
	import MeltQuoteListItem from './MeltQuoteListItem.svelte';
	import { t_not_found } from '$lib/paraglide/messages';

	let quoteId = $derived($params?.quote);

	let quote = $derived($meltQuotesStore.find((q) => q.quote === quoteId));

	$effect(() => {
		// $meltQuotesStore
	});
</script>

{#if quote}
	<MeltQuoteListItem isListView={false} {quote}></MeltQuoteListItem>
{:else}
	{t_not_found()}
{/if}
