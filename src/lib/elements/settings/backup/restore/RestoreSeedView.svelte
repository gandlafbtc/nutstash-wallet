<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import { mints } from "$lib/stores/persistent/mints";


    import { mnemonic } from "$lib/stores/persistent/mnemonic";
    import { LoaderCircle, Plus } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import RestoreInProgress from "./RestoreInProgress.svelte";
    import AddMint from "$lib/elements/mint/AddMint.svelte";
    import DiscoverMints from "$lib/elements/mint/DiscoverMints.svelte";
    import Divider from "$lib/elements/ui/Divider.svelte";

    let isInProgress = $state(false);

    let isHide = $state(true)
</script>
{#if isInProgress}
    <RestoreInProgress></RestoreInProgress>
{:else}
<div class="h-full  flex flex-col gap-3">
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
        <Button class='mt-3' disabled={!$mints.length} onclick={()=>isInProgress=true}>Restore</Button>
        <Divider text='or'></Divider>
        <span>
            Add more mints
        </span>
            <AddMint></AddMint>
            <DiscoverMints></DiscoverMints>
    </div>
</div>
{/if}
