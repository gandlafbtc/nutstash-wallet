<script>
	import { token } from "../../stores/tokens";
	import TokenRow from "./TokenRow.svelte";

    $: page = 5
    $: tokenSub = $token.slice(0,page)

    const loadMore = () => {
        page += 5
    }

</script>
<div class="overflow-x-scroll overflow-y-scroll max-h-60">
	<table class="table table-compact table-zebra w-full">
		<thead>
			<tr>
				<th></th>
				<th>
                    <p class="hidden lg:flex">
                        Amount
                    </p>
                    <p class="flex lg:hidden">
                        Amt
                    </p>
                </th>
				<th>Mint</th>
				<th>Token</th>
			</tr>
		</thead>
		<tbody class="max-h-1 overflow-y-scroll">
            {#each tokenSub as token,i}
                 <TokenRow {token} {i}></TokenRow>
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


