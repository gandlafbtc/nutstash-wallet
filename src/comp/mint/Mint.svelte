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

	let activeMint = $mints[0];

	let active = 'base';

	onMount(() => {});

	const addMint = async () => {
		const mint = new CashuMint(mintURL);
		try {
			if ($mints.filter((m) => m.mintURL === mint.mintUrl).length > 0) {
				toast('warning', 'this mint has already been added.', "Didn't add mint!");
				return;
			}
			isLoading = true;
			const keysets = await mint.getKeySets();
			const keys = await mint.getKeys();
			const info = await mint.getInfo();

			if (!validateMintKeys(keys)) {
				toast('error', 'the keys from that mint are invalid', 'mint could not be added');
				return;
			}

			const storeMint: Mint = {
				mintURL: mint.mintUrl,
				keys,
				info,
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
			{#if $mints.length === 0}
				no mints added so far.
			{/if}
			{#each $mints as mint, mintIndex}
				<MintRow {mint} {mintIndex} bind:activeMint bind:active />
			{/each}
		</div>

		<form on:submit|preventDefault={addMint}>
			<div class="flex join">
				<input
					autofocus
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
					<input
						type="submit"
						class="z-0 btn join-item {mintURL
							? 'btn-primary'
							: 'btn-disabled'} h-full z-20 flex gap-2 items-center"
						value="Add mint"
					/>
				{/if}
			</div>
		</form>
	</div>
{:else if active === 'minting'}
	<Minting isMinting={false} mint={activeMint} bind:active />
{/if}
{#if $mints.length > 1 && active === 'base'}
	<div class="divider" />
	<MintSwap bind:active />
{/if}
