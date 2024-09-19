<script lang="ts">
	import { type MeltQuoteResponse, type Proof } from '@cashu/cashu-ts';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { toast } from '../../stores/toasts';
	import { token } from '../../stores/tokens';
	import {
		formatAmount,
		getAmountForTokenSet,
		getInvoiceFromAddress,
		getInvoiceFromLNURL,
		getTokensForMint,
		getTokensToSend
	} from '../util/walletUtils';
	import { onMount } from 'svelte';
	import CoinSelection from '../elements/CoinSelection.svelte';
	import * as walletActions from '../../actions/walletActions';
	import type { Mint } from '../../model/mint';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { unit } from '../../stores/settings';

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
	let memo = '';
	let maxSend: number | undefined = undefined;
	let minSend: number | undefined = undefined;
	let meltQuote: MeltQuoteResponse;

	onMount(() => {
		if (invoice) {
			getMeltQuote();
		}
	});

	export const getMeltQuote = async () => {
		try {
			if (invoice.includes('@')) {
				if (!amount) {
					toast('info', 'Enter amount to send to address', 'Amount needed');
					return;
				}
				toast('info', 'One moment please', 'Loading invoice...');
				const { pr, maxSendable, minSendable } = await getInvoiceFromAddress(invoice, amount);
				if (amount * 1000 < minSendable) {
					toast(
						'error',
						`Amount ${formatAmount(Math.floor(minSendable / 1000), $unit)} minimum`,
						'Unable to fetch invoice'
					);
					maxSend = Math.floor(maxSendable / 1000);
					minSend = Math.floor(minSendable / 1000);
					return;
				}
				if (amount * 1000 > maxSendable) {
					toast(
						'error',
						`Amount ${formatAmount(Math.floor(minSendable / 1000), $unit)} max`,
						'Unable to fetch invoice'
					);
					maxSend = Math.floor(maxSendable / 1000);
					minSend = Math.floor(minSendable / 1000);
					return;
				}
				invoice = pr;
			} else if (invoice.toLowerCase().startsWith('lnurl')) {
				if (!amount) {
					toast('info', 'Enter amount to send to address', 'Amount needed');
					return;
				}
				toast('info', 'One moment please', 'Loading invoice...');
				const { pr, maxSendable, minSendable } = await getInvoiceFromLNURL(invoice, amount);
				if (amount * 1000 < minSendable) {
					toast(
						'error',
						`Amount ${formatAmount(Math.floor(minSendable / 1000), $unit)} minimum`,
						'Unable to fetch invoice'
					);
					maxSend = Math.floor(maxSendable / 1000);
					minSend = Math.floor(minSendable / 1000);
					return;
				}
				if (amount * 1000 > maxSendable) {
					toast(
						'error',
						`Amount ${formatAmount(Math.floor(minSendable / 1000), $unit)} max`,
						'Unable to fetch invoice'
					);
					maxSend = Math.floor(maxSendable / 1000);
					minSend = Math.floor(minSendable / 1000);
					return;
				}
				invoice = pr;
			} else if (!invoice.toLocaleLowerCase().startsWith('ln')) {
				fees = 0;
				amount = 0;
				isPayable = false;
				maxSend = undefined;
				minSend = undefined;

				return;
			}
			meltQuote = await walletActions.meltQuote(mint, invoice);
			fees = meltQuote.fee_reserve;
			amount = meltQuote.amount;
			memo = decode(invoice).description;
			isPayable = true;
		} catch (error) {
			fees = 0;
			amount = 0;
			isPayable = false;
			toast('warning', error?.message, 'Oops');
		}
	};

	const payInvoice = async () => {
		try {
			if (!meltQuote) {
				toast('warning', 'Invoice is not payable', 'Invoice not paid');
				return;
			}

			if (amount + fees > getAmountForTokenSet(getTokensForMint(mint, $token))) {
				toast('warning', 'Not enough funds in this mint', 'Cannot pay invoice');
				return;
			}
			isLoading = true;

			let tokensToSend: Array<Proof> = [];

			if (isCoinSelection) {
				tokensToSend = selectedTokens;
			} else {
				tokensToSend = getTokensToSend(amount + fees, getTokensForMint(mint, $token));
			}

			if (isCoinSelection && amount + fees > getAmountForTokenSet(tokensToSend)) {
				toast('warning', 'Not enough funds', 'Could not pay');
				return;
			}
			processing = true;
			const isPaid = await walletActions.melt(mint, meltQuote, tokensToSend, invoice);
			if (!isPaid) {
				toast('error', 'Could not pay invoice', 'Error when paying invoice');
			}
			isPaySuccess = true;
			toast('success', `${formatAmount(amount, $unit)} with fees`, 'Invoice paid');
		} catch (error) {
			toast('error', 'Could not pay invoice', 'Error');
			console.error(error);
		} finally {
			isLoading = false;
		}
	};
	const resetState = () => {
		invoice = '';
		memo = '';
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
		<div class="h-10 w-full items-center justify-center flex">
			{#if maxSend}
				<p class=" bg-base-200 rounded-lg p-3 text-sm">
					{formatAmount(maxSend, $unit, false)} - {formatAmount(maxSend, $unit)}
				</p>
			{/if}
		</div>
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
						if (isPayable) {
							payInvoice();
						} else {
							getMeltQuote();
						}
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
		<div class="flex gap-1 justify-center">
			<input
				type="text"
				class="bg-base-200 rounded-lg p-1 px-3 focus:outline-none w-full"
				placeholder="memo"
				bind:value={memo}
			/>
		</div>
		<CoinSelection amount={amount + fees} {mint} bind:selectedTokens bind:isCoinSelection />

		<div class="flex items-center gap-2 justify-center">
			<button
				class="btn w-full {isPayable &&
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
