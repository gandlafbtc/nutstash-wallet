<script lang="ts">
	import { CashuMint } from '@gandlaf21/cashu-js';
	import type { Mint } from '../../model/mint';
	import { mints } from '../../stores/mints';
	import { toast } from '../../stores/toasts';
	import LoadingCenter from '../LoadingCenter.svelte';
	import Melting from './Melting.svelte';
	import Minting from './Minting.svelte';
	import MintRow from './MintRow.svelte';
	let mintURL = 'https://legend.lnbits.com';
	let mintAPIRoot = 'cashu/api/v1/4gr9Xcmz3XEkUNwiBiQGoC';
	let mintPort = '';
	let showAdvanced = true;
	let isLoading = false

	const addMint = async () => {
		console.log(mintURL, mintPort, mintAPIRoot);
		const mint = new CashuMint(mintURL, mintAPIRoot, mintPort);
		try {
			if ($mints.filter((m) => m.mintURL === mint.mintUrl).length > 0) {
				toast('warning', 'this mint has already been added.', "Didn't add mint!");
				return;
			}
			isLoading =true
			const keysets = await mint.getKeySets();
			const keys = await mint.getKeys();

			const storeMint: Mint = {
				mintURL: mint.mintUrl,
				keys,
				keysets: keysets.keysets
			};

			mints.update((state) => [storeMint, ...state]);
			toast('success', 'Mint has been added', 'Success');
			isLoading = false
		} catch {
			isLoading = false
			toast(
				'error',
				'keys could not be loaded from:' + mint.mintUrl + '/keys',
				'Could not add mint.'
			);
			throw new Error('Could not add Mint.');
		}
	};
	const toggleAdvanced = () => {
		showAdvanced = !showAdvanced;
	};
</script>

<div class="overflow-scroll flex flex-col gap-3">
	<div class="max-h-56 overflow-scroll">
		<table class="table w-full overflow-scroll">
			<!-- head -->
			<thead>
				<tr>
					<th>Keysets</th>
					<th>Actions</th>
					<th>Tokens</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#if $mints.length === 0}
					<tr class="hover">
						<td colspan="4"> no mints added so far. </td>
					</tr>
				{/if}
				{#each $mints as mint, mintIndex}
					<Minting {mint} />
					<Melting {mint} />
					<MintRow {mint} {mintIndex} />
				{/each}
			</tbody>
		</table>
	</div>
	<div class="pt-5">
		<p class="text-xl font-bold">Add a new Mint:</p>
	</div>
	<div class="grid grid-cols-5 gap-2">
		<div class="col-span-5 grid grid-cols-5">
			<label for="mint-url-input"> Mint Host: </label>
			<input
				id="mint-url-input"
				type="text"
				bind:value={mintURL}
				class="input w-full input-primary col-span-4"
			/>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="divider col-span-5 cursor-pointer" on:click={toggleAdvanced}>
			{#if showAdvanced}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
				</svg>
			{/if}
			Advanced
		</div>
		{#if showAdvanced}
			<div class="col-span-5 grid grid-cols-5 items-center">
				<label for="mint-port-input"> Mint Port: </label>
				<input
					id="mint-port-input"
					type="number"
					bind:value={mintPort}
					class="input w-full input-primary col-span-4"
				/>
			</div>
			<div class="col-span-5 grid grid-cols-5">
				<label for="mint-api-input w-32"> Mint API root: </label>
				<input
					id="mint-api-input"
					type="text"
					bind:value={mintAPIRoot}
					class="input w-full input-primary col-span-4"
				/>
			</div>
		{/if}
		{#if isLoading}
			<LoadingCenter />
		{:else}
			<!-- else content here -->

			<button
				class="btn btn-primary h-full"
				on:click={() => {
					addMint();
				}}
			>
				Add Mint
			</button>
		{/if}
	</div>
</div>
