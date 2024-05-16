<script lang="ts">
	import type { Mint } from '../../model/mint';
	import KeysetRestoreElement from './KeysetRestoreElement.svelte';

	let ksSearches: (() => Promise<void>)[] = [];

	export let mint: Mint;
	export let countStep: number;
	export const mintAutoSearch = () => {
		for (const f of ksSearches) {
			f();
		}
	};
</script>

<div class="m-2 bg-base-200 w-full rounded-lg p-2 flex gap-2 flex-col">
	<div class="flex gap-2 items-center w-full justify-center">
		<p class="font-bold">
			{mint.mintURL}
		</p>
	</div>
	<div class="flex flex-col gap-2">
		{#each mint.keysets.sort((a, b) => (a.active ? 0 : 1) - (b.active ? 0 : 1)) as ks, i}
			<KeysetRestoreElement {ks} {mint} {countStep} bind:ksAutoSearch={ksSearches[i]}
			></KeysetRestoreElement>
		{/each}
	</div>
</div>
