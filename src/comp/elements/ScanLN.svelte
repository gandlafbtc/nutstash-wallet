<script lang="ts">
	import { browser } from '$app/environment';
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import { onDestroy, onMount } from 'svelte';

	export let activeS;
	export let invoice;

	let qrScanner: Html5QrcodeScanner;

	function onScanSuccess(decodedText: string, decodedResult: any) {
		// handle the scanned code as you like, for example:
		invoice = decodedText;
		if (browser) {
			document.getElementById('html5-qrcode-button-camera-stop')?.click();
		}
		activeS = 'send';
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
		<h2 class="font-bold text-xl">Scan a Lightning Invoice</h2>
		<div class="btn-square invisible" />
	</div>
	<div class="w-full">
		<div id="ln-qr-reader" class="w-full h-full qr-reader-box" style="/qr-styles.css" />
	</div>
</div>

<style>
</style>
