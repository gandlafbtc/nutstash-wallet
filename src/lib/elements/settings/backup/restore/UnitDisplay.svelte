<script lang="ts">
	import { getDivider } from '$lib/utils';
	import { getUnitSymbol } from '@gandlaf21/cashu-wallet-engine';
	import NumberFlow from '@number-flow/svelte';

	let { unit, amount }: { unit: string; amount: number } = $props();
	let { divider, fraction } = $derived(getDivider(unit));
</script>

<p class="">
	<NumberFlow
		value={amount / divider}
		format={{ minimumFractionDigits: fraction, maximumFractionDigits: fraction }}
	></NumberFlow>
	{getUnitSymbol(unit, false)}
	<span class="text-xs">
		{unit}
	</span>
</p>
