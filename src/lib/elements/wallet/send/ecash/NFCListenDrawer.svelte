<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';

	import * as Drawer from '$lib/components/ui/drawer/';
	import { approach_nfc_tag_to_read_it, reading_nfc_tag, t_close } from '$lib/paraglide/messages';
	import { openScanNFCDrawer } from '$lib/stores/session/drawer';
	import NfcListener from './NFCListener.svelte';

</script>

<Drawer.Root open={$openScanNFCDrawer}>
	<Drawer.Content>
		<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Title>{reading_nfc_tag()}</Drawer.Title>
			<Drawer.Description>{approach_nfc_tag_to_read_it()}</Drawer.Description>
		</Drawer.Header>
		{#if $openScanNFCDrawer}
			<!-- content here -->
			<NfcListener></NfcListener>
		{/if}
		<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Close class={buttonVariants({ variant: 'outline' }) + ' w-80 xl:w-[600px]'}
				>{t_close()}</Drawer.Close
			>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
