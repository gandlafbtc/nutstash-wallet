<script lang="ts">
	import { CashuMint, CashuWallet, type Proof } from '@cashu/cashu-ts';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { toast } from '../../stores/toasts';
	import { token } from '../../stores/tokens';
	import { mints } from '../../stores/mints';
	import {
		getAmountForTokenSet,
		getKeysetsOfTokens,
		getTokensForMint,
		getTokensToSend
	} from '../util/walletUtils';
	import { history } from '../../stores/history';
	import { HistoryItemType } from '../../model/historyItem';
	import { onMount } from 'svelte';
	import CoinSelection from '../elements/CoinSelection.svelte';
	import { updateMintKeys } from '../../actions/walletActions';

	export let active;

	export let invoice = '';
	let fees: number = 0;
	let amount: number = 0;
	let isPayable = false;
	let isLoading = false;
	let isPaySuccess = false;

	$: mint = $mints[0];
	$: amountAvailable = getAmountForTokenSet(getTokensForMint(mint, $token));

	$: selectedTokens = [];
	$: isCoinSelection = false;

	onMount(() => {
		decodeInvoice();
	});

	const decodeInvoice = async () => {
		try {
			if (invoice.startsWith('lightning:')) {
				invoice = invoice.split(':')[1];
			}
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
			toast('info', 'Paste a Lightning invoice into the input field.', 'Lightning Invoice');
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

		const cashuWallet: CashuWallet = new CashuWallet(cashuMint, mint.keys);

		let tokensToSend: Array<Proof> = [];

		if (isCoinSelection) {
			tokensToSend = selectedTokens;
		} else {
			tokensToSend = getTokensToSend(amount + fees, getTokensForMint(mint, $token));
		}
		if (isCoinSelection && amount + fees > getAmountForTokenSet(tokensToSend)) {
			toast('warning', 'not enough funds', 'Could not Send');
			isLoading = false;
			return;
		}

		const { returnChange, send, newKeys } = await cashuWallet.send(amount + fees, tokensToSend);
		if (newKeys) {
			updateMintKeys(mint, newKeys);
		}
		console.log(send);
		// remove sent tokens from storage
		token.update((state) => {
			return state.filter((token) => !tokensToSend.includes(token));
		});
		if (returnChange) {
			token.update((state) => [...returnChange, ...state]);
		}

		try {
			const { isPaid, preimage, change } = await cashuWallet.payLnInvoice(invoice, send);
			token.update((state) => [...change, ...state]);
			history.update((state) => [
				{
					type: HistoryItemType.MELT,
					amount: amount + fees - getAmountForTokenSet(change),
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
	function scanPay() {
		active = 'scan';
	}
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
			<div class="flex gap-1 w-full col-span-3">
				<input
					id="melt-invoice-input"
					type="text"
					class="input input-warning w-full "
					bind:value={invoice}
					on:input={decodeInvoice}
				/>
				<button class="btn btn-square btn-warning" on:click={scanPay}>
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
							d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
						/>
					</svg>
				</button>
			</div>
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
						<label
							tabindex="0"
							class="btn max-w-[12em] md:max-w-[20em] lg:max-w-[14em] xl:max-w-[20em] overflow-clip"
						>
							<p class=" truncate max-w-xs text-xs">
								{mint.mintURL}
							</p>
						</label>

						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<ul
							tabindex="0"
							class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48 md:w-72 max-h-56 overflow-scroll flex-row scrollbar-hide"
						>
							{#each $mints as m}
								<!-- svelte-ignore a11y-missing-attribute -->
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<li
									on:click={() => {
										mint = m;
										decodeInvoice();
									}}
									class="rounded-xl {m.mintURL === mint.mintURL ? 'bg-primary' : ''}"
								>
									<a>{m.mintURL}</a>
								</li>
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

		<div class="divider" />

		<div class="grid grid-cols-4 items-start pt-5">
			<p>Amount:</p>
			<p class="col-span-3">{amount} sats</p>
			<p>Fees:</p>
			<p class="col-span-3">{fees} sats</p>
			<div class="divider col-span-2 my-0.5" />
			<div class="col-span-2" />
			<p class="font-bold">Total:</p>
			<p class="col-span-3 font-bold">{fees + amount} sats</p>
		</div>
	</div>

	<CoinSelection amount={amount + fees} {mint} bind:selectedTokens bind:isCoinSelection />

	<div class="flex items-center gap-2">
		<button class="btn btn-outline" on:click={resetState}>cancel</button>
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
