<script lang="ts">
	import { mints } from '../../stores/mints';
	import type { Mint } from '../../model/mint';
	import { token } from '../../stores/tokens';
	import { getAmountForTokenSet, getTokensForMint } from '../util/walletUtils';

	export let mintIndex: number;
	export let mint: Mint;
	const removeMint = () => {
		const allMints = $mints;
		allMints.splice(mintIndex, 1);
		mints.set(allMints);
	};
	const addMint = () => {
		const allMints = $mints;
		allMints.splice(mintIndex, 1);
		mint.isAdded = true;
		mints.set([mint, ...allMints]);
	};
</script>

<tr class="hover">
	<td colspan="3" class="overflow-clip max-w-xs">
		<div class="flex gap-2">
			<div class="w-4 h-4 flex">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4 text-info animate-ping absolute inline-flex"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
					/>
				</svg>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4 text-info relative inline-flex rounded-full "
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
					/>
				</svg>
			</div>
			<div class="overflow-scroll scrollbar-hide">
				{mint.mintURL}
			</div>
		</div>
	</td>
	<td class="flex gap-2">
		<button class="btn btn-square btn-error flex gap-1" on:click={() => removeMint()}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
				/>
			</svg>
		</button>
		<button class="btn btn-success flex gap-1" on:click={addMint}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
			Add</button
		>
	</td>
</tr>
