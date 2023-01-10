<script>
	import { history } from "../../stores/history";
	import HistoryRow from "./HistoryRow.svelte";

    $: page = 2
    $: historySub = $history.slice(0,page)

    const loadMore = () => {
        page++
    }

</script>
<div class="overflow-x-auto overflow-y-scroll max-h-60">
	<table class="table table-compact table-zebra w-full">
		<thead>
			<tr>
				<th>Action</th>
				<th>Amount</th>
				<th>Date</th>
				<th>Details</th>
			</tr>
		</thead>
		<tbody class="max-h-1 overflow-y-scroll">
            {#each historySub as historyItem,i}
                 <HistoryRow {historyItem} {i}></HistoryRow>
            {/each}
            <tr class="hover">
                <td colspan="4" class="cursor-pointer w-full"  on:click={loadMore} >
                        load more
                </td>
            </tr>
		</tbody>
	</table>
</div>


