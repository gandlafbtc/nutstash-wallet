<script>
	import { buttonVariants } from "$lib/components/ui/button";
	import * as Drawer from "$lib/components/ui/drawer";
	import { t_close } from "$lib/paraglide/messages";
	import { openListenSoundDrawer} from "$lib/stores/session/drawer";
	import ListenSound from "./ListenSound.svelte";

</script>
<Drawer.Root open={$openListenSoundDrawer} onOpenChange={(open) => openListenSoundDrawer.set(open)}>
	<Drawer.Content>
		<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Title>Listening to Ultrasound</Drawer.Title>
			<Drawer.Description>Keep the sound emitting device close and make sure the volume is turned up</Drawer.Description>
		</Drawer.Header>
		{#if $openListenSoundDrawer}
			<!-- content here -->
             <div class="flex justify-center">

                 <ListenSound></ListenSound>
            </div>
		{/if}
		<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Close class={buttonVariants({ variant: 'outline' }) + ' w-80 xl:w-[600px]'}
				>{t_close()}</Drawer.Close
			>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>