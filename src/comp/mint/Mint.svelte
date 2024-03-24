<script lang="ts">
	import { mints } from '../../stores/mints';
	import Minting from './Minting.svelte';
	import MintRow from './MintRow.svelte';
	import MintSwap from './MintSwap.svelte';
	import AddMintForm from '../elements/AddMintForm.svelte';
	
	let activeMint = $mints[0];

	let active = 'base';

</script>

{#if active === 'base'}
	<div class="flex flex-col gap-3">
		<div class="flex gap-3 flex-col">
			{#if $mints.length === 0}
				no mints added so far.
			{/if}
			{#each $mints as mint, mintIndex}
				<MintRow {mint} {mintIndex} bind:activeMint bind:active />
			{/each}
		</div>
		<AddMintForm></AddMintForm>
	</div>
{:else if active === 'minting'}
	<Minting isMinting={false} mint={activeMint} bind:active />
{/if}
{#if $mints.length > 1 && active === 'base'}
	<div class="divider" />
	<MintSwap bind:active />
{/if}
