<script lang="ts">
	import { CashuMint, CashuWallet } from '@gandlaf21/cashu-js';
	import { browser } from '$app/environment';
	import { decode } from '@gandlaf21/bolt11-decode';
	import type { Mint } from '../model/mint';
	import { mints } from '../stores/mints';
	import { toast } from '../stores/toasts';
	import { token } from '../stores/tokens';
	import { QRCodeImage } from 'svelte-qrcode-image';
	import type { Token } from 'src/model/token';
	$: allMints = $mints;
	let mintURL = 'https://legend.lnbits.com/cashu/api/v1/4gr9Xcmz3XEkUNwiBiQGoC';
	let mintAmount = 10;
	let qrCode: string | undefined;
	let mintingHash: string | undefined;
	let wallet: CashuWallet | undefined;

	const addMint = async () => {
		const mint = new CashuMint(mintURL);
		try {
			const keys = await mint.getKeys();
			const keysets = await mint.getKeySets();

			console.log(keysets);
			const storeMint: Mint = {
				mintURL,
				keys,
				keysets: keysets.keysets
			};
			allMints.push(storeMint);
			mints.set(allMints);
			toast('success', 'Mint has been added', 'Success');
		} catch {
			toast('error', 'keys could not be loaded from:' + mintURL + '/keys', 'Could not add mint.');
			throw new Error('Could not add Mint.');
		}
	};

	const copyInvoice = () => {
		if (browser) {
			let input = document.getElementById("invoice-input");
			let originalText = input.value;
			input.select();
			document.execCommand('copy');
			toast('info', 'invoice has been copied to clipboard.', 'Copied!')
		}
	};

	const removeMint = (mintIndex: number) => {
		allMints.splice(mintIndex, 1);
		mints.set(allMints);
	};

	const mintRequest = async (mintIndex: number) => {
		const mintFromStore = allMints[mintIndex];
		const mint = new CashuMint(mintFromStore.mintURL);
		wallet = new CashuWallet(mintFromStore.keys, mint);
		const { pr, hash } = await wallet.requestMint(mintAmount);
		qrCode = pr;
		mintingHash = hash;
	};

	const mintTokens = async () => {
		try {
			if (wallet && mintingHash) {
				const tokens: Array<Token> = await wallet.requestTokens(mintAmount, mintingHash);
				token.update((state) => [...state, ...tokens]);
				resetState();
			}
			else {
				toast("error","No minting request was provided.", "Could not mint Tokens.")
			}
		} catch {
			toast("error","Error trying to mint tokens.", "Could not mint Tokens.")
			throw new Error("Error minting tokens");
		}
	};

	const resetState = () => {
		qrCode = undefined;
		mintingHash = undefined
		wallet = undefined
	};
</script>

<div class="overflow-x-auto">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Mint URL</th>
				<th>Keysets</th>
				<th>Tokens from this Mint</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#if allMints.length === 0}
				<tr class="hover">
					<td colspan="3"> no mints added so far. </td>
				</tr>
			{/if}
			{#each allMints as mint, mintIndex}
				<input type="checkbox" id="mint-modal-{mintIndex}" class="modal-toggle" />
				<div class="modal">
					<div class="modal-box flex flex-col gap-3 h-80">
						{#if qrCode}
							<div class="flex gap-2">
								<QRCodeImage text={qrCode} scale={3} displayType="canvas" />
								<div class="flex gap-2 flex-col justify-between">
									<div class="flex flex-col">
										<p>Pay this invoice before continuing</p>
										<div>
											<p class="font-bold">Amount:</p>
											<p>
												{decode(qrCode).sections[2].value / 1000} satoshi
											</p>
										</div>
										<div class="flex gap-2">
											<input type="text" class="w-32 input input-primary" id="invoice-input" readonly value={qrCode} />
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
										<label for="mint-modal-{mintIndex}" class="btn btn-outline" on:mouseup={resetState}>cancel</label>
										<button class="btn btn-success" on:click={() => mintTokens()}>
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
								<label for="mint-modal-{mintIndex}" class="btn btn-outline" on:click={resetState}>cancel</label>
								<button class="btn" on:click={() => mintRequest(mintIndex)}>request Mint</button>
							</div>
						{/if}
					</div>
				</div>
				<tr class="hover">
					<td class="flex flex-col gap-2">
						<label for="mint-modal-{mintIndex}" class="btn btn-success flex gap-1">
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
							</svg>
							mint</label
						>
						<button class="btn btn-warning flex gap-1">
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
							melt</button
						>
					</td>

					<td>
						{#each mint.keysets as keyset, i}
							{keyset}
							{#if mint.keysets.length >= i + 2}
								,
							{/if}
						{/each}
					</td>
					<td
						>{$token.reduce((currVal, t) => {
							if (mint.keysets.includes(t.id)) {
								return currVal + t.amount;
							} else return currVal;
						}, 0)}
					</td>
					<td>
						<button class="btn btn-square btn-error" on:click={() => removeMint(mintIndex)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-4 h-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
								/>
							</svg>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="grid grid-cols-5 gap-1">
	<input
		type="text"
		bind:value={mintURL}
		placeholder="Type here"
		class="input w-full input-primary col-span-4"
	/>
	<button
		class="btn btn-primary"
		on:click={() => {
			addMint();
		}}
	>
		Add Mint
	</button>
</div>

<!-- Put this part before </body> tag -->
