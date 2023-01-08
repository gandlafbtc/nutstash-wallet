<script lang="ts">
	import { CashuMint } from '@gandlaf21/cashu-js';
	import type { Mint } from '../../model/mint';
	import { mints } from '../../stores/mints';
	import { toast } from '../../stores/toasts';
	import Melting from './Melting.svelte';
	import Minting from './Minting.svelte';
	import MintRow from './MintRow.svelte';
	let mintURL = 'https://legend.lnbits.com/cashu/api/v1/4gr9Xcmz3XEkUNwiBiQGoC';


	const addMint = async () => {
		const mint = new CashuMint(mintURL);
		try {
			const keysets = await mint.getKeySets();
			if ($mints.map((m)=>{return m.keysets[0].includes(keysets[0])}).length>0  ){
				toast('warning','this mint has already been added.','Didn\'t add mint!')
				return 
			}
			const keys = await mint.getKeys();

			console.log(keysets);
			const storeMint: Mint = {
				mintURL,
				keys,
				keysets: keysets.keysets
			};
			
			mints.update((state)=>[storeMint,...state]);
			toast('success', 'Mint has been added', 'Success');
		} catch {
			toast('error', 'keys could not be loaded from:' + mintURL + '/keys', 'Could not add mint.');
			throw new Error('Could not add Mint.');
		}
	};

</script>

<div class="overflow-x-auto">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Mint URL</th>
				<th>Keysets</th>
				<th>Tokens from this Mint</th>
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
				<MintRow {mint} {mintIndex}></MintRow>
			{/each}
		</tbody>
	</table>
</div>

<div class="grid grid-cols-5 gap-1">
	<input
		type="text"
		bind:value={mintURL}
		placeholder="Type here"
		class="input w-full input-primary col-span-4"
	/>
	<button
		class="btn btn-primary"
		on:click={() => {
			addMint();
		}}
	>
		Add Mint
	</button>
</div>
