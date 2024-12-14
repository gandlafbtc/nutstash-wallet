<script lang="ts">
    import { mints } from "$lib/stores/persistent/mints";
    import MintSelector from "../ui/MintSelector.svelte";
    import AddMint from "../mint/AddMint.svelte";
    import type { Mint } from "$lib/db/models/types";
    import { getBy } from "$lib/stores/persistent/helper/storeHelper";
    import { toast } from "svelte-sonner";
    import DiscoverMints from "../mint/DiscoverMints.svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import { getHostFromUrl } from "$lib/util/utils";
    import MintDropdown from "../mint/mintDropdown/MintDropdown.svelte";
    import MintSwap from "../mint/MintSwap.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    let defaultMint: Mint | undefined = $derived($mints[0]);

    const onMintChange = (minturl: string) => {
        const mint = getBy($mints, minturl, "url");
        if (!mint) {
            toast.warning("Mint not found");
            return;
        }
        mints.makeDefaultMint(mint);
    };
</script>

<div class="flex flex-col gap-4 h-full w-80 ">
    <div>
        <span class="font-bold text-lg"> Mint Settings </span>
    </div>
        <Tabs.Root value={$mints.length ? "manage" : "add"} class="w-full">
        <Tabs.List>
            <Tabs.Trigger value="manage">Manage</Tabs.Trigger>
            <Tabs.Trigger value="add">Add Mint</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="manage">
            {#if defaultMint}
                <!-- content here -->
                <div class="flex gap-6 flex-col mt-4">
                    <div class="flex flex-col gap-3">
                        <span class="text-sm font-bold">Default mint</span>
                        <MintSelector mint={defaultMint} onchange={onMintChange}
                        ></MintSelector>
                    </div>
                    <div class="flex flex-col gap-3">
                        <span class="text-sm font-bold">Mint swap</span>
                        <span class="text-sm">
                            
                        </span>
                        <Button href='/#/wallet/settings/mints/swap'>
                            Swap
                        </Button>
                    </div>
                    
                    <div class="flex flex-col gap-1">
                        <span class="text-sm font-bold">Added mints</span>
                            {#each $mints as m, i}
                                <div
                                    class="flex gap-2 p-2 text-sm border rounded-lg my-2 items-center"
                                    class:border-purple-500={i===0}
                                >
                                    <a href={`/#/wallet/mint/${getHostFromUrl(m.url)}`}
                                        class="font-bold w-72 text-nowrap"
                                    >
                                        {m.url}
                        </a>
                                    <MintDropdown mint={m}></MintDropdown>
                                </div>
                                <div>
                                </div>
                                {/each}
                    </div>
                </div>
            {/if}
        </Tabs.Content>
        <Tabs.Content value="add">
            <div class="flex gap-6 flex-col mt-4">
                <div class="flex flex-col gap-1">
                    <AddMint></AddMint>
                </div>

                <div class="flex flex-col gap-1 w-full">
                    <DiscoverMints></DiscoverMints>
                </div>
            </div>
        </Tabs.Content>
    </Tabs.Root>
</div>
