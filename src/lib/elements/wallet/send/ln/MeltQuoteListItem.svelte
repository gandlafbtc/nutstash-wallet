<script lang="ts">
	import {
		types,
		checkMeltQuote, getFeeForProofs, meltProofs ,
	} from '@gandlaf21/cashu-wallet-engine';
	import { 		proofsStore,
		getBy,
		mintsStore as mints
 } from "@gandlaf21/cashu-wallet-engine/stores";
	import { 
		formatSecToMinStr,
		getAmountForTokenSet,
		formatAmount,
		getAproxAmount,
		getProofsOfMintUnit,
		getHostFromUrl, } from "@gandlaf21/cashu-wallet-engine/util";
	import * as Card from '$lib/components/ui/card';
	import { 
		Check, 
		LoaderCircle, 
		RotateCcw, 
		Zap, 
		AlertTriangle, 
		Clock, 
		Server, 
		ChevronRight,
		AlertCircle,
		ArrowDown,
		ExternalLink,
		Coins,

		Landmark

	} from 'lucide-svelte';
	import { decode } from '@gandlaf21/bolt11-decode';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { now } from '$lib/stores/session/time';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MeltQuoteState } from '@cashu/cashu-ts';
	import {
		fee_reserve,
		not_enough_funds,
		pays_invoice_for,
		requires_swap,
		selected_proofs,
		t_close,
		t_confirmed,
		t_expired,
		t_fee,
		t_payment,
		t_pending
	} from '$lib/paraglide/messages';

	let {
		quote,
		isListView = true
	}: {
		quote: types.StoredMeltQuote;
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
		class="m-3 w-80 overflow-hidden border shadow-sm xl:w-[600px] {quote.state === types.EXPIRED.EXPIRED
			? 'border-destructive/40 bg-destructive/5'
			: quote.state === MeltQuoteState.PAID
			? 'border-green-500/40 bg-green-500/5'
			: quote.state === MeltQuoteState.PENDING
			? 'border-yellow-500/40 bg-yellow-500/5'
			: ''}"
	>
		<!-- Payment Status Banner -->
		{#if quote.state === MeltQuoteState.PAID || quote.state === MeltQuoteState.PENDING || quote.state === types.EXPIRED.EXPIRED}
			<div class="flex items-center gap-2 px-4 py-1 text-sm font-medium text-white
				{quote.state === MeltQuoteState.PAID
					? 'bg-green-500'
					: quote.state === MeltQuoteState.PENDING
					? 'bg-yellow-500'
					: 'bg-destructive'}">
				{#if quote.state === MeltQuoteState.PAID}
					<Check size={16} />
					{t_confirmed()}
				{:else if quote.state === MeltQuoteState.PENDING}
					<Clock size={16} />
					{t_pending()}
				{:else}
					<AlertCircle size={16} />
					{t_expired()}
				{/if}
			</div>
		{/if}
		
		<Card.Header class="pb-2">
			<div class="flex items-start justify-between">
				<div class="space-y-1">
					<Card.Title class="flex items-center gap-2 text-lg">
						<Zap size={18} class="text-yellow-500" />
						<a href={`/#/wallet/send/ln/${quote.quote}`} class="hover:underline">
							{t_payment()} #{quote.quote.substring(0, 8)}
						</a>
						<ChevronRight size={16} class="text-muted-foreground" />
					</Card.Title>
					<Card.Description class="flex items-center gap-1.5">
						<Landmark size={14} class="text-muted-foreground" />
						<a 
							class="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap hover:underline" 
							href={`/#/wallet/mint/${getHostFromUrl(quote.mintUrl ?? '')}`}
							title={quote.mintUrl}
						>
							{getHostFromUrl(quote.mintUrl ?? '')}
						</a>
					</Card.Description>
				</div>
				
				{#if quote.state === 'UNPAID'}
					<div class="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium">
						<Clock size={14} />
						{formatSecToMinStr(quote.expiry - Math.floor($now / 1000))}
					</div>
				{/if}
			</div>
		</Card.Header>
		
		<Card.Content class="space-y-4 pt-0">
			<!-- Divider -->
			<div class="h-px w-full bg-border"></div>
			
			<!-- Amount Section -->
			<div class="flex flex-col gap-2">
				<div class="flex items-center justify-between rounded-md bg-muted/50 p-3">
					<span class="text-sm font-medium text-muted-foreground">Payment Amount</span>
					<div class="flex flex-col items-end">
						<span class="text-lg font-bold text-primary">{formatAmount(quote.amount, quote.unit)}</span>
						{#if quote.state === 'UNPAID' && !isLoading}
							{#await swapFee then swapFee}
								<div class="flex items-center gap-1 text-xs text-muted-foreground">
									<span>+</span>
									<span>{formatAmount(quote.fee_reserve + swapFee, quote.unit)}</span>
									<span class="text-xs">{fee_reserve()}</span>
								</div>
							{/await}
						{:else if quote.fees}
							<div class="flex items-center gap-1 text-xs text-muted-foreground">
								<span>+</span>
								<span>{formatAmount(quote.fees, quote.unit)}</span>
								<span class="text-xs">{t_fee()}</span>
							</div>
						{/if}
					</div>
				</div>
				
				<!-- Invoice Amount -->
				<div class="flex items-center justify-between rounded-md bg-secondary/10 p-3">
					<div class="flex items-center gap-2">
						<Zap size={16} class="text-yellow-500" />
						<span class="text-sm font-medium">{pays_invoice_for()}</span>
					</div>
					<span class="font-bold">{formatAmount(invoiceAmount, 'sat')}</span>
				</div>
				
				<!-- Proof Selection Info -->
				{#if quote.state === 'UNPAID' && !isLoading}
					<div class="space-y-2 rounded-md border p-3">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-1.5">
								<Coins size={16} class="text-blue-500" />
								<span class="text-sm font-medium">{selected_proofs()}</span>
							</div>
							<span class="text-sm font-mono">{aproxProofs.length} proofs</span>
						</div>
						
						{#if !hasFunds}
							<div class="flex items-center gap-2 rounded-md bg-destructive/10 p-2 text-xs text-destructive">
								<AlertTriangle size={14} />
								{not_enough_funds()}
							</div>
						{:else if reqSplit}
							<div class="flex items-center gap-2 rounded-md bg-yellow-500/10 p-2 text-xs text-yellow-600">
								<AlertTriangle size={14} />
								{requires_swap()}
							</div>
						{/if}
						
						<div class="text-xs text-muted-foreground">
							<span class="font-mono">{aproxProofs.map((p) => p.amount).join(', ')}</span>
						</div>
					</div>
				{/if}
			</div>
		</Card.Content>
		
		<Card.Footer class="flex items-center justify-between gap-2 border-t bg-muted/20 p-6">
			{#if !isListView}
				<Button variant="outline" size="sm" href="/#/wallet/">
					{t_close()}
				</Button>
			{:else}
				<div class="flex-1"></div>
			{/if}

			{#if !quote.in?.length}
				<Button 
					class="gap-1.5"
					variant={hasFunds ? "default" : "destructive"}
					disabled={!hasFunds || isLoading}
					onclick={confirmPayment}
				>
					{#if isLoading}
						<LoaderCircle class="animate-spin" size={16} />
						<span>Processing...</span>
					{:else}
						<Check size={16} />
						<span>Confirm Payment</span>
					{/if}
				</Button>
			{:else if quote.state === MeltQuoteState.PAID}
				<div class="flex items-center gap-1.5 text-green-600">
					<Check size={16} />
					<span class="font-medium">{t_confirmed()}</span>
				</div>
			{:else if quote.state === MeltQuoteState.PENDING}
				<div class="flex items-center gap-2">
					<div class="flex items-center gap-1.5 text-yellow-600">
						<Clock size={16} />
						<span class="font-medium">{t_pending()}</span>
					</div>
					<Button 
						variant="ghost" 
						size="icon" 
						onclick={() => checkMeltQuote(quote)}
						class="h-8 w-8 rounded-full"
					>
						<RotateCcw size={14} />
					</Button>
				</div>
			{:else if quote.state === types.EXPIRED.EXPIRED}
				<div class="flex items-center gap-2">
					<div class="flex items-center gap-1.5 text-destructive">
						<AlertCircle size={16} />
						<span class="font-medium">{t_expired()}</span>
					</div>
					<Button 
						variant="ghost" 
						size="icon" 
						onclick={() => checkMeltQuote(quote)}
						class="h-8 w-8 rounded-full"
					>
						<RotateCcw size={14} />
					</Button>
				</div>
			{/if}
		</Card.Footer>
	</Card.Root>
</div>
