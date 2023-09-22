<script lang="ts">
	import type { AmountPreference } from '@cashu/cashu-ts';
	import type { Mint } from '../../model/mint';
	import { getAmountForTokenSet, getTokensForMint } from '../util/walletUtils';
	import { token } from '../../stores/tokens';
	import TokenIcon from '../tokens/TokenIcon.svelte';

	export let preference: AmountPreference[];
	export let mint: Mint;
	export let amount: number;

	if (!preference) {
		preference = [];
	}

	const mintBalance = getAmountForTokenSet(getTokensForMint(mint, $token));

	$: available = getAvailableCoins();
	$: possible = getPossibleCoins();

	const getAvailableCoins = () => {
		const a: number[] = [];
		for (let index = 1; index <= mintBalance; index = index * 2) {
			a.push(index);
		}
		return a;
	};
	const getPossibleCoins = () => {
		const a: number[] = [];
		for (let index = 1; index <= mintBalance - amount; index = index * 2) {
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
		amount = preference.reduce((acc, curr) => acc + curr.amount * curr.count, 0);
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
		amount = preference.reduce((acc, curr) => acc + curr.amount * curr.count, 0);
		possible = getPossibleCoins();
	};

	const reset = () => {
		preference = [];
		amount = 0;
		possible = getPossibleCoins();
	};
</script>

<div class="flex flex-col gap-2">
	<div class="overflow-x-auto overflow-y-scroll scrollbar-hide max-h-56 w-full">
		<table class="table table-zebra table-sm h-64 ">
			<!-- head -->
			<thead>
				<tr>
					<th>Amount</th>
					<th>Count</th>
					<th />
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				{#each available as denomination}
					<tr>
						<th class="flex gap-1 items-center"><TokenIcon />{denomination} sat</th>
						<td>{preference.find((p) => p.amount === denomination)?.count ?? 0}</td>
						<td class="flex gap-3">
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
							</button></td
						>
						<td>
							{preference.filter(
								(p) => p.amount === denomination
							).reduce((acc, curr)=> acc+ (curr.amount*curr.count),0)}
						</td>
					</tr>
					
				{/each}
			</tbody>
		</table>
	</div>
	<div class="grid grid-cols-4 gap-1">
		<div class="col-span-3" />
		<button on:click={reset} class="btn btn-active"> reset </button>
	</div>
</div>
