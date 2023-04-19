<script lang="ts">
	import { browser } from '$app/environment';
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import { onDestroy, onMount } from 'svelte';

	export let scannedNpub;

	let qrScanner: Html5QrcodeScanner;

	function onScanSuccess(decodedText: string, decodedResult:any) {
		// handle the scanned code as you like, for example:
		scannedNpub = decodedText;
		if (browser) {
			document.getElementById('html5-qrcode-button-camera-stop')?.click();

			let element = document.getElementById('npub-scan-modal');
			element?.click();
		}
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
		scannedNpub = '';
		qrScanner = new Html5QrcodeScanner(
			'npub-qr-reader',
			{ fps: 10, qrbox: { width: 250, height: 250 } },
			/* verbose= */ false
		);
		qrScanner.render(onScanSuccess, onScanFailure);
	});
</script>

<input type="checkbox" id="npub-scan-modal" class="modal-toggle" />

<div class="modal">
	<div class="modal-box">
		<div class="flex flex-col items-center h-full w-full gap-2">
			<div class="flex justify-between w-full items-center gap-1">
				<label for="npub-scan-modal" class="btn-square btn">
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
				</label>
				<h2 class="font-bold text-xl">Scan a Lightning Invoice</h2>
				<div class="btn-square invisible" />
			</div>
			<div class="w-full">
				<div id="npub-qr-reader" class="w-full h-full" style="/qr-styles.css" />
			</div>
		</div>
	</div>
</div>

<style>
</style>
