<script lang="ts">
	import {
		CashuMint,
		CashuWallet,
		getDecodedToken,
		getEncodedToken,
		type AmountPreference,
		type Proof
	} from '@cashu/cashu-ts';
	import { toast } from '../../stores/toasts';
	import type { Mint } from '../../model/mint';
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
	import {
		nostrPool,
		nostrPrivKey,
		nostrPubKey,
		nostrRelays,
		useExternalNostrKey,
		useNostr
	} from '../../stores/nostr';
	import type { Event } from 'nostr-tools';
	import * as nostrTools from 'nostr-tools';
	import { pendingTokens } from '../../stores/pendingtokens';
	import ScanNpub from '../elements/ScanNpub.svelte';
	import CoinSelection from '../elements/CoinSelection.svelte';
	import { updateMintKeys } from '../../actions/walletActions';
	import TokenQr from '../elements/TokenQR.svelte';
	import CustomSplits from '../elements/CustomSplits.svelte';
	import TokenIcon from '../tokens/TokenIcon.svelte';
	export let active;

	export let mint: Mint;
	export let amount = 0;
	export let selectedTokens: Proof[];
	export let isCoinSelection: boolean;
	export let encodedToken: string = '';
	export let processing: boolean;

	$: tokensForMint = getTokensForMint(mint, $token);
	let isLoading = false;
	let sendToNostrKey = '';
	let hasBeenCopied = false;
	let nostrSendLoading = false;
	let showTokenQr = false;
	let preference: AmountPreference[];
	let useAmountPreference = false;

	$: input = isCoinSelection
		? getAmountForTokenSet(selectedTokens)
		: getAmountForTokenSet(getTokensToSend(amount, getTokensForMint(mint, $token)));
	$: output = useAmountPreference
		? preference?.reduce((acc, curr) => acc + curr.amount * curr.count, 0) ?? 0
		: amount;
	$: change = input-output

	const send = async () => {
		if (isNaN(parseInt(amount)) || amount <= 0) {
			toast('warning', 'Send amount has to be a number larger than 0', 'Could not create token');
			return;
		}
		tokensForMint = getTokensForMint(mint, $token);

		let tokensToSend: Proof[] = [];
		if (isCoinSelection) {
			tokensToSend = selectedTokens;
		} else {
			tokensToSend = getTokensToSend(amount, tokensForMint);
		}

		if (amount <= 0) {
			toast('warning', 'amount must be larger than 0', 'Could not send');
			return;
		}
		if (amount > getAmountForTokenSet(tokensToSend)) {
			toast('warning', 'not enough funds', 'Could not Send');
			isLoading = false;
			return;
		}
		processing = true;
		try {
			isLoading = true;

			const cashuMint = new CashuMint(mint.mintURL);
			const cashuWallet = new CashuWallet(cashuMint, mint.keys);

			let sendPreference = undefined;
			if (useAmountPreference) {
				sendPreference = preference;
			}
			const { returnChange, send, newKeys } = await cashuWallet.send(
				amount,
				tokensToSend,
				sendPreference
			);

			if (newKeys) {
				updateMintKeys(mint, newKeys);
			}

			//remove all tokens that have been sent to mint from storage
			token.update((state) => getTokenSubset(state, tokensToSend));
			//add the tokens that are being sent to pending
			pendingTokens.update((state) => [...send, ...state]);

			//add newly minted tokens that have been returned as change
			token.update((state) => [...state, ...returnChange]);

			encodedToken = getEncodedToken({ token: [{ proofs: send, mint: mint.mintURL }] });
			history.update((state) => [
				{
					type: HistoryItemType.SEND,
					amount: amount,
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

	const shareLink = () => {
		if (browser) {
			navigator.clipboard.writeText('https://wallet.nutstash.app/?token=' + encodedToken).then(
				function () {
					toast('info', 'Sharable link has been copied to clipboard.', 'Copied!');
				},
				function (err) {
					toast('warning', 'no permission to copy', 'Oops!');
				}
			);
		}
	};

	const getPubKey = async (): Promise<string> => {
		return $useExternalNostrKey
			? await window.nostr.getPublicKey()
			: await Promise.resolve($nostrPubKey);
	};

	const getEncryptedContent = async (): Promise<string> => {
		return $useExternalNostrKey
			? await window.nostr.nip04.encrypt(await getConvertedPubKey(), encodedToken)
			: //@ts-ignore
			  await nostrTools.nip04.encrypt($nostrPrivKey, await getConvertedPubKey(), encodedToken);
	};
	const getConvertedPubKey = async () => {
		await resolveNip05();

		return sendToNostrKey.startsWith('npub')
			? nostrTools.nip19.decode(sendToNostrKey).data
			: sendToNostrKey;
	};

	const resolveNip05 = async () => {
		console.log('test for nip-5');
		if (!sendToNostrKey.includes('.')) {
			return;
		}
		const profile = await nostrTools.nip05.queryProfile(sendToNostrKey);
		if (profile?.pubkey) {
			sendToNostrKey = profile?.pubkey;
		}
	};

	const sendWithNostr = async () => {
		try {
			nostrSendLoading = true;
			const event: Event = {
				kind: nostrTools.Kind.EncryptedDirectMessage,
				//@ts-ignore
				tags: [['p', await getConvertedPubKey()]],
				content: await getEncryptedContent(),
				created_at: Math.floor(Date.now() / 1000),
				pubkey: await getPubKey()
			};
			if ($useExternalNostrKey) {
				const signedEvent = await window.nostr.signEvent(event);
				$nostrPool.publish(
					signedEvent,
					$nostrRelays.map((r) => r.url)
				);
			} else {
				event.id = nostrTools.getEventHash(event);
				const signature: string = nostrTools.signEvent(event, $nostrPrivKey);
				event.sig = signature;
				console.log(event);
				$nostrPool.publish(
					event,
					$nostrRelays.map((r) => r.url)
				);
			}
			toast('info', 'The Token is being sent over nostr', 'Sent!');
			resetState();
		} catch (e) {
			console.error(e);
			toast('error', 'The Token could not be sent over nostr', 'Error:');
		} finally {
			nostrSendLoading = false;
		}
	};

	const resetState = () => {
		amount = 0;
		encodedToken = '';
		isLoading = false;
		active = 'base';
		hasBeenCopied = false;
		showTokenQr = false;
		processing = false;
		useAmountPreference = false;
		isCoinSelection = false;
		preference = [];
	};
</script>

<div class="flex flex-col gap-5">
	{#if isLoading}
		<div class=" h-full flex items-center justify-center gap-5 flex-col">
			<p>Creating sendable token...</p>
			<LoadingCenter />
		</div>
	{:else if encodedToken}
		<div class="grid grid-cols-1 gap-2">
			<div class="flex flex-col gap-2 text-center">
				<p class="text-8xl">
					{getAmountForTokenSet(
						getDecodedToken(encodedToken)
							.token.map((t) => t.proofs)
							.flat()
					)}
				</p>
				<p class="text-2xl">Sats Cashu token is ready!</p>
				<p class="font-bold">Copy the newly generated token below and send it to someone.</p>

				<div class="flex gap-2 flex-col justify-center w-full">
					<div class="flex flex-col gap-2 items-center">
						<div class="w-72 h-72">
							<TokenQr token={encodedToken} />
						</div>
						<input
							class="w-72 input input-primary"
							id="send-token-input"
							readonly
							value={encodedToken}
						/>
					</div>
					<div class="flex gap-2 w-full justify-center pt-4">
						<button class="btn btn-secondary" on:click={shareLink}>
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
									d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
								/>
							</svg>
							share link
						</button>
						<button class="btn btn-primary" on:click={copyToken}>
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
							Copy token
						</button>
					</div>
				</div>
			</div>
			{#if $useNostr}
				<div class="divider">OR</div>
				<p class="font-bold text-center">Send via Nostr:</p>
				<div class="pt-2 flex gap-2 items-center w-full">
					<div class="inline-block relative w-full join">
						<div class="flex">
							<input
								type="text"
								class="input input-info w-full join-item"
								bind:value={sendToNostrKey}
								placeholder="npub / hex / nip-05"
							/>

							{#if nostrSendLoading}
								<div class="btn btn-square btn-disabled loading join-item" />
							{:else}
								<button
									class="btn {sendToNostrKey ? 'btn-info' : 'btn-disabled'} flex gap-1 join-item"
									on:click={sendWithNostr}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6 rotate-12"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
										/>
									</svg>
								</button>
							{/if}
						</div>
						<label for="npub-scan-modal" class="absolute z-10 bottom-3 right-20">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 text-info"
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
						</label>
					</div>
				</div>
			{/if}
		</div>
		<div class="flex gap-2">
			<button class="btn" on:click={resetState}>close</button>
		</div>
	{:else}
		<CoinSelection {amount} {mint} bind:selectedTokens bind:isCoinSelection />
		<div class="flex gap-1 justify-center items-center">
			<label class="label cursor-pointer gap-1 flex justify-center items-center">
				<input
					id="use-amount-preference"
					type="checkbox"
					bind:checked={useAmountPreference}
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

		{#if useAmountPreference}
			<div>
				<CustomSplits bind:preference {amount} />
			</div>
		{/if}

		<div class="inline-flex text-sm text-neutral gap-1 justify-center">
			{#if !isCoinSelection}
				<p>Inputs</p>
			{/if}
			{#if !useAmountPreference && !isCoinSelection}
				<p>and</p>
			{/if}
			{#if !useAmountPreference}
				<p>Outputs</p>
			{/if}
			{#if !useAmountPreference || !isCoinSelection}
				<p>will be selected automatically</p>
			{/if}
		</div>

		{#if amount && getAmountForTokenSet(getTokensForMint(mint, $token)) >= amount}
			{#if !change && !useAmountPreference}
				<div class="flex gap-2 text-success justify-center items-center">
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
					<p>token will be created offline</p>
				</div>
			{:else}
				<div class="flex gap-2 text-warning justify-center items-center">
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
					<p>token will be split before send</p>
				</div>
			{/if}
		{/if}
		{#if !(!amount || getAmountForTokenSet(getTokensForMint(mint, $token)) < amount || (isCoinSelection && getAmountForTokenSet(selectedTokens) < amount))}
			<div class="flex gap-2 justify-center w-full items-center">
				<p class="flex gap-1 items-center">
					<span class="font-bold"> Input </span>
					<TokenIcon />
					{input}
					<span> sats </span>
				</p>

				<div class="flex flex-col">
					{#if !change && !useAmountPreference}
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
								d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
							/>
						</svg>
					{:else}
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
								d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
							/>
						</svg>

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
								d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
							/>
						</svg>
					{/if}
				</div>

				<div class="flex flex-col gap-3">
					{#if !(!change && !useAmountPreference)}
						<p class="flex gap-1 items-center">
							<span class="font-bold"> Change </span>
							<TokenIcon />
							{change}
							<span> sats </span>
						</p>
					{/if}
					<p class="flex gap-1 items-center">
						<span class="font-bold"> Output </span>
						<TokenIcon />
						{output}
						<span> sats </span>
					</p>
				</div>
			</div>
		{/if}

		<div class=" flex flex-col gap-2 w-full items-center">
			<div class="flex gap-2">
				<button
					class="btn {!amount ||
					getAmountForTokenSet(getTokensForMint(mint, $token)) < amount ||
					(isCoinSelection && getAmountForTokenSet(selectedTokens) < amount)
						? 'btn-disabled'
						: 'btn-primary'}"
					on:click={send}>send</button
				>
			</div>
		</div>
	{/if}
	<ScanNpub bind:scannedNpub={sendToNostrKey} />
</div>
