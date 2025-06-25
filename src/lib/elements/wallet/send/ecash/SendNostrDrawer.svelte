<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	import * as Drawer from '$lib/components/ui/drawer/';
	import {
		t_close,
	} from '$lib/paraglide/messages';
	import { openSendNostrDrawer } from '$lib/stores/session/drawer';
	import SendNostrDm from './SendNostrDM.svelte';

	let { data }: { data: string } = $props();
</script>

<Drawer.Root open={$openSendNostrDrawer} onOpenChange={(open) => openSendNostrDrawer.set(open)} >
	<Drawer.Content class='flex justify-center w-full'>
		<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Title>Send as a Nostr DM</Drawer.Title>
			<Drawer.Description></Drawer.Description>
		</Drawer.Header>
		{#if $openSendNostrDrawer}
			<!-- content here -->
			 <div class="w-full flex justify-center">
				 <SendNostrDm {data} />
			</div>
		{/if}
		<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center w-full">
			<Button onclick={() => openSendNostrDrawer.set(false)}  variant="outline" class="w-80 xl:w-[600px]"
				>{t_close()}</Button
			>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
