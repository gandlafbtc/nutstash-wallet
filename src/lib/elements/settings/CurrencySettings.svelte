<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { unit } from '$lib/stores/persistent/settings';
	import { getUnitSymbol } from '$lib/util/walletUtils';

	const units = ['sat', 'msat', 'btc', 'usd', 'eur', 'gbp', 'cad', 'aud', 'jpy', 'krw'];

	const onValueChange = (value: string) => {
		unit.set(value);
	};
</script>

<div class="flex h-full w-80 flex-col gap-4 xl:w-[600px]">
	<div>
		<span class="text-lg font-bold"> Currency settings </span>
	</div>
	<div class="flex w-80 flex-col gap-1 xl:w-[600px]">
		<span class="text-sm">Preferred currency: </span>
		<Select.Root type="single" name="unit" value={$unit} {onValueChange} allowDeselect={false}>
			<Select.Trigger class="w-80 xl:w-[600px]">
				<div class="flex-grow">
					{getUnitSymbol($unit)}
				</div>
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.GroupHeading>Units</Select.GroupHeading>
					{#each units as u}
						<Select.Item value={u} label={u}>{getUnitSymbol(u)}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>
</div>
