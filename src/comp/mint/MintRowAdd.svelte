<script lang="ts">
	import { untrustedMints } from '../../stores/untrustedMints';
	import { deriveKeysetId } from '@cashu/cashu-ts';
	import { toast } from '../../stores/toasts';

	export let url: string;
	export let isPredefined: boolean;

	let isLoading = false;
	let isLoaded = false;

	const addMint = async () => {
		try {
			isLoading = true;
			const res = await fetch(`${url}/keys`);
			const data = await res.json();
			if (!res.ok) {
				toast('error', 'could not load mint', 'mint not added');
				return;
			}
			untrustedMints.update((state) => [
				...state,
				{ mintURL: url, keys: data, keysets: [deriveKeysetId(data)] }
			]);
			console.log('asdf');
			isLoaded = true;
		} catch (error) {
			toast('error', 'could not load mint', 'mint not added');
			console.log(error);
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
			{url}
		{:else}
			<input
				type="text"
				class="w-48 lg:w-full input input-primary bg-base-300 {isLoaded ? 'input-disabled' : ''}"
				placeholder="your favorite mint"
				bind:value={url}
			/>
		{/if}
	</div>
	<div class="w-24 h-16 flex items-center justify-center">
		{#if isLoading}
			<button class="loading btn btn-disabled btn-sm" />
		{:else if $untrustedMints.find((m) => m.mintURL === url)}
			<button class="btn btn-error" on:click={removeMint}> remove </button>
		{:else}
			<button class="btn {url ? 'btn-primary' : 'btn-disabled'} flex gap-1" on:click={addMint}>
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
