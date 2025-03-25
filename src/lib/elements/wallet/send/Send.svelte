<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import MintSelector from '$lib/elements/ui/MintSelector.svelte';
	import UnitSelector from '$lib/elements/ui/UnitSelector.svelte';
	import { mints } from '$lib/stores/persistent/mints';
	import {
		checkValidPubkey,
		formatAmount,
		getAmountForTokenSet,
		getAproxAmount,
		getProofsOfMintUnit,
		getUnitsForMints,
		isNumeric
	} from '$lib/util/walletUtils';
	import {
		QrCode,
		Zap,
		LoaderCircle,
		Banknote,
		Copy,
		HandCoins,
		Check,
		X,
		Coins,
		WifiOff,
		Scan
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { push } from 'svelte-spa-router';
	import NumericKeys from '$lib/elements/ui/NumericKeys.svelte';
	import { unit } from '$lib/stores/persistent/settings';
	import { proofsStore } from '$lib/stores/persistent/proofs';
	import TokenOptions from './TokenOptions.svelte';
	import { toast } from 'svelte-sonner';
	import { createMeltQuote, getFeeForProofs, sendEcash } from '$lib/actions/actions';
	import { openScannerDrawer, openSendDrawer } from '$lib/stores/session/drawer';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { copyTextToClipboard } from '$lib/util/utils';
	import type { Mint, Proof } from '$lib/db/models/types';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import AddMint from '$lib/elements/mint/AddMint.svelte';
	import { selectedMint } from '$lib/stores/local/selectedMints';
	import { goto } from '$app/navigation';
	import { ensureError } from '$lib/helpers/errors';
	import Toggle from '$lib/components/ui/toggle/toggle.svelte';
	import SimpleScanner from '../scanner/simple_scanner/SimpleScanner.svelte';
	import { nip19 } from 'nostr-tools';
	import { sendInput } from '$lib/stores/session/sendInput';

	interface Props {
		input?: string;
	}

	let { input }: Props = $props();

	let entered: string = $state(input ?? '');
	let scanPubKey = $state(false);

	const getCurrentUnit = () => {
		if (!mint) {
			return 'sat';
		}
		return getUnitsForMints([mint]).find((u) => u === $unit) ? $unit : 'sat';
	};

	let mint: Mint | undefined = $state($selectedMint !== -1 ? $mints[$selectedMint] : $mints[0]);
	let currentUnit: string = $state(getCurrentUnit());

	let unitProofs: Proof[] = $derived(getProofsOfMintUnit(mint, $proofsStore, currentUnit));
	let balance = $derived(getAmountForTokenSet(unitProofs));
	let invoice = $derived.by(() => {
		if (
			entered.toLowerCase().startsWith('lnbc') ||
			entered.toLowerCase().startsWith('lightning:lnbc')
		) {
			return entered;
		} else {
			return '';
		}
	});

	$effect(() => {
		if (entered.startsWith('npub') || checkValidPubkey(entered)) {
			tokenOptions.pubkey = entered;
			entered = '1';
			tokenOptions.p2pk = true;
			tokenOptions.isValidPubkey = true;
		}
		if (entered.startsWith('creq')) {
			openSendDrawer.set(false);
			push('/wallet/send/cashureq/' + entered);
		}
	});

	let amount = $derived.by(() => {
		if (isNumeric(entered)) {
			return parseInt(entered);
		}
	});

	let tokenOptions = $state({
		p2pk: false,
		pubkey: '',
		isOffline: false,
		isValidPubkey: false,
		customIn: false,
		customOut: false,
		includeReceiverFees: false
	});
	let selectedProofs: Proof[] = $derived(
		getAproxAmount(amount ?? 0, unitProofs, tokenOptions.includeReceiverFees) ?? []
	);

	let inputFocus: HTMLTextAreaElement | null = $state(null);
	let thisDrawer: HTMLDivElement | null = $state(null);

	let isLoading = $state(false);

	onMount(() => {
		if ($sendInput) {
			entered = $sendInput;
			sendInput.set('');
		}
		setTimeout(() => {
			thisDrawer?.addEventListener('keydown', (e: KeyboardEvent) => {
				if (!(e.ctrlKey && e.key === 'v')) {
					e.preventDefault();
				}
				if (e.key === 'Escape') {
					openSendDrawer.set(false);
				}
				if (e.key === 'Backspace') {
					if (isNaN(parseInt(entered))) {
						entered = '';
					}
					entered = entered.slice(0, -1);
				} else if (e.key === 'Enter') {
					if (entered.length && isNumeric(entered)) {
						sendCashu();
					}
				} else if (isNumeric(e.key)) {
					entered = entered + e.key;
				} else {
				}
			});
		}, 0);
	});

	const createQuote = async () => {
		try {
			if (!mint) {
				toast.warning('No mint selected');
				return;
			}
			isLoading = true;
			const { quote } = await createMeltQuote(mint.url, invoice, {
				unit: currentUnit
			});
			openSendDrawer.set(false);
			push('/wallet/send/ln/' + quote);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};

	$effect(() => {
		// default to offline token when p2pk is selected
		if (tokenOptions.p2pk) {
			tokenOptions.isOffline = true;
		}
	});

	const sendCashu = async () => {
		try {
			if (!mint) {
				toast.warning('No mint selected');
				return;
			}
			isLoading = true;
			if (!amount) {
				toast('Please enter amount');
				return;
			}
			if (amount > balance) {
				toast.warning('Not enough funds');
				return;
			}
			const sendOptions: {
				unit: string;
				includeFees: boolean;
				pubkey?: string;
				isOffline?: boolean;
			} = {
				unit: currentUnit,
				includeFees: tokenOptions.includeReceiverFees,
				isOffline: tokenOptions.isOffline
			};
			if (tokenOptions.p2pk) {
				if (tokenOptions.pubkey.startsWith('npub')) {
					tokenOptions.pubkey = ('02' + nip19.decode(tokenOptions.pubkey).data) as string;
				}
				if (!checkValidPubkey(tokenOptions.pubkey)) {
					toast('Invalid public key');
					return;
				}
				sendOptions.pubkey = tokenOptions.pubkey;
			}
			const { txId } = await sendEcash(mint.url, amount ?? 0, sendOptions);
			openSendDrawer.set(false);
			push('/wallet/send/cashu/' + txId);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};

	const onKeypadPress = (value: string) => {
		if (value === 'delete') {
			entered = entered.slice(0, -1);
		} else if (value === 'clear') {
			entered = '';
		} else {
			entered = entered + value;
		}
	};
</script>

{#if scanPubKey}
	<SimpleScanner
		whatToScan={'pubkey or npub'}
		bind:isScanning={scanPubKey}
		bind:scannedResult={tokenOptions.pubkey}
	></SimpleScanner>
{:else}
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="flex h-full w-full flex-col items-center justify-center gap-3"
		bind:this={thisDrawer}
		tabindex="0"
	>
		{#if !mint}
			<p class="text-destructive">No mint added to wallet! add a mint first:</p>

			<AddMint></AddMint>
		{:else}
			<div class="w-80 xl:w-[600px]">
				<MintSelector bind:mint></MintSelector>
			</div>
			<div class="flex w-80 items-center justify-between gap-2 xl:w-[600px]">
				<span>
					{formatAmount(balance, currentUnit)}
					<span class="text-xs italic text-secondary"> available </span>
				</span>
				<UnitSelector bind:currentUnit selectedMints={[mint]}></UnitSelector>
			</div>
			{#if !invoice}
				<!-- content here -->
				<div
					class="{entered.length && isNumeric(entered) ? 'h-0' : 'h-20'} relative overflow-hidden"
				>
					<div
						class="pointer-events-none absolute flex h-20 w-full flex-col items-center justify-center text-muted"
					>
						<p>Enter amount to send ecash</p>
						<p>Paste invoice to send via lightning</p>
					</div>
					<Textarea
						class="h-20 w-80 resize-none rounded-md border-dashed xl:w-[600px]"
						inputmode="none"
						bind:value={entered}
						bind:ref={inputFocus}
						oninput={(e) => {
							e.preventDefault();
						}}
						placeholder=""
					></Textarea>
				</div>
			{/if}
			<div>
				<div class="flex items-start justify-center {invoice || amount ? 'h-40' : 'h-20'}">
					{#if amount}
						<div class="flex w-80 flex-col items-center justify-between gap-2 xl:w-[600px]">
							<div class="flex w-full items-center justify-between gap-2 rounded-lg border">
								<button
									class="w-full cursor-text break-all pl-2 text-start text-2xl"
									onclick={() => inputFocus?.focus()}
								>
									{formatAmount(amount, currentUnit)}
								</button>
								<TokenOptions {mint} bind:tokenOptions></TokenOptions>
							</div>

							<div class="flex h-4 w-full items-start justify-start gap-5 text-xs">
								<!-- Include receiver fee icon disabled for now -->
								<!-- <span>
								{#if tokenOptions.includeReceiverFees}
									<Tooltip.Provider>
										<Tooltip.Root>
											<Tooltip.Trigger>
												<div class="relative">
													<HandCoins class="h-4 w-4"></HandCoins>
													<div class="absolute -right-3 top-0">
														<Check class="h-3 w-3 text-green-500"></Check>
													</div>
												</div>
											</Tooltip.Trigger>
											<Tooltip.Content>
												<div class="flex gap-1 text-xs">
													<p>Include receiver fee</p>
													{formatAmount(1, currentUnit)}
												</div>
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
								{:else}
									<Tooltip.Provider>
										<Tooltip.Root>
											<Tooltip.Trigger>
												<div class="relative">
													<HandCoins class="h-4 w-4"></HandCoins>
													<div class="absolute -right-3 top-0">
														<X class="h-3 w-3 text-yellow-500"></X>
													</div>
												</div>
											</Tooltip.Trigger>
											<Tooltip.Content>
												<div class="flex gap-1 text-xs">
													<p>Receiver fee not included</p>
												</div>
											</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
								{/if}
							</span> -->

								{#if getAmountForTokenSet(selectedProofs) < amount + (tokenOptions.includeReceiverFees ? 1 : 0)}
									<span class="text-red-500"> Not enough funds </span>
								{:else if getAmountForTokenSet(selectedProofs) > amount + (tokenOptions.includeReceiverFees ? 1 : 0) || tokenOptions.p2pk}
									<span>
										<Tooltip.Provider>
											<Tooltip.Root>
												<Tooltip.Trigger>
													<div class="relative">
														<Coins class="h-4 w-4"></Coins>
														<div class="absolute -right-3 top-0">
															<X class="h-3 w-3 text-yellow-500"></X>
														</div>
													</div>
												</Tooltip.Trigger>
												<Tooltip.Content>
													<div class="flex items-center gap-1 text-xs">
														Selected coins:
														{#each selectedProofs.map((p) => p.amount) as amount}
															<!-- content here -->
															<Badge variant="outline" class="p-1 text-xs">
																{amount}
															</Badge>
														{/each}
													</div>
												</Tooltip.Content>
											</Tooltip.Root>
										</Tooltip.Provider>
									</span>
									<span class="text-yellow-500">
										{#await getFeeForProofs(selectedProofs)}
											<LoaderCircle class="h-2 w-2 animate-spin"></LoaderCircle>
										{:then fee}
											<span class={fee ? '' : 'text-green-500'}>
												Swap required ({formatAmount(fee, currentUnit)} swap fee)
											</span>
										{/await}
									</span>
								{:else}
									<span>
										<Tooltip.Provider>
											<Tooltip.Root>
												<Tooltip.Trigger>
													<div class="relative">
														<Coins class="h-4 w-4"></Coins>
														<div class="absolute -right-3 top-0">
															<Check class="h-3 w-3 text-green-500"></Check>
														</div>
													</div>
												</Tooltip.Trigger>
												<Tooltip.Content>
													<div class="flex items-center gap-1 text-xs">
														Selected coins:
														<Badge variant="outline" class="p-1 text-xs">
															{selectedProofs.map((p) => p.amount).join(', ')}
														</Badge>
													</div>
												</Tooltip.Content>
											</Tooltip.Root>
										</Tooltip.Provider>
									</span>
									<span class="text-green-500"> Token can be sent offline </span>
								{/if}
							</div>
							<div class="relative flex h-10 w-full gap-2">
								{#if tokenOptions.p2pk}
									<button class="absolute right-16 top-2" onclick={() => (scanPubKey = true)}>
										<Scan></Scan>
									</button>
									<!-- content here -->
									<Input
										placeholder="npub... or pubkey..."
										bind:value={tokenOptions.pubkey}
										oninput={() =>
											(tokenOptions.isValidPubkey = checkValidPubkey(tokenOptions.pubkey))}
									/>
									{#if mint.info.nuts[12]?.supported}
										<Toggle bind:pressed={tokenOptions.isOffline}>
											<WifiOff></WifiOff>
										</Toggle>
									{/if}
								{/if}
							</div>
							<Button
								class="w-full"
								onclick={sendCashu}
								disabled={(tokenOptions.p2pk &&
									!tokenOptions.isValidPubkey &&
									!tokenOptions.pubkey.startsWith('npub')) ||
									isLoading ||
									getAmountForTokenSet(selectedProofs) <
										amount + (tokenOptions.includeReceiverFees ? 1 : 0)}
							>
								{#if isLoading}
									<LoaderCircle class="animate-spin"></LoaderCircle>
								{:else}
									<Banknote></Banknote>
								{/if}
								<span>
									Create
									{#if tokenOptions.customOut}
										<span> custom </span>
									{/if}
									{#if tokenOptions.p2pk}
										<span> locked </span>
										{#if tokenOptions.isOffline}
											offline
										{/if}
									{/if}

									cashu token
								</span>
							</Button>
						</div>
					{:else if invoice.length}
						<div class="flex h-40 flex-col items-center justify-center gap-2">
							<button
								class=" text-xs italic text-secondary"
								onclick={() => copyTextToClipboard(invoice)}
							>
								<div class="flex w-80 items-center justify-center gap-1 xl:w-[600px]">
									<Copy class="h-4 w-4"></Copy>
									<span class="w-60 overflow-clip text-ellipsis">
										{invoice}
									</span>
								</div>
							</button>
							<span>
								{formatAmount(decode(invoice).sections[2].value / 1000, 'sat')}
							</span>
							<div class="w-80 py-5 xl:w-[600px]">
								<Button
									disabled={isLoading}
									class="w-full border-2 border-nutstash"
									onclick={createQuote}
								>
									{#if isLoading}
										<LoaderCircle class="animate-spin"></LoaderCircle>
									{:else}
										<Zap></Zap>
									{/if}
									Prepare payment
								</Button>
							</div>
						</div>
					{:else}
						<!-- <div>
						<button onclick={() => openScannerDrawer.update((ctx) => !ctx)}>
							<QrCode></QrCode>
						</button>
					</div> -->
					{/if}
				</div>
			</div>
			<div class="h-64 w-80 xl:w-[600px]">
				<NumericKeys onkeypressed={onKeypadPress} isDecimal={false}></NumericKeys>
			</div>
		{/if}
	</div>
{/if}
