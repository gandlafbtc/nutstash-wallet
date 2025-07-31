<script lang="ts">
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import { scanresultStore } from '$lib/stores/session/transitionstores';
	import { Scan, SwitchCamera } from 'lucide-svelte';
	import QrScanner from 'qr-scanner';
	import { onDestroy, onMount } from 'svelte';
	import { push } from 'svelte-spa-router';
	import { URDecoder } from '@gandlaf21/bc-ur';
	import { openReceiveDrawer, openScannerDrawer, openSendDrawer } from '$lib/stores/session/drawer';
	import { checkValidPubkey } from '@gandlaf21/cashu-wallet-engine/util';
	import { sendInput } from '$lib/stores/session/sendInput';
	import { camera_not_found, loading_camera } from '$lib/paraglide/messages';
	import { hasNativeQRScanner } from '$lib/stores/session/hasNativeQRScanner';

	let videoElem: HTMLVideoElement | undefined = $state();
	let qrScanner: QrScanner | undefined = $state();
	let cams: QrScanner.Camera[] | undefined = $state();

	let facingMode: QrScanner.FacingMode = 'environment';

	let completion = $state(0);

	let scanProcess = '';

	let decoder: URDecoder;

	let nativeInterval: number | undefined;

	onMount(async () => {
		decoder = new URDecoder();
		if (!videoElem) {
			console.error('video element not present');
			return;
		}
		// TODO: this could potentially improve QR code scanner performance on supported devices, using native barcode reader
		// if ($hasNativeQRScanner && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		// 	// Get the video element
		// 	// Check if device has camera
		// 		// Use video without audio
		// 		const constraints = {
		// 			video: {
		// 				facingMode: { ideal: 'environment' }
		// 			},
		// 			audio: false
		// 		};

		// 		// Start video stream
		// 	const stream = await navigator.mediaDevices.getUserMedia(constraints)
		// 	videoElem!.srcObject = stream
		// 	await videoElem!.play();
		// 	const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
		// 	const detectCode = () => {
		// 		// Start detecting codes on to the video element
		// 		barcodeDetector
		// 			.detect(videoElem)
		// 			.then((codes) => {
		// 				// If no codes exit function
		// 				if (codes.length === 0) return;

		// 				for (const barcode of codes) {
		// 					// Log the barcode to the console
		// 					const { rawValue } = barcode as { rawValue: string  };
		// 					onScanSuccess({ data:  rawValue , cornerPoints: barcode.cornerPoints });
		// 				}
		// 			})
		// 			.catch((err) => {
		// 				// Log an error if one happens
		// 				console.error(err);
		// 				alert(err)
		// 			});
		// 		};
		// 	nativeInterval = setInterval(detectCode, 50);
		// 	return
		// }
		if (await QrScanner.hasCamera()) {
			qrScanner = new QrScanner(
				videoElem,
				(result) => {
					onScanSuccess(result);
				},
				{
					/* your options or returnDetailedScanResult: true if you're not specifying any other options */
				}
			);
			qrScanner.start();
			cams = await QrScanner.listCameras(true);
			if (cams.length > 1) {
				qrScanner.setCamera(facingMode);
			}
		} else {
			cams = [];
		}
	});

	onDestroy(() => {
		if (qrScanner) {
			qrScanner.destroy();
		}
		if (nativeInterval) {
			clearInterval(nativeInterval);
		}
	});

	const onScanSuccess = (result: QrScanner.ScanResult) => {
		if (
			result.data.toLowerCase().startsWith('lightning:') ||
			result.data.toLowerCase().startsWith('lnbc')
		) {
			if (result.data.toLowerCase().startsWith('lightning:')) {
				result.data = result.data.split(':')[1];
			}
			lnInvoiceScanned(result.data);
		} else if (result.data.startsWith('ur:')) {
			const chunkProcess = result.data.split('/')[1].split('-')[1];
			if (scanProcess && scanProcess !== chunkProcess) {
				decoder = new URDecoder();
			}
			scanProcess = chunkProcess;
			decoder.receivePart(result.data);
			completion = Math.floor(decoder.estimatedPercentComplete() * 100);
			if (!decoder.isComplete()) {
				return;
			}
			if (!decoder.isSuccess()) {
				throw new Error(`${decoder.resultError()}`);
			}
			const ur = decoder.resultUR();
			const decoded = ur.decodeCBOR();
			const scannedToken = decoded.toString();
			cashuTokenScanned(scannedToken);
		} else if (result.data.toLowerCase().startsWith('cashu')) {
			if (result.data.toLowerCase().startsWith('cashu:')) {
				result.data = result.data.split(':')[1];
			}
			if (result.data.startsWith('//')) {
				result.data = result.data.slice(2);
			}
			if (result.data.toLowerCase().startsWith('creq')) {
				cashuRequestScanned(result.data);
				return;
			}
			const scannedToken = result.data;
			cashuTokenScanned(scannedToken);
			return;
		} else if (result.data.toLowerCase().startsWith('creq')) {
			cashuRequestScanned(result.data);
			return;
		} else if (result.data.toLowerCase().startsWith('npub')) {
			npubScanned(result.data);
			return;
		} else if (result.data.includes('@') && result.data.includes('.')) {
			lnAddressScanned(result.data);
			return;
		} else if (checkValidPubkey(result.data)) {
			pubkeyScanned(result.data);
		}
	};

	const npubScanned = (npub: string) => {
		closeDrawers();
		$openSendDrawer = true;
		sendInput.set(npub);
	};

	const pubkeyScanned = (pubkey: string) => {
		closeDrawers();
		openSendDrawer.set(true);
		sendInput.set(pubkey);
	};
	const lnAddressScanned = (lnAddress: string) => {
		closeDrawers();
		scanresultStore.set(lnAddress);
		push('/wallet/sendln');
	};

	const lnInvoiceScanned = (invoice: string) => {
		closeDrawers();
		scanresultStore.set(invoice);
		push('/wallet/send/');
	};

	const cashuTokenScanned = (token: string) => {
		closeDrawers();
		scanresultStore.set(token);
		push('/wallet/receive/cashu');
	};

	const cashuRequestScanned = (request: string) => {
		closeDrawers();
		scanresultStore.set(request);
		push('/wallet/send/cashureq/' + request);
	};

	const closeDrawers = () => {
		openScannerDrawer.set(false);
		openReceiveDrawer.set(false);
		openSendDrawer.set(false);
	};
