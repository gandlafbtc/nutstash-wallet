<script>
	import { nostrMessages } from "../../stores/nostr";
	import InboxRow from "./InboxRow.svelte";

    $: page = 5
    $: nostrMessagesSub  = $nostrMessages.slice(0,page)

    const loadMore = () => {
        page += 5
    }

</script>
<div class="overflow-x-scroll overflow-y-scroll max-h-60">
	<table class="table table-compact table-zebra w-full">
		<thead>
			<tr>
				<th></th>
				<th>Amount</th>
				<th>Date</th>
				<th>From</th>
			</tr>
		</thead>
		<tbody class="max-h-1 overflow-y-scroll">
            {#each nostrMessagesSub as nostrMessage, i}
                 <InboxRow {nostrMessage} {i}></InboxRow>
            {/each}
            <tr class="hover">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <td colspan="4" class="cursor-pointer w-full"  on:click={loadMore} >
                        load more
                </td>
            </tr>
		</tbody>
	</table>
</div>

