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
	let fees: number = 0;
	let amount: number = 0;
	let isPayable = false;
	let isLoading = false;
	let isPaySuccess = false;

	const decodeInvoice = async () => {
		try {
			amount = decode(invoice).sections[2].value / 1000;
			if (amount) {
				const cashuMint: CashuMint = new CashuMint(mint.mintURL);
				const { fee } = await cashuMint.checkFees({ pr: invoice });
				fees = fee;
				//todo check for balance
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
			isLoading = false;
			toast('warning', 'Invoice is not payable', 'Invoice not paid');
			return;
		}
		const cashuMint: CashuMint = new CashuMint(mint.mintURL);

		const cashuWallet: CashuWallet = new CashuWallet(mint.keys, cashuMint);

		const tokensForMint: Array<Token> = getTokensForMint(mint, $token);

		const tokensToSend: Array<Token> = getTokensToSend(amount + fees, tokensForMint);
			console.log(fees)
			console.log(amount)
			console.log(amount+fees, tokensToSend)
		
		const { returnChange, send } = await cashuWallet.send(amount + fees, tokensToSend);

			console.log(send)
		// remove sent tokens from storage
		token.update((state) => {
			return state.filter((token) => !tokensToSend.includes(token));
		});
		if (returnChange) {
			token.update((state) => [...returnChange, ...state]);
		}

		try {
			const { isPaid, preimage } = await cashuWallet.payLnInvoice(
				invoice,
				send
			);
			history.update((state) => [
				{
					type: HistoryItemType.MELT,
					amount,
					date: Date.now(),
					data: {
						preimage,
						mint: mint?.mintURL,
						keyset: getKeysetsOfTokens(tokensToSend),
						invoice,
						change:returnChange,
					}
				},
				...state
			]);
			if (!isPaid) {
				isLoading = false
				//re-add tokens that were sent if invoice is not paid
				token.update((state) => [...send, ...state]);
				toast('warning', 'Try again later', 'Invoice could not be paid!');
				return;
			}
			isPaySuccess = true;
			isLoading = false;
			toast('success', 'Lightning Invoice has been paid successfully', 'Done!');
		} catch (error) {
			//re-add tokens that were sent if error
			isLoading = false
			token.update((state) => [...send, ...state]);
			console.error(error);
		}
	};
	const resetState = () => {
		if (browser) {
			// @ts-expect-error
			document.getElementById('melt-modal-' + mint.keysets[0]).checked = false;
		}
		invoice = '';
		amount = 0;
		fees = 0;
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
			<div class="flex gap-2">
				<p>Amount:</p>
				<p>{amount} sats</p>
			</div>
			<div class="flex gap-2">
				<p>Fees:</p>
				<p>{fees} sats</p>
			</div>
			<div class="modal-action">
				<button class="btn btn-outline" on:click={resetState}>cancel</button>
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
