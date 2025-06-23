<script lang="ts">
	import MintSelector from '$lib/elements/ui/MintSelector.svelte';
	import UnitSelector from '$lib/elements/ui/UnitSelector.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { createMeltQuote, ensureError, getConversionRate, meltProofs, types } from '@gandlaf21/cashu-wallet-engine';
	import { meltQuotesStore, mintsStore, proofsStore, selectedMint, settingsStore, unit } from '@gandlaf21/cashu-wallet-engine/stores';
	import { formatAmount, getAmountForTokenSet, getProofsOfMintUnit, getUnitsForMints } from '@gandlaf21/cashu-wallet-engine/util';
import { params, push } from 'svelte-spa-router';
import { Zap, Wallet, ArrowRight } from 'lucide-svelte';
import { toast } from 'svelte-sonner';
	
	const invoice = $derived($params?.invoice);
	let isProcessing = $state(false);
	
	let mint: types.Mint = $state($selectedMint !== -1 ? $mintsStore[$selectedMint] : $mintsStore[0]);

	const getCurrentUnit = () => {
		if (!mint) {
			return 'sat';
		}
		return getUnitsForMints([mint]).find((u) => u === $unit) ? $unit : 'sat';
	};
	let currentUnit: string = $state(getCurrentUnit());
	
	let decodedInvoice = $state<any>(null);
	let errorDecoding = $state(false);
	
	$effect(() => {
		if (invoice) {
			try {
				decodedInvoice = decode(invoice);
				errorDecoding = false;
			} catch (error) {
				console.error("Error decoding invoice:", error);
				errorDecoding = true;
			}
		}
	});
	
	const handlePayInvoice = async () => {
		try {
			if (!mint) {
				toast.warning('No mint selected');
				return;
			}
			if (!invoice) {
				toast.warning('No invoice detected');
				return
			}
			isProcessing = true;
			const { quote } = await createMeltQuote(mint.url, invoice, {
				unit: currentUnit
			});
			const meltQuote = meltQuotesStore.getBy(quote, "quote")
			if (!meltQuote) {
				return;
			}
			await meltProofs(meltQuote)
			push('/wallet/send/ln/' + quote);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isProcessing= false;
		}
	};
</script>

<div class="flex w-80 flex-col gap-4 xl:w-[600px]">
	<div class="flex items-center gap-2 mb-2">
		<Zap class="text-yellow-500 h-5 w-5" />
		<h2 class="font-bold text-xl">Pay Lightning Invoice</h2>
	</div>
	
	{#if !invoice}
		<Card class="p-6 border-dashed bg-muted/30">
			<p class="text-center text-muted-foreground">No invoice provided</p>
		</Card>
	{:else if errorDecoding}
		<Card class="p-6 border-dashed border-destructive bg-destructive/10">
			<p class="text-center text-destructive-foreground">Invalid Lightning invoice</p>
		</Card>
	{:else if decodedInvoice}
	{@const amount = decodedInvoice.sections[2]?.value / 1000 || 0}
	{@const description = decodedInvoice.sections.find((s: any) => s.name === 'description')?.value || 'No description'}
		
		<Card class="overflow-hidden border">
			<div class="bg-primary/5 p-4 border-b">
				<div class="flex items-center justify-between">
					<span class="text-sm font-medium text-muted-foreground">Amount</span>
					<div class="flex flex-col items-end">
						<span class="font-bold text-xl text-primary">{formatAmount(amount, 'sat')}</span>
						{#if $settingsStore[0].currency.useConversion}
							{#await getConversionRate() then rate}
								<span class="text-sm text-muted-foreground">
									≈ {formatAmount((amount ?? 0) * (rate / 1000000), $settingsStore[0].currency.conversionUnit)}
								</span>
							{/await}
						{/if}
					</div>
				</div>
			</div>
			
			<div class="p-4 space-y-4">
				{#if description && description !== ''}
					<div class="space-y-1">
						<p class="text-sm font-medium text-muted-foreground">Description</p>
						<p class="text-sm break-words rounded bg-muted/50 p-2">{description}</p>
					</div>
				{/if}
				
				<div class="space-y-2">
					<div class="flex items-center">
						<Wallet class="text-blue-500 h-4 w-4 mr-1" />
						<p class="text-sm font-medium text-muted-foreground">Pay from</p>
					</div>
					
					<div class="flex flex-col gap-3">
						<div class="flex gap-2 items-center">
							<div class="flex-1">
								<MintSelector bind:mint />
							</div>
							<UnitSelector bind:currentUnit selectedMints={[mint]} />
						</div>
						<div class="flex justify-between items-center p-2 rounded bg-muted/30">
							<span class="text-sm text-muted-foreground">Available balance</span>
							<span class="font-medium">
								{formatAmount(getAmountForTokenSet(getProofsOfMintUnit(mint, $proofsStore, currentUnit)), currentUnit)}
							</span>
						</div>
					</div>
				</div>
				
				<Button 
					class="w-full mt-4"
					variant={amount > getAmountForTokenSet(getProofsOfMintUnit(mint, $proofsStore, currentUnit)) ? "destructive" : "default"}
					disabled={amount > getAmountForTokenSet(getProofsOfMintUnit(mint, $proofsStore, currentUnit)) || isProcessing}
					onclick={handlePayInvoice}
				>
					{#if isProcessing}
						<div class="flex items-center gap-2">
							<div class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
							Processing...
						</div>
					{:else if amount > getAmountForTokenSet(getProofsOfMintUnit(mint, $proofsStore, currentUnit))}
						Insufficient balance
					{:else}
						<div class="flex items-center gap-2">
							Pay Invoice
							<ArrowRight class="h-4 w-4" />
						</div>
					{/if}
				</Button>
			</div>
		</Card>
	{/if}
</div>
