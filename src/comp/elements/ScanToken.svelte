<script lang="ts">
	import { browser } from '$app/environment';
	import type { URDecoder } from '@gandlaf21/bc-ur';
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import { onDestroy, onMount } from 'svelte';

	export let activeR;
	export let scannedToken;
	let scanning = false;

	let received = 0;

	let decoder: URDecoder;

	onMount(async () => {
		const { URDecoder } = await import('@gandlaf21/bc-ur');
		decoder = new URDecoder();
	});

	let qrScanner: Html5QrcodeScanner;

	function onScanSuccess(decodedText: string, decodedResult: any) {
		if (decodedText.startsWith('ur:')) {
			decoder.receivePart(decodedText);
			received++;
			if (!decoder.isComplete()) {
				return;
			}
			if (!decoder.isSuccess()) {
				throw new Error(`${decoder.resultError()}`);
			}
			const ur = decoder.resultUR();
			const decoded = ur.decodeCBOR();
			scannedToken = decoded.toString();
		} else {
			scannedToken = decodedText;
		}
		if (browser) {
			document.getElementById('html5-qrcode-button-camera-stop')?.click();
		}
		activeR = 'receive';
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
		scanning = true;
		qrScanner = new Html5QrcodeScanner(
			'token-qr-reader',
			{ fps: 24, qrbox: { width: 250, height: 250 } },
			/* verbose= */ false
		);
		qrScanner.render(onScanSuccess, onScanFailure);
	});
</script>

<div class="flex flex-col items-center w-full gap-2">
	<div class="flex justify-between w-full items-center gap-1">
		<h2 class="font-bold text-xl">Scan a cashu Token</h2>
		<div class="btn-square invisible" />
	</div>
	<div class="w-full">
		<div id="token-qr-reader" class="w-full h-full qr-reader-box" style="/qr-styles.css" />
	</div>
	<p>scanning..</p>
	<div
		class="radial-progress text-secondary"
		style="--value:{received}; --size:5rem; --thickness: 0.5rem;"
	>
		{received}
	</div>
</div>

<style>
</style>
