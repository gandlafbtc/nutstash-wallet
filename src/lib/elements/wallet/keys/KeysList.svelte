<script>
    import Button from "$lib/components/ui/button/button.svelte";
import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
import { keysStore } from "$lib/stores/persistent/keys";
    import { Plus } from "lucide-svelte";
    import Keypair from "./Keypair.svelte";
    import AddKey from "./AddKey.svelte";

    let isLoading = $state(false);

    let inputKey= $state("");

    const createNew = async () => {
        try {
            isLoading = true;
            await keysStore.createNewKeypair()
        } catch (error) {
            console.error(error)
        }
        finally {
            isLoading = false;
        }
    }

   
</script>

<div class="h-full flex mt-32 gap-5 flex-col w-80">
    <div class="flex gap-2">

        <Button class='flex-grow' onclick={createNew}>
            <Plus></Plus>
            Create new Keys
        </Button>
        
        <AddKey></AddKey>
    </div>
    
    <div>

        <ScrollArea>
            {#each $keysStore as keypair}
            <Keypair {keypair}></Keypair>
            {/each}
        </ScrollArea>
    </div>
</div>