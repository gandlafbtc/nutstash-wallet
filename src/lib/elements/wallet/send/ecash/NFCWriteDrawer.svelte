<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import Button from '$lib/components/ui/button/button.svelte';

	import * as Drawer from '$lib/components/ui/drawer/';
	import {
		approach_nfc_tag_to_write,
		t_close,
		write_token_to_nfc_tag
	} from '$lib/paraglide/messages';
	import { openWriteNFCDrawer } from '$lib/stores/session/drawer';
	import NfcWriter from './NFCWriter.svelte';

	let { token }: { token: string } = $props();
</script>

<Drawer.Root open={$openWriteNFCDrawer} onOpenChange={(open) => openWriteNFCDrawer.set(open)}>
	<Drawer.Content>
		<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Title>{write_token_to_nfc_tag()}</Drawer.Title>
			<Drawer.Description>{approach_nfc_tag_to_write()}</Drawer.Description>
		</Drawer.Header>
		{#if $openWriteNFCDrawer}
			<!-- content here -->
			<NfcWriter {token}></NfcWriter>
		{/if}
		<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
			<Button onclick={() => openWriteNFCDrawer.set(false)} class={buttonVariants({ variant: 'outline' }) + ' w-80 xl:w-[600px]'}
				>{t_close()}</Button
			>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
