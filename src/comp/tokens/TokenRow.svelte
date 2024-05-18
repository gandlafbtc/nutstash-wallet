<script lang="ts">
	import { CashuMint, CashuWallet, getEncodedToken } from '@cashu/cashu-ts';
	import { mints } from '../../stores/mints';
	import type { Proof } from '@cashu/cashu-ts';
	import { formatAmount, getKeysForUnit, getMintForToken } from '../util/walletUtils';
	import TokenIcon from './TokenIcon.svelte';
	import { toast } from '../../stores/toasts';
	import type { Mint } from '../../model/mint';
	import { receive, send } from '../../actions/walletActions';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { parseSecret } from '@gandlaf21/cashu-crypto/modules/common/NUT11';
	import { nostrPubKey } from '../../stores/nostr';
	import { token as tokenStore } from '../../stores/tokens';
	import { pendingTokens } from '../../stores/pendingtokens';
	import { unit } from '../../stores/settings';

	export let mint: Mint | undefined;
	export let isSelected = false;
	export let isPending: boolean;

	export let token: Proof;

	export let i: number;

	let tokenModal: HTMLDialogElement;

	let isLoading = false;
	let isReclaim = false;

	$: $pendingTokens,
		(() => {
			lock = checkLock();
		})();

	$: isPending,
		(() => {
			console.log(isPending);
			lock = checkLock();
		})();

	$: $tokenStore,
		(() => {
			lock = checkLock();
		})();

	const checkLock = () => {
		try {
			const secret = parseSecret(token.secret);
			if (secret[0] === 'P2PK') {
				return secret[1].data === $nostrPubKey || secret[1].data === "02"+$nostrPubKey ? 'unlock' : 'lock';
			}
		} catch {
			return '';
		}
	};

	let lock = checkLock();

	const reclaim = async () => {
		isReclaim = true;
		const mint = getMintForToken(token, $mints);
		if (!mint) {
			toast('warning', 'Add the mint first', 'Could not reclaim token');
			return;
		}
		try {
			await receive(mint, getEncodedToken({ token: [{ mint: mint.mintURL, proofs: [token] }] }));
			pendingTokens.update((ctx) => ctx.filter((p) => p.secret !== token.secret));
			toast('success', 'Token has been reclaimed.', 'Success!');
		} catch (error) {
			toast('error', 'Token has already been claimed.', 'could not reclaim');
		} finally {
			isReclaim = false;
		}
	};

	const recycleToken = async () => {
		const mint = getMintForToken(token, $mints);
		if (!mint) {
			toast('warning', 'Add the mint first', 'Could not recycle token');
			return;
		}
		try {
			isLoading = true;
			await receive(mint, getEncodedToken({ token: [{ mint: mint.mintURL, proofs: [token] }] }));
			await send(mint, token.amount, [token]);
			toast('success', 'Token has been recycled.', 'Success!');
		} catch (e) {
			console.error(e);
			toast('error', 'An unexpected error occurred', 'Could not recycle token');
			if (browser) {
				// @ts-expect-error
				document.getElementById('token-item-modal-' + i).checked = true;
			}
		} finally {
			isLoading = false;
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
			const cashuWallet: CashuWallet = new CashuWallet(cashuMint, {keys: getKeysForUnit(mint.keys)});
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

			<div class="flex gap-5">
				<button
					on:click={() => {
						tokenModal.show();
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-4 h-4"
					>
						<path
							fill-rule="evenodd"
							d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
				<dialog bind:this={tokenModal} class="modal">
					<div class="modal-box">
						<h3 class="font-bold text-lg">Cashu proof</h3>
						<code class="break-all">{JSON.stringify(token)}</code>
						<div></div>
						<code class="break-all text-neutral">{getEncodedToken({token:[{mint: mint?.mintURL??'', proofs:[token]}]})}</code>
						<div class="modal-action">
							<form method="dialog">
								<button class="btn">Close</button>
							</form>
						</div>
					</div>
				</dialog>

				{#if $pendingTokens.includes(token)}
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
						<div class="loading loading-xs"></div>
					{:else}
						<button on:click={reclaim}>
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
									d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
								/>
							</svg>
						</button>
					{/if}
				{:else if isLoading}
					<div class="loading loading-xs"></div>
				{:else}
					<button on:click={recycleToken}>
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
								d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
							/>
						</svg>
					</button>
				{/if}
			</div>
		</div>
	</td>
	<td>
		<div class=" flex gap-1 items-center overflow-x-clip">
			{#if lock}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-5 h-5 {lock === 'unlock' ? 'text-success' : 'text-error'}"
				>
					<path
						fill-rule="evenodd"
						d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
						clip-rule="evenodd"
					/>
				</svg>
			{/if}
			<TokenIcon />
			{formatAmount(token.amount, $unit)}
		</div>
	</td>
	<td class="hidden lg:block">
		<p class="break-all">
			{token.id}
		</p>
	</td>
	<td class=" overflow-clip">
		<p class="break-all">
			{getMintForToken(token, $mints)?.mintURL}
		</p>
	</td>
</tr>
