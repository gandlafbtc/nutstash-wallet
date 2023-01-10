<script lang="ts">
	import { CashuMint, CashuWallet } from '@gandlaf21/cashu-js';
	import { toast } from '../../stores/toasts';
	import { mints } from '../../stores/mints';
	import LoadingCenter from '../LoadingCenter.svelte';
	import type { Token } from '../../model/token';
	import { browser } from '$app/environment';
	import { token } from '../../stores/tokens';
	import type { Mint } from '../../model/mint';
	import { history } from '../../stores/history';
	import { HistoryItemType } from '../../model/historyItem';

	let mint: Mint | undefined;
	let mintId: string = '';
	let encodedToken: string = '';
	let isValid = false;
	let isLoading = false;
	let amount = 0;
	let isComplete = false;

	const receive = async () => {
		if (!isValid) {
			toast('warning', 'The Token is not valid', 'Validation failed');
			return;
		}

        
		try {
            mint = findMintById($mints, mintId);
            if (!mint) {
                toast('warning', 'Can not recieve tokens from this mint', 'Not connected to this mint');
                return;
            }
			const cashuMint: CashuMint = new CashuMint(mint.mintURL);
			const cashuWallet: CashuWallet = new CashuWallet(mint.keys, cashuMint);

			const receivedTokens: Array<Token> = await cashuWallet.recieve(encodedToken);

			token.update((state) => [...state, ...receivedTokens]);
            
            history.update((state) => [{
				 type: HistoryItemType.RECEIVE,amount ,date: new Date(), data: {
					encodedToken,
					mint: mint?.mintURL,
					keyset: mint?.keysets[0],
					receivedTokens,
				 }
			}, ...state]);

			isComplete = true;
		} catch {
			toast('error', 'Tokens could not be received', 'an Error occured');
		}
	};

	const findMintById = (mints: Array<Mint>, id: string) => {
		return mints.filter((m) => m.keysets[0] === id)[0];
	};

	const validateToken = () => {
		try {
			const decodedTokens: Array<Token> = CashuWallet.getDecodedProofs(encodedToken);
			decodedTokens.forEach((t) => {
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
		if (browser) {
			document.getElementById('receive-modal').checked = false;
		}
		encodedToken = '';
		isLoading = false;
		isValid = false;
		mintId = '';
		amount = 0;
		mint = undefined;
        isComplete = false
	};
</script>

<input type="checkbox" id="receive-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box flex flex-col gap-3 h-80 justify-between">
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
			<div class="flex flex-col">
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
				<div class="flex flex-col">
					<div class="flex">
						<p>From Mint:</p>
						<p>
							{mintId ? mintId : '-'}
						</p>
					</div>
					<div class="flex">
						<p>Amount:</p>
						<p>
							{amount === 0 ? '-' : amount}
						</p>
					</div>
				</div>
			</div>
			<div class="modal-action bottom-0">
				<button class="btn" on:click={resetState}>cancel</button>
				<button class="btn btn-success" on:click={receive}>receive</button>
			</div>
		{/if}
	</div>
</div>
