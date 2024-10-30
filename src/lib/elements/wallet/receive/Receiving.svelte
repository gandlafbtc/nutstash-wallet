<script lang="ts">
	import { CashuMint, getDecodedToken, type OutputAmounts } from '@cashu/cashu-ts';
	import * as walletActions from '$lib/actions/walletActions';
	import { toast } from '$lib/stores/toasts';
	import { mints } from '$lib/stores/mints';
	import type { Mint } from '$lib/model/mint';
	import { formatAmount, getAmountForTokenSet, validateMintKeys } from '$lib/util/walletUtils';
	import ScanToken from '../elements/ScanToken.svelte';
	import CustomSplits from '../elements/CustomSplits.svelte';
	import NostrReceiveQr from '../elements/NostrReceiveQR.svelte';
	import { parseSecret } from '@gandlaf21/cashu-crypto/modules/common/NUT11';
	import { unit } from '$lib/stores/settings';
	import { copyTextToClipboard } from '../util/utils';
	import { nostrKeys } from '$lib/stores/nostr';

	export let active: string;
	export let encodedToken: string = '';
	export let isToken: boolean;
	export let activeR = 'receive';

	let mint: Mint | undefined;
	let preference: AmountPreference[];

	let mintId: string = '';
	let isValid = false;
	let isLoading = false;
	let amount = 0;
	let memo = '';
	let mintToAdd = '';
	let isLoadingMint = false;
	let pasteMessage = 'from clipboard';
	let isCustomSplits = false;
	let isOffline = false;
	let lockPubs: string[] = [];
	let customPriv = '';

	let myPub = $nostrKeys.length ? $nostrKeys[0].pub : '';

	const receive = async () => {
		if (!isValid) {
			toast('warning', 'The Token is not valid', 'Validation failed');
			return;
		}

		try {
			mint = $mints.find((m) => {
				return m.mintURL === mintId;
			});
			if (!mint) {
				toast('warning', 'Add the mint first', 'Not connected to this mint');
				mintToAdd = getDecodedToken(encodedToken).token[0].mint;
				return;
			}
			if (isOffline) {
				const proofs = walletActions.receiveOffline(encodedToken);

				toast('info', `Receive token when you are online`, 'Offline token added!');
			} else {
				isLoading = true;
				let receiveCustomSplits = undefined;
				if (isCustomSplits) {
					receiveCustomSplits = preference;
				}

				const { proofs } = await walletActions.receive(
					mint,
					encodedToken,
					receiveCustomSplits,
					customPriv ? customPriv : undefined
				);
				toast(
					'success',
					`${formatAmount(getAmountForTokenSet(proofs), $unit)} received`,
					'Tokens received!'
				);
			}
			resetState();
			active = 'base';
		} catch (error) {
			console.error(error);
			toast(
				'error',
				'Tokens are invalid or have already been redeemed',
				'Tokens could not be received'
			);
		} finally {
			isLoading = false;
		}
	};

	$: {
		encodedToken = encodedToken;
		validateToken();
	}

	const validateToken = () => {
		lockPubs = [];
		if (!encodedToken) {
			resetState();
			return;
		}
		isToken = true;
		isValid = true;
		amount = 0;
		try {
			const token = getDecodedToken(encodedToken);
			const proofs = token.token[0].proofs;
			const mint = token.token[0].mint;
			mintId = mint;
			proofs.forEach((t) => {
				amount += t.amount;
				//check secrets for lock
				try {
					const secret = parseSecret(t.secret);
					if (secret[0] === 'P2PK') {
						lockPubs.push(secret[1].data);
					}
				} catch {
					// do nothing
				}
			});

			lockPubs = [...new Set(lockPubs)];

			memo = token.memo ?? '';
			isValid = true;
		} catch {
			mintId = '';
			amount = 0;
			isToken = false;
			isValid = false;
			toast('warning', 'Could not decode Token', 'The Token is not valid');
		}
	};

	const resetState = () => {
		encodedToken = '';
		isLoading = false;
		isValid = false;
		mintId = '';
		memo = '';
		amount = 0;
		mint = undefined;
		mintToAdd = '';
		pasteMessage = 'from clipboard';
		preference = [];
		lockPubs = [];
		customPriv = '';
	};
	const trustMint = async () => {
		const mint = new CashuMint(mintToAdd);
		try {
			const mintIndex = $mints.findIndex((m) => m.mintURL === mint.mintUrl);
			if (mintIndex > -1) {
				if ($mints[mintIndex]) {
					toast('warning', 'This mint has already been added.', 'Mint not added');
					return;
				}

				const allMints = $mints;
				const [newMint] = allMints.splice(mintIndex, 1);
				mints.set([newMint, ...allMints]);
				mintToAdd = '';
				return;
			}
			isLoadingMint = true;
			const keysets = await mint.getKeySets();
			const keys = await mint.getKeys();

			if (!validateMintKeys(keys)) {
				toast('error', 'The keys from that mint are invalid', 'Mint could not be added');
				return;
			}

			const storeMint: Mint = {
				mintURL: mint.mintUrl,
				keys: keys.keysets,
				keysets: keysets.keysets
			};

			mints.update((state) => [storeMint, ...state]);
			toast('success', 'Mint is now ready', 'Mint added');
			mintToAdd = '';
		} catch {
			toast('error', 'Keys could not be loaded', 'Could not add mint.');
			throw new Error('Could not add Mint.');
		} finally {
			isLoadingMint = false;
		}
	};

	if (encodedToken) {
		validateToken();
	}
