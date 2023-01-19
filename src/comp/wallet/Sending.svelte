<script lang="ts">
	import { CashuMint, CashuWallet } from '@gandlaf21/cashu-js';
	import { toast } from '../../stores/toasts';
	import type { Mint } from '../../model/mint';
	import { mints } from '../../stores/mints';
	import { token } from '../../stores/tokens';
	import LoadingCenter from '../LoadingCenter.svelte';
	import {
		getAmountForTokenSet,
		getKeysetsOfTokens,
		getTokensForMint,
		getTokensToSend,
		getTokenSubset
	} from '../util/walletUtils';
	import { browser } from '$app/environment';
	import { history } from '../../stores/history';
	import { HistoryItemType } from '../../model/historyItem';
	import { nostrPool, nostrPrivKey, nostrPubKey, nostrRelays, useNostr } from '../../stores/nostr';
	import type { Event } from 'nostr-tools';
	import { nip04, Kind, signEvent, getEventHash, verifySignature } from 'nostr-tools';

	let mint: Mint = $mints[0];
	$: tokensForMint = getTokensForMint(mint, $token);
	let amountToSend = 0;
	let encodedToken: string = '';
	let isLoading = false;
	let sendToNostrKey = '0b18b95e50246ed424db7e6d54630a09080162114b626cc94d24d7ba89dc76bf';

	const send = async () => {
		tokensForMint = getTokensForMint(mint, $token);
		const tokensToSend = getTokensToSend(amountToSend, tokensForMint);
		if (amountToSend <= 0) {
			toast('warning', 'amount must be larger than 0', 'Could not send');
			return;
		}
		if (
			amountToSend >
			tokensForMint.reduce((acc, t) => {
				return acc + t.amount;
			}, 0)
		) {
			toast('warning', 'not enough funds in this mint', 'Could not Send');
			amountToSend = 0;
			isLoading = false;
			throw new Error('Not enough funds for this Mint.');
		}

		try {
			isLoading = true;

			const cashuMint = new CashuMint(mint.mintURL);
			const cashuWallet = new CashuWallet(mint.keys, cashuMint);

			const { returnChange, send } = await cashuWallet.send(amountToSend, tokensToSend);

			//remove all tokens that have been sent to mint from storage
			token.update((state) => getTokenSubset(state, tokensToSend));

			//add newly minted tokens that have been returned as change
			token.update((state) => [...state, ...returnChange]);

			encodedToken = CashuWallet.getEncodedProofs(send);

			history.update((state) => [
				{
					type: HistoryItemType.SEND,
					amount: amountToSend,
					date: Date.now(),
					data: {
						encodedToken,
						mint: mint.mintURL,
						keyset: getKeysetsOfTokens([...tokensToSend, ...returnChange]),
						send,
						returnChange
					}
				},
				...state
			]);
			toast('success', 'Copy the token and send it to someone', 'Sendable Token created.');
			isLoading = false;
		} catch {
			resetState();
			toast('error', 'Sendable Token could not be created', 'Error when creating Token');
			throw new Error('Error creating sendable token');
		}
	};

	const copyToken = () => {
		if (browser) {
			let input = document.getElementById('send-token-input');
			// @ts-expect-error
			input.select();
			document.execCommand('copy');
			toast('info', 'Token has been copied to clipboard.', 'Copied!');
		}
	};

	const sendWithNostr = async () => {
		try {
		const event: Event = {
			kind: Kind.EncryptedDirectMessage,
			tags: [['p', sendToNostrKey]],
			content: await nip04.encrypt($nostrPrivKey, sendToNostrKey, encodedToken),
			created_at: Math.floor(Date.now() / 1000),
			pubkey: $nostrPubKey
		};
		event.id = getEventHash(event);
		const signature: string = signEvent(event, $nostrPrivKey);
		event.sig = signature;
		console.log(event)
		$nostrPool.publish(event, $nostrRelays);
		toast("info", "The Token is being sent over nostr","Sent!")
		resetState()
	}
	catch(e) {
		console.error(e)
		toast("error", "The Token could not be sent over nostr", 'Error:')
	}
	};

	const resetState = () => {
		if (browser) {
			// @ts-expect-error
			document.getElementById('send-modal').checked = false;
		}
		amountToSend = 0;
		encodedToken = '';
		isLoading = false;
	};
</script>

<input type="checkbox" id="send-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box flex flex-col gap-3 h-80 justify-between">
		{#if isLoading}
			<LoadingCenter />
		{:else if encodedToken}
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
				<!-- <div>
					<QRCodeImage text={encodedToken} scale={3} displayType="canvas" />
				</div> -->
				<div>
					<p class="text-lg font-bold">Tokens are ready to be sent!</p>
					<p>⚠️ Copy the new token and send it to to someone!</p>
				</div>
				<div class="flex gap-2 flex-col">
					<input
						type="text"
						class="w-full input input-primary"
						id="send-token-input"
						readonly
						value={encodedToken}
					/>
					<button class="btn btn-square" on:click={copyToken}>
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
			<div class="modal-action bottom-0">
				<button class="btn" on:click={resetState}>ok</button>
				{#if $useNostr}
					<button class="btn btn-info" on:click={sendWithNostr}>Send over Nostr</button>
				{/if}
			</div>
		{:else}
			<div class=" flex flex-col gap-2">
				<p class="font-bold text-xl">Send Tokens</p>
				<p>Create a sendable Cashu Token.</p>
				<div class="grid grid-cols-5 items-center">
					<label for="mint-send-dropdown">
						<p class="font-bold">Mint:</p>
					</label>
					{#if mint}
						<div class="dropdown col-span-4" id="mint-send-dropdown">
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label tabindex="0" class="btn m-1">{mint.mintURL}</label>

							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<ul
								tabindex="0"
								class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-56 overflow-scroll"
							>
								{#each $mints as m}
									<!-- svelte-ignore a11y-missing-attribute -->
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<li on:click={() => (mint = m)}><a>{m.mintURL}</a></li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
				<div class="grid grid-cols-5 items-center">
					<label for="send-amount-input">
						<p class="font-bold">Amount:</p>
					</label>
					<input
						type="number"
						name=""
						id="send-amount-input"
						class="input input-primary col-span-4"
						bind:value={amountToSend}
					/>
				</div>
				<div class="grid grid-cols-5">
					<p class="font-bold">Available:</p>
					<p class="col-span-4">{getAmountForTokenSet(tokensForMint)} sats</p>
				</div>
			</div>
			<div class="modal-action bottom-0">
				<label for="send-modal" class="btn">cancel</label>
				<button class="btn btn-success" on:click={send}>send</button>
			</div>
		{/if}
	</div>
</div>
