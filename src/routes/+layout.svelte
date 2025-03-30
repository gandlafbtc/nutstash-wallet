<script lang="ts">
	import StorageManager from '$lib/plugin/StorageManager.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '/node_modules/flag-icons/css/flag-icons.min.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import Loading from '$lib/elements/base/Loading.svelte';
	import { key } from '$lib/stores/session/key';
	import { Toaster } from '$lib/components/ui/sonner';
	import * as Drawer from '$lib/components/ui/drawer';
	import Receive from '$lib/elements/wallet/receive/Receive.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import Send from '$lib/elements/wallet/send/Send.svelte';
	import ScannerDrawer from '$lib/elements/wallet/scanner/ScannerDrawer.svelte';
	import { openReceiveDrawer, openSendDrawer } from '$lib/stores/session/drawer';

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
			bind:open={$openReceiveDrawer}
			controlledOpen={$openReceiveDrawer}
			handleOnly={true}
		>
			<Drawer.Content>
				<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
					<Drawer.Title>Receive via ecash or Lightning</Drawer.Title>
					<Drawer.Description
						>Enter an amount to receive via Lightning or paste a token to receive eCash.</Drawer.Description
					>
				</Drawer.Header>
				<Receive></Receive>
				<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
					<Drawer.Close
						class={buttonVariants({ variant: 'outline' }) + ' w-80 xl:w-[600px]'}
						onclick={() => openReceiveDrawer.set(false)}>Cancel</Drawer.Close
					>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>

		<Drawer.Root bind:open={$openSendDrawer} controlledOpen={$openSendDrawer} handleOnly={true}>
			<Drawer.Content>
				<Drawer.Header class="flex flex-col items-center justify-center gap-3 text-center">
					<Drawer.Title>Send via ecash or Lightning</Drawer.Title>
					<Drawer.Description
						>Enter an amount to send ecash or paste a Lightning invoice.</Drawer.Description
					>
				</Drawer.Header>
				<Send></Send>
				<Drawer.Footer class="flex flex-col items-center justify-center gap-3 text-center">
					<Drawer.Close
						class={buttonVariants({ variant: 'outline' }) + ' w-80 xl:w-[600px]'}
						onclick={() => openSendDrawer.set(false)}>Cancel</Drawer.Close
					>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
		<ScannerDrawer></ScannerDrawer>
	</StorageManager>
{:else}
	<Loading></Loading>
{/if}
