<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import { Delete } from "lucide-svelte";

    const {isDecimal=false, onkeypressed}:{isDecimal: boolean, onkeypressed: (value: string | {delete: boolean})=> void} = $props() 




</script>

<div class="grid grid-cols-3 grid-rows-4 gap-2 w-full h-full">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as n}
         <Button class="w-full h-full" onclick={()=>onkeypressed(n.toString())} >{n}</Button>
    {/each}
    {#if isDecimal}
    <Button variant='secondary' class="w-full h-full" onclick={()=>onkeypressed(".")}>
        .
    </Button>
    {:else}
    <Button disabled class="w-full h-full">
        
    </Button>
    {/if}
    <Button class="w-full h-full" onclick={()=>onkeypressed('0')}>0</Button>
    <Button class="w-full h-full" onclick={()=>onkeypressed({delete:true})} variant="destructive">
        <Delete></Delete>
    </Button>
</div>