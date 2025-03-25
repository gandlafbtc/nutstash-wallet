<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';

	import * as Drawer from '$lib/components/ui/drawer/';
	import NfcListener from './NFCListener.svelte';
	import NfcWriter from './NFCWriter.svelte';

	let { isOpen = $bindable() }: { isOpen: boolean } = $props();
</script>

<Drawer.Root bind:open={isOpen} nested={true}>
	<Drawer.Content>
		<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Title>Reading nfc</Drawer.Title>
			<Drawer.Description>Approach NFC tag to read it</Drawer.Description>
		</Drawer.Header>
		{#if isOpen}
			<!-- content here -->
			<NfcListener></NfcListener>
		{/if}
		<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Close class={buttonVariants({ variant: 'outline' }) + ' w-80 xl:w-[600px]'}>Close</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
