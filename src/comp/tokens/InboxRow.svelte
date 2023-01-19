<script lang="ts">
	import { browser } from '$app/environment';
	import { CashuMint, CashuWallet } from '@gandlaf21/cashu-js';
	import { mints } from '../../stores/mints';
	import type { NostrMessage } from '../../model/nostrMessage';
	import { nostrMessages } from '../../stores/nostr';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { getAmountForTokenSet, getMintForToken } from '../util/walletUtils';
	import type { Token } from '../../model/token';
	import { token } from '../../stores/tokens';
	import { toast } from '../../stores/toasts';

	export let nostrMessage: NostrMessage;
	export let i: number;
	const date = new Date(nostrMessage.event.created_at * 1000);

	let isLoading = false;
	const acceptToken = async () => {
		//todo receive token
		isLoading = true;
		try {
			const mint = getMintForToken(nostrMessage.token[0], $mints);
			const cashuMint: CashuMint = new CashuMint(mint.mintURL);
			const cashuWallet: CashuWallet = new CashuWallet(mint.keys, cashuMint);
			const newTokens: Array<Token> = await cashuWallet.recieve(
				CashuWallet.getEncodedProofs(nostrMessage.token)
			);

			token.update((state) => [...newTokens, ...state]);

			nostrMessages.update((state) => {
				const everythingElse = state.filter((nM) => {
					return nM.event.id !== nostrMessage.event.id;
				});
				nostrMessage.isAccepted = true;
				return [nostrMessage, ...everythingElse];
			});
			toast('success', 'the Tokens have been successfully received', 'Success!')
		} catch {
			toast('error', 'The Tokens could not be added to your Wallet.', 'Error!')

		}
		if (browser) {
				// @ts-expect-error
				document.getElementById('nostr-receive-' + i).checked = false;
			}
		isLoading = false;
	};
	const rejectToken = () => {
		nostrMessages.update((state) => {
			const everythingElse = state.filter((nM) => {
				return nM.event.id !== nostrMessage.event.id;
			});
			nostrMessage.isAccepted = true;
			return [nostrMessage, ...everythingElse];
		});
		if (browser) {
			// @ts-expect-error
			document.getElementById('nostr-receive-' + i).checked = false;
		}
	};
</script>

<tr>
	<td>
		{#if nostrMessage.isAccepted}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-4 h-4 text-info rotate-12"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
				/>
			</svg>
		{:else}
			<label class="flex h-4 w-4 cursor-pointer" for="nostr-receive-{i}">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-4 h-4 text-info animate-ping absolute inline-flex"
				>
					<path
						d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-4 h-4 text-info relative inline-flex rounded-full "
				>
					<path
						d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
					/>
				</svg>
			</label>
		{/if}
	</td>
	<td>{getAmountForTokenSet(nostrMessage.token)}</td>
	<td>
		<p class="hidden lg:flex">
			{date.toLocaleString('en-us', {
				dateStyle: 'medium',
				timeStyle: 'medium'
			})}
		</p>
		<p class="flex lg:hidden">
			{date.toLocaleString('en-us', {
				dateStyle: 'short'
			})}
		</p>
	</td>
	<td class="max-w-0 overflow-clip">
		{nostrMessage.event.pubkey}
	</td>
</tr>

<input type="checkbox" id="nostr-receive-{i}" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<div class="flex flex-col items-start">
			<p class="font-bold text-xl">You received Tokens over nostr</p>
			<p class="">Click Accept to add the Tokens to your Wallet</p>
			<div class="grid grid-cols-5">
				<p class="font-bold">Amount:</p>
				<p class="col-span-4">
					{getAmountForTokenSet(nostrMessage.token)}
				</p>
				<p class="font-bold">Mint:</p>
				<p class="col-span-4">
					{nostrMessage.token[0].id}
				</p>
				<p class="font-bold">From:</p>
				<p class="col-span-4 overflow-clip">
					{nostrMessage.event.pubkey}
				</p>
			</div>
		</div>
		<div class="modal-action">
			{#if isLoading}
				<LoadingCenter />
			{:else}
				<label for="nostr-receive-{i}" class="btn">close</label>
				<button on:click={rejectToken} class="btn btn-warning">Reject</button>
				<button on:click={acceptToken} class="btn btn-success">Accept</button>
			{/if}
		</div>
	</div>
</div>
