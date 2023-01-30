<script lang="ts">
	import { browser } from '$app/environment';
	import { CashuMint, CashuWallet, getEncodedProofs } from '@gandlaf21/cashu-ts';
	import { mints } from '../../stores/mints';
	import type { NostrMessage } from '../../model/nostrMessage';
	import { nostrMessages } from '../../stores/nostr';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { getAmountForTokenSet, getKeysetsOfTokens, getMintForToken } from '../util/walletUtils';
	import type { Token } from '../../model/token';
	import { token } from '../../stores/tokens';
	import { toast } from '../../stores/toasts';
	import { history } from '../../stores/history';
	import { HistoryItemType } from '../../model/historyItem';
	import { contacts } from '../../stores/contacts';
	import type { Contact } from '../../model/contact';

	export let nostrMessage: NostrMessage;
	export let i: number;
	const date = new Date(nostrMessage.event.created_at * 1000);

	let showAdd = false;
	let contactName = '';

	let isLoading = false;

	const addContact = () => {
		const newContact: Contact = {
			name: contactName,
			pubkey: nostrMessage.event.pubkey
		};
		contacts.update((state) => [newContact, ...state]);
		showAdd = false;
	};
	const acceptToken = async () => {
		try {
			const mint = getMintForToken(nostrMessage.token.proofs[0], $mints);
			if (!mint) {
				toast('warning', 'This token is from an unknown mint.', 'Token could not be added');
				return;
			}
			if (!mint.isAdded) {
				toast(
					'warning',
					'This token is from a mint you have not added yet.',
					'Token could not be added'
				);
				return;
			}

			const cashuMint: CashuMint = new CashuMint(mint.mintURL);
			const cashuWallet: CashuWallet = new CashuWallet(mint.keys, cashuMint);
			const encodedProofs = getEncodedProofs(nostrMessage.token.proofs, nostrMessage.token.mints);

			isLoading = true;
			const newTokens: Array<Token> = await cashuWallet.receive(encodedProofs);

			token.update((state) => [...newTokens, ...state]);

			nostrMessages.update((state) => {
				const everythingElse = state.filter((nM) => {
					return nM.event.id !== nostrMessage.event.id;
				});
				nostrMessage.isAccepted = true;
				return [nostrMessage, ...everythingElse];
			});

			history.update((state) => [
				{
					type: HistoryItemType.RECEIVE_NOSTR,
					amount: getAmountForTokenSet(nostrMessage.token.proofs),
					date: Date.now(),
					data: {
						encodedToken: encodedProofs,
						mint: mint?.mintURL ?? '',
						keyset: getKeysetsOfTokens(newTokens),
						receivedTokens: newTokens,
						sender: nostrMessage.event.pubkey,
						eventId: nostrMessage.event.id
					}
				},
				...state
			]);
			toast('success', 'the Tokens have been successfully received', 'Success!');
		} catch (e) {
			console.error(e);
			toast('error', 'The Tokens could not be added to your Wallet.', 'Error!');
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
	const openModal = () => {
		// @ts-expect-error
		document.getElementById('nostr-receive-' + i).checked = true;
	};
</script>

<tr on:click={openModal}>
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
			<div class="flex h-4 w-4 cursor-pointer">
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
			</div>
		{/if}
	</td>
	<td>{getAmountForTokenSet(nostrMessage?.token?.proofs)}</td>
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
		<p>
			{$contacts.filter((c) => c.pubkey === nostrMessage.event.pubkey)[0]?.name ??
				nostrMessage.event.pubkey}
		</p>
	</td>
</tr>
<input type="checkbox" id="nostr-receive-{i}" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<div class="flex flex-col items-start">
			<p class="font-bold text-xl">You received Tokens over nostr</p>
			{#if !nostrMessage.isAccepted}
				<p class="">Click Accept to add the Tokens to your Wallet</p>
			{/if}
			<div class="grid grid-cols-5">
				<p class="font-bold">Amount:</p>
				<p class="col-span-4">
					{getAmountForTokenSet(nostrMessage?.token?.proofs) ?? ''}
				</p>
				<p class="font-bold">Mint:</p>
				<p class="col-span-4">
					{nostrMessage.token.mints[0].url}
				</p>
				<p class="font-bold">From:</p>
				<div class="flex col-span-4 items-center gap-2 overflow-clip">
					{#if !$contacts.map((c) => c.pubkey).includes(nostrMessage.event.pubkey)}
						<button class="w-4 h-4" on:click={() => (showAdd = !showAdd)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="text-info w-4 h-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
								/>
							</svg>
						</button>
					{/if}
					{#if showAdd}
					<input type="text" class="input-xs input input-primary" bind:value={contactName} />
					<button class="btn-xs btn-success rounded-md text-xs" on:click={addContact}>add</button>
					<button class="btn-xs btn-square rounded-md text-xs" on:click={()=>showAdd=false}>cancel</button>
			{:else}
						<div class="badge badge-info gap-2">
							<p>
								{$contacts.filter((c) => c.pubkey === nostrMessage.event.pubkey)[0]?.name ??
									nostrMessage.event.pubkey}
							</p>
						</div>
					{/if}
				</div>
				<p class="font-bold">Token:</p>
				<p class="col-span-4 overflow-clip">
					{getEncodedProofs(nostrMessage.token.proofs, nostrMessage.token.mints)}
				</p>
			</div>
		</div>
		<div class="modal-action">
			{#if isLoading}
				<LoadingCenter />
			{:else}
				<label for="nostr-receive-{i}" class="btn">close</label>
				{#if !nostrMessage.isAccepted}
					<button on:click={rejectToken} class="btn btn-warning">Reject</button>
					<button on:click={acceptToken} class="btn btn-success">Accept</button>
				{/if}
			{/if}
		</div>
	</div>
</div>
