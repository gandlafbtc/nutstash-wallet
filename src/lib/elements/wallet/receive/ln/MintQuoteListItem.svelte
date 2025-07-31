<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { formatAmount, formatSecToMinStr, getAmountForTokenSet, getWalletWithUnit } from '@gandlaf21/cashu-wallet-engine/util';
	import { checkMintQuote, ensureError, mintProofs, types } from '@gandlaf21/cashu-wallet-engine';
	import * as Card from '$lib/components/ui/card';
	import { Copy, Banknote, CircleCheck, RefreshCcw, X } from 'lucide-svelte';
	import { getHostFromUrl } from '$lib/utils';
	import { decode } from '@gandlaf21/bolt11-decode';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import QrCode from '$lib/elements/ui/QRCode.svelte';
	import { now } from '$lib/stores/session/time';
	import Button from '$lib/components/ui/button/button.svelte';
	import CopiableToken from '$lib/elements/ui/CopiableToken.svelte';
	import {
		request_mint,
		t_close,
		t_invoice,
		t_pay,
		t_update,
		to_get
	} from '$lib/paraglide/messages';
	import { toast } from 'svelte-sonner';
	import { countsStore, mintsStore, offlineProofsStore, proofsStore, pendingProofsStore, spentProofsStore } from '@gandlaf21/cashu-wallet-engine/stores';
	import { fade, fly, scale } from 'svelte/transition';

	let {
		quote,
		isListView = true
	}: {
		quote: types.StoredMintQuote;
		isListView?: boolean;
	} = $props();

	let isoOverlayClosed = $state(false);

	let isLoading = $state(false)

	const tryMint = async () => {
		if (isLoading) {
			return
		}
		try {
			isLoading = true;
			await mintProofs(quote);
		} catch (error: unknown) {
			// if already issued
			if ((error as { code?: number }).code === 11000) {
				const wallet = await getWalletWithUnit($mintsStore, quote.mintUrl, quote.unit)
				let start = countsStore.getBy(wallet.keysetId, "keysetId")?.count ?? 0
				let keysetId = wallet.keysetId
				if (quote.counts) {
					start = Math.min(...quote.counts.counts)
					keysetId = quote.counts.keysetId
				}
				const  { proofs } = await  wallet.restore(start, 25, {keysetId})
				const allProofs = [...$offlineProofsStore, ...$proofsStore, ...$pendingProofsStore, ...$spentProofsStore]
				const newProofs = proofs.filter(proof => !allProofs.some(existingProof => 
					existingProof.secret === proof.secret
				))
				if (getAmountForTokenSet(newProofs) === quote.amount) {
					proofsStore.addMany(newProofs)
					await checkMintQuote(quote)
					toast.success("received")
					return	
				}
			}
			const err = ensureError(error);
			console.error(err)
			toast.error(err.message);
		}
		finally {
			isLoading = false;
		}
	};

	const decodedInvoice = $derived(decode(quote.request));
</script>

<Card.Root
	class="m-3 w-80 xl:w-[600px] {quote.state === types.EXPIRED.EXPIRED
		? 'bg-red-700 bg-opacity-20 opacity-40'
		: ''}"
>
	<Card.Header>
		<Card.Title class="relative flex flex-col justify-start text-nowrap">
			<div class="h-10 max-w-48 flex-shrink overflow-clip text-ellipsis">
				<a href={`/#/wallet/receive/ln/${quote.quote}`} class="underline">
					{t_invoice()} #{quote.quote}
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
			<CopiableToken token={quote.request}></CopiableToken>
		</div>
		<div class="flex items-center gap-2">
			<p class="text-xs">{t_pay()}</p>
			<Badge variant="outline">
				{formatAmount(decodedInvoice.sections[2].value / 1000, 'sat')}
			</Badge>
			<p class="text-xs">{to_get()}</p>
			<Badge variant="outline">{formatAmount(quote.amount, quote.unit)}</Badge>
		</div>
	</Card.Content>
	<Card.Footer class="flex h-12 justify-between">
		{#if !isListView}
			<Button href="/#/wallet/">{t_close()}</Button>
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
							<p>{t_update()}</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			{:else if quote.state === types.EXPIRED.EXPIRED}
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
								<p>{request_mint()}</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				{/if}
			{/if}
		</div>
	</Card.Footer>
</Card.Root>

{#if !isListView && quote?.state==="ISSUED" && !isoOverlayClosed}
<!-- overlay -->
<div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70" transition:fade={{duration:100}}>
	<div class="relative mx-4 h-screen w-screen rounded-lg bg-card p-6 shadow-lg flex flex-col justify-center">
		<!-- Close button -->
		<button 
			class="absolute right-2 top-2 rounded-full p-1 hover:bg-muted" 
			onclick={() => (isoOverlayClosed = true)}
		>
			<X class="h-6 w-6" />
		</button>
		
		<!-- Success content -->
		<div class="flex flex-col items-center justify-center space-y-4 pt-6">
			<h2 class="text-2xl font-bold text-green-500">Payment Received!</h2>
			<CircleCheck class="h-16 w-16 text-green-500" />
			<p class="text-center text-green-500">
				+ {formatAmount(quote.amount, quote.unit)} 
			</p>
		</div>
		
		<!-- Return to wallet button -->
		<div class="mt-8 flex justify-center">
			<Button href="/#/wallet/" variant="outline" class="px-8">
				Return to Wallet
			</Button>
		</div>
		<div class="h-64">

		</div>
	</div>
</div>
{/if}
