<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';

	import * as Drawer from '$lib/components/ui/drawer/';
	import Address from '$lib/elements/addresses/Address.svelte';
	import { t_close } from '$lib/paraglide/messages';
	import { openNpubDrawer } from '$lib/stores/session/drawer';
	import { keysStore } from '@gandlaf21/cashu-wallet-engine/stores';
	const pub = $derived($keysStore[$keysStore.length - 1]?.publicKey);
</script>

<Drawer.Root open={$openNpubDrawer} onOpenChange={(open) => openNpubDrawer.set(open)} >
	<Drawer.Content>
		<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Title>Nostr - NPUB</Drawer.Title>
			<Drawer.Description>Use your npub to receive ecash or messages via nostr.</Drawer.Description>
		</Drawer.Header>
		{#if $openNpubDrawer}
        <div class="flex w-full items-center justify-center">

            <div class="w-80 xl:w-[600px]">
                <!-- content here -->
                <Address {pub}></Address>
            </div>
        </div>
            {/if}
		<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Close class={buttonVariants({ variant: 'outline' }) + ' w-80 xl:w-[600px]'}
				>{t_close()}</Drawer.Close
			>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
