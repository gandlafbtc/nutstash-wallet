<script lang="ts">
	import { params } from 'svelte-spa-router';
	import TransactionListItem from './TransactionListItem.svelte';
	import { transactionsStore } from '$lib/stores/persistent/transactions';
	import { t_not_found } from '$lib/paraglide/messages';

	let txId = $derived($params?.id);
	let tx = $derived($transactionsStore.find((q) => q.id === txId));
</script>

<div class="flex h-full w-80 flex-col gap-2 xl:w-[600px]">
	{#if tx}
		<TransactionListItem isListView={false} {tx}></TransactionListItem>
	{:else}
		{t_not_found()}
	{/if}
</div>
