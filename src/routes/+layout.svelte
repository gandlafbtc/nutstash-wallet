<script lang="ts">
	import StorageManager from '$lib/plugin/StorageManager.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '/node_modules/flag-icons/css/flag-icons.min.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import Loading from '$lib/elements/base/Loading.svelte';
	import { key } from '@gandlaf21/cashu-wallet-engine/stores';
	import { Toaster } from '$lib/components/ui/sonner';
	import * as Drawer from '$lib/components/ui/drawer';
	import { buttonVariants } from '$lib/components/ui/button';
	import ScannerDrawer from '$lib/elements/wallet/scanner/ScannerDrawer.svelte';
	import { openReceiveDrawer, openScanNFCDrawer, openSendDrawer } from '$lib/stores/session/drawer';
	import ReceiveSelect from '$lib/elements/wallet/receive/ReceiveSelect.svelte';
	import SendSelect from '$lib/elements/wallet/send/SendSelect.svelte';
	import { t_close } from '$lib/paraglide/messages';
	import NfcListenDrawer from '$lib/elements/wallet/send/ecash/NFCListenDrawer.svelte';
	import { isNfcSupported } from '$lib/stores/session/isNfc';
	import ListenSoundDrawer from '$lib/elements/wallet/receive/ecash/ListenSoundDrawer.svelte';
	import NpubDrawer from '$lib/elements/wallet/receive/NpubDrawer.svelte';

	let isInit = $state(false);
	let { children } = $props();

	onMount(async () => {
		// navigator.storage.persist()
		isInit = true;
		await key.init();
	});
</script>

{#if isInit}
	<ModeWatcher defaultMode={'dark'}></ModeWatcher>
	<StorageManager>
		<div class="h-full w-full">
			{@render children?.()}
		</div>
		<div class="relative bottom-0 right-0 z-50">
			<Toaster position="top-right" richColors closeButton></Toaster>
		</div>
		<Drawer.Root
			open={$openReceiveDrawer}
			onOpenChange={(state)=> {openReceiveDrawer.set(state)}}
			>
			<Drawer.Content>
				<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
					<Drawer.Title>Receive via ecash or Lightning</Drawer.Title>

				</Drawer.Header>
				<ReceiveSelect></ReceiveSelect>
				<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
					<button
						class={buttonVariants({ variant: 'outline' }) + ' w-80 xl:w-[600px]'}
						onmouseup={() => openReceiveDrawer.set(false)}>{t_close()}</button
					>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>

		<Drawer.Root bind:open={$openSendDrawer} 
		onOpenChange={(state)=> {openSendDrawer.set(state)}}
		>
			<Drawer.Content>
				<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
					<Drawer.Title>Send via ecash or Lightning</Drawer.Title>
				</Drawer.Header>
				<!-- <Send></Send> -->
				 <SendSelect></SendSelect>
				<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
					<button
						class={buttonVariants({ variant: 'outline' }) + ' w-80 xl:w-[600px]'}
						onmouseup={() => openSendDrawer.set(false)}>{t_close()}</button>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
		<ScannerDrawer></ScannerDrawer>
		{#if $isNfcSupported && $openScanNFCDrawer}
			<NfcListenDrawer></NfcListenDrawer>
		{/if}
		<ListenSoundDrawer></ListenSoundDrawer>
		<NpubDrawer></NpubDrawer>
	</StorageManager>
{:else}
	<Loading></Loading>
{/if}
