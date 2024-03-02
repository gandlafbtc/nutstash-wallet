<script lang="ts">
	import { untrustedMints } from '../../stores/untrustedMints';
	import { CashuMint, deriveKeysetId } from '@cashu/cashu-ts';
	import { toast } from '../../stores/toasts';

	export let url: string;
	export let isPredefined: boolean;
	export let afterAdd: Function;

	let isLoading = false;
	let isLoaded = false;

	const addMint = async () => {
		try {
			isLoading = true;
			const cashuMint = new CashuMint(url);
			const keys = await cashuMint.getKeys();
			const { keysets } = await cashuMint.getKeySets();
			const info = await cashuMint.getInfo()
			untrustedMints.update((state) => [...state, { mintURL: url, keys, keysets, info }]);
			isLoaded = true;
			afterAdd(url);
		} catch (error) {
			toast('error', 'could not load mint', 'mint not added');
		} finally {
			isLoading = false;
		}
	};
	const removeMint = () => {
		untrustedMints.set($untrustedMints.filter((m) => m.mintURL !== url));
		isLoaded = false;
	};
</script>

<div class="flex gap-2 rounded-xl justify-center items-center bg-base-300 p-2 lg:p-4">
	<div class=" overflow-scroll scrollbar-hide w-48 sm:w-64 md:w-80 lg:w-96">
		{#if isPredefined}
			<div class="flex flex-col lg:flex-row lg:items-center gap-2">
				{url}
				<div>
					<slot />
				</div>
			</div>
		{:else}
			<input
				type="text"
				class="w-48 lg:w-full input input-primary bg-base-300"
				placeholder="your favorite mint"
				bind:value={url}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						addMint();
					}
				}}
			/>
		{/if}
	</div>
	<div class="w-24 h-16 flex items-center justify-center">
		{#if isLoading}
			<button class="loading btn btn-disabled btn-sm" />
		{:else if $untrustedMints.find((m) => m.mintURL === url) && isPredefined}
			<button class="btn btn-error" on:click={removeMint}> remove </button>
		{:else}
			<button class="btn btn-primary flex gap-1" on:click={addMint}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
				Add
			</button>
		{/if}
	</div>
</div>
