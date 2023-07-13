<script lang="ts">
	import type { Mint } from '../../model/mint';
	import { mints } from '../../stores/mints';
	import MintSelector from '../elements/MintSelector.svelte';
	import Sending from './Sending.svelte';
	import { token } from '../../stores/tokens';
	import { getAmountForTokenSet, getTokensForMint } from '../util/walletUtils';
	import TokenIcon from '../tokens/TokenIcon.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import CoinSelection from '../elements/CoinSelection.svelte';
	import type { Proof } from '@cashu/cashu-ts';

	export let active: string;
	let mint = $mints[0];
	let amount = "";
	let isCoinSelection = false;
	let selectedTokens: Proof[];
	const navigate = () => {
		active = 'base';
	};

	$: {
		if (!/^[0-9]*$/.test(amount)) {
			amount = '';
		}
	}

	onMount(() => {
		if (browser) {
			document.getElementById('send-amt')?.focus();
		}
	});
</script>

<div class="flex flex-col">
	<div class="flex flex-col">
		<button class="flex gap-1 items-center w-min" on:click={navigate}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
			</svg>

			<p class="font-bold text-lg">back</p>
		</button>
	</div>

	<div class="flex flex-col w-full items-center gap-3">
		<MintSelector bind:mint />
		<div class="flex gap-1 items-center justify-center">
			<TokenIcon />

			<p class="font-bold">
				{getAmountForTokenSet(getTokensForMint(mint, $token))} sats
			</p>
			<p>available</p>
		</div>
		<input
			id="send-amt"
			placeholder="0"
			bind:value={amount}
			class="mt-10 text-7xl focus:outline-none text-center max-w-xs {amount
				? 'bg-base-100'
				: 'w-10 bg-base-200 rounded-lg'}"
		/>
		<p />
		<div class="col-span-5 flex items-center w-full">
			<CoinSelection {amount} {mint} bind:selectedTokens bind:isCoinSelection />
		</div>
	</div>

	<Sending bind:active bind:mint bind:amount bind:selectedTokens bind:isCoinSelection />
</div>
