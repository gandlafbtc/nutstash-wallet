<script lang="ts">
	import { mints } from '$lib/stores/persistent/mints';
	import MintSelector from '../ui/MintSelector.svelte';
	import AddMint from '../mint/AddMint.svelte';
	import type { Mint } from '$lib/db/models/types';
	import { getBy } from '$lib/stores/persistent/helper/storeHelper';
	import { toast } from 'svelte-sonner';
	import DiscoverMints from '../mint/DiscoverMints.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { getHostFromUrl } from '$lib/util/utils';
	import MintDropdown from '../mint/mintDropdown/MintDropdown.svelte';
	import MintSwap from '../mint/MintSwap.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { discoverMints } from '$lib/actions/nostr';
	import { add_mint, added_mints, default_mint, mint_settings, t_manage, t_swap } from '$lib/paraglide/messages';

	let defaultMint: Mint | undefined = $derived($mints[0]);

	const onMintChange = (minturl: string) => {
		const mint = getBy($mints, minturl, 'url');
		if (!mint) {
			toast.warning('Mint not found');
			return;
		}
		mints.makeDefaultMint(mint);
	};
</script>

<div class="flex h-full w-80 flex-col gap-4 xl:w-[600px]">
	<div>
		<span class="text-lg font-bold"> {mint_settings()} </span>
	</div>
	<Tabs.Root value={$mints.length ? 'manage' : 'add'} class="w-full">
		<Tabs.List>
			<Tabs.Trigger value="manage">{t_manage()}</Tabs.Trigger>
			<Tabs.Trigger value="add" onclick={() => discoverMints()}>{add_mint()}</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="manage">
			{#if defaultMint}
				<!-- content here -->
				<div class="mt-4 flex flex-col gap-6">
					<div class="flex flex-col gap-3">
						<span class="text-sm font-bold">{default_mint()}</span>
						<MintSelector mint={defaultMint} onchange={onMintChange}></MintSelector>
					</div>
					<div class="flex flex-col gap-3">
						<span class="text-sm font-bold">{t_swap()}</span>
						<span class="text-sm"> </span>
						<Button href="/#/wallet/settings/mints/swap">{t_swap()}</Button>
					</div>

					<div class="flex flex-col gap-1">
						<span class="text-sm font-bold">{added_mints()}</span>
						{#each $mints as m, i}
							<div
								class="my-2 flex items-center gap-2 rounded-lg border p-2 text-sm"
								class:border-purple-500={i === 0}
							>
								<a
									href={`/#/wallet/mint/${getHostFromUrl(m.url)}`}
									class="w-72 text-nowrap font-bold"
								>
									{m.url}
								</a>
								<MintDropdown mint={m}></MintDropdown>
							</div>
							<div></div>
						{/each}
					</div>
				</div>
			{/if}
		</Tabs.Content>
		<Tabs.Content value="add">
			<div class="mt-4 flex flex-col gap-6">
				<div class="flex flex-col gap-1">
					<AddMint></AddMint>
				</div>

				<div class="flex w-full flex-col gap-1">
					<DiscoverMints></DiscoverMints>
				</div>
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>
