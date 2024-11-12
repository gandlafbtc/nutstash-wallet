<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import MintSelectorMulti from "$lib/elements/ui/MintSelectorMulti.svelte";
    import { selectedMints } from "$lib/stores/local/selectedMints";
    import { mints } from "$lib/stores/persistent/mints";


    import { mnemonic } from "$lib/stores/persistent/mnemonic";
    import { LoaderCircle, Plus } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import RestoreInProgress from "./RestoreInProgress.svelte";

    let isInProgress = $state(false);
    let isAddingMint = $state(false);
    let mintUrlToAdd = $state('')

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

    let isHide = $state(true)
</script>
{#if isInProgress}
    <RestoreInProgress></RestoreInProgress>
{:else}
<div class="h-full mt-32 flex flex-col gap-3">
    <span class="font-bold text-lg">
        Restore from seed phrase
    </span>
    <button class=" border border-dashed rounded-lg w-80 p-2 grid grid-cols-3 text-start hover:bg-secondary transition-colors duration-200" onclick={() => isHide =!isHide}>
        {#each $mnemonic[0]?.mnemonic.split(' ') as word, i}
        <span class="text-xs">
            {i+1}. {isHide?'******':word}
        </span>
        {/each}
    </button>
    <div class="mt-5 flex flex-col gap-2">
        <span>
            1. Add mints
        </span>
        <div class="flex gap-2">
            <Input bind:value={mintUrlToAdd} class='flex-grow' onkeypress={(e: KeyboardEvent)=> {
                if (e.key === 'Enter') {
                    addMint() 
                }
            }} />
                <Button onclick={addMint} class="flex-shrink max-w-min" disabled={isAddingMint}>
                    {#if isAddingMint}
                    <LoaderCircle class="animate-spin">
                        
                    </LoaderCircle>
                    {:else}
                    <Plus></Plus>
                    {/if}
                    Add
                </Button>
            </div>
            <span class="mt-3">
                2. Select mints to restore
            </span>
            <MintSelectorMulti></MintSelectorMulti>
            <Button class='mt-3' disabled={!$selectedMints.length} onclick={()=>isInProgress=true}>Restore</Button>
    </div>
</div>
{/if}
