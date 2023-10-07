<script lang="ts">
	import { CashuMint } from '@cashu/cashu-ts';
	import type { Mint } from '../../model/mint';
	import { mints } from '../../stores/mints';
	import { toast } from '../../stores/toasts';
	import { validateMintKeys } from '../util/walletUtils';
	import Minting from './Minting.svelte';
	import MintRow from './MintRow.svelte';
	import MintSwap from './MintSwap.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	let mintURL = '';
	let isLoading = false;
	let isAddMintPing = false;

	let activeMint = $mints[0];

	let active = 'base';

	onMount(() => {
		const searchParams = $page.url.searchParams;

		if (searchParams) {
			const mintUrlParam = searchParams.get('mint');
			if (mintUrlParam) {
				mintURL = mintUrlParam;
				$page.url.searchParams.delete('mint');
				history.replaceState({}, '', $page.url);
				if (mintURL) {
					isAddMintPing = true;
				}
			}
		}
	});

	const addMint = async () => {
		isAddMintPing = false;
		const mint = new CashuMint(mintURL);
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
				keysets: keysets.keysets
			};

			mints.update((state) => [...state, storeMint]);
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
</script>

{#if active === 'base'}
	<div class="flex flex-col gap-3">
		<div class="max-h-72 overflow-auto scrollbar-hide">
			<table class="table table-auto w-full">
				<!-- head -->
				<thead>
					<tr>
						<th class="w-full">Mint</th>
						<th>
							<p class="hidden lg:flex">Balance</p>
							<p class="flex lg:hidden">Amt</p>
						</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#if $mints.length === 0}
						<tr class="hover">
							<td colspan="4"> no mints added so far. </td>
						</tr>
					{/if}
					{#each $mints as mint, mintIndex}
						<MintRow {mint} {mintIndex} bind:activeMint bind:active />
					{/each}
				</tbody>
			</table>
		</div>

		<div class="flex join">
			<input
				id="mint-url-input"
				type="text"
				placeholder="mint URL..."
				bind:value={mintURL}
				class=" join-item input w-full input-primary col-span-4"
			/>

			{#if isLoading}
				<button
					class="btn join-item loading-spinner btn-disabled h-full z-20 flex gap-2 items-center"
				/>
			{:else}
				<button
					class="z-0 btn join-item {mintURL
						? 'btn-primary'
						: 'btn-disabled'} h-full z-20 flex gap-2 items-center"
					on:click={() => {
						addMint();
					}}
				>
					Add Mint
					{#if isAddMintPing}
						<span class="flex h-3 w-3">
							<div
								class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-secondary opacity-75"
							/>
							<div class="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
						</span>
					{/if}
				</button>
			{/if}
		</div>
	</div>
{:else if active === 'minting'}
	<Minting isMinting={false} mint={activeMint} bind:active />
{/if}
{#if $mints.length > 1 && active === 'base'}
	<div class="divider" />
	<MintSwap bind:active />
{/if}
