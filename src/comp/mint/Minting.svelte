<script lang="ts">
	import { CashuMint, CashuWallet } from '@cashu/cashu-ts';
	import type { Mint } from '../../model/mint';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { QRCodeImage } from 'svelte-qrcode-image';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { browser } from '$app/environment';
	import { toast } from '../../stores/toasts';
	import { mintRequests } from '../../stores/mintReqs';
	import { onMount } from 'svelte';
	import { mints } from '../../stores/mints';
	import MintSelector from '../elements/MintSelector.svelte';
	import * as walletActions from '../../actions/walletActions';

	export let mint: Mint = $mints[0];
	export let active;
	export let doMint = false;
	export let isMinting: boolean;
	let mintAmount = '';
	let qrCode: string | undefined;
	let mintingHash: string | undefined;
	let wallet: CashuWallet | undefined;
	let isLoading: boolean = false;
	let isPolling: boolean = false;
	let isComplete: boolean = false;

	$: {
		mintAmount;
		if (!/^[0-9]*$/.test(mintAmount)) {
			mintAmount = '';
		}
		if (mintAmount && mintAmount != '') {
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
		checkForMintInProgress();
		if (browser) {
			if (
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
			) {
				return;
			}
			document.getElementById('mint-req-amt')?.focus();
		}
	});

	const checkForMintInProgress = () => {
		if (!mint) {
			return;
		}
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
			mintAmount = '';
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
			doMint = true;
			mintTokens();
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
				let amount = parseInt(mintAmount);

				const { proofs } = await walletActions.mint(mint, amount, mintingHash, qrCode ?? '');
				if (proofs.length) {
					toast('success', `${mintAmount} Tokens have been minted.`, 'Success!');
					isComplete = true;
				}
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
				active = 'base';
			}
		}
	};

	const abortMint = () => {
		mintRequests.update((state) => state.filter((mR) => !(mR.mintUrl === mint.mintURL)));
	};

	const resetState = () => {
		mintAmount = '';
		qrCode = undefined;
		mintingHash = undefined;
		wallet = undefined;
		isComplete = false;
		doMint = false;
	};
</script>

<div class="flex justify-center">
	{#if isLoading}
		<div class=" h-full flex items-center justify-center gap-5 flex-col">
			<p>Creating lightning invoice...</p>
			<LoadingCenter />
		</div>
	{:else if doMint}
		<div class="flex gap-2">
			<div
				class="flex gap-2 col-span-2 row-start-1 lg:col-span-1 flex-col items-center justify-between"
			>
				<div class="w-full flex items-center justify-center">
					<div class="flex items-center justify-center flex-col">
						<div class="border-warning border rounded-md p-2">
							<a class="cursor-pointer" href="lightning:{qrCode}">
								<QRCodeImage text={qrCode} displayHeight={275} displayWidth={275} margin={1} />
							</a>
						</div>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<p class="text-3xl">
						Receive {mintAmount} sats
					</p>
					<p class="font-bold">at</p>
					<div class="flex gap-1">
						<p class="font-bold">Custodian</p>
						<p class="break-all">
							{mint.mintURL}
						</p>
					</div>
				</div>
				<div class="flex pt-4 join w-72">
					<input
						type="text"
						class="input input-warning join-item"
						id="invoice-input"
						readonly
						value={qrCode}
					/>
					<button class="btn btn-square join-item btn-warning" on:click={copyInvoice}>
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
				<div class="h-8">
					{#if isPolling}
						<div class="btn btn-disabled btn-xs loading btn-square" />
					{/if}
				</div>
				<div class="flex gap-2">
					<button class="btn btn-outline" on:click={resetState}>Cancel</button>
					<button
						class="btn btn-outline btn-error"
						on:click={() => {
							abortMint();
							resetState();
						}}>delete invoice</button
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
					<input
						id="mint-req-amt"
						placeholder="0"
						bind:value={mintAmount}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								mintRequest();
							}
						}}
						class="mt-10 text-7xl focus:outline-none text-center max-w-xs {mintAmount
							? 'bg-base-100'
							: 'w-10 bg-base-200 rounded-lg'}"
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
