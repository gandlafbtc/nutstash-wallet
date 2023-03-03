<script lang="ts">
	import { CashuMint } from '@gandlaf21/cashu-ts';
	import type { Mint } from '../../model/mint';
	import { mints } from '../../stores/mints';
	import { toast } from '../../stores/toasts';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { validateMintKeys } from '../util/walletUtils';
	import Minting from './Minting.svelte';
	import MintRow from './MintRow.svelte';
	import MintRowAdd from './MintRowAdd.svelte';
	import MintSwap from './MintSwap.svelte';
	let mintURL = '';
	let mintAPIRoot = '';
	let mintPort = '';
	let showAdvanced = false;
	let isLoading = false;

	let activeMint = $mints[0]

	let active = 'base';

	const addMint = async () => {
		console.log(mintURL, mintPort, mintAPIRoot);
		const mint = new CashuMint(mintURL, mintAPIRoot, mintPort);
		try {
			if ($mints.filter((m) => m.mintURL === mint.mintUrl).length > 0) {
				toast('warning', 'this mint has already been added.', "Didn't add mint!");
				return;
			}
			isLoading = true;
			const keysets = await mint.getKeySets();
			const keys = await mint.getKeys();

			if (!validateMintKeys(keys)) {
				toast('error', 'the keys from that mint are invalid', 'mint could not be added');
				return;
			}

			const storeMint: Mint = {
				mintURL: mint.mintUrl,
				keys,
				keysets: keysets.keysets,
				isAdded: true
			};

			mints.update((state) => [storeMint, ...state]);
			toast('success', 'Mint has been added', 'Success');
		} catch {
			toast(
				'error',
				'keys could not be loaded from:' + mint.mintUrl + '/keys',
				'Could not add mint.'
			);
			throw new Error('Could not add Mint.');
		} finally {
			isLoading = false;
		}
	};
	const toggleAdvanced = () => {
		showAdvanced = !showAdvanced;
	};
</script>

{#if active === 'base'}
	<div class="flex flex-col gap-3">
		<div class="max-h-52 overflow-auto">
			<table class="table table-auto w-full">
				<!-- head -->
				<thead>
					<tr>
						<th>Mint</th>
						<th>Actions</th>
						<th>
							<p class="hidden lg:flex">Balance</p>
							<p class="flex lg:hidden">Amt</p>
						</th>
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
						{#if mint.isAdded}
							<MintRow {mint} {mintIndex} bind:activeMint bind:active />
						{/if}
					{/each}
				</tbody>
			</table>
		</div>
		{#if $mints.filter((m) => m.isAdded).length > 1}
			<div class="flex w-full items-center justify-center">
				<button class="btn btn-lg btn-info flex gap-2" on:click={() => (active = 'swap')}>
					<p>Inter-mint Swap</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
						/>
					</svg>
				</button>
			</div>
		{/if}
		<div class="pt-5">
			<p class="text-xl font-bold">Add a new Mint:</p>
		</div>
		{#if $mints.filter(m => !m.isAdded).length>0}
		<div class="max-h-56">
			<table class="table table-compact table-zebra table-auto w-full">
				<!-- head -->
				<thead>
					<tr>
						<th>Mint</th>
						<th class="max-w-min" />
					</tr>
				</thead>
				<tbody>
					{#each $mints as mint, mintIndex}
						{#if !mint.isAdded}
							<MintRowAdd {mint} {mintIndex} />
						{/if}
					{/each}
				</tbody>
			</table>
		</div>
		{/if}


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
	{:else if active === "minting"}
	<Minting mint={activeMint} bind:active></Minting>
{:else}
		 <!-- else if content here -->
	<MintSwap bind:active />
{/if}