</script>

{#if activeR === 'receive'}
	<div class="flex flex-col gap-2">
		{#if isLoading}
			<div class=" h-full flex items-center justify-center gap-5 flex-col">
				<p>Receiving token...</p>
				<LoadingCenter />
			</div>
		{:else}
			<div class="flex flex-col gap-2 text-center">
				{#if mintId}
					<div class="flex flex-col justify-center items-center">
						<p class="text-8xl">
							{formatAmount(amount === 0 ? 0 : amount, $unit, false)}
						</p>
						<p class="text-2xl">sats</p>

						<div class="flex gap-2 items-baseline">
							<p class="">From</p>
							<p class="col-span-4 font-bold text-xs">
								{mintId ? mintId : ''}
							</p>
						</div>
						{#if memo}
							<div class="flex justify-center w-full pt-2">
								<p class="text-sm bg-base-200 rounded-md p-1 px-2 w-80 break-all">
									Memo: {memo}
								</p>
							</div>
						{/if}
					</div>
				{/if}
				<h2 class="font-bold text-2xl">Redeem Token</h2>

				<div class="inline-block relative w-full">
					<textarea
						id="receive-token-input"
						bind:value={encodedToken}
						on:change={validateToken}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								receive();
							}
						}}
						class="textarea {isOffline ? 'textarea-accent' : 'textarea-secondary'} w-full h-40"
						placeholder="Paste a cashu token. It should look like this: cashuAeyJ0b2tlbiI6W3sicHJvb2ZzIjpbeyJpZCI6IjBOSTNUVUFz..."
					/>
					<div class="absolute z-10 bottom-4 right-4">
						<button
							class=""
							on:click={() => {
								activeR = 'scan-receive';
								isToken = true;
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="{isOffline ? 'text-accent' : 'text-secondary'} w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div class="">
					{#if mintToAdd}
						<div class="p-2 flex flex-col gap-2 bg-base-200 items-center rounded-md">
							<div class="flex flex-col gap-2 items-center">
								<p class="text-sm">Token is from a mint you haven't trusted yet:</p>
								<div class="">
									<p class="w-fit text-sm bg-base-300 rounded-full p-1">
										{mintToAdd}
									</p>
								</div>
								<p class="text-sm">You can only receive tokens from mints you trust.</p>
							</div>
							<div class="grid-cols-2">
								{#if isLoadingMint}
									<button class="btn btn-disabled btn-square loading" />
								{:else}
									<button class="btn btn-secondary" on:click={trustMint}> Trust this Mint </button>
								{/if}
							</div>
						</div>
					{/if}
				</div>
				{#if amount && encodedToken}
					<div class="justify-center w-full flex gap-1 items-center">
						<label class="label cursor-pointer p-0 flex gap-1 justify-center">
							<input
								type="checkbox"
								bind:checked={isCustomSplits}
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
				{/if}
				{#if isCustomSplits}
					<CustomSplits {amount} bind:preference />
				{/if}
				<div>
					<div class="form-control w-full flex justify-center items-center">
						<label class="label cursor-pointer w-44">
							<span class="label-text {isOffline ? 'text-accent' : ''}">Receive offline</span>
							<input type="checkbox" class="toggle toggle-accent" bind:checked={isOffline} />
						</label>
					</div>
				</div>
				{#if !encodedToken}
					<div class="gap-2 flex flex-col items-center justify-center w-full">
						<div class="{isOffline ? 'w-80' : 'w-40'} transition-transform">
							<NostrReceiveQr {isOffline}></NostrReceiveQr>
							<div class="w-full join">
								<input
									type="text"
									readonly
									class=" join-item w-full input-sm input {isOffline
										? 'input-accent'
										: 'input-secondary'}"
									value={myPub}
								/>
								<button
									class=" join-item btn-sm btn {isOffline ? 'btn-accent' : 'btn-secondary'}"
									on:click={() => copyTextToClipboard(myPub)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
										/>
									</svg>
								</button>
							</div>
						</div>
						<p class="text-neutral">
							Let the sender scan this QR code to lock the ecash to your PubKey or send it to you
							over nostr.
						</p>
					</div>
				{/if}

				{#if isOffline && !lockPubs.length && isValid}
					<p class="text-warning">
						Token is not locked! Offline receiving unlocked ecash is double-spendable by the sender.
					</p>
				{:else if isOffline && lockPubs.length > 1 && isValid}
					<p class="text-warning">
						Token is locked to multiple different keys! Nutstash only supports one key at a time.
					</p>
				{:else if isOffline && lockPubs.length === 1 && isValid}
					{#if lockPubs[0] === myPub || lockPubs[0] === '02' + myPub}
						<p class="text-success">Token is locked to your pubkey and can be received offline.</p>
					{:else}
						<p class="text-error">
							Token is locked to a different pubkey and cannot be claimed by this wallet.
						</p>
					{/if}
				{:else if !isOffline && lockPubs.length === 1 && isValid}
					{#if lockPubs[0] === myPub || lockPubs[0] === '02' + myPub}
						<p class="text-success">Token is locked to your pubkey.</p>
					{:else}
						<p class="text-error">
							Token is locked to a different pubkey and cannot be claimed by this wallet.
						</p>
						<p>Try to unlock with different key</p>
						<input
							class="input input-sm input-secondary w-full"
							type="text"
							bind:value={customPriv}
						/>
					{/if}
				{/if}
				<div class="h-24 text">
					{#if isOffline && lockPubs.length && !(lockPubs[0] === myPub || lockPubs[0] === '02' + myPub)}
						<button class="btn w-full btn-disabled"> Cannot receive this token </button>
					{:else}
						<div class="flex justify-center gap-2 mt-10">
							<button
								class="btn w-full {isValid
									? isOffline
										? 'btn-accent'
										: 'btn-secondary'
									: 'btn-disabled'}"
								on:click={receive}
							>
								Receive {isOffline ? 'offline' : ''}</button
							>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
{:else if activeR === 'scan-receive'}
	<ScanToken bind:activeR bind:scannedToken={encodedToken} />
{/if}
