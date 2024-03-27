<script lang="ts">
	import { CashuMint, CashuWallet, getEncodedToken } from '@cashu/cashu-ts';
	import { mints } from '../../stores/mints';
	import type { Proof } from '@cashu/cashu-ts';
	import { getAmountForTokenSet, getKeysForUnit, getMintForToken, getTokenSubset } from '../util/walletUtils';
	import TokenIcon from './TokenIcon.svelte';
	import { toast } from '../../stores/toasts';
	import { token as tokenStore } from '../../stores/tokens';
	import { pendingTokens } from '../../stores/pendingtokens';
	import { browser } from '$app/environment';
	import type { Mint } from '../../model/mint';
	import { receive, send } from '../../actions/walletActions';

	export let mint: Mint | undefined;
	export let isSelected = false;

	export let token: Proof;

	export let i: number;

	let isLoading = false;
	let isReclaim = false;

	const reclaim =async () => {
		isReclaim = true
		const mint = getMintForToken(token, $mints);
		if (!mint) {
			toast('warning', 'Add the mint first', 'Could not reclaim token');
			return;
		}
		try {
		 await receive(mint, getEncodedToken({token:[{mint: mint.mintURL, proofs: [token]}]}));
		 pendingTokens.update((ctx)=> ctx.filter(p=>p.secret!==token.secret))
		 toast('success', 'Token has been reclaimed.', 'Success!');	
		} catch (error) {
			toast('error', 'Token has already been claimed.', 'could not reclaim');	
		}
		finally {
			isReclaim = false
		}
	}

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
			toast('warning', 'Add the mint first', 'Cannot check token!');
			return;
		}
		isLoading = true;

		try {
			const cashuMint: CashuMint = new CashuMint(mint.mintURL);
			const cashuWallet: CashuWallet = new CashuWallet(cashuMint, getKeysForUnit(mint.keys));
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

			{#if $pendingTokens.includes(token)}
			<div class="flex gap-5">

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
				{#if isReclaim}
				<div class="loading loading-xs">
					
				</div>
				{:else}
				<button on:click={reclaim}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
					</svg>					  
				</button>
				{/if}
			</div>
			{/if}
		</div>
	</td>
	<td>
		<div class=" flex gap-1 items-center overflow-x-clip">

				<TokenIcon />
				{token.amount}
		</div>
	</td>
	<td class="hidden lg:block">
		<p class="break-all">
			{token.id}
		</p>
	</td>
	<td class=" overflow-clip">
		{getMintForToken(token, $mints)?.mintURL}
	</td>
</tr>

