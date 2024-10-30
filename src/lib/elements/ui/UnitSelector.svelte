<script lang="ts">
    import * as Select from "$lib/components/ui/select";
    import type { Mint } from "$lib/model/mint";
    import { unit } from "$lib/stores/settings";
    import { getUnitSymbol } from "$lib/util/walletUtils";
    import { onMount } from "svelte";


let {selectedMints, currentUnit = $bindable()}: {selectedMints: Mint[], currentUnit: string} =  $props()

    onMount(()=>{
        currentUnit = getDefaultUnit()
    })

    const getDefaultUnit = () => {
        let u = "sat";
        if ($unit && mintUnits.includes($unit)) {
            return $unit;
        }
        if (selectedMints.length) {
            u = selectedMints.map(m=> m.keysets).flat()[0]?.unit;
        }
        return u;
    };

    const getMintsUnits = () => {
        const units = selectedMints.length
            ? [...new Set(selectedMints.map(m=>m.keysets).flat().map((ks) => ks.unit))]
            : ["sat"];
        return units;
    };

    let mintUnits = $derived.by(() => getMintsUnits());

    $effect(() => {
        selectedMints = selectedMints
        currentUnit = getDefaultUnit()
    })

</script>

<Select.Root type="single" name="unit" bind:value={currentUnit} allowDeselect={false}>
    <Select.Trigger class="w-28">
        <div class="flex-grow">
            {getUnitSymbol(currentUnit)}
        </div>
    </Select.Trigger>
    <Select.Content>
        <Select.Group>
            <Select.GroupHeading>Available Units</Select.GroupHeading>
            {#each mintUnits as u}
                <Select.Item value={u} label={u}>{getUnitSymbol(u)}</Select.Item>
            {/each}
        </Select.Group>
    </Select.Content>
</Select.Root>