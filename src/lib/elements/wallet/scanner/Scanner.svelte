<script lang="ts">
    import Progress from "$lib/components/ui/progress/progress.svelte";
    import * as Select from "$lib/components/ui/select";
    import {
        scannedInvoiceStore,
        scannedTokenStore,
    } from "$lib/stores/session/transitionstores";
    import { Scan } from "lucide-svelte";
    import QrScanner from "qr-scanner";
    import { onDestroy, onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import { URDecoder } from "@gandlaf21/bc-ur";

    let videoElem: HTMLVideoElement | undefined = $state();
    let qrScanner: QrScanner | undefined = $state();
    let cams: QrScanner.Camera[] | undefined = $state();
    let selectedCamId: string | undefined = $state();

    let completion = $state(0);

    let scanProcess = "";

    let decoder: URDecoder;

    onMount(async () => {
        decoder = new URDecoder();

        if (await QrScanner.hasCamera()) {
            if (!videoElem) {
                console.error("video element not present");
                return;
            }
        qrScanner = new QrScanner(
            videoElem,
            (result) => {
                onScanSuccess(result);
            },
            {
                preferredCamera: selectedCamId,
                /* your options or returnDetailedScanResult: true if you're not specifying any other options */
            },
        );
        qrScanner.start();
        cams = await QrScanner.listCameras(true);
        selectedCamId = cams[0]?.id;
        } else {
            cams = [];
        }
    });

    $effect(()=> {
        if (qrScanner && selectedCamId) {
            qrScanner.setCamera(selectedCamId)
        }
    })

   
    
    onDestroy(() => {
        console.log("destroying scanner");
        if (qrScanner) {
            qrScanner.destroy();
        }
    });

    const onScanSuccess = (result: QrScanner.ScanResult) => {
        console.log("scanned", result.data);
        if (
            result.data.toLowerCase().startsWith("lightning:") ||
            result.data.toLowerCase().startsWith("lnbc")
        ) {
            if (result.data.toLowerCase().startsWith("lightning:")) {
                result.data = result.data.split(":")[1];
            }
            lnInvoiceScanned(result.data);
        } else if (result.data.startsWith("ur:")) {
            const chunkProcess = result.data.split("/")[1].split("-")[1];
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
        } else if (result.data.toLowerCase().startsWith("cashu")) {
            if (result.data.toLowerCase().startsWith("cashu:")) {
                result.data = result.data.split(":")[1];
            }
            if (result.data.startsWith("//")) {
                result.data = result.data.slice(2);
            }
            const scannedToken = result.data;
            cashuTokenScanned(scannedToken);
        } else if (
            result.data.includes("@") ||
            result.data.toLowerCase().startsWith("lnurl")
        ) {
            lnurlScanned();
        }
    };

    const lnurlScanned = () => {};

    const lnInvoiceScanned = (invoice: string) => {
        scannedInvoiceStore.set(invoice);
        push("/wallet/receive/ln");
    };

    const cashuTokenScanned = (token: string) => {
        scannedTokenStore.set(token);
        push("/wallet/receive/cashu");
    };
</script>

<div class="flex flex-col w-full items-center justify-center min-h-96">
    <div class="h-10 w-80">
        {#if cams?.length && completion}
            <Progress value={completion - 5} max={100} class="w-full" />
        {/if}
    </div>
    <div class="relative flex w-80 h-full items-center justify-center">
        <div class="video-wrapper border w-80 h-80 p-2 bg-black rounded-lg">
            {#if cams === undefined}
                loading camera ...
            {:else if cams?.length === 0}
                no camera found...
            {:else}
            {/if}
            <!-- svelte-ignore a11y_media_has_caption -->
                <video
                    bind:this={videoElem}
                    width="100%"
                    height="auto"
                    class="video-container"
                >
                </video>
        </div>
        {#if cams?.length}
            <div class="absolute z-10 top-3 right-3">
                <Select.Root
                    type="single"
                    name="favoriteFruit"
                    bind:value={selectedCamId}
                >
                    <Select.Trigger class="w-[180px]">
                        {cams?.find((cam) => cam.id === selectedCamId)?.label ??
                            ""}
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Group>
                            <Select.GroupHeading>Cams</Select.GroupHeading>
                            {#each cams ?? [] as cam}
                                <Select.Item value={cam.id} label={cam.label}
                                    >{cam.label}</Select.Item
                                >
                            {/each}
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </div>
        {/if}
        <div class="absolute z-10 w-56 h-56 opacity-30">
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