</script>

<div class="flex min-h-96 w-full flex-col items-center justify-center">
	<div class="h-10 w-80 xl:w-[600px]">
		{#if cams?.length && completion}
			<Progress value={completion - 5} max={100} class="w-full" />
		{/if}
	</div>
	<div class="relative flex h-full w-80 items-center justify-center xl:w-[600px]">
		<div class="video-wrapper h-80 w-80 rounded-lg border bg-black p-2 xl:w-[600px]">
			{#if cams === undefined}
				{loading_camera()}
			{:else if cams?.length === 0}
				{camera_not_found()}
			{/if}
			<!-- svelte-ignore a11y_media_has_caption -->
			<video bind:this={videoElem} width="100%" height="auto" class="video-container"> </video>
		</div>

		<div class="absolute right-5 top-5 z-10 h-10 w-10">
			{#if (cams?.length ?? 0) > 1}
				<button
					class=""
					onclick={async () => {
						await qrScanner?.setCamera(facingMode);
						qrScanner?.stop();
						qrScanner?.start();
					}}
				>
					<SwitchCamera></SwitchCamera>
				</button>
			{/if}
		</div>

		<div class="absolute z-10 h-56 w-56 opacity-30">
			<Scan color="rgb(219 39 119)" size={220} strokeWidth={1}></Scan>
		</div>
	</div>
</div>

<style>
	.video-container {
		object-fit: cover;
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.video-wrapper {
		/* Telling our absolute positioned video to 
  be relative to this element */
		position: relative;

		/* Will not allow the video to overflow the 
  container */
		overflow: hidden;

		/* Centering the container's content vertically 
  and horizontally */
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
