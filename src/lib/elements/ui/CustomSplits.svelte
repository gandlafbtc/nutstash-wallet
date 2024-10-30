<script lang="ts">
	import type { OutputAmounts } from '@cashu/cashu-ts';
	import { onMount } from 'svelte';
	import { unit } from '../../stores/settings';
	import { formatAmount } from '$lib/util/walletUtils';

	let { amount, proofAmounts, preference = $bindable() }: { amount: number, proofAmounts: [], preference?: OutputAmounts } = $props()

	let preferenceSendAmount = 0;
	let preferenceKeepAmount = 0;

	if (!preference) {
		preference = {
			sendAmounts: [],
			keepAmounts: [],
		};
	}

	onMount(() => {
		preference = {
			sendAmounts: [],
			keepAmounts: [],
		};
	});

	const getAvailableCoins = (): number[] => {
		const a: number[] = [];
		for (let index = 1; index <= amount; index = index * 2) {
			a.push(index);
		}
		return a;
	};

	const a: number[] = [];
		for (let index = 1; index <= amount - preferenceAmount; index = index * 2) {
			a.push(index);
		}
		return a;
	};

	const available: number[] = $derived.by(getAvailableCoins);
	const possible: number[] = $derived.by(getPossibleCoins);

	
	const getPossibleCoins = () => {


	const addPreference = (a: number, sendOrKeep: 'send' | 'keep') => {
		const field = preference.find((p) => p.amount === a);
		if (field) {
			field.count++;
		} else {
			preference.push(amount);
		}
		preference = preference;
		preferenceAmount = preference.reduce((acc, curr) => acc + curr.amount * curr.count, 0);
		possible = getPossibleCoins();
	};

	const removePreference = (a: number) => {
		const field = preference.find((p) => p.amount === a);
		if (field && field.count > 1) {
			field.count--;
		} else {
			preference.splice(
				preference.findIndex((p) => p.amount === a),
				1
			);
		}
		preference = preference;
		preferenceAmount = preference.reduce((acc, curr) => acc + curr.amount * curr.count, 0);
		possible = getPossibleCoins();
	};
</script>

<div class="flex flex-col gap-2">
	<div class="overflow-x-auto overflow-y-scroll scrollbar-hide max-h-56 w-full">
		<table class="table table-zebra table-sm flex">
			<!-- head -->
			<thead class="h-6">
				<tr>
					<th>Amount</th>
					<th>Count</th>
					<th />
					<th>Total</th>
				</tr>
			</thead>
			<tbody class="h-56">
				{#each available as denomination}
					<tr class="h-6 max-h-6">
						<th>
							<p class="flex gap-2 items-center">
								{denomination} sat
							</p>
						</th>
						<td>
							<p>
								{preference.find((p) => p.amount === denomination)?.count ?? 0}
							</p>
						</td>
						<td>
							<div class="flex gap-2 items-center">
								<button
									class="btn btn-square btn-error btn-xs {preference.filter(
										(p) => p.amount === denomination
									).length
										? ''
										: 'btn-disabled'}"
									on:click={() => removePreference(denomination)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
									</svg>
								</button>
								<button
									class="btn btn-square btn-success btn-xs {possible.includes(denomination)
										? ''
										: 'btn-disabled'}"
									on:click={() => addPreference(denomination)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
									</svg>
								</button>
							</div>
						</td>
						<td>
							{preference
								.filter((p) => p.amount === denomination)
								.reduce((acc, curr) => acc + curr.amount * curr.count, 0)}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="flex flex-col gap-1 pt-2 items-center">
		<div class="flex justify-center items-center gap-2 w-full">
			<progress
				class="progress w-full {preferenceAmount == amount
					? 'progress-success'
					: 'progress-warning'} {preferenceAmount > amount ? 'progress-warning' : ''}"
				value={preferenceAmount}
				max={amount}
			/>
		</div>
		<div class="flex items-center justify-center gap-2">
			{#if amount}
				{formatAmount(preferenceAmount ?? 0, $unit)} / {formatAmount(amount ?? 0, $unit)}
				{#if amount - preferenceAmount > 0}
					<div class="flex gap-1 items-center">
						<p class="font-bold">|</p>
						<p class="">{formatAmount(amount - preferenceAmount, $unit)}</p>
						<p>change</p>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>
