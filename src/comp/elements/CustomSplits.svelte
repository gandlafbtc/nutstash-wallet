<script lang="ts">
	import type { AmountPreference } from '@cashu/cashu-ts';
	import TokenIcon from '../tokens/TokenIcon.svelte';
	import { onMount } from 'svelte';

	export let preference: AmountPreference[];
	export let amount: number;

	let preferenceAmount = 0;

	if (!preference) {
		preference = [];
	}

	onMount(() => {
		preference = [];
	});

	$: amount,
		(() => {
			possible = getPossibleCoins();
			available = getAvailableCoins();
		})();

	$: available = getAvailableCoins();
	$: possible = getPossibleCoins();

	const getAvailableCoins = () => {
		const a: number[] = [];
		for (let index = 1; index <= amount; index = index * 2) {
			a.push(index);
		}
		return a;
	};
	const getPossibleCoins = () => {
		const a: number[] = [];
		console.log(preferenceAmount);
		for (let index = 1; index <= amount - preferenceAmount; index = index * 2) {
			a.push(index);
		}
		return a;
	};

	const addPreference = (a: number) => {
		const field = preference.find((p) => p.amount === a);
		if (field) {
			field.count++;
		} else {
			preference.push({ amount: a, count: 1 });
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
								<TokenIcon />{denomination} sat
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
				{preferenceAmount} / {amount ?? 0} sats
				{#if amount - preferenceAmount > 0}
					<div class="flex gap-1 items-center">
						<p class="font-bold">|</p>
						<p class="">{amount - preferenceAmount} sats</p>
						<p>change</p>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>
