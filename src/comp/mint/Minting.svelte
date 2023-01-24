<script lang="ts">
	import { CashuMint, CashuWallet } from "@gandlaf21/cashu-js";
	import type { Mint } from "../../model/mint";
	import LoadingCenter from "../LoadingCenter.svelte";
	import { QRCodeImage } from 'svelte-qrcode-image';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { browser } from "$app/environment";
	import { toast } from "../../stores/toasts";
	import { token } from "../../stores/tokens";
	import type { Token } from "../../model/token";
	import { history } from "../../stores/history";
	import { HistoryItemType } from "../../model/historyItem";
	import { getKeysetsOfTokens } from "../util/walletUtils";


    export let mint:Mint
	export let mintIndex: number
    let mintAmount = 10;
	let qrCode: string | undefined;
	let mintingHash: string | undefined;
	let wallet: CashuWallet | undefined;
	let isLoading: boolean = false
	let isComplete: boolean = false

	// todo clean up the states

    const copyInvoice = () => {
		if (browser) {
			let input = document.getElementById("invoice-input");
			  // @ts-expect-error
			input.select();
			document.execCommand('copy');
			toast('info', 'invoice has been copied to clipboard.', 'Copied!')
		}
	};

    const mintRequest = async () => {
		isComplete = false
		isLoading = true
		const cashuMint = new CashuMint(mint.mintURL);
		wallet = new CashuWallet(mint.keys, cashuMint);
		const { pr, hash } = await wallet.requestMint(mintAmount);
		qrCode = pr;
		mintingHash = hash;
		isLoading=false
	};


    const mintTokens = async () => {
		try {
			if (wallet && mintingHash) {
				isLoading = true
				const tokens: Array<Token> = await wallet.requestTokens(mintAmount, mintingHash);
				console.log(tokens)
				token.update((state) => [...state, ...tokens]);

				history.update((state) => [{
				 type: HistoryItemType.MINT, amount:mintAmount ,date: Date.now(), data: {
					mintingHash,
					mint: mint?.mintURL,
					keyset: getKeysetsOfTokens(tokens),
					invoice: qrCode,
					tokens
				 }
			}, ...state]);

				toast("success", `${mintAmount} Tokens have been minted.` ,'Success!')
				isComplete = true
				qrCode =undefined	
				isLoading = false
			}
			else {
				toast("error","No minting request was provided.", "Could not mint Tokens.")
				isLoading = false

			}
		} catch (e) {
			console.error(e)
			toast("error","Error trying to mint tokens. Has the invoice been paid?", "Could not mint Tokens.")
			isLoading = false
			throw new Error("Error minting tokens");
		}
	};

    const resetState = () => {
		if (browser) {
			// @ts-expect-error
            document.getElementById("mint-modal-"+mintIndex).checked = false;
        }
		mintAmount = 10
		qrCode = undefined;
		mintingHash = undefined
		wallet = undefined
		isComplete= false
	};
</script>

<input type="checkbox" id="mint-modal-{mintIndex}" class="modal-toggle" />
<div class="modal">
	<div class="modal-box flex flex-col gap-3 h-80">
		{#if isLoading}
			<LoadingCenter />
		{:else if qrCode}
			<div class="grid grid-cols-2  gap-2">
				<div class="col-span-2 lg:col-span-1 flex items-center justify-center">
					<QRCodeImage text={qrCode} scale={3} displayType="canvas" />
				</div>
				<div class="flex gap-2 col-span-2 row-start-1 lg:col-span-1 flex-col items-center justify-between">
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
					<div class="flex gap-2">
						<button class="btn btn-outline" on:mouseup={resetState}
							>cancel</button
						>
						<button class="btn btn-success" on:click={mintTokens}>
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
									d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
								/>
							</svg>mint</button
						>
					</div>
				</div>
			</div>
		{:else if isComplete}
			<div class="flex w-full h-full flex-col items-center justify-center gap-5">
				<p class="text-lg font-bold text-success">Minting of tokens has been completed.</p>
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
				<button class="btn btn-outline" on:click={resetState}>ok</button>
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
				<p>
					{mint.mintURL}
				</p>
			</div>
			<div class="modal-action">
				<button class="btn btn-outline" on:click={resetState}
					>cancel</button
				>
				<button class="btn" on:click={() => mintRequest()}>request Mint</button>
			</div>
		{/if}
	</div>
</div>
