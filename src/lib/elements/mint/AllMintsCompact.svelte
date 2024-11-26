<script lang="ts">
    import { mints } from "$lib/stores/persistent/mints";
    import { proofsStore } from "$lib/stores/persistent/proofs";
    import {
        formatAmount,
        getAmountForTokenSet,
        getProofsOfMintsUnit,
        getUnitsForMints,
    } from "$lib/util/walletUtils";
    import { Landmark } from "lucide-svelte";

</script>

<div
    class="p-4 rounded-lg border shadow-md h-48 flex flex-col bg-gradient-to-tr from-nutstash to-nutstashsecondary text-white"
>
    <div class="flex gap-2">
        <div class="flex items-center justify-center pb-1 h-12 w-12 rounded-full bg-background">
            <Landmark></Landmark>
        </div>
        <div class="flex flex-col gap-1">
            <p class="overflow-clip text-ellipsis w-52 font-bold">
                All mints
            </p>
            <p>
                {$mints.length}
            </p>
        </div>
    </div>

    <div class="fixed bottom-3 flex gap-1 text-lg">
        {#each getUnitsForMints($mints) as unit}
            <p class="text-nowrap text-sm">
                {formatAmount(
                    getAmountForTokenSet(
                        getProofsOfMintsUnit($mints,$proofsStore, unit),
                    ),
                    unit,
                )}
            </p>
        {/each}
    </div>
</div>
