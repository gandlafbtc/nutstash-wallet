<script lang="ts">
    import { qrcanvas } from "qrcanvas";
    import { onMount } from "svelte";

    let canvasWrapper: HTMLDivElement | undefined = $state();
    let {
        data,
        QRsize = "medium",
    }: { data: string; QRsize?: "large" | "medium" | "small" } = $props();
    
    const getSize = (size: "large" | "medium" | "small") => {
        switch (size) {
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
                    
                    const paintCanvas = (data:string, s: 'large' |'medium' |'small')=> {
                        const {padding, size} = getSize(s)
                        const canvas = qrcanvas({
                            data,
                            padding,
                            size
                        })
                        for (const child of canvasWrapper?.children??[]) {
                            canvasWrapper?.removeChild(child)
                        }
                        canvasWrapper?.appendChild(canvas)
                    }
                    
    $effect(()=>paintCanvas(data, QRsize));
    onMount(() => {
        paintCanvas(data, QRsize)
    });
</script>

<div class="flex items-center justify-center bg-white p-1 rounded-sm" bind:this={canvasWrapper}>
    <canvas>

    </canvas>
</div>
