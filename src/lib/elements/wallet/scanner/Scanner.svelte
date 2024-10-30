<script lang="ts">
import QrScanner from 'qr-scanner'; 
    import { onDestroy, onMount } from 'svelte';

let videoElem: HTMLVideoElement 
let qrScanner: QrScanner
let hasCam: boolean | undefined = $state(undefined)
onMount(async ()=>{
    if (await QrScanner.hasCamera()){
        hasCam = true
        qrScanner = new QrScanner(
            videoElem,
            result => console.log('decoded qr code:', result),
            { /* your options or returnDetailedScanResult: true if you're not specifying any other options */ },
        );
        qrScanner.start()
    }
    else {
        hasCam = false
    }
})
onDestroy(()=>{
    console.log('destroying scanner')
    qrScanner.destroy();
})
</script>
<div class="flex w-full items-center justify-center">

    <div class="max-w-4xl h-96">
        {#if hasCam === undefined}
        loading camera ...
        {:else if hasCam === false}
        no camera found...
        {:else}
        <video bind:this={videoElem} class="w-full h-full" >
            
        </video>
        {/if}
    </div>
</div>