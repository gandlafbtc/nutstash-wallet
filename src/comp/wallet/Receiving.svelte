<script lang="ts">
	import { CashuMint, CashuWallet, getDecodedToken } from '@cashu/cashu-ts';
	import { toast } from '../../stores/toasts';
	import { mints } from '../../stores/mints';
	import LoadingCenter from '../LoadingCenter.svelte';
	import type { Token } from '../../model/token';
	import { browser } from '$app/environment';
	import { token } from '../../stores/tokens';
	import type { Mint } from '../../model/mint';
	import { history } from '../../stores/history';
	import { HistoryItemType } from '../../model/historyItem';
	import { getKeysetsOfTokens, validateMintKeys } from '../util/walletUtils';
	import { QRCode } from 'svelte-qrcode-image/util';
	import { QRCodeImage } from 'svelte-qrcode-image';
	import { nostrPubKey, useExternalNostrKey, useNostr } from '../../stores/nostr';
	import { getPublicKey, nip19 } from 'nostr-tools';
	import { npubEncode } from 'nostr-tools/nip19';

	export let active;

	let mint: Mint | undefined;
	let mintId: string = '';
	export let encodedToken: string = '';
	let isValid = false;
	let isLoading = false;
	let amount = 0;
	let isComplete = false;
	let mintToAdd = '';
	let isLoadingMint = false;
	let pasteMessage = 'from clipboard';

	const receive = async () => {
		if (!isValid) {
			toast('warning', 'The Token is not valid', 'Validation failed');
			return;
		}

		try {
			mint = findMintById($mints, mintId);
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
			const cashuWallet: CashuWallet = new CashuWallet(mint.keys, cashuMint);

			isLoading = true;
			const receivedTokens: Array<Token> = await cashuWallet.receive(encodedToken);

			token.update((state) => [...state, ...receivedTokens]);

			history.update((state) => [
				{
					type: HistoryItemType.RECEIVE,
					amount,
					date: Date.now(),
					data: {
						encodedToken,
						mint: mint?.mintURL ?? '',
						keyset: getKeysetsOfTokens(receivedTokens),
						receivedTokens
					}
				},
				...state
			]);
			isLoading = false;
			isComplete = true;
			toast('success', `${amount} tokens received`, 'Tokens received!');
		} catch (error) {
			console.error(error);
			isLoading = false;
			toast(
				'error',
				'Tokens are invalid or have already been redeemed',
				'Tokens could not be received'
			);
		}
	};

	const findMintById = (mints: Array<Mint>, id: string) => {
		return mints.filter((m) => m.isAdded && m.keysets.includes(id))[0];
	};

	const validateToken = () => {
		amount = 0;
		try {
			const { token } = getDecodedToken(encodedToken);
			const proofs = token[0].proofs;
			const mint = token[0].mint;
			proofs.forEach((t) => {
				mintId = t.id;
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
		isComplete = false;
		active = 'base';
		mintToAdd = '';
		pasteMessage = 'from clipboard';
	};
	const trustMint = async () => {
		const mint = new CashuMint(mintToAdd);
		try {
			const mintIndex = $mints.findIndex((m) => m.mintURL === mint.mintUrl);
			if (mintIndex > -1) {
				if ($mints[mintIndex].isAdded) {
					toast('warning', 'this mint has already been added.', "Didn't add mint!");
					return;
				}

				const allMints = $mints;
				const [newMint] = allMints.splice(mintIndex, 1);
				newMint.isAdded = true;
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
				keysets: keysets.keysets,
				isAdded: true
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

	const getEncodedNpub = async () => {
		if (!$useNostr) {
			return '';
		}
		if ($useExternalNostrKey) {
			if (browser) {
				const pubK = await window.nostr?.getPublicKey();
				if (!pubK) {
					return '';
				}
				return nip19.npubEncode(pubK);
			}
			return '';
		} else {
			if (!$nostrPubKey) {
				return '';
			}
			return Promise.resolve(nip19.npubEncode($nostrPubKey));
		}
	};

	if (encodedToken) {
		validateToken();
	}
</script>

<div class="flex flex-col gap-2">
	{#if isLoading}
		<LoadingCenter />
	{:else if isComplete}
		<div class="flex w-full h-full flex-col items-center justify-center gap-5">
			<p class="text-lg font-bold text-success">Tokens have been received.</p>
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
		<div class="flex flex-col gap-2 text-center">
			<p class="text-xl font-bold">Receive Tokens</p>
			<p>Paste a Cashu Token.</p>

			<div class="flex gap-2 items-center">
				<label for="receive-token-input">
					<p class="font-bold">Token:</p>
				</label>

				<input
					type="text"
					class="w-full input input-primary"
					id="receive-token-input"
					bind:value={encodedToken}
					on:input={validateToken}
				/>
			</div>

			{#if mintToAdd}
				<div>
					{mintToAdd}
				</div>
				<div class="grid-cols-2">
					{#if isLoadingMint}
						<button class="btn btn-disabled btn-square loading" />
					{:else}
						<button class="btn btn-success" on:click={trustMint}> trust this Mint </button>
					{/if}
				</div>
			{/if}
			<div class="grid grid-cols-5 h-16 text-start">
				{#if mintId}
					<p class="font-bold">Amount:</p>
					<p class="col-span-4">
						{amount === 0 ? '' : amount + ' sats'}
					</p>
					<p class="font-bold">From Mint:</p>
					<p class="col-span-4">
						{mintId ? mintId : ''}
					</p>
				{/if}
			</div>
		</div>
		{#await getEncodedNpub() then npub}
			{#if $useNostr && npub}
				<!-- content here -->
				<div class="flex items-center justify-center w-full">
					<div class="flex flex-col gap-2 items-center">
						<div class="badge badge-info gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-3 h-3"
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
							Receive via nostr
						</div>
						<QRCodeImage text={npub} scale={6} displayType="canvas" />
					</div>
				</div>
			{/if}
		{/await}
		<div class="flex  gap-2">
			<button class="btn" on:click={resetState}>cancel</button>
			<button class="btn {isValid ? 'btn-success' : 'btn-disabled'}" on:click={receive}>
				receive</button
			>
		</div>
	{/if}
</div>
