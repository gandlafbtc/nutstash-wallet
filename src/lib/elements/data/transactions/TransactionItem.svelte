<script lang="ts">
	import { params } from 'svelte-spa-router';
	import { mintQuotesStore } from '$lib/stores/persistent/mintquotes';
	import { onMount } from 'svelte';
	import MintQuoteListItem from './TransactionListItem.svelte';
	import TransactionListItem from './TransactionListItem.svelte';
	import { transactionsStore } from '$lib/stores/persistent/transactions';

	let txId = $derived($params?.id);
	let tx = $derived($transactionsStore.find((q) => q.id === txId));
</script>

<div class="flex h-full w-80 xl:w-[600px] flex-col gap-2">

	{#if tx}
	<TransactionListItem isListView={false} {tx}></TransactionListItem>
	{:else}
	Transaction not found
	{/if}
	
</div>