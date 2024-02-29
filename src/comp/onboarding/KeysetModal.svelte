<script lang="ts">
	import { CashuMint } from '@cashu/cashu-ts';
	import { mints } from '../../stores/mints';
	import type { Mint } from '../../model/mint';
	import { onMount } from 'svelte';

	onMount(() => loadKeysets());
	export let keysetMap: { mint: Mint; keysets: { id: string; isSelected: boolean }[] }[] = [];
	const loadKeysets = async () => {
		for (const mint of $mints) {
			const cashuMint = new CashuMint(mint.mintURL);
			const { keysets: ks } = await cashuMint.getKeySets();
			const keysets = ks.map((k) => {
				return { id: k, isSelected: false };
			});
			keysetMap.push({ mint, keysets });
		}
		keysetMap = keysetMap;
	};
</script>

<button class="btn" onclick="my_modal_1.showModal()">try a different keyset</button>
<dialog id="my_modal_1" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Select keysets to restore</h3>
		{#each keysetMap as m}
			<p>
				{m.mint.mintURL}
			</p>
			{#each m.keysets as ks}
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">{ks.id}</span>
						<input type="checkbox" bind:checked={ks.isSelected} class="checkbox checkbox-primary" />
					</label>
				</div>
			{/each}
		{/each}
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
