<script>
	import { history } from '../../stores/history';
	import TokenHistoryRow from './TokenHistoryRow.svelte';

	$: page = 20;
	$: historySub = $history.slice(0, page);

	const loadMore = () => {
		page += 20;
	};
</script>

<div class="overflow-x-scroll overflow-y-scroll scrollbar-hide w-full">
	<table class="table table-compact table-zebra w-full">
		<thead>
			<tr>
				<th />
				<th>
					<p class="hidden lg:flex">Amount</p>
					<p class="flex lg:hidden">Amt</p></th
				>
				<th>Date</th>
				<th>Mint</th>
			</tr>
		</thead>
		<tbody class="max-h-1 overflow-y-scroll scrollbar-hide">
			{#each historySub as historyItem}
				<TokenHistoryRow {historyItem} />
			{/each}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<tr class="">
				<td colspan="2" class="cursor-pointer w-5 hover:bg-base-200" on:click={loadMore}>
					Load more
				</td>
				<td
					colspan="2"
					class="cursor-pointer w-full hover:bg-base-200"
					on:click={() => (page = 999999)}
				>
					Load all
				</td>
			</tr>
		</tbody>
	</table>
</div>
