<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';

	import * as Drawer from '$lib/components/ui/drawer/';
	import Scanner from '$lib/elements/wallet/scanner/Scanner.svelte';
	import { scan_a_X_qr, t_cancel, t_close, you_can_scan_cashu_bla_bla } from '$lib/paraglide/messages';
	import { openScannerDrawer } from '$lib/stores/session/drawer';
</script>

<Drawer.Root open={$openScannerDrawer} onOpenChange={(state) => openScannerDrawer.set(state)}>	
	<Drawer.Content>
		<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Title>{scan_a_X_qr({ type: '' })}</Drawer.Title>
			<Drawer.Description>
				{you_can_scan_cashu_bla_bla()}
			</Drawer.Description>
		</Drawer.Header>
		<!-- {#if isTauriMobile}
    <MobileScanner></MobileScanner>
    {:else} -->
		<Scanner></Scanner>
		<!-- {/if} -->
		<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
			<Drawer.Close class={buttonVariants({ variant: 'outline' }) + ' w-80 xl:w-[600px]'}
				>{t_close()}</Drawer.Close
			>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
