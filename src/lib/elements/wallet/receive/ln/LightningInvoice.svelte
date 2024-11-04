<script lang="ts">
    import { qrcanvas } from "qrcanvas";
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement | undefined = $state();
    let canvasWrapper: HTMLDivElement | undefined = $state();
    const {
        invoice,
        QRsize = "medium",
    }: { invoice: string; QRsize?: "large" | "medium" | "small" } = $props();

    const getSize = () => {
        switch (QRsize) {
            case "large":
                return { padding: 15, size: 300 };
            case "medium":
                return { padding: 10, size: 250 };
            case "small":
                return { padding: 3, size: 75 };
            default:
            return { padding: 10, size: 250 };

        }
    };

    let { padding, size } = $derived(getSize());

    $effect(() => {
    //    paintCanvas();
    });
    
    const paintCanvas = ()=> {
        canvas = qrcanvas({
            data: invoice,
            padding,
            size
        });
        if (!canvas) {
            return;
        }
        for (const child of canvasWrapper?.children??[]) {
            canvasWrapper?.removeChild(child);
        }
        canvasWrapper?.appendChild(canvas);
    }

    onMount(() => {
        paintCanvas()
    });
</script>

<div class="flex items-center justify-center bg-white p-1 rounded-sm" bind:this={canvasWrapper}></div>
