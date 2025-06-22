<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import  * as Select  from '$lib/components/ui/select';
	import { loading_camera } from '$lib/paraglide/messages';
	import { conversionUnits, getConversionRate } from '@gandlaf21/cashu-wallet-engine';
	import { settingsStore } from '@gandlaf21/cashu-wallet-engine/stores';
	import { formatAmount } from '@gandlaf21/cashu-wallet-engine/util';

	let value = $state($settingsStore[0].currency.conversionUnit??"USD");
	let conversionRate = $state(getConversionRate())
	const change = (value :string) => {
		setTimeout(() => {
			settingsStore.setConversionUnit(value);
			conversionRate=getConversionRate();
		}, 50);
	};
</script>

<div class="flex w-full items-center justify-between gap-2">
	<div class="flex w-full items-center justify-between space-x-2">
		<Label for="hide-balance">Conversion Unit</Label>
		<Select.Root type="single" name="conversion-unit" bind:value={value} onValueChange={(value: string)=> {
			change(value);
		}}>
			<Select.Trigger class="w-16 text-xs">
				<div class="flex-grow">
					{value}
				</div>
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.GroupHeading>Conversion Units</Select.GroupHeading>
					{#each conversionUnits as u}
						<Select.Item value={u.short} label={u.short}><p>{u.flag} {u.name} ({u.short})</p></Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>	</div>
	</div>
	<div>
	 {#await conversionRate}
		  loading...
		{:then amt}
		<p class="text-muted-foreground italic">
			1 BTC = {formatAmount(amt*100, value)}
		</p>
			{/await}
	</div>
