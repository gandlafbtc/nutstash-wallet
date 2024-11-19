<script lang="ts">
    import { mints } from "$lib/stores/persistent/mints";
    import { untrack } from "svelte";
    import MintSelector from "../ui/MintSelector.svelte";
    import AddMint from "../mint/AddMint.svelte";
    import type { Mint } from "$lib/db/models/types";
    import { getBy } from "$lib/stores/persistent/helper/storeHelper";
    import { toast } from "svelte-sonner";
    import DiscoverMints from "../mint/DiscoverMints.svelte";

    let defaultMint: Mint | undefined = $derived($mints[0])

    const onMintChange = (minturl: string) => {
        const mint = getBy($mints, minturl, 'url')
        if (!mint) {
            toast.warning('Mint not found')
            return
        }
        mints.makeDefaultMint(mint)
    }

</script>
<div class="flex flex-col gap-4 h-full w-80 mt-32">
    
    
    <div>
        <span class="font-bold text-lg">
            Mint Settings
        </span>
    </div>
    <div class="flex flex-col gap-1">
        <span class="text-sm">Add mint</span>
        <AddMint></AddMint>
    </div>
    {#if defaultMint}
         <!-- content here -->
         <div class="flex flex-col gap-1">
             <span class="text-sm">Default mint</span>
             <MintSelector  mint={defaultMint} onchange={onMintChange}></MintSelector>
            </div>
    {/if}
    <div class="flex flex-col gap-1 w-full">
        <span class="text-sm">Discover Mints</span>
        <DiscoverMints>
            
        </DiscoverMints>
    </div>
</div>

