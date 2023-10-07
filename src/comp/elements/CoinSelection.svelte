<script lang="ts">
	import type { Mint } from '../../model/mint';
	import AvailableTokensTable from '../tokens/AvailableTokensTable.svelte';
	import { getAmountForTokenSet } from '../util/walletUtils';
	import type { Proof } from '@cashu/cashu-ts';

	export let mint: Mint;
	export let amount: number = 0;
	export let selectedTokens: Proof[] = [];

	$: selectedAmount = getAmountForTokenSet(selectedTokens);

	export let isCoinSelection = false;
</script>

<div class="flex flex-col gap-2 items-center w-full">
	<div class="flex gap-2 items-center">
		<label class="label flex gap-1 cursor-pointer p-0 items-center">
			<input type="checkbox" bind:checked={isCoinSelection} class="checkbox checkbox-primary" />
			<span class="label-text">Custom Inputs</span>
		</label>
		<div
			class="tooltip"
			data-tip="Cashu tokens are stored in your wallet as coins. Coins will be selected randomly to create a new sendable token. With Custom Inputs
		you can define which coins from your wllet will be used."
		>
			<div class="hover:text-primary cursor-help">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
					/>
				</svg>
			</div>
		</div>
	</div>
	{#if isCoinSelection}
		<AvailableTokensTable {mint} bind:selectedTokens />

		<div class="flex flex-col gap-1 pt-2 items-center w-full">
			<div class="flex flex-row justify-center items-center gap-2 w-full">
				<progress
					class="progress w-full {selectedAmount == amount
						? 'progress-success'
						: ''} {selectedAmount > amount ? 'progress-warning' : ''}"
					value={selectedAmount}
					max={amount}
				/>
			</div>
			<span class="">
				{selectedAmount} / {amount ?? 0} sats
				{#if selectedAmount - amount > 0}
					<span class="font-bold"> | </span>
					<span class="">
						{selectedAmount - amount} sats
					</span>
					<span> change </span>
				{/if}
			</span>
		</div>
	{:else}{/if}
</div>
