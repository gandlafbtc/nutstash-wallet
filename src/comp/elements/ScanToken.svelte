<script lang="ts">
	import { browser } from '$app/environment';
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import { onDestroy, onMount } from 'svelte';

	export let activeR;
	export let scannedToken;
	let scanning = false

	let isChunk = false
	$: chunkTotalLen = 0
	let chunks : string[] = []
	$: chunkPerc = Math.ceil((chunks.filter(c=>c).length/chunkTotalLen)*100)

	let qrScanner: Html5QrcodeScanner;

	function onScanSuccess(decodedText: string, decodedResult: any) {
		console.log(decodedText)
		if (decodedText.startsWith('chunk')) {
			isChunk = true
			const [x, chunkI, len, chunk] = decodedText.split(':')
			chunkTotalLen = parseInt(len)??0
			chunks[parseInt(chunkI)??0] = chunk
			chunks = [...chunks]
		}

		else {
			scannedToken = decodedText
		}

		if (isChunk) {
			if ( chunks.filter(c=> c).length<chunkTotalLen) {
				return
			}
			else {
				scannedToken = chunks.join('').split('=')[0]
				console.log(scannedToken)
			}
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
		scanning = true
		qrScanner = new Html5QrcodeScanner(
			'token-qr-reader',
			{ fps: 24, qrbox: { width: 250, height: 250 } },
			/* verbose= */ false
		);
		qrScanner.render(onScanSuccess, onScanFailure);
	});
</script>

<div class="flex flex-col items-center h-full w-full gap-2">
	<div class="flex justify-between w-full items-center gap-1">
		<button class="btn-square btn" on:click={() => (activeR = 'receive')}>
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
		<h2 class="font-bold text-xl">Scan a cashu Token</h2>
		<div class="btn-square invisible" />
	</div>
	<div class="w-full">
		<div id="token-qr-reader" class="w-full h-full qr-reader-box" style="/qr-styles.css" />
	</div>
	<p>
		scanning..
	</p>
	<div class="radial-progress text-primary" style="--value:{isNaN(chunkPerc)?0:chunkPerc}; --size:5rem; --thickness: 0.5rem;">{isNaN(chunkPerc)?0:chunkPerc}%</div>
</div>


<style>
</style>
