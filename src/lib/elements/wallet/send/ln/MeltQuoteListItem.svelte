<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import {
		formatAmount,
		formatSecToMinStr,
		getAmountForTokenSet,
		getAproxAmount,
		getProofsOfMintUnit
	} from '$lib/util/walletUtils';
	import * as Card from '$lib/components/ui/card';
	import { Check, LoaderCircle, RotateCcw } from 'lucide-svelte';
	import { copyTextToClipboard, getHostFromUrl } from '$lib/util/utils';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { EXPIRED, type StoredMeltQuote, type StoredMintQuote } from '$lib/db/models/types';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { checkMeltQuote, getFeeForProofs, meltProofs, mintProofs } from '$lib/actions/actions';
	import QrCode from '$lib/elements/ui/QRCode.svelte';
	import { now } from '$lib/stores/session/time';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MeltQuoteState } from '@cashu/cashu-ts';
	import { proofsStore } from '$lib/stores/persistent/proofs';
	import { getBy } from '$lib/stores/persistent/helper/storeHelper';
	import { mints } from '$lib/stores/persistent/mints';

	let {
		quote,
		isListView = true
	}: {
		quote: StoredMeltQuote;
		isListView?: boolean;
	} = $props();

	let isLoading = $state(false);

	let mint = $derived(getBy($mints, quote.mintUrl, 'url'));
	let unitProofs = $derived(mint ? getProofsOfMintUnit(mint, $proofsStore, quote.unit) : []);

	let aproxProofs = $derived(getAproxAmount(quote.amount + quote.fee_reserve, unitProofs) ?? []);
	let reqSplit = $derived(quote.amount + quote.fee_reserve !== getAmountForTokenSet(aproxProofs));
	let swapFee = $derived(reqSplit ? getFeeForProofs(aproxProofs) : 0);
	let hasFunds = $derived(getAmountForTokenSet(aproxProofs) >= quote.amount + quote.fee_reserve);

	let invoiceAmount = $derived(decode(quote.request).sections[2].value / 1000);

	const confirmPayment = async () => {
		try {
			isLoading = true;
			await meltProofs(quote);
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="h-full">
	<Card.Root
		class="m-3 w-80 xl:w-[600px] {quote.state === EXPIRED.EXPIRED
			? 'bg-red-700 bg-opacity-20 opacity-40'
			: ''}"
	>
		<Card.Header>
			<Card.Title class="relative flex flex-col justify-start text-nowrap">
				<div class="h-10 max-w-48 flex-shrink overflow-clip text-ellipsis">
					<a href={`/#/wallet/send/ln/${quote.quote}`} class="underline">
						Payment #{quote.quote}
					</a>
				</div>
			</Card.Title>
			<Card.Description>
				<div class="max-w-48 overflow-clip text-ellipsis">
					<a class="underline" href={`/#/wallet/mint/${getHostFromUrl(quote.mintUrl ?? '')}`}>
						{quote.mintUrl}
					</a>
				</div>
			</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-3">
			<div class="flex flex-col items-center justify-center gap-2">
				<Badge variant="outline" class="text-2xl">
					{formatAmount(quote.amount, quote.unit)}
				</Badge>
				{#if quote.state === 'UNPAID' && !isLoading}
					{#await swapFee}
						<!-- promise is pending -->
					{:then swapFee}
						<!-- promise was fulfilled -->
						<Badge variant="outline" class="">
							+ {formatAmount(quote.fee_reserve + swapFee, quote.unit)} fee reserve
						</Badge>
					{/await}
					<span class="text-xs">
						selected proofs: {aproxProofs.map((p) => p.amount).join(', ')}
					</span>
					{#if !hasFunds}
						<span class="text-xs text-red-500"> No enough funds for payment </span>
					{:else if reqSplit}
						<!-- else if content here -->
						<span class="text-xs text-yellow-500"> Requires swap </span>
					{:else}
						<!-- else content here -->
					{/if}
				{:else if quote.fees}
					<Badge variant="outline" class="">
						+ {formatAmount(quote.fees, quote.unit)} fee
					</Badge>
				{/if}
				Pays invoice for
				<Badge variant="outline" class="text-lg">
					{formatAmount(invoiceAmount, 'sat')}
				</Badge>
			</div>
			<div>
				{#if quote.state === 'UNPAID'}
					<Badge variant="secondary">
						{formatSecToMinStr(quote.expiry - Math.floor($now / 1000))}
					</Badge>
				{/if}
			</div>
		</Card.Content>
		<Card.Footer class="flex h-12 justify-between">
			{#if !isListView}
				<Button variant="outline" href="/#/wallet/">Close</Button>
			{/if}

			{#if !quote.in?.length}
				<Button disabled={isLoading} onclick={confirmPayment}>
					{#if isLoading}
						<LoaderCircle class="animate-spin"></LoaderCircle>
					{:else}
						<Check></Check>
					{/if}
					Confirm Payment
				</Button>
			{:else if quote.state === MeltQuoteState.PAID}
				<Badge variant="outline" class="text-green-600">Confirmed</Badge>
			{:else if quote.state === MeltQuoteState.PENDING}
				<div class="flex items-center gap-1">
					<Badge variant="outline" class="text-secondary">Pending...</Badge>
					<button onclick={() => checkMeltQuote(quote)}>
						<RotateCcw></RotateCcw>
					</button>
				</div>
			{:else if quote.state === EXPIRED.EXPIRED}
				<div class="flex items-center gap-1">
					<Badge variant="destructive" class="text-secondary">Expired</Badge>
					<button onclick={() => checkMeltQuote(quote)}>
						<RotateCcw></RotateCcw>
					</button>
				</div>
			{/if}
		</Card.Footer>
	</Card.Root>
</div>
