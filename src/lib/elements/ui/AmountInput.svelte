<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { getConversionRate } from '@gandlaf21/cashu-wallet-engine';
	import { settingsStore } from '@gandlaf21/cashu-wallet-engine/stores';
	import { formatAmount } from '@gandlaf21/cashu-wallet-engine/util';

	interface Props {
		amount: number | undefined;

		currentUnit: string;
	}
	let conversionRate = $state(getConversionRate());


	let { amount = $bindable(),  currentUnit,  }: Props = $props();


	const handleAmountInput = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		const inputValue = target.value;

		// Remove any non-numeric characters
		const numericValue = inputValue.replace(/[^0-9]/g, '');

		const entered = numericValue;


			amount = parseInt(entered);

	};

</script>

<div class="relative flex flex-col items-center justify-center gap-2">

		<Input
			class="rounded-lg border-none px-4 py-2 text-center text-2xl outline-none focus:outline-none"
			disabled
			type="text"
			value={formatAmount(amount ?? 0, currentUnit)}
			oninput={handleAmountInput}
			placeholder="Enter amount"
		/>
		{#if currentUnit === 'sat' && $settingsStore[0].currency.useConversion}
			<div class="flex flex-col items-center justify-center text-muted-foreground">
				{#await conversionRate}
					<span> ... </span>
				{:then rate}

					<span>
						{formatAmount(
							(amount ?? 0) * (rate / 1000000),
							$settingsStore[0].currency.conversionUnit
						)}
					</span>
				{:catch error}
					<span class="text-destructive-foreground"> could not load conversion rate </span>
				{/await}
			</div>
		{/if}

</div>
