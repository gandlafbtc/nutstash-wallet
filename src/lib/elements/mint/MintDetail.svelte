<script lang="ts">
    import AvatarFallback from "$lib/components/ui/avatar/avatar-fallback.svelte";
    import AvatarImage from "$lib/components/ui/avatar/avatar-image.svelte";
    import Avatar from "$lib/components/ui/avatar/avatar.svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import type { Mint } from "$lib/db/models/types";
    import { proofsStore } from "$lib/stores/persistent/proofs";
    import { NUT, NUTSTASH_NUTS } from "$lib/stores/static/const";
    import { copyTextToClipboard, getHostFromUrl } from "$lib/util/utils";
    import {
        formatAmount,
        getAmountForTokenSet,
        getProofsOfMintUnit,
        getUnitsForMints,
        getUnitSymbol,
    } from "$lib/util/walletUtils";

    let { mint }: { mint: Mint } = $props();
    import * as  Accordion  from "$lib/components/ui/accordion";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { AlertTriangle, Check } from "lucide-svelte";
    console.log(mint);
</script>

<div class="p-4 rounded-lg gap-2 border shadow-md flex flex-col w-80">
    <div class="flex gap-2 items-center">
        <a href={`/#/wallet/mint/${getHostFromUrl(mint.url)}`}>
            <Avatar>
                <AvatarImage src={mint.info.icon_url} alt={mint.info.name} />
                <AvatarFallback class="text-foreground">
                    {mint.info.name
                        .split(" ")
                        .reduce(
                            (acc, cur) => acc + "" + cur[0]?.toUpperCase(),
                            "",
                        )}
                </AvatarFallback>
            </Avatar>
        </a>
        <div class="flex flex-col gap-1">
            <p class="text-lg font-bold overflow-clip text-ellipsis w-52">
                {mint.info.name}
            </p>
            <p class="text-xs opacity-35 overflow-clip text-ellipsis w-52">
                {mint.url}
            </p>
        </div>
    </div>
    <ScrollArea class='h-32'>
        <div class="flex p-2 rounded-lg bg-secondary">

            {mint.info.motd}
        </div>
    </ScrollArea>
    <div class=" flex gap-1 text-lg">
        {#each getUnitsForMints([mint]) as unit}
            <p class="text-nowrap text-sm">
                {formatAmount(
                    getAmountForTokenSet(
                        getProofsOfMintUnit(mint, $proofsStore, unit),
                    ),
                    unit,
                )}
            </p>
        {/each}
    </div>
    <Accordion.Root>
        <Accordion.Item value="item-0">
            <Accordion.Trigger>
                <span class="flex gap-2 items-center">

                    Fees
                    {#if mint.keysets.keysets.find(ks=> ks.input_fee_ppk??0>0)}
                    <span class="text-yellow-500 flex gap-1 text-sm items-center">
                        <AlertTriangle class='h-5 w-5'></AlertTriangle>
                        (Mint charges a swap fee)
                    </span>
                    {:else}
                    <span class="text-green-500 flex gap-1 text-sm items-center">
                        <Check class='h-5 w-5'></Check>
                        (No swap fees)
                    </span>
                    {/if}
                </span>

            </Accordion.Trigger>
            <Accordion.Content>
                <div class="">
                Ecash swap fees:
                {#each mint.keysets.keysets as ks}
                <p class="flex gap-1 items-baseline">
                    <span>
                        {formatAmount((ks.input_fee_ppk??0)/100, ks.unit)}                     
                    </span>
                    <span class="text-xs opacity-35">
                        {ks.id}
                    </span>
                </p>    
                {/each}
                </div>
        </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-1">
            <Accordion.Trigger>Description</Accordion.Trigger>
            <Accordion.Content>
                <div class="opacity-55">
                    Version: {mint.info.version}
                </div>
                <div class="font-bold">
                    {mint.info.description}
                </div>
                <div class="">
                    {mint.info.description_long}
                </div>
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Features</Accordion.Trigger>
          <Accordion.Content>
            <div class="flex gap-1 flex-col">
                {#each Object.entries(mint.info.nuts) as item}
                    {#if item[0] == "4" || item[0] == "5"}
                        <div class="flex gap-2">
                            <p class="text-nowrap">
                                {#if item[0] == "4"}
                                    Minting
                                {:else}
                                    Melting
                                {/if}
                            </p>
                            <div class="flex gap-1 flex-wrap w-full">
        
                                {#each item[1].methods as method}
                                <Badge variant='outline'>
                                    
                                    <div class="flex gap-1 {method.disabled?'text-destructive':'text-green-500'}">
                                        <p>
                                            {method.unit}
                                        </p>
                                        <p>via</p>
                                        <p>
                                            {method.method}
                                        </p>
                                    </div>
                                </Badge>
                                {/each}
                            </div>
                        </div>
                    {:else}
                    <Badge variant='outline'>
                            <p
                                class={item[1].supported
                                    ? NUTSTASH_NUTS.includes(item[0])?"text-green-500":"text-yellow-500"
                                    : "text-destructive"}
                            >
                            {NUT[item[0]]}
                        </p>
                        </Badge>    
                    {/if}
                {/each}
            </div>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
            <Accordion.Trigger>Contact</Accordion.Trigger>
            <Accordion.Content>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col gap-0.5">

                        <div class="">
                            Pubkey
                        </div>
                        <button onclick={()=>copyTextToClipboard(mint.info.pubkey)} class="text-start font-bold break-all">
                            {mint.info.pubkey}
                        </button>
                    </div>
                    {#each mint.info.contact as contact}
                    <div class="flex flex-col gap-0.5">

                        <div class="">
                            {contact.method}
                        </div>
                        <button onclick={()=>copyTextToClipboard(contact.info)} class="text-start font-bold break-all">
                            {contact.info}
                        </button>
                    </div>
                    {/each}
                </div>
            </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

</div>
