<script lang="ts">
	import { params } from 'svelte-spa-router';
	import { mintQuotesStore } from '$lib/stores/persistent/mintquotes';
	import { onMount } from 'svelte';
	import MintQuoteListItem from './MeltQuoteListItem.svelte';
	import MeltQuoteListItem from './MeltQuoteListItem.svelte';
	import { meltQuotesStore } from '$lib/stores/persistent/meltquotes';
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
