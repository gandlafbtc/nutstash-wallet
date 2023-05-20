<script lang="ts">
	import { CashuMint, CashuWallet, getEncodedToken } from '@cashu/cashu-ts';
	import { mints } from '../../stores/mints';
	import type { Proof } from '@cashu/cashu-ts';
	import { getMintForToken, getTokenSubset } from '../util/walletUtils';
	import TokenIcon from './TokenIcon.svelte';
	import { toast } from '../../stores/toasts';
	import { token as tokenStore } from '../../stores/tokens';
	import { pendingTokens } from '../../stores/pendingtokens';
	import { browser } from '$app/environment';
	import type { Mint } from '../../model/mint';

	export let mint: Mint | undefined;
	export let isSelected = false;

	export let token: Proof;

	export let i: number;

	let isLoading = false;
	const recycleToken = async () => {
		const mint = getMintForToken(token, $mints);
		if (!mint) {
			toast('warning', 'Add the mint first', 'Cannot recycle token!');
			return;
		}
		const cashuMint: CashuMint = new CashuMint(mint.mintURL);

		const cashuWallet: CashuWallet = new CashuWallet(mint.keys, cashuMint);
		try {
			await checkTokenSpent();
			try {
				isLoading = true;
				const encodedProofs = getEncodedToken({
					token: [{ proofs: [token], mint: getMintForToken(token, $mints)?.mintURL }]
				});
				const { proofs, tokensWithErrors } = await cashuWallet.receive(encodedProofs);
				if (tokensWithErrors) {
					throw new Error('could not redeem token');
				}
				//remove old token
				tokenStore.update((state) => getTokenSubset(state, [token]));
				//add new token
				tokenStore.update((state) => [...proofs, ...state]);
				toast('success', 'Token has been recycled.', 'Success!');
				isLoading = false;
			} catch (e) {
				isLoading = false;
				console.error(e);
				toast('error', 'could not recycle token', 'an Error occurred');
				if (browser) {
					// @ts-expect-error
					document.getElementById('token-item-modal-' + i).checked = true;
				}
			}
		} catch (e) {
			isLoading = false;
			console.error(e);
			toast('error', 'You might have lost your connection to the mint', 'an Error occurred');
		}
	};
	const deleteToken = () => {
		tokenStore.update((state) => getTokenSubset(state, [token]));
		if (browser) {
			// @ts-expect-error
			document.getElementById('token-item-modal-' + i).checked = false;
		}
	};
	const checkTokenSpent = async () => {
		const mint = getMintForToken(token, $mints);
		if (!mint) {
			toast('warining', 'Add the mint first', 'Cannot check token!');
			return;
		}
		isLoading = true;

		try {
			const cashuMint: CashuMint = new CashuMint(mint.mintURL);
			const cashuWallet: CashuWallet = new CashuWallet(mint.keys, cashuMint);
			const spentProofs = await cashuWallet.checkProofsSpent([token]);
			let hasBeenReceived = false;
			if (!$pendingTokens.includes(token)) {
				return;
			}
			pendingTokens.update((state) =>
				state.filter((p) => {
					if (!spentProofs.includes(p)) {
						return true;
					}
					hasBeenReceived = true;
					toast(
						'success',
						'The token has been removed from pending tokens',
						'This token has been redeemed'
					);
					return false;
				})
			);
			if (!hasBeenReceived) {
				toast('info', 'The token is still pending', 'This token has not been received yet');
			}
			isLoading = false;
		} catch (e) {
			console.error(e);
			toast('error', 'Could not check pending token', 'Error');
			throw new Error('could not check pending tokens');
		}
	};
</script>

<tr>
	<td>
		<div class="flex gap-1 items-center">
			{#if mint}
				<input type="checkbox" bind:checked={isSelected} class="checkbox checkbox-primary" />
			{/if}

			<TokenIcon />
			{#if $tokenStore.includes(token)}
				<button on:click={recycleToken}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-4 h-4 hover:text-primary {isLoading ? 'animate-spin' : ''}"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
						/>
					</svg>
				</button>
			{:else}
				<button on:click={checkTokenSpent}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-4 h-4 hover:text-primary {isLoading ? 'animate-spin' : ''}"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
						/>
					</svg>
				</button>
			{/if}
		</div>
	</td>
	<td>{token.amount}</td>
	<td>
		{token.id}
	</td>
	<td class="max-w-0 overflow-clip">
		<div class="overflow-x-clip">
			{getEncodedToken({
				token: [{ proofs: [token], mint: getMintForToken(token, $mints)?.mintURL }]
			})}
		</div>
	</td>
</tr>

<input type="checkbox" id="token-item-modal-{i}" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		This token couldn't be recycled. It seems like it was spent already. Do you want to delete this
		token from your Wallet?
		<div class="modal-action">
			<label for="token-item-modal-{i}" class="btn">No</label>
			<button on:click={deleteToken} class="btn btn-error">Delete</button>
		</div>
	</div>
</div>
