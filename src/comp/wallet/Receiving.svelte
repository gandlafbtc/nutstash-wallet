<script lang="ts">
	import { CashuMint, CashuWallet, getDecodedProofs } from '@gandlaf21/cashu-ts';
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

	export let active;

	let mint: Mint | undefined;
	let mintId: string = '';
	let encodedToken: string = '';
	let isValid = false;
	let isLoading = false;
	let amount = 0;
	let isComplete = false;
	let mintToAdd = ''
	let isLoadingMint = false

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
				mintToAdd = getDecodedProofs(encodedToken).mints.filter(m => m.keysets.includes(mintId))[0].url
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
		} catch {
			isLoading = false;
			toast('error', 'Tokens could not be received', 'an Error occured');
		}
	};

	const findMintById = (mints: Array<Mint>, id: string) => {
		return mints.filter((m) => m.keysets.includes(id))[0];
	};

	const validateToken = () => {
		try {
			const { proofs, mints } = getDecodedProofs(encodedToken);
			proofs.forEach((t) => {
				mintId = t.id;
				amount += t.amount;
			});
			isValid = true;
		} catch {
			mintId = '';
			amount = 0;
			toast('warning', 'could not decode Token', 'the Token is not valid');
			throw new Error('Could not decode token');
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
		mintToAdd = ''
	};
	const trustMint= async () => {
		const mint = new CashuMint(mintToAdd);
		try {
			if ($mints.filter((m) => m.mintURL === mint.mintUrl).length > 0) {
				toast('warning', 'this mint has already been added.', "Didn't add mint!");
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
			mintToAdd = ''
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
		<div class="flex flex-col gap-2">
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
					<button class="btn btn-disabled btn-square loading">
					</button>
					{:else}
					<button class="btn btn-success" on:click={trustMint}>
						trust this Mint
					</button>
					{/if}

				</div>
			{/if}
			<div class="grid grid-cols-5 h-16">
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
		<div class="flex  gap-2">
			<button class="btn" on:click={resetState}>cancel</button>
			<button class="btn {isValid?'btn-success':'btn-disabled'}" on:click={receive}>receive</button>
		</div>
	{/if}
</div>
