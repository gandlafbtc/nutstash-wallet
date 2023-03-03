<script lang="ts">
	import { CashuMint, CashuWallet } from '@gandlaf21/cashu-ts';
	import type { Mint } from '../../model/mint';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { QRCodeImage } from 'svelte-qrcode-image';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { browser } from '$app/environment';
	import { toast } from '../../stores/toasts';
	import { token } from '../../stores/tokens';
	import type { Token } from '../../model/token';
	import { history } from '../../stores/history';
	import { HistoryItemType } from '../../model/historyItem';
	import { getKeysetsOfTokens } from '../util/walletUtils';
	import { mintRequests } from '../../stores/mintReqs';
	import { onMount } from 'svelte';

	export let mint: Mint;
	export let active;
	let mintAmount = 10;
	let qrCode: string | undefined;
	let mintingHash: string | undefined;
	let wallet: CashuWallet | undefined;
	let isLoading: boolean = false;
	let isPolling: boolean = false;
	let isComplete: boolean = false;

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

	onMount (()=> {
		if ($mintRequests.map(mR=> mR.mintUrl).includes(mint.mintURL)) {
				const mintReq = $mintRequests.find(mR=> mR.mintUrl===mint.mintURL)
				mintingHash = mintReq?.paymentHash
				qrCode = mintReq?.invoice
				const cashuMint = new CashuMint(mint.mintURL);
				wallet = new CashuWallet(mint.keys, cashuMint);
				mintTokens()
			}
	})

	const mintRequest = async () => {
		try {
			isComplete = false;
			isLoading = true;
			const cashuMint = new CashuMint(mint.mintURL);
			wallet = new CashuWallet(mint.keys, cashuMint);
				const { pr, hash } = await wallet.requestMint(mintAmount);
				mintingHash = hash
				qrCode = pr
				mintRequests.update((state)=> [{invoice:qrCode,mintUrl:mint.mintURL,isCompleted:false, paymentHash:mintingHash},...state])
			await mintTokens();
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
				const tokens: Array<Token> = await wallet.requestTokens(mintAmount, mintingHash);
				console.log(tokens);
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
				if (wallet) {
					setTimeout(mintTokens, 5000);
				}
			}
			else {
				abortMint()
			}
		}
	};

	const abortMint = () =>{
		mintRequests.update((state)=> state.filter(mR => !(mR.mintUrl === mint.mintURL)))
		resetState()
	}

	const resetState = () => {
		mintAmount = 10;
		qrCode = undefined;
		mintingHash = undefined;
		wallet = undefined;
		isComplete = false;
		active = 'base';
	};
</script>

<div>
	{#if isLoading}
		<LoadingCenter />
	{:else if qrCode}
		<div class="grid grid-cols-2  gap-2">
			<a href="lightning:{qrCode}">
				<div class="col-span-2 lg:col-span-1 w-full flex items-center justify-center ml-20 lg:ml-auto">
					<QRCodeImage text={qrCode} scale={3} displayType="canvas" />
			</div>
		</a>
			<div
				class="flex gap-2 col-span-2 row-start-1 lg:col-span-1 flex-col items-center justify-between"
			>
				<div class="flex flex-col items-center">
					<p>Pay this invoice before continuing</p>
					<div>
						<p class="font-bold">Amount:</p>
						<p>
							{decode(qrCode).sections[2].value / 1000} satoshi
						</p>
					</div>
					<div class="flex gap-2">
						<input
							type="text"
							class="w-32 input input-primary"
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

				<div class="h-8">
					{#if isPolling}
						<div class="btn btn-disabled btn-xs loading btn-square" />
					{/if}
				</div>
				<div class="flex gap-2">
					<button class="btn btn-outline" on:click={resetState}>cancel</button>
					<button class="btn btn-outline btn-error" on:click={abortMint}>Abort</button>
				</div>
			</div>
		</div>
	{:else}
		<h3 class="font-bold text-lg">Request minting of new tokens:</h3>
		<input
			type="number"
			bind:value={mintAmount}
			placeholder="Type here"
			class="input w-full input-primary col-span-4"
		/>
		<div class="flex gap-2">
			<p class="font-bold">Mint:</p>
			<p class="break-all">
				{mint.mintURL}
			</p>
		</div>
		<div class="modal-action">
			<button class="btn btn-outline" on:click={resetState}>cancel</button>
			<button class="btn" on:click={() => mintRequest()}>request Mint</button>
		</div>
	{/if}
</div>
