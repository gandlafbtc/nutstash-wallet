<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';

	import * as Drawer from '$lib/components/ui/drawer/';
	import { approach_nfc_tag_to_write, t_close, write_token_to_nfc_tag } from '$lib/paraglide/messages';
	import NfcWriter from './NFCWriter.svelte';

	let { token, isOpen = $bindable() }: { token: string; isOpen: boolean } = $props();
</script>

<Drawer.Root bind:open={isOpen} nested={true}>
	<Drawer.Content>
		<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Title>{write_token_to_nfc_tag()}</Drawer.Title>
			<Drawer.Description>{approach_nfc_tag_to_write()}</Drawer.Description>
		</Drawer.Header>
		{#if isOpen}
			<!-- content here -->
			<NfcWriter {token} bind:isOpen></NfcWriter>
		{/if}
		<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Close class={buttonVariants({ variant: 'outline' }) + ' w-80 xl:w-[600px]'}
				>{t_close()}</Drawer.Close
			>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
