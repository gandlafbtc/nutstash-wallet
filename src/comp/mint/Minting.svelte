<script lang="ts">
	import { CashuMint, CashuWallet } from '@cashu/cashu-ts';
	import type { Mint } from '../../model/mint';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { QRCodeImage } from 'svelte-qrcode-image';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { browser } from '$app/environment';
	import { toast } from '../../stores/toasts';
	import { token } from '../../stores/tokens';
	import { history } from '../../stores/history';
	import { HistoryItemType } from '../../model/historyItem';
	import { getKeysetsOfTokens } from '../util/walletUtils';
	import { mintRequests } from '../../stores/mintReqs';
	import { onMount } from 'svelte';
	import type { Proof } from '@cashu/cashu-ts';
	import { updateMintKeys } from '../../actions/walletActions';
	import { mints } from '../../stores/mints';
	import MintSelector from '../elements/MintSelector.svelte';

	export let mint: Mint = $mints[0];
	export let active;
	export let isMinting: boolean;
	export let doMint = false;
	let mintAmount = '0';
	let qrCode: string | undefined;
	let mintingHash: string | undefined;
	let wallet: CashuWallet | undefined;
	let isLoading: boolean = false;
	let isPolling: boolean = false;
	let isComplete: boolean = false;

	$: {
		mintAmount;
		if (mintAmount && mintAmount != '0') {
			isMinting = true;
		} else {
			isMinting = false;
		}
	}

	$: {
		mint;
		checkForMintInProgress();
	}

	// todo clean up the states

	const copyInvoice = () => {
		if (browser) {
			let input = document.getElementById('invoice-input');
			// @ts-expect-error
			input.select();
			document.execCommand('copy');
			toast('info', 'invoice has been copied to clipboard.', 'Copied!');
		}
	};

	onMount(() => {
		if (browser) {
			document.getElementById('mint-req-amt')?.focus();
		}
		checkForMintInProgress();
	});

	const checkForMintInProgress = () => {
		if ($mintRequests.map((mR) => mR.mintUrl).includes(mint.mintURL)) {
			const mintReq = $mintRequests.find((mR) => mR.mintUrl === mint.mintURL);
			mintingHash = mintReq?.paymentHash;
			qrCode = mintReq?.invoice;
			if (qrCode) {
				mintAmount = decode(qrCode).sections[2].value / 1000;
			}
			const cashuMint = new CashuMint(mint.mintURL);
			wallet = new CashuWallet(cashuMint, mint.keys);
		} else {
			qrCode = undefined;
			mintAmount = '0';
		}
	};

	const mintRequest = async () => {
		try {
			let amount = parseInt(mintAmount);
			if (isNaN(amount) || amount <= 0) {
				toast('warning', 'amount must be a number greater than 0', 'Could not create invoice');
				return;
			}
			isComplete = false;
			isLoading = true;
			const cashuMint = new CashuMint(mint.mintURL);
			wallet = new CashuWallet(cashuMint, mint.keys);
			const { pr, hash } = await wallet.requestMint(amount);
			mintingHash = hash;
			qrCode = pr;
			mintRequests.update((state) => [
				{
					invoice: qrCode ?? '',
					mintUrl: mint.mintURL,
					isCompleted: false,
					paymentHash: mintingHash ?? ''
				},
				...state
			]);
			await mintTokens();
			doMint = true;
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	};

	const mintTokens = async () => {
		try {
			if (wallet && mintingHash) {
				isPolling = true;
				const { proofs: tokens, newKeys } = await wallet.requestTokens(mintAmount, mintingHash);
				if (newKeys) {
					updateMintKeys(mint, newKeys);
				}
				token.update((state) => [...state, ...tokens]);

				history.update((state) => [
					{
						type: HistoryItemType.MINT,
						amount: mintAmount,
						date: Date.now(),
						data: {
							mintingHash,
							mint: mint?.mintURL,
							keyset: getKeysetsOfTokens(tokens),
							invoice: qrCode,
							tokens
						}
					},
					...state
				]);

				toast('success', `${mintAmount} Tokens have been minted.`, 'Success!');
				isComplete = true;
			} else {
				toast('error', 'No minting request was provided.', 'Could not mint Tokens.');
			}
		} catch (e) {
			console.error(e);
		} finally {
			isPolling = false;
			if (!isComplete) {
				if (doMint) {
					setTimeout(mintTokens, 5000);
				}
			} else {
				abortMint();
				resetState();
			}
		}
	};

	const abortMint = () => {
		mintRequests.update((state) => state.filter((mR) => !(mR.mintUrl === mint.mintURL)));
	};

	const resetState = () => {
		mintAmount = '0';
		qrCode = undefined;
		mintingHash = undefined;
		wallet = undefined;
		isComplete = false;
		doMint = false;
	};
</script>

<div class="flex justify-center">
	{#if isLoading}
		<LoadingCenter />
	{:else if doMint}
		<div class="flex gap-2">
			<div
				class="flex gap-2 col-span-2 row-start-1 lg:col-span-1 flex-col items-center justify-between"
			>
				<div class="flex flex-col items-center">
					<p class="font-bold text-lg pb-2">
						Pay this invoice to mint ecash and top up your wallet.
					</p>
					<div class="flex gap-1">
						<p class="font-bold">Amount:</p>
						<p>
							{mintAmount} satoshi
						</p>
					</div>
					<div class="flex gap-1">
						<p class="font-bold">Custodian:</p>
						<p class="break-all">
							{mint.mintURL}
						</p>
					</div>
					<div class="flex gap-2 pt-4">
						<input
							type="text"
							class="w-32 input input-success"
							id="invoice-input"
							readonly
							value={qrCode}
						/>
						<button class="btn btn-square" on:click={copyInvoice}>
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
									d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
								/>
							</svg>
						</button>
					</div>
				</div>
				<a href="lightning:{qrCode}">
					<div class="w-full flex items-center justify-center">
						<div class="flex items-center justify-center flex-col">
							<div class="text-sm bg-success text-success-content rounded-t-lg p-1 px-2">
								Invoice - Scan with Lightning wallet
							</div>
							<div class="border-success border-2 rounded-md p-2">
								<QRCodeImage text={qrCode} displayHeight={350} displayWidth={350} margin={1} />
							</div>
						</div>
					</div>
				</a>
				<div class="h-8">
					{#if isPolling}
						<div class="btn btn-disabled btn-xs loading btn-square" />
					{/if}
				</div>
				<div class="flex gap-2">
					<button class="btn btn-outline" on:click={resetState}>cancel</button>
					<button
						class="btn btn-outline btn-error"
						on:click={() => {
							abortMint();
							resetState();
						}}>Abort</button
					>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex flex-col gap-2">
			<div class="flex flex-col gap-2 items-center">
				{#if qrCode}
					<p
						id="mint-req-amt"
						class="text-7xl focus:outline-none {mintAmount ? '' : 'w-10 bg-base-200 rounded-lg'}"
					>
						{mintAmount}
					</p>
				{:else}
					<p
						contenteditable="true"
						id="mint-req-amt"
						bind:textContent={mintAmount}
						class="text-7xl focus:outline-none {mintAmount ? '' : 'w-10 bg-base-200 rounded-lg'}"
					/>
				{/if}
				<p class="font-bold text-2xl">receive sats</p>
				{#if qrCode}
					<div class="flex flex-col lg:flex-row gap-1 items-center">
						<p class="text-warning">Invoice is pending.</p>
						<button
							class="btn btn-xs btn-warning"
							on:click={() => {
								abortMint();
								checkForMintInProgress();
							}}
							>abort
						</button>
						<p class="text-warning">to create a new invoice.</p>
					</div>
				{/if}
				<p class="">Create a Lightning invoice to top up this wallet.</p>
			</div>

			<div class="flex join justify-center">
				<MintSelector bind:mint />
				{#if qrCode}
					<button
						class="btn btn-warning flex gap-1 join-item"
						on:click={() => {
							doMint = true;
							mintTokens();
						}}
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
						</svg>
						<p class="hidden lg:block">Top up wallet</p>
					</button>
				{:else}
					<button
						class="btn btn-warning flex gap-1 join-item"
						on:click={() => {
							mintRequest();
						}}
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
						</svg>
						<p class="hidden lg:block">Top up wallet</p>
					</button>
					<!-- else content here -->
				{/if}
			</div>
		</div>
	{/if}
</div>
