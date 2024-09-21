<script lang="ts">
	import {
		getDecodedToken,
		getEncodedToken,
		getEncodedTokenV4,
		type AmountPreference,
		type Proof
	} from '@cashu/cashu-ts';
	import { toast } from '../../stores/toasts';
	import type { Mint } from '../../model/mint';
	import { token } from '../../stores/tokens';
	import LoadingCenter from '../LoadingCenter.svelte';
	import {
		formatAmount,
		getAmountForTokenSet,
		getTokensForMint,
		getTokensToSend
	} from '../util/walletUtils';
	import { browser } from '$app/environment';
	import { nostrRelays, useNostr } from '../../stores/nostr';
	import ScanNpub from '../elements/ScanNpub.svelte';
	import CoinSelection from '../elements/CoinSelection.svelte';
	import TokenQr from '../elements/TokenQR.svelte';
	import CustomSplits from '../elements/CustomSplits.svelte';
	import TokenIcon from '../tokens/TokenIcon.svelte';
	import * as walletActions from '../../actions/walletActions';
	import { unit } from '../../stores/settings';

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
	let nostrSendLoading = false;
	let preference: AmountPreference[];
	let useAmountPreference = false;
	let memo = '';
	let isLockToPub = false;
	let isValidPub = false;
	let isUseV4TokenFormat = false;
	let isChaningingTokenFormat = false;

	$: input = isCoinSelection
		? getAmountForTokenSet(selectedTokens)
		: getAmountForTokenSet(getTokensToSend(amount, getTokensForMint(mint, $token)));
	$: output = useAmountPreference
		? preference?.reduce((acc, curr) => acc + curr.amount * curr.count, 0) ?? 0
		: amount;
	$: change = input - output;

	$: sendToNostrKey, validatePubKey();

	export const send = async () => {
		if (isNaN(amount) || amount <= 0) {
			toast('warning', 'Amount must be at least 1', 'Could not create token');
			return;
		}
		tokensForMint = getTokensForMint(mint, $token);

		let tokensToSend: Proof[] = [];
		if (isCoinSelection) {
			tokensToSend = selectedTokens;
		} else {
			tokensToSend = getTokensToSend(amount, tokensForMint);
		}
		if (amount > getAmountForTokenSet(tokensToSend)) {
			toast('warning', 'Not enough funds in selected mint', 'Could not Send');
			isLoading = false;
			return;
		}
		processing = true;
		try {
			isLoading = true;

			let sendPreference = useAmountPreference ? preference : undefined;
			let pubk = isLockToPub ? await walletActions.getConvertedPubKey(sendToNostrKey) : undefined;

			//TODO check for keysize
			if (pubk?.length === 64) {
				pubk = '02' + pubk;
			}

			encodedToken = await walletActions.send(
				mint,
				amount,
				tokensToSend,
				memo ? memo : undefined,
				sendPreference,
				pubk
			);
			toast('success', 'The token is ready', `${formatAmount(amount, $unit)} Token created.`);
			isLoading = false;
		} catch (e) {
			console.error(e);
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

	const validatePubKey = async () => {
		if (!isLockToPub) {
			return;
		}
		sendToNostrKey = await walletActions.getConvertedPubKey(sendToNostrKey);
		if (
			typeof sendToNostrKey === 'string' &&
			(sendToNostrKey.length === 64 || sendToNostrKey.length === 66)
		) {
			isValidPub = true;
			toast('success', 'Ecash can be locked to this pubkey', 'Valid PubKey');
		} else {
			isValidPub = false;
			toast('warning', 'Cannot lock ecash to the', 'Invalid PubKey');
		}
	};

	const switchTokenFormat = () => {
		isUseV4TokenFormat = !isUseV4TokenFormat;
		const encodedTokenCopy = encodedToken;
		isChaningingTokenFormat = true;
		encodedToken = '';
		if (isUseV4TokenFormat) {
			setTimeout(() => {
				encodedToken = getEncodedTokenV4(getDecodedToken(encodedTokenCopy));
				isChaningingTokenFormat = false;
			}, 200);
		} else {
			setTimeout(() => {
				encodedToken = getEncodedToken(getDecodedToken(encodedTokenCopy));
				isChaningingTokenFormat = false;
			}, 200);
		}
	};

	const sendWithNostr = async () => {
		try {
			nostrSendLoading = true;
			await walletActions.sendViaNostr(sendToNostrKey, encodedToken);
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
		memo = '';
		encodedToken = '';
		isLoading = false;
		active = 'base';
		processing = false;
		useAmountPreference = false;
		isCoinSelection = false;
		preference = [];
		isLockToPub = false;
	};
</script>

<div class="flex flex-col gap-5">
	{#if isLoading}
		<div class=" h-full flex items-center justify-center gap-5 flex-col">
			<p>Creating sendable token...</p>
			<LoadingCenter />
		</div>
	{:else if isChaningingTokenFormat}
		<div class=" h-full flex items-center justify-center gap-5 flex-col">
			<p>Changing format...</p>
			<LoadingCenter />
		</div>
	{:else if encodedToken}
		<div class="grid grid-cols-1 gap-2">
			<div class="flex flex-col gap-2 text-center">
				<p class="text-8xl">
					{formatAmount(
						getAmountForTokenSet(
							getDecodedToken(encodedToken)
								.token.map((t) => t.proofs)
								.flat()
						),
						$unit
					)}
				</p>
				<p class="text-2xl">Cashu token is ready!</p>
				<div class="w-full flex flex-col gap-2 items-center">
					<button class="btn btn-primary btn-sm w-36" on:click={switchTokenFormat}>
						{#if isUseV4TokenFormat}
							<span class="text-sm">Use V3 Token</span>
						{:else}
							<span class="text-sm">Use V4 Token</span>
						{/if}
					</button>
					<p>V4 Tokens have a smaller data size, but may not yet be supported by all wallets.</p>
				</div>
				{#if memo}
					<div class="flex justify-center w-full">
						<p class="text-sm bg-base-200 rounded-md p-1 px-2 w-80 break-all">
							Memo: {memo}
						</p>
					</div>
				{/if}
				<p class="font-bold">Copy the newly generated token below and send it to someone.</p>

				<div class="flex gap-2 flex-col justify-center w-full">
					<div class="flex flex-col gap-2 items-center">
						<div class="w-72">
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
			<!-- <SendViaBt data={encodedToken} /> -->
			{#if $useNostr}
				<div class="divider">OR</div>
				<p class="font-bold text-center">Send via Nostr:</p>
				<div class="pt-2 flex gap-2 items-center w-full">
					<div class="inline-block relative w-full join">
						<div class="flex join">
							<input
								type="text"
								class="input input-info w-full join-item"
								bind:value={sendToNostrKey}
								placeholder="npub / hex / nip-05"
								on:keydown={(e) => {
									if (e.key === 'Enter') {
										sendWithNostr();
									}
								}}
							/>

							{#if nostrSendLoading}
								<button class="btn btn-square btn-disabled loading join-item" />
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
				{#if $nostrRelays.filter((e) => e.isActive).length && sendToNostrKey}
					<div class="p-3 flex flex-col bg-base-200 rounded-lg">
						<p class="text-center">
							The event will be posted as a nip-04 encrypted direct message to the following relays:
						</p>
						<div class="flex flex-col gap-2">
							{#each $nostrRelays.filter((e) => e.isActive) as r}
								<div class="badge badge-sm badge-info">
									{r.url}
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{/if}
		</div>
		<div class="flex gap-2">
			<button class="btn" on:click={resetState}>close</button>
		</div>
	{:else}
		<div class="flex gap-3 justify-center items-center flex-col">
			<div class="divider text-xs">Spend lock</div>
			{#if isLockToPub}
				<button class="btn btn-square btn-sm" on:click={() => (isLockToPub = false)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-5 h-5 text-success"
					>
						<path
							fill-rule="evenodd"
							d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
				<p class="text-xs text-success">Token will be locked to PubKey</p>
				<p class="text-xs text-warning">
					Warning! Only the corresponding private key will be able to spend the token.
				</p>
				<div class="pt-2 flex gap-2 items-center w-full">
					<div class="flex relative w-full justify-center">
						<input
							type="text"
							class="input input-success input-sm w-full"
							bind:value={sendToNostrKey}
							placeholder="PubKey"
						/>
						<label for="npub-scan-modal" class="absolute z-10 bottom-2 right-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5 text-success"
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
			{:else}
				<button class="btn btn-square btn-sm" on:click={() => (isLockToPub = true)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-5 h-5"
					>
						<path
							d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z"
						/>
					</svg>
				</button>
				<p class="text-xs">Token is spendable by anyone</p>
			{/if}
		</div>
		<div class="divider text-xs">Memo</div>
		<div class="flex gap-1 justify-center">
			<input
				type="text"
				class="bg-base-200 rounded-lg p-1 px-3 focus:outline-none w-full"
				placeholder="memo"
				bind:value={memo}
			/>
		</div>
		<div class="divider text-xs">Custom inputs & outputs</div>
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
			{#if !change && !useAmountPreference && !isLockToPub}
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
					<p>Token will be created offline</p>
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
					<p>Token will need mint signature</p>
				</div>
			{/if}
		{/if}
		{#if !(!amount || getAmountForTokenSet(getTokensForMint(mint, $token)) < amount || (isCoinSelection && getAmountForTokenSet(selectedTokens) < amount))}
			<div class="flex gap-2 justify-center w-full items-center">
				<p class="flex gap-1 items-center">
					<span class="font-bold"> Input </span>
					<TokenIcon />
					{formatAmount(input, $unit, false)}
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
							{formatAmount(change, $unit, false)}
							<span> sats </span>
						</p>
					{/if}
					<p class="flex gap-1 items-center">
						<span class="font-bold"> Output </span>
						<TokenIcon />
						{formatAmount(output, $unit, false)}
						<span> sats </span>
					</p>
				</div>
			</div>
		{/if}

		<div class=" flex flex-col gap-2 w-full items-center">
			<button
				class="btn w-full {!amount ||
				(isLockToPub && !isValidPub) ||
				getAmountForTokenSet(getTokensForMint(mint, $token)) < amount ||
				(isCoinSelection && getAmountForTokenSet(selectedTokens) < amount)
					? 'btn-disabled'
					: 'btn-primary'}"
				on:click={send}>Send</button
			>
		</div>
	{/if}
	<ScanNpub bind:scannedNpub={sendToNostrKey} />
</div>
