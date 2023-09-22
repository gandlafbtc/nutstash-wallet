<script lang="ts">
	import type { Mint } from '../../model/mint';
	import AvailableTokensTable from '../tokens/AvailableTokensTable.svelte';
	import { getAmountForTokenSet } from '../util/walletUtils';
	import type { Proof } from '@cashu/cashu-ts';

	export let mint: Mint;
	export let amount: number = 0;
	export let selectedTokens: Proof[] = [];
	
	$: selectedAmount = getAmountForTokenSet(selectedTokens)

	export let isCoinSelection = false;
</script>

<div class="flex flex-col gap-2 items-center w-full">
	<label class="label cursor-pointer p-0 pb-3">
		<div class="flex gap-1 items-center">
			<input type="checkbox" bind:checked={isCoinSelection} class="checkbox checkbox-primary" />
			<span class="label-text font-bold">Custom Inputs</span>
		</div>
	</label>
	{#if isCoinSelection}
		<AvailableTokensTable {mint} bind:selectedTokens />
		<div class="flex flex-col gap-2 pt-2 items-center">
			<div class="flex flex-col justify-center items-center gap-1">

				<progress class="progress w-56 {selectedAmount===amount? 'progress-success':''} {selectedAmount>amount? 'progress-warning':''}" value="{selectedAmount}" max="{amount}"></progress>
				<span class="">
					{selectedAmount} / {amount ?? 0} sats
				</span>
			</div>
				{#if selectedAmount - amount > 0}
					<span class="font-bold"> Change: </span>
					<span class="">
						{selectedAmount - amount} sats
					</span>
				{/if}
		</div>
		{:else}
		<p class="text-sm">
			Cashu tokens are stored in your wallet as coins. Coins will be selected randomly to create a new sendable token. With <label for="" class="text-primary cursor-pointer"> Custom Inputs
			</label>
			 you can define which coins from your wllet will be used.
		</p>
	{/if}
</div>
