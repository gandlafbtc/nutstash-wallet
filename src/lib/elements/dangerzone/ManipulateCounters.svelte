<script lang="ts">

    import Button from "$lib/components/ui/button/button.svelte";
import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import type { KeysetCount } from "$lib/db/models/types";
import { countsStore } from "$lib/stores/persistent/counts";
    import NumberFlow from "@number-flow/svelte";


const updateCount = async (count: KeysetCount, incr: number) => {
    await countsStore.addOrUpdate(count.keysetId, {keysetId: count.keysetId, count: count.count+incr}, 'keysetId')
}
</script>


<div class="w-80 h-full  flex flex-col  gap-5">

    <p class="text-destructive">
        <span class="font-bold">
            Warning!
        </span>
        Manipulating counters can mess up the restore process. Only proceed if you know what you are doing.
    </p>
    
    <ScrollArea class='h-96'>
        {#each $countsStore as count}
        <div class="my-2 p-4 flex gap-2 justify-between items-center w-full">
            <p class="w-32 text-sm overflow-clip text-ellipsis">
                {count.keysetId}
            </p>
            <p>
                <NumberFlow value='{count.count}'></NumberFlow> 
            </p>
            <Button onclick={()=> {updateCount(count,5)}}>
                +5
            </Button>
            <Button variant='destructive' onclick={async ()=> {await updateCount(count,20)}}>
                +20
            </Button>
            
        </div>
        {/each}
    </ScrollArea>
</div>