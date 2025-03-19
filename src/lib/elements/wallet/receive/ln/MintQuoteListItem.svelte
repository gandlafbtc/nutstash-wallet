<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { formatAmount, formatSecToMinStr } from '$lib/util/walletUtils';
	import * as Card from '$lib/components/ui/card';
	import { Copy, Banknote, CircleCheck, RefreshCcw } from 'lucide-svelte';
	import { copyTextToClipboard, getHostFromUrl } from '$lib/util/utils';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { EXPIRED, type StoredMintQuote } from '$lib/db/models/types';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { mintProofs } from '$lib/actions/actions';
	import QrCode from '$lib/elements/ui/QRCode.svelte';
	import { now } from '$lib/stores/session/time';
	import Button from '$lib/components/ui/button/button.svelte';
	import CopiableToken from '$lib/elements/ui/CopiableToken.svelte';

	let {
		quote,
		isListView = true
	}: {
		quote: StoredMintQuote;
		isListView?: boolean;
	} = $props();

	const tryMint = async () => {
		mintProofs(quote);
	};

	const decodedInvoice = $derived(decode(quote.request));
</script>

<Card.Root
	class="m-3 w-80 {quote.state === EXPIRED.EXPIRED ? 'bg-red-700 bg-opacity-20 opacity-40' : ''}"
>
	<Card.Header>
		<Card.Title class="relative flex flex-col justify-start text-nowrap">
			<div class="h-10 max-w-48 flex-shrink overflow-clip text-ellipsis">
				<a href={`/#/wallet/receive/ln/${quote.quote}`} class="underline">
					Invoice #{quote.quote}
				</a>
			</div>
			{#if isListView}
				<button onclick={() => (isListView = !isListView)} class="absolute -right-2 -top-2">
					<QrCode data={quote.request}></QrCode>
				</button>
			{/if}
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
		{#if !isListView}
			<button onclick={() => (isListView = !isListView)}>
				<QrCode data={quote.request}></QrCode>
			</button>
		{/if}
		<div>
			<CopiableToken token={quote.request}>

			</CopiableToken>
		</div>
		<div class="flex items-center gap-2">
			<p class="text-xs">Pay</p>
			<Badge variant="outline">
				{formatAmount(decodedInvoice.sections[2].value / 1000, 'sat')}
			</Badge>
			<p class="text-xs">to get</p>
			<Badge variant="outline">{formatAmount(quote.amount, quote.unit)}</Badge>
		</div>
	</Card.Content>
	<Card.Footer class="flex h-12 justify-between">
		{#if !isListView}
			<Button href="/#/wallet/">Close</Button>
		{/if}
		<div>
			{#if quote.state === 'UNPAID'}
				<Badge variant="secondary">
					{formatSecToMinStr(quote.expiry - Math.floor($now / 1000))}
				</Badge>
			{/if}
		</div>
		<div class="flex gap-1">
			{#if quote.state === 'UNPAID'}
				<Badge variant="destructive">
					{quote.state}
				</Badge>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Badge class="h-full cursor-pointer" onclick={tryMint}>
								<RefreshCcw class="h-4 w-4"></RefreshCcw>
							</Badge>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Update</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			{:else if quote.state === EXPIRED.EXPIRED}
				<Badge variant="destructive">
					{quote.state}
				</Badge>
			{:else}
				<Badge variant="outline" class="text-green-600">
					<CircleCheck class="h-4 w-4"></CircleCheck>
					{quote.state}
				</Badge>
				{#if quote.state === 'PAID'}
					<Tooltip.Provider>
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Badge class="h-full cursor-pointer" onclick={tryMint}>
									<Banknote class="h-4 w-4"></Banknote>
								</Badge>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<p>Request mint</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				{/if}
			{/if}
		</div>
	</Card.Footer>
</Card.Root>
