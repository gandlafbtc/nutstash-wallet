<script>
    import { discoverMints } from "$lib/actions/nostr";
    import Button from "$lib/components/ui/button/button.svelte";
    import { discoveredMints } from "$lib/stores/session/mintdiscover";
    import {  Search } from "lucide-svelte";
    import AddMint from "./AddMint.svelte";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";

</script>
<div class="flex flex-col gap-2 w-80">
    <Button class='w-full' onclick={discoverMints}>
        <Search></Search>
        Discover Mints
    </Button>


    <ScrollArea class="flex flex-col gap-2 h-96 w-full">
        
        {#each $discoveredMints as mint}
        <div class="flex gap-2 w-full items-center justify-between my-2">
            <AddMint mintUrlToAdd={mint.url} readOnly={true} showAddText={false}></AddMint> 
            
            <p class="pr-3">
                <a href={`https://bitcoinmints.com/?tab=reviews&mintUrl=${encodeURI(mint.url)}`} target="_blank" rel="noopener noreferrer">

                    <Badge>
                        
                        {mint.reviews}
                    </Badge>
                </a>
            </p>
        </div>
        {/each}
    </ScrollArea>
</div>