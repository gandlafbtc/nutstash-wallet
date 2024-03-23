<script lang="ts">
	import { type MeltQuoteResponse, type Proof } from '@cashu/cashu-ts';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { toast } from '../../stores/toasts';
	import { token } from '../../stores/tokens';
	import { getAmountForTokenSet, getTokensForMint, getTokensToSend } from '../util/walletUtils';
	import { onMount } from 'svelte';
	import CoinSelection from '../elements/CoinSelection.svelte';
	import * as walletActions from '../../actions/walletActions';
	import type { Mint } from '../../model/mint';

	export let active;
	export let invoice = '';
	export let selectedTokens: Proof[];
	export let isCoinSelection: boolean;
	export let mint: Mint;
	export let fees: number = 0;
	export let amount: number;
	export let activeS = 'send';
	export let processing: boolean;

	let isPayable = false;
	let isLoading = false;
	let isPaySuccess = false;
	let meltQuote: MeltQuoteResponse

	onMount(()=>{
		if (invoice) {
			getMeltQuote()
		}
	})

	const getMeltQuote = async () => {
		try {
			meltQuote = await walletActions.meltQuote(mint, invoice)
			fees = meltQuote.fee_reserve
			amount = meltQuote.amount
		} catch (error) {
			toast('warning', error?.message, 'Oops')
		}
	};

	const payInvoice = async () => {
		isLoading = true;
		try {
			if (!meltQuote) {
				toast('warning', 'Invoice is not payable', 'Invoice not paid');
				return;
			}
			let tokensToSend: Array<Proof> = [];

			if (isCoinSelection) {
				tokensToSend = selectedTokens;
			} else {
				tokensToSend = getTokensToSend(amount + fees, getTokensForMint(mint, $token));
			}

			if (isCoinSelection && amount + fees > getAmountForTokenSet(tokensToSend)) {
				toast('warning', 'not enough funds', 'Could not Send');
				return;
			}
			processing = true;
			const isPaid = await walletActions.melt(mint, meltQuote, tokensToSend, invoice);
			isPaySuccess = true;
			toast('success', 'Lightning Invoice has been paid successfully', 'Done!');
		} catch (error) {
			//re-add tokens that were sent if error
			toast('error', 'Could not pay invoice', 'Error');
			console.error(error);
		} finally {
			isLoading = false;
		}
	};
	const resetState = () => {
		invoice = '';
		amount = 0;
		fees = 0;
		isPayable = false;
		isLoading = false;
		isPaySuccess = false;
		active = 'base';
		activeS = 'send';
		processing = false;
	};
	function scanPay() {
		activeS = 'send-scan';
	}
</script>

<div class="w-full flex-col flex gap-10 py-9">
	{#if isLoading}
		<div class=" h-full flex items-center justify-center gap-5 flex-col">
			<p>Paying lightning invoice...</p>
			<LoadingCenter />
		</div>
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
			<label for="melt-modal" class="btn btn-outline" on:mouseup={resetState}>Ok</label>
		</div>
	{:else}
		<div class="inline-block relative w-full">
			<textarea
				autofocus
				id="receive-token-input"
				bind:value={invoice}
				on:input={getMeltQuote}
				class="textarea textarea-warning w-full h-40"
				placeholder="paste a lightning invoice: lnbc10n1pj2l66wpp5qhwv7pwqvrshmqu..."
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						payInvoice();
					}
				}}
			/>
			<div class="absolute z-10 bottom-4 right-4">
				<button class="" on:click={scanPay}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="text-warning w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
						/>
					</svg>
				</button>
			</div>
		</div>

		<CoinSelection amount={amount + fees} {mint} bind:selectedTokens bind:isCoinSelection />

		<div class="flex items-center gap-2 justify-center">
			<button
				class="btn {isPayable &&
				!(isCoinSelection && getAmountForTokenSet(selectedTokens) < amount + fees)
					? 'btn-warning'
					: 'btn-disabled'}"
				on:click={() => payInvoice()}
			>
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
		</div>
	{/if}
</div>
