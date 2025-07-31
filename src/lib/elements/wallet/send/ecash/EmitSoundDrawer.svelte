<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';

	import * as Drawer from '$lib/components/ui/drawer/';
	import TransmitAudio from '$lib/elements/ui/TransmitAudio.svelte';
	import {
		approach_nfc_tag_to_write,
		t_close,
		write_token_to_nfc_tag
	} from '$lib/paraglide/messages';
	import { openEmitSoundDrawer, openWriteNFCDrawer } from '$lib/stores/session/drawer';
	import NfcWriter from './NFCWriter.svelte';

	let { token }: { token: string } = $props();
</script>

<Drawer.Root open={$openEmitSoundDrawer} onOpenChange={(open) => openEmitSoundDrawer.set(open)} >
	<Drawer.Content>
		<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Title>Transmit ultrasonic sound signal</Drawer.Title>
			<Drawer.Description>Make sure your volume is turned all the way up, and the receiving device is ready listening!</Drawer.Description>
		</Drawer.Header>
		{#if $openEmitSoundDrawer}
			<!-- content here -->
			 <div class="w-full xl:w=[600px">

				 <TransmitAudio data={token}></TransmitAudio>
			</div>
		{/if}
		<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
			<Button onclick={() => openEmitSoundDrawer.set(false)}  variant="outline" class="w-full"
				>{t_close()}</Button
			>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
