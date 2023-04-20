<script lang="ts">
	import type { Mint } from '../../model/mint';
	import AvailableTokensTable from '../tokens/AvailableTokensTable.svelte';
	import { getAmountForTokenSet } from '../util/walletUtils';
	import type { Proof } from "@cashu/cashu-ts";

	export let mint: Mint;
	export let amount: number = 0;
	export let selectedTokens: Proof[] = [];

	export let isCoinSelection = false;
</script>

<div class="flex flex-col gap-2 ">
	<label class="label cursor-pointer p-0">
		<div class="flex gap-1 items-center">
			<span class="label-text font-bold">Use coin selection</span>
			<input type="checkbox" bind:checked={isCoinSelection} class="checkbox checkbox-primary" />
		</div>
	</label>
	{#if isCoinSelection}
		<AvailableTokensTable {mint} bind:selectedTokens />
		<div class="flex gap-2 items-center">
			<div class="grid grid-cols-3 w-full">
				<span class="font-bold"> Amount selected: </span>
				<span class="col-span-2">
					{getAmountForTokenSet(selectedTokens)} / {amount ?? 0} sats
				</span>
				{#if getAmountForTokenSet(selectedTokens) - amount > 0}
					<span class="font-bold"> Change: </span>
					<span class="col-span-2">
						{getAmountForTokenSet(selectedTokens) - amount} sats
					</span>
				{/if}
			</div>
		</div>
	{/if}
</div>
