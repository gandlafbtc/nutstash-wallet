<script lang="ts">
    import Toggle from "$lib/components/ui/toggle/toggle.svelte";
    import { SmartphoneNfc } from "lucide-svelte";
    import { onDestroy, onMount } from "svelte";
    import { toast } from "svelte-sonner";

    let pressed = $state(false)
    let nfcReady = $state(false)

    $effect(()=> {
        if (pressed) {
            toast.info("NFC activated")
        }
    })

    onDestroy(()=> {
        pressed = false
    })

    onMount(()=> {
        try {
            const ndef = new NDEFReader();
            nfcReady = true
        } catch (error) {
            console.log(error)
            nfcReady = false
        }
    })

</script>

{#if nfcReady}
<Toggle bind:pressed >
    <div class="flex gap-2 items-center">
        {#if pressed}
        <div class="rounded-full w-1 h-1">
            
        </div>
        {/if}
        <SmartphoneNfc></SmartphoneNfc>
        {#if pressed}
        <div class="flex items-center justify-center">
            <div class="relative bg-green-500 rounded-full w-1 h-1">
            </div>
            <div class="absolute bg-green-500 rounded-full w-2 h-2 animate-ping">
            </div>
        </div>
        {/if}
    </div>
</Toggle>
{/if}