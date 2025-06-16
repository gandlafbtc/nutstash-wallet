<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Ellipsis, Loader, LoaderCircle, Trash } from 'lucide-svelte';
	import { types,getHostFromUrl } from '@gandlaf21/cashu-wallet-engine';
	import MenuMintDropdown from '$lib/elements/mint/mintDropdown/MenuMintDropdown.svelte';
	const sidebar = Sidebar.useSidebar();

	const { mint }: { mint: types.Mint } = $props();
</script>

<Sidebar.MenuItem>
	<Sidebar.MenuButton>
		{#snippet child({ props })}
			<a
				onclick={() => (sidebar.isMobile ? sidebar.toggle() : '')}
				href={'/#/wallet/mint/' + getHostFromUrl(mint.url)}
				{...props}
			>
				<span class="text-xs">{mint.url}</span>
			</a>
		{/snippet}
	</Sidebar.MenuButton>
	<MenuMintDropdown {mint}></MenuMintDropdown>
</Sidebar.MenuItem>
