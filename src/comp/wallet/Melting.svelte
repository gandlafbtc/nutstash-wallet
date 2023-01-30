<script lang="ts">
	import { CashuMint, CashuWallet } from '@gandlaf21/cashu-ts';
	import type { Mint } from '../../model/mint';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { toast } from '../../stores/toasts';
	import { token } from '../../stores/tokens';
	import { mints } from '../../stores/mints';
	import type { Token } from '../../model/token';
	import {
		getAmountForTokenSet,
		getKeysetsOfTokens,
		getTokensForMint,
		getTokensToSend
	} from '../util/walletUtils';
	import { history } from '../../stores/history';
	import { HistoryItemType } from '../../model/historyItem';
	import { browser } from '$app/environment';

	export let active;

	let invoice = '';
	let fees: number = 0;
	let amount: number = 0;
	let isPayable = false;
	let isLoading = false;
	let isPaySuccess = false;

	let mint = $mints[0];
	let amountAvailable = getAmountForTokenSet(getTokensForMint(mint, $token));

	const decodeInvoice = async () => {
		try {
			amount = decode(invoice).sections[2].value / 1000;
			if (amount) {
				const cashuMint: CashuMint = new CashuMint(mint.mintURL);
				const { fee } = await cashuMint.checkFees({ pr: invoice });
				fees = fee;
				//todo check for balance
				if (amountAvailable < amount + fees) {
					isPayable = false;
					toast(
						'warning',
						'This Mint does not have enough funds to pay the invoice.',
						'Not enough funds'
					);
				} else {
					isPayable = true;
				}
			} else {
				isPayable = false;
				throw new Error('Malformed Invoice');
			}
		} catch {
			amount = 0;
			fees = 0;
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
		console.log(fees);
		console.log(amount);
		console.log(amount + fees, tokensToSend);

		const { returnChange, send } = await cashuWallet.send(amount + fees, tokensToSend);

		console.log(send);
		// remove sent tokens from storage
		token.update((state) => {
			return state.filter((token) => !tokensToSend.includes(token));
		});
		if (returnChange) {
			token.update((state) => [...returnChange, ...state]);
		}

		try {
			const { isPaid, preimage } = await cashuWallet.payLnInvoice(invoice, send);
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
						change: returnChange
					}
				},
				...state
			]);
			if (!isPaid) {
				isLoading = false;
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
			isLoading = false;
			token.update((state) => [...send, ...state]);
			console.error(error);
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
	};
</script>

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
		<label for="melt-modal" class="btn btn-outline" on:mouseup={resetState}>ok</label>
	</div>
{:else}
	<div class="flex flex-col gap-2">
		<p class="text-xl font-bold">Pay Lightning Invoice</p>
		<div class="grid grid-cols-5 gap-2 items-center">
			<p class="font-bold col-span-2">Invoice:</p>
			<input
				id="melt-invoice-input"
				type="text"
				class="input input-primary w-full col-span-3"
				bind:value={invoice}
				on:input={decodeInvoice}
			/>
		</div>
		{#if mint}
			<div class="flex items-center gap-2">
				<div class="grid grid-cols-5 items-center">
					<div class="col-span-2">
						<label for="mint-send-dropdown">
							<p class="font-bold">Mint:</p>
						</label>
					</div>
					<div class="dropdown" id="mint-send-dropdown">
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label tabindex="0" class="btn m-1 truncate ...">
							<p class="truncate ... max-w-xs">
								{mint.mintURL}
							</p>
						</label>

						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<ul
							tabindex="0"
							class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-56 overflow-scroll"
						>
							{#each $mints.filter((m) => m.isAdded) as m}
								<!-- svelte-ignore a11y-missing-attribute -->
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<li on:click={() => (mint = m)}><a>{m.mintURL}</a></li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-5 gap-2">
				<p class="font-bold col-span-2">Available:</p>
				<p class="col-span-3">{amountAvailable} sats</p>
			</div>
		{/if}

		<div class="divider">

		</div>
		
		<div class="grid grid-cols-5 items-start pt-5">
			<p>Amount:</p>
			<p class="col-span-4">{amount} sats</p>
			<p>Fees:</p>
			<p class="col-span-4">{fees} sats</p>
			<div class="divider col-span-2 my-0.5" />
			<div class="col-span-3" />
			<p class="font-bold">Total:</p>
			<p class="col-span-4 font-bold">{fees + amount} sats</p>
		</div>
	</div>

	<div class="flex items-center gap-2">
		<button class="btn btn-outline" on:click={resetState}>cancel</button>
			<button class="btn {isPayable?'btn-warning':'btn-disabled'}" on:click={() => payInvoice()}>
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
