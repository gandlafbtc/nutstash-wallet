<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
import Input from "$lib/components/ui/input/input.svelte";
import { mints } from "$lib/stores/persistent/mints";
    import { LoaderCircle, Plus } from "lucide-svelte";
    import { toast } from "svelte-sonner";

    let {mintUrlToAdd=$bindable(''), readOnly=false, showAddText=true}: {mintUrlToAdd?: string, readOnly?: boolean, showAddText?: boolean} = $props()

    
    let isAddingMint = $state(false);
        const addMint = async () => {
        try {
            if (!mintUrlToAdd) {
                toast.warning('No url entered');
                return
            }
            if ($mints.find((mint) => mint.url === mintUrlToAdd)) {
                toast.warning('Mint is already added');
                return;               
            }
          isAddingMint = true;
          await  mints.fetchMint(mintUrlToAdd);
          mintUrlToAdd = ''
          toast.success('Mint added');
        } catch (error) {
			console.error(error)
            toast.error(error.message);
        }
        finally {
            isAddingMint = false;
        }
    }

</script>

<div class="flex gap-2 w-80">
    <Input readonly={readOnly} bind:value={mintUrlToAdd} onkeypress={(e: KeyboardEvent)=> {
        if (e.key === 'Enter') {
            addMint() 
        }}}/>
    <Button disabled={isAddingMint} onclick={addMint}>
        {#if isAddingMint}
        <LoaderCircle class='animate-spin'></LoaderCircle>
        {:else}
        <Plus></Plus>
        {/if}
        {#if showAddText}
        Add mint
        {/if}
    </Button>
</div>