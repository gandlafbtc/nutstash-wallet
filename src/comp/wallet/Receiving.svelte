<script lang="ts">
	import { CashuMint, CashuWallet, getDecodedToken, type AmountPreference } from '@cashu/cashu-ts';
	import { toast } from '../../stores/toasts';
	import { mints } from '../../stores/mints';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { token } from '../../stores/tokens';
	import type { Mint } from '../../model/mint';
	import { history } from '../../stores/history';
	import { HistoryItemType } from '../../model/historyItem';
	import { getKeysetsOfTokens, validateMintKeys } from '../util/walletUtils';
	import NostrReceiveQr from '../elements/NostrReceiveQR.svelte';
	import { updateMintKeys } from '../../actions/walletActions';
	import ScanToken from '../elements/ScanToken.svelte';
	import CustomSplits from '../elements/CustomSplits.svelte';

	export let active: string;
	export let encodedToken: string = '';
	export let isToken: boolean;
	export let activeR = 'receive';

	let mint: Mint | undefined;
	let preference: AmountPreference[];

	let mintId: string = '';
	let isValid = false;
	let isLoading = false;
	let amount = 0;
	let mintToAdd = '';
	let isLoadingMint = false;
	let pasteMessage = 'from clipboard';
	let isCustomSplits = false;

	const receive = async () => {
		if (!isValid) {
			toast('warning', 'The Token is not valid', 'Validation failed');
			return;
		}

		try {
			mint = $mints.find((m) => {
				return m.mintURL === mintId;
			});
			if (!mint) {
				toast(
					'warning',
					'Receive tokens from this mint by adding the mint',
					'Not connected to this mint'
				);
				mintToAdd = getDecodedToken(encodedToken).token[0].mint;
				return;
			}
			const cashuMint: CashuMint = new CashuMint(mint.mintURL);
			const cashuWallet: CashuWallet = new CashuWallet(cashuMint, mint.keys);

			isLoading = true;

			let receiveCustomSplits = undefined;
			if (isCustomSplits) {
				receiveCustomSplits = preference;
			}
			const {
				token: tokens,
				tokensWithErrors,
				newKeys
			} = await cashuWallet.receive(encodedToken, receiveCustomSplits);

			if (newKeys) {
				updateMintKeys(mint, newKeys);
			}
			const proofs = tokens.token.map((t) => t.proofs).flat();
			token.update((state) => [...state, ...proofs]);

			if (tokensWithErrors) {
				throw new Error('Not all tokens could be redeemed');
			}

			history.update((state) => [
				{
					type: HistoryItemType.RECEIVE,
					amount,
					date: Date.now(),
					data: {
						encodedToken,
						mint: mint?.mintURL ?? '',
						keyset: getKeysetsOfTokens(proofs),
						receivedTokens: proofs
					}
				},
				...state
			]);
			toast('success', `${amount} tokens received`, 'Tokens received!');
			resetState();
		} catch (error) {
			console.error(error);
			toast(
				'error',
				'Tokens are invalid or have already been redeemed',
				'Tokens could not be received'
			);
		} finally {
			isLoading = false;
		}
	};

	$: {
		encodedToken = encodedToken;
		validateToken();
	}

	const validateToken = () => {
		if (!encodedToken) {
			isToken = false;
			return;
		}
		isToken = true;
		amount = 0;
		try {
			const { token } = getDecodedToken(encodedToken);
			const proofs = token[0].proofs;
			const mint = token[0].mint;
			mintId = mint;
			proofs.forEach((t) => {
				amount += t.amount;
			});
			isValid = true;
		} catch {
			mintId = '';
			amount = 0;
			toast('warning', 'could not decode Token', 'the Token is not valid');
		}
	};

	const resetState = () => {
		encodedToken = '';
		isLoading = false;
		isValid = false;
		mintId = '';
		amount = 0;
		mint = undefined;
		active = 'base';
		mintToAdd = '';
		pasteMessage = 'from clipboard';
		preference = [];
	};
	const trustMint = async () => {
		const mint = new CashuMint(mintToAdd);
		try {
			const mintIndex = $mints.findIndex((m) => m.mintURL === mint.mintUrl);
			if (mintIndex > -1) {
				if ($mints[mintIndex]) {
					toast('warning', 'this mint has already been added.', "Didn't add mint!");
					return;
				}

				const allMints = $mints;
				const [newMint] = allMints.splice(mintIndex, 1);
				mints.set([newMint, ...allMints]);
				mintToAdd = '';
				return;
			}
			isLoadingMint = true;
			const keysets = await mint.getKeySets();
			const keys = await mint.getKeys();

			if (!validateMintKeys(keys)) {
				toast('error', 'the keys from that mint are invalid', 'mint could not be added');
				return;
			}

			const storeMint: Mint = {
				mintURL: mint.mintUrl,
				keys,
				keysets: keysets.keysets
			};

			mints.update((state) => [storeMint, ...state]);
			toast('success', 'Mint has been added', 'Success');
			mintToAdd = '';
		} catch {
			toast(
				'error',
				'keys could not be loaded from:' + mint.mintUrl + '/keys',
				'Could not add mint.'
			);
			throw new Error('Could not add Mint.');
		} finally {
			isLoadingMint = false;
		}
	};

	if (encodedToken) {
		validateToken();
	}
