<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import type { Mint } from '$lib/db/models/types';
	import { available_units } from '$lib/paraglide/messages';
	import { unit } from '$lib/stores/persistent/settings';
	import { getUnitsForMints, getUnitSymbol } from '$lib/util/walletUtils';
	import { onMount } from 'svelte';
	type Props = { selectedMints: Mint[]; currentUnit: string; disabled?: boolean };

	let { selectedMints, currentUnit = $bindable(), disabled = false }: Props = $props();

	onMount(() => {
		currentUnit = getDefaultUnit();
	});

	const getDefaultUnit = () => {
		let u = 'sat';
		if ($unit && mintUnits.includes($unit)) {
			return $unit;
		}
		if (selectedMints.length) {
			u = getUnitsForMints(selectedMints)[0];
		}
		return u;
	};

	const getMintsUnits = () => {
		const units = selectedMints.length ? getUnitsForMints(selectedMints) : ['sat'];
		return units;
	};

	let mintUnits = $derived.by(() => getMintsUnits());

	$effect(() => {
		selectedMints = selectedMints;
		currentUnit = getDefaultUnit();
	});
</script>

<Select.Root {disabled} type="single" name="unit" bind:value={currentUnit} allowDeselect={false}>
	<Select.Trigger class="w-16 text-xs">
		<div class="flex-grow">
			{getUnitSymbol(currentUnit)}
		</div>
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.GroupHeading>{available_units()}</Select.GroupHeading>
			{#each mintUnits as u}
				<Select.Item value={u} label={u}>{getUnitSymbol(u)}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
