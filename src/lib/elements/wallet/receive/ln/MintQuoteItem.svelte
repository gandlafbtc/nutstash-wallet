<script lang="ts">
	import { params } from 'svelte-spa-router';
	import { mintQuotesStore } from '@gandlaf21/cashu-wallet-engine/stores';
	import MintQuoteListItem from './MintQuoteListItem.svelte';
	import { t_not_found } from '$lib/paraglide/messages';

	let quoteId = $derived($params?.quote);

	let quote = $derived($mintQuotesStore.find((q) => q.quote === quoteId));

	$effect(() => {
		$mintQuotesStore;
	});
</script>

{#if quote}
	<MintQuoteListItem isListView={false} {quote}></MintQuoteListItem>
{:else}
	{t_not_found()}
{/if}
