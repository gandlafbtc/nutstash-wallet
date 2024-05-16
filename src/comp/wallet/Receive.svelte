<script lang="ts">
	import { mint } from '../../actions/walletActions';
	import { mints } from '../../stores/mints';
	import Minting from '../mint/Minting.svelte';
	import Receiving from './Receiving.svelte';

	export let active: string;
	export let encodedToken: string = '';

	let isToken = false;
	let isMinting = false;
	let doMint = false;
	let activeR: string;

	const navigate = () => {
		isMinting = false;
		isToken = false;
		if (activeR === 'scan-receive' || doMint) {
			activeR = 'receive';
			doMint = false;
		} else {
			active = 'base';
		}
	};
</script>

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

	{#if !isToken && $mints.length}
		<Minting bind:active bind:isMinting bind:doMint />
	{/if}

	{#if !isMinting && !doMint && !isToken && $mints.length}
		<div class="divider">or</div>
	{/if}
	{#if !isMinting && !doMint}
		<Receiving bind:active bind:activeR bind:encodedToken bind:isToken />
	{/if}
</div>
