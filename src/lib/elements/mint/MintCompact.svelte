<script lang="ts">
    import AvatarFallback from "$lib/components/ui/avatar/avatar-fallback.svelte";
    import AvatarImage from "$lib/components/ui/avatar/avatar-image.svelte";
    import Avatar from "$lib/components/ui/avatar/avatar.svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import type { Mint } from "$lib/db/models/types";
    import { proofsStore } from "$lib/stores/persistent/proofs";
    import { getHostFromUrl } from "$lib/util/utils";
    import {
        formatAmount,
        getAmountForTokenSet,
        getProofsOfMintUnit,
        getUnitsForMints,
        getUnitSymbol,
    } from "$lib/util/walletUtils";

    let { mint }: { mint: Mint } = $props();
    console.log(mint);
</script>

<div
    class="p-4 rounded-lg border shadow-md h-48 flex flex-col bg-gradient-to-tr from-nutstash to-nutstashsecondary text-white"
>
    <div class="flex gap-2">
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
            <p class="text-sm overflow-clip text-ellipsis w-52">
                {mint.info.name}
            </p>
            <p class="text-xs opacity-35 overflow-clip text-ellipsis w-52">
                {mint.url}
            </p>
        </div>
    </div>

    <div class="fixed bottom-3 flex gap-1 text-lg">
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
</div>
