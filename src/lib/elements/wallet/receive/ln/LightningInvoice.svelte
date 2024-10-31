<script lang="ts">
    import { qrcanvas } from "qrcanvas";
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement | undefined = $state();
    let canvasWrapper: HTMLDivElement | undefined = $state();
    const { invoice }: { invoice: string } = $props();

    onMount(() => {
        canvas = qrcanvas({
            data: invoice,
            padding: 10,
            size: 250,
        });
        canvasWrapper?.appendChild(canvas);
    });
</script>

<div
    class="w-60 h-60 flex items-center justify-center"
    bind:this={canvasWrapper}
></div>
