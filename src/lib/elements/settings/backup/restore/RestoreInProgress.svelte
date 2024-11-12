<script lang="ts">
    import { getByMany } from "$lib/stores/persistent/helper/storeHelper";
    import { mints } from "$lib/stores/persistent/mints";
    import { selectedMints } from "$lib/stores/local/selectedMints";
    import { onMount } from "svelte";
    import { Coins, Landmark, LoaderCircle } from "lucide-svelte";
    import Progress from "$lib/components/ui/progress/progress.svelte";
    import RestoreMint from "./RestoreMint.svelte";
    import NumberFlow from "@number-flow/svelte";
    import { restoredProofs } from "$lib/stores/session/restoredproofs";
    import { getAmountForTokenSet, getUnitForKeysetId, getUnitsForMints, getUnitSymbol } from "$lib/util/walletUtils";
    import type { Proof } from "@cashu/cashu-ts";
    import { countsStore } from "$lib/stores/persistent/counts";
    import UnitDisplay from "./UnitDisplay.svelte";

    const restoreMints = $state(getByMany($mints, $selectedMints, "url"))

    const getUnitProofs = (proofs:Proof[]) => {
        const unitProofs: {proofs:Proof[], unit: string}[] = []
        console.log(proofs)
        for (const proof of proofs) {
            const unit = getUnitForKeysetId(restoreMints,proof.id);
            console.log(unit)
            let unitProof = unitProofs.find(u => u.unit === unit)
            if (!unitProof) {
               unitProof = {proofs:[], unit: unit} 
               unitProofs.push(unitProof)
            }
            unitProof.proofs.push(proof)
        }
        return unitProofs;
    }

    let restoredUnits = $derived(getUnitProofs($restoredProofs))
    $inspect(restoredUnits)
    const restores: (() => Promise<void>)[] = [];
    let mintsRestored = $state(0);
    let progress = $state(0)
    let inprogress = $state(false);
    onMount(async () => {
        setTimeout(async () => {
            inprogress = true;
            for await (const [i,r] of restores.entries()) {
                await r();
                mintsRestored++
                progress = ((i + 1) / restores.length)*100;
            }
            inprogress = false;
        }, 200);
    });
    console.log($countsStore)
</script>

<div class="flex flex-col gap-2 h-full mt-32 w-80">
    <div>
        <span class="text-lg font-bold flex items-center gap-2">
            Restore in progress
            {#if inprogress}
                <LoaderCircle class="animate-spin"></LoaderCircle>
            {/if}
        </span>
    </div>
    <div class="flex flex-col gap-3 border p-4 rounded-lg">
        <span class="font-bold">
            Summary
        </span>
        <div class="grid grid-cols-3 gap-3">
            <div class="flex gap-2 items-center">
                <Landmark></Landmark>

                <NumberFlow value={mintsRestored}></NumberFlow>
            </div>
            <div class="flex gap-2 items-center">
                <Coins></Coins>
                <NumberFlow value={$restoredProofs.length}></NumberFlow>
            </div>
            {#each restoredUnits as up}
                <UnitDisplay amount={getAmountForTokenSet(up.proofs)} unit={up.unit}></UnitDisplay>
            {/each}

        </div>
            <Progress value={progress}>

        </Progress>
    </div>
    {#each restoreMints as mint, i}
        <RestoreMint {mint} bind:restore={restores[i]}></RestoreMint>
    {/each}
</div>
