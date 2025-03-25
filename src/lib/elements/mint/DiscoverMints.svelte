<script>
	import { discoverMints } from '$lib/actions/nostr';
	import Button from '$lib/components/ui/button/button.svelte';
	import { discoveredMints } from '$lib/stores/session/mintdiscover';
	import { LoaderCircle, Search } from 'lucide-svelte';
	import AddMint from './AddMint.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { mints } from '$lib/stores/persistent/mints';
	import { delay } from '$lib/util/utils';
	import { ensureError } from '$lib/helpers/errors';
	import { toast } from 'svelte-sonner';

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

<div class="flex w-80 xl:w-[600px] flex-col gap-2">
	<Button disabled={isLoading} class="w-full" onclick={doDiscoverMints}>
		{#if isLoading}
			<LoaderCircle class="animate-spin"></LoaderCircle>
		{:else}
			<Search></Search>
		{/if}
		Discover Mints
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
