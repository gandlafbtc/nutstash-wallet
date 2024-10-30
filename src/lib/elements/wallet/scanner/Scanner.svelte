<script lang="ts">
    import Progress from "$lib/components/ui/progress/progress.svelte";
    import { toast } from "$lib/stores/toasts";
    import { scannedInvoiceStore, scannedTokenStore } from "$lib/stores/transitionstores";
    import type { URDecoder } from "@gandlaf21/bc-ur";
    import { Scan } from "lucide-svelte";
import QrScanner from "qr-scanner";
    import { onDestroy, onMount } from "svelte";
    import { push } from "svelte-spa-router";
    

    let videoElem: HTMLVideoElement | undefined = $state();
    let overlay: HTMLDivElement;
    let qrScanner: QrScanner;
    let hasCam: boolean | undefined = $state(undefined);
    let cams: QrScanner.Camera[] = $state([]);

    let completion = $state(0);

	let scanProcess = '';

	let decoder: URDecoder;

    let urDecoder: typeof URDecoder 

    onMount(async () => {
        const { URDecoder } = await import('@gandlaf21/bc-ur');
        urDecoder = URDecoder
		decoder = new URDecoder();

        if (await QrScanner.hasCamera()) {
            cams = await QrScanner.listCameras(true);
            hasCam = true;
            cams = await QrScanner.listCameras(true);
            if (!videoElem) {
                console.error('failed to load camera')
                return
            }
            qrScanner = new QrScanner(
                videoElem,
                (result) => {onScanSuccess(result)},
                {
                    /* your options or returnDetailedScanResult: true if you're not specifying any other options */
                },
            );
            qrScanner.start();
        } else {
            hasCam = false;
        }
    });
    onDestroy(() => {
        console.log("destroying scanner");
        if (qrScanner) {
            qrScanner.destroy();
        }
    });

    const onScanSuccess = (result: QrScanner.ScanResult) => {
        console.log('scanned', result.data)
        if (result.data.startsWith('lightning:' || result.data.toLowerCase().startsWith('lnbc'))) {
            if (result.data.startsWith('lightning:')) {
                result.data = result.data.split(':')[1]
            }
            lnInvoiceScanned(result.data)
        }
        else if (result.data.startsWith('ur:')) {
			const chunkProcess = result.data.split('/')[1].split('-')[1];
			if (scanProcess && scanProcess !== chunkProcess) {
				decoder = new urDecoder();
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
            cashuTokenScanned(scannedToken)
		} else if (result.data.toLowerCase().startsWith('cashu')) {
			if (result.data.toLowerCase().startsWith('cashu:')) {
				result.data = result.data.split(':')[1];
			}
			if (result.data.startsWith('//')) {
				result.data = result.data.slice(2);
			}
			const scannedToken = result.data;
            cashuTokenScanned(scannedToken)
		}
        else if (result.data.includes('@') || result.data.toLowerCase().startsWith('lnurl')) {
            lnurlScanned()
        }
    }

    const lnurlScanned = () => {

    }

    const lnInvoiceScanned = (invoice: string) => {
        scannedInvoiceStore.set(invoice)
        push("/wallet/receive/ln")
    }

    const cashuTokenScanned = (token: string) => {
        scannedTokenStore.set(token)
        push("/wallet/receive/cashu")
    }

</script>

<div class="flex flex-col w-full items-center justify-center min-h-96">
    <div class="h-10 w-80">
    {#if hasCam && completion}
        <Progress value={completion-5} max={100} class="w-full" />
    {/if}
    </div>
    <div class="relative flex w-full h-full items-center justify-center">
        <div class="video-wrapper border w-80 h-80 p-2 bg-black rounded-lg">
            {#if hasCam === undefined}
            loading camera ...
    {:else if hasCam === false}
    no camera found...
    {:else}
            
            <!-- svelte-ignore a11y_media_has_caption -->
            <video  bind:this={videoElem}  width="100%" height="auto" class="video-container">

            </video>
            
            {/if}
        </div>

        <div class="absolute z-10 w-56 h-56 opacity-30">
            <Scan color='rgb(219 39 119)' size={220} strokeWidth={1}></Scan>
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
