<script lang="ts">
	import { CashuMint, CashuWallet } from '@gandlaf21/cashu-js';
	import type { Mint } from '../../model/mint';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { toast } from '../../stores/toasts';
	import { token } from '../../stores/tokens';
	import type { Token } from '../../model/token';
	import { getKeysetsOfTokens, getTokensForMint, getTokensToSend } from '../util/walletUtils';
	import { history } from '../../stores/history';
	import { HistoryItemType } from '../../model/historyItem';
	import { browser } from '$app/environment';

	export let mint: Mint;

	let invoice = '';
	let amount: number = 0;
	let isPayable = false;
	let isLoading = false;
	let isPaySuccess = false;

	const decodeInvoice = () => {
		console.log('hello');
		try {
			amount = decode(invoice).sections[2].value / 1000;
			if (amount) {
				isPayable = true;
			} else {
				isPayable = false;
				throw new Error('Malformed Invoice');
			}
		} catch {
			amount = 0;
			isPayable = false;
			toast('warning', 'The invoice could not be decoded', 'Malformed Invoice');
		}
	};

	const payInvoice = async () => {
		isLoading = true;
		if (!isPayable) {
			throw new Error('invoice is not payable');
		}
		const cashuMint: CashuMint = new CashuMint(mint.mintURL);
		const cashuWallet: CashuWallet = new CashuWallet(mint.keys, cashuMint);

		const tokensForMint: Array<Token> = getTokensForMint(mint, $token)

		const tokensToMelt: Array<Token> = getTokensToSend(amount,tokensForMint)

		try {
			const { isPaid, preimage, change } = await cashuWallet.payLnInvoice(invoice, tokensToMelt);
			if (!isPaid) {
				toast('error', 'Please try again later', "The Invoice couldn't be paid.");
				throw new Error('Invoice could not be paid');
			} else {
				token.update((state) => {
					return state.filter((token) => !tokensToMelt.includes(token));
				});
				token.update((state) => [...state, ...change]);

				history.update((state) => [{
				 type: HistoryItemType.MELT, amount ,date: Date.now(), data: {
					preimage,
					mint: mint?.mintURL,
					keyset: getKeysetsOfTokens(tokensToMelt),
					invoice,
					change
				 }
			}, ...state]);

				isPaySuccess = true;
				isLoading=false
				toast('success', 'Lightning Invoice has been paid successfully', 'Done!');
			}
		} catch {
			toast('error', 'Could not pay lighting invoice','Error:')
			isLoading = false;
			throw new Error("Error when paying lightning Invoice");
		}
	};
	const resetState = () => {
		if (browser) {
			// @ts-expect-error
            document.getElementById("melt-modal-"+mint.keysets[0]).checked = false;
        }
		invoice = '';
		amount = 0;
		isPayable = false;
		isLoading = false;
		isPaySuccess = false;
	};
</script>

<input type="checkbox" id="melt-modal-{mint.keysets[0]}" class="modal-toggle" />
<div class="modal">
	<div class="modal-box flex flex-col gap-3 h-80">
		{#if isLoading}
			<LoadingCenter />
		{:else if isPaySuccess}
			<div class="flex w-full h-full flex-col items-center justify-center gap-5">
				<p class="text-lg font-bold text-success">Lightning invoice has been paid.</p>
				<button class="btn btn-success">
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
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
			</div>
			<div class="modal-action">
				<label for="melt-modal-{mint.keysets[0]}" class="btn btn-outline" on:mouseup={resetState}
					>ok</label
				>
			</div>
		{:else}
			<label for="melt-invoice-input" class="label-text label font-bold">Invoice:</label>
			<input
				id="melt-invoice-input"
				type="text"
				class="input input-primary"
				bind:value={invoice}
				on:input={decodeInvoice}
			/>
			<div>
				<p>Amount:</p>
				<p>{amount}</p>
			</div>
			<div class="modal-action">
				<button class="btn btn-outline" on:click={resetState}
					>cancel</button
				>
				{#if isPayable}
					<button class="btn btn-warning" on:click={() => payInvoice()}>
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
								d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
							/>
						</svg>Pay</button
					>
				{/if}
			</div>
		{/if}
	</div>
</div>
