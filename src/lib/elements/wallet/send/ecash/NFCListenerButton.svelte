<script lang="ts">
	import Toggle from '$lib/components/ui/toggle/toggle.svelte';
	import { onDestroy, onMount } from 'svelte';
	import NfcListener from './NFCListener.svelte';
	import NfcListenDrawer from './NFCListenDrawer.svelte';
	import { isTauriMobile } from '$lib/tauri/deviceHelper';
	import { isAvailable } from '@tauri-apps/plugin-nfc';
	import { toast } from 'svelte-sonner';

	let pressed = $state(false);
	let nfcReady = $state(false);

	$effect(() => {
		if (pressed) {
		}
	});

	onDestroy(() => {
		pressed = false;
	});

	onMount(async() => {
		try {
			if (isTauriMobile) {

				const canScanNfc = await isAvailable();
				if (canScanNfc) {
					nfcReady = true
				}
				else {
					nfcReady = false
					toast('no-nfc??')
				}
				return
			}
			if (!('NDEFReader' in window)) {
				return;
			}
			nfcReady = true;
		} catch (error) {
			console.log(error);
			nfcReady = false;
		}
	});
</script>

{#if nfcReady}
	<Toggle bind:pressed>
		<div class="relative flex items-center gap-2">
			<svg
				class="h-5 w-5"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				><path d="M0 0h24v24H0z" fill="none" /><path d="M4 20h16V4H4v16z" fill="none" /><path
					d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM18 6h-5c-1.1 0-2 .9-2 2v2.28c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V8h3v8H8V8h2V6H6v12h12V6z"
				/></svg
			>
			{#if pressed}
				<div class="absolute right-0 top-0">
					<NfcListenDrawer bind:isOpen={pressed}></NfcListenDrawer>
				</div>
			{/if}
		</div>
	</Toggle>
{/if}
