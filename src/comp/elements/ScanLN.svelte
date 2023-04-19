<script lang="ts">
	import { browser } from '$app/environment';
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import { onDestroy, onMount } from 'svelte';

	export let active;
	export let scannedlnInvoice;

	let qrScanner: Html5QrcodeScanner;

	function onScanSuccess(decodedText:string, decodedResult: any) {
		// handle the scanned code as you like, for example:
		scannedlnInvoice = decodedText;
		if (browser) {
			document.getElementById('html5-qrcode-button-camera-stop')?.click();
		}
		active = 'melt';
	}

	function onScanFailure(error: any) {}
	onDestroy(() => {
		{
			if (browser) {
				document.getElementById('html5-qrcode-button-camera-stop')?.click();
			}
		}
	});

	onMount(() => {
		qrScanner = new Html5QrcodeScanner(
			'ln-qr-reader',
			{ fps: 10, qrbox: { width: 250, height: 250 } },
			/* verbose= */ false
		);
		qrScanner.render(onScanSuccess, onScanFailure);
	});
</script>

<div class="flex flex-col items-center h-full w-full gap-2">
	<div class="flex justify-between w-full items-center gap-1">
		<button class="btn-square btn" on:click={() => (active = 'base')}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
				/>
			</svg>
		</button>
		<h2 class="font-bold text-xl">Scan a Lightning Invoice</h2>
		<div class="btn-square invisible" />
	</div>
	<div class="w-full">
		<div id="ln-qr-reader" class="w-full h-full" style="/qr-styles.css" />
	</div>
</div>

<style>
</style>