</script>

{#if activeR === 'receive'}
	<div class="flex flex-col gap-2">
		{#if isLoading}
			<div class=" h-full flex items-center justify-center gap-5 flex-col">
				<p>Receiving token...</p>
				<LoadingCenter />
			</div>
		{:else}
			<div class="flex flex-col gap-2 text-center">
				{#if mintId}
					<div class="flex flex-col justify-center items-center">
						<p class="text-8xl">
							{amount === 0 ? '' : amount}
						</p>

						<div class="flex gap-2 items-baseline">
							<p class="">From</p>
							<p class="col-span-4 font-bold text-xs">
								{mintId ? mintId : ''}
							</p>
						</div>
					</div>
				{/if}
				<h2 class="font-bold text-2xl">Redeem Token</h2>

				<div class="inline-block relative w-full">
					<textarea
						id="receive-token-input"
						bind:value={encodedToken}
						on:change={validateToken}
						class="textarea textarea-secondary w-full h-40"
						placeholder="Paste a cashu token. It should look like this: cashuAeyJ0b2tlbiI6W3sicHJvb2ZzIjpbeyJpZCI6IjBOSTNUVUFz..."
					/>
					<div class="absolute z-10 bottom-4 right-4">
						<button
							class=""
							on:click={() => {
								activeR = 'scan-receive';
								isToken = true;
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="text-secondary w-6 h-6"
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

				{#if mintToAdd}
					<div>
						{mintToAdd}
					</div>
					<div class="grid-cols-2">
						{#if isLoadingMint}
							<button class="btn btn-disabled btn-square loading" />
						{:else}
							<button class="btn btn-secondary" on:click={trustMint}> trust this Mint </button>
						{/if}
					</div>
				{/if}
				{#if amount && encodedToken}

					<div class="justify-center w-full flex gap-1 items-center">
						<label class="label cursor-pointer p-0 flex gap-1 justify-center">
							<input
							type="checkbox"
								bind:checked={isCustomSplits}
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
					{/if}
					{#if isCustomSplits}
					<CustomSplits {amount} bind:preference />
					{/if}
					<div class="h-24 text">
					<div class="flex justify-center gap-2 mt-10">
						<button class="btn {isValid ? 'btn-secondary' : 'btn-disabled'}" on:click={receive}>
							receive</button
						>
					</div>
				</div>
			</div>
		{/if}
	</div>
{:else if activeR === 'scan-receive'}
	<ScanToken bind:activeR bind:scannedToken={encodedToken} />
{/if}
