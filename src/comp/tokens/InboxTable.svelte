<script lang="ts">
	import { CashuMint, CashuWallet, getEncodedProofs } from '@gandlaf21/cashu-ts';
	import type { Mint } from '../../model/mint';
	import { mints } from '../../stores/mints';
	import { nostrMessages } from '../../stores/nostr';
	import { toast } from '../../stores/toasts';
	import { token } from '../../stores/tokens';
	import { getAmountForTokenSet } from '../util/walletUtils';
	import InboxRow from './InboxRow.svelte';

	$: page = 5;
	$: nostrMessagesSub = $nostrMessages.slice(0, page);

	let isLoading = false

	const loadMore = () => {
		page += 5;
	};

	const receiveAll =async  () => {
		let totalReceived = 0;
		let totalSpent = 0;
		let hasError = 0;
		isLoading = true
		for (const nM of $nostrMessages.filter((n) => !n.isAccepted)) {
			const mint: CashuMint = new CashuMint(nM.token.mints[0].url);
			let keys;
			try {
				if ($mints.map((m) => m.mintURL).includes(mint.mintUrl)) {
					keys = $mints.filter((m) => m.mintURL === mint.mintUrl)[0].keys;
				} else {
					keys = await mint.getKeys();
					const storeMint: Mint = {
						mintURL: mint.mintUrl,
						keys,
						keysets: nM.token.mints[0].ids,
						isAdded: false
					};
				}

				const wallet = new CashuWallet(keys, mint);
				const spentProofs = await wallet.checkProofsSpent(nM.token.proofs);
				const proofsToReceive = nM.token.proofs.filter((p) => !spentProofs.includes(p));

				if (proofsToReceive.length > 0) {
					const receivedProofs = await wallet.receive(getEncodedProofs(proofsToReceive));

					token.update((state) => [...receivedProofs, ...state]);

					totalReceived += getAmountForTokenSet(receivedProofs);
				}

				totalSpent += getAmountForTokenSet(spentProofs);
			} catch (error) {
				console.log(error);
				hasError++;
			}
		}

		if (totalReceived > 0) {
			console.log();
			toast('success', `${totalReceived} tokens received`, 'Success!');
		}

		if (totalSpent > 0) {
			toast('info', `${totalSpent} tokens were already redeemed`, 'Info');
		}

		if (hasError > 0) {
			toast('warning', `${hasError} errors occurred when trying to redeem tokens`, 'Oops');
		}
		isLoading = false
		nostrMessages.set(
			$nostrMessages.map((m) => {
				m.isAccepted = true;
				return m;
			})
		);
	};
</script>

<div class="overflow-x-scroll overflow-y-scroll  max-h-40">
	<table class="table table-compact table-zebra w-full">
		<thead>
			<tr>
				<th>
					{#if isLoading}
					<button class="btn btn-xs btn-square btn-disabled loading">
					</button>
					{:else}
					<button class="btn btn-xs btn-square btn-info" on:click={receiveAll}>
						<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-4 h-4"
						>
						<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
						/>
					</svg>
				</button>
				{/if}
			</th>
			<th>
					<p class="hidden lg:flex">Amount</p>
					<p class="flex lg:hidden">Amt</p></th
				>
				<th>Date</th>
				<th>From</th>
			</tr>
		</thead>
		<tbody class="max-h-1 overflow-y-scroll">
			{#each nostrMessagesSub as nostrMessage, i}
				<InboxRow {nostrMessage} {i} />
			{/each}
			<tr class="hover">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<td colspan="4" class="cursor-pointer w-full" on:click={loadMore}> load more </td>
			</tr>
		</tbody>
	</table>
</div>
