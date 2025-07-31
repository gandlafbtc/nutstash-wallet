<script>
	import { ensureError,  discoverMints } from '@gandlaf21/cashu-wallet-engine';
	import { mintsStore as mints, discoveredMints, } from '@gandlaf21/cashu-wallet-engine/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import { LoaderCircle, Search } from 'lucide-svelte';
	import AddMint from './AddMint.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { delay } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import { discover_mints } from '$lib/paraglide/messages';

	let isLoading = $state(false);

	const doDiscoverMints = async () => {
		try {
			isLoading = true;
			discoverMints();
			await delay(500);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex w-80 flex-col gap-2 xl:w-[600px]">
	<Button disabled={isLoading} class="w-full" onclick={doDiscoverMints}>
		{#if isLoading}
			<LoaderCircle class="animate-spin"></LoaderCircle>
		{:else}
			<Search></Search>
		{/if}
		{discover_mints()}
	</Button>

	<div class="flex w-full flex-col gap-2">
		{#each $discoveredMints.filter((m) => !$mints.find((ms) => m.url === ms.url)) as mint}
			{#if mint.url}
				<div class="my-2 flex w-full items-center justify-between gap-2">
					<AddMint bind:mintUrlToAdd={mint.url} readOnly={true} showAddText={false}></AddMint>

					<p class="pr-3">
						<a
							href={`https://bitcoinmints.com/?tab=reviews&mintUrl=${encodeURI(mint.url)}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Badge>
								{mint.reviews}
							</Badge>
						</a>
					</p>
				</div>
			{/if}
		{/each}
	</div>
</div>
