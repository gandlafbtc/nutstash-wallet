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
	import Melting from './Melting.svelte';
	import ScanLn from '../elements/ScanLN.svelte';

	export let active: string;
	let mint = $mints[0];
	let amount = '';
	let isCoinSelection = false;
	let selectedTokens: Proof[];
	let isSend = true;
	let encodedToken: string;
	let invoice: string;
	let fees: 0;
	let activeS = 'send'
	let processing = false
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

	{#if activeS==='send'}
	{#if !processing}
	<div class="flex flex-col w-full items-center gap-3">
		<div class="z-10">
			<MintSelector bind:mint />
		</div>
		<div class="flex gap-1 items-center justify-center">
			<TokenIcon />

			<p class="font-bold">
				{getAmountForTokenSet(getTokensForMint(mint, $token))} sats
			</p>
			<p>available</p>
		</div>

		<div class="">
			<div class="tabs tabs-boxed">
				<button class="tab {isSend ? 'tab-active' : ''}" on:click={() => (isSend = true)}>
					<div class="flex gap-1 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
							/>
						</svg>
						<p>send ecash</p>
					</div>
				</button>
				<button
					class="tab {!isSend ? 'bg-warning text-warning-content' : ''}"
					on:click={() => (isSend = false)}
				>
					<div class="flex gap-1 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
							/>
						</svg>

						<p>pay invoice</p>
					</div>
				</button>
			</div>
		</div>
		{#if isSend || (invoice && amount)}
		<div class="h-40 flex flex-col items-center">

			<input
			readonly="{isSend?false:true}"
			id="send-amt"
			placeholder="0"
			bind:value={amount}
				class="mt-10 text-7xl focus:outline-none text-center max-w-xs {amount
					? 'bg-base-100'
					: 'w-10 bg-base-200 rounded-lg'}"
			/>
			<p />
			{#if !isSend && fees}
			<div class="text-sm flex gap-2">

				<p class="font-bold">
					{fees} sats
				</p>
				<p>
					fees	
				</p>
			</div>
				{/if}
				</div>
		{/if}

	</div>
	{/if}

	<div class=" flex items-center justify-center w-full">
		{#if !isSend}
				<Melting
					bind:active
					bind:invoice
					bind:mint
					bind:selectedTokens
					bind:isCoinSelection
					bind:fees
					bind:amount
					bind:activeS
					bind:processing
				/>
		{/if}
	</div>
	{#if isSend}
		<Sending
			bind:active
			bind:mint
			bind:amount
			bind:selectedTokens
			bind:isCoinSelection
			bind:encodedToken
			bind:processing
		/>
	{/if}

	{:else if activeS==="send-scan"}
	<ScanLn bind:invoice bind:activeS></ScanLn>
	{/if}

</div>
