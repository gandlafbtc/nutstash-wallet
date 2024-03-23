<script lang="ts">
	import { CashuMint, CashuWallet, type AmountPreference } from '@cashu/cashu-ts';
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
	import CustomSplits from '../elements/CustomSplits.svelte';

	export let mint: Mint = $mints[0];
	export let active;
	export let doMint = false;
	export let isMinting: boolean;
	let amount: number | undefined = undefined;
	let qrCode: string | undefined;
	let mintingHash: string | undefined;
	let isLoading: boolean = false;
	let isPolling: boolean = false;
	let isComplete: boolean = false;
	let preference: AmountPreference[];
	let useAmountPreference = false;

	$: {
		amount;
		if (!/^[0-9]*$/.test(amount)) {
			amount = undefined;
		}
		if (amount) {
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
				amount = decode(qrCode).sections[2].value / 1000;
			}
		} else {
			qrCode = undefined;
			amount = undefined;
		}
	};

	const mintRequest = async () => {
		try {
			if (!amount) {
				toast('warning', 'No amount provided', 'Could not create invoice');
				return;
			}
			if (isNaN(amount) || amount <= 0) {
				toast('warning', 'amount must be a number greater than 0', 'Could not create invoice');
				return;
			}
			isComplete = false;
			isLoading = true;
			const cashuMint = new CashuMint(mint.mintURL);
			const mintQuote = await cashuMint.mintQuote({ amount: amount ?? 0, unit: 'sat' });
			mintingHash = mintQuote.quote;
			qrCode = mintQuote.request;
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
			if (!amount) {
				toast('warning', 'No amount provided', 'Could not create invoice');
				return;
			}
			if (mintingHash) {
				isPolling = true;
				let mintPreference = undefined;
				if (useAmountPreference) {
					mintPreference = preference;
				}
				const { proofs } = await walletActions.mint(mint, amount, mintingHash, mintPreference);
				if (proofs.length) {
					toast('success', `${amount} Tokens have been minted.`, 'Success!');
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
		amount = undefined;
		qrCode = undefined;
		mintingHash = undefined;
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
				class="flex gap-2 col-span-2 row-start-1 lg:col-span-1 flex-col items-center justify-start"
			>
				<div class="flex flex-col gap-2 items-center">
					<p class="text-2xl font-bold">Receive</p>
					<p class="text-7xl">
						{amount}
					</p>
					<p class="text-2xl font-bold">sats</p>
					<p class="font-bold">at</p>
					<div class="flex gap-1">
						<p class="font-bold">Custodian</p>
						<p class="break-all">
							{mint.mintURL}
						</p>
					</div>
				</div>
				<div class="w-full flex items-center justify-center">
					<div class="flex items-center justify-center flex-col">
						<div class="border-warning border rounded-md p-2">
							<a class="cursor-pointer" href="lightning:{qrCode}">
								<QRCodeImage text={qrCode} displayHeight={275} displayWidth={275} margin={1} />
							</a>
						</div>
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
				<p class="font-bold text-2xl">Receive</p>
				{#if qrCode}
					<p
						id="mint-req-amt"
						class="text-7xl focus:outline-none {amount ? '' : 'w-10 bg-base-200 rounded-lg'}"
					>
						{amount}
					</p>
				{:else}
					<input
						id="mint-req-amt"
						placeholder="0"
						bind:value={amount}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								mintRequest();
							}
						}}
						class="text-7xl focus:outline-none text-center max-w-xs {amount
							? 'bg-base-100'
							: 'w-10 bg-base-200 rounded-lg'}"
					/>
				{/if}
				<p class="font-bold text-2xl">sats</p>
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
			{#if amount}
				<div class="flex gap-1 justify-center items-center">
					<label class="label cursor-pointer gap-1 flex justify-center items-center">
						<input
							id="use-amount-preference"
							type="checkbox"
							bind:checked={useAmountPreference}
							class="checkbox checkbox-primary"
						/>

						<span class="label-text">Custom Outputs</span>
					</label>

					<div
						class="tooltip"
						data-tip="Cashu tokens consist of unified coin sizes to increase privacy. Per default, nutstash will try to create the token with the minimal number of coins. With custom outputs you can define the coins that will be created."
					>
						<div class="hover:text-primary cursor-help">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
								/>
							</svg>
						</div>
					</div>
				</div>
				{#if useAmountPreference}
					<div>
						<CustomSplits bind:preference amount={amount ?? 0} />
					</div>
				{/if}
			{/if}
		</div>
	{/if}
</div>
