<script lang="ts">
	import MintSelector from '$lib/elements/ui/MintSelector.svelte';
	import UnitSelector from '$lib/elements/ui/UnitSelector.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card } from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { decode } from '@gandlaf21/bolt11-decode';
	import {
		createMeltQuote,
		createMultiMint,
		ensureError,
		getConversionRate,
		meltProofs,
		types
	} from '@gandlaf21/cashu-wallet-engine';
	import {
		meltQuotesStore,
		mintsStore,
		proofsStore,
		selectedMint,
		settingsStore,
		unit
	} from '@gandlaf21/cashu-wallet-engine/stores';
	import {
		formatAmount,
		getAmountForTokenSet,
		getProofsOfMintsUnit,
		getProofsOfMintUnit,
		getUnitsForMints
	} from '@gandlaf21/cashu-wallet-engine/util';
	import { params, push } from 'svelte-spa-router';
	import { Zap, Wallet, ArrowRight, Plus, X } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import Slider from '$lib/components/ui/slider/slider.svelte';

	const invoice = $derived($params?.invoice);
	let isProcessing = $state(false);
	let isOpen = $state(false);
	// Define type with both amount and percentage since we're in a transition phase
	type MintWithAmount = types.Mint & { amount: number; percentage?: number };
	
	let mint: MintWithAmount = $state(
		$selectedMint !== -1
			? { ...$mintsStore[$selectedMint], amount: 1, percentage: 100 }
			: { ...$mintsStore[0], amount: 1, percentage: 100 }
	);
	let additionalMints: MintWithAmount[] = $state([]);
	const getCurrentUnit = () => {
		if (!mint) {
			return 'sat';
		}
		return getUnitsForMints([mint]).find((u) => u === $unit) ? $unit : 'sat';
	};
	let currentUnit: string = $state(getCurrentUnit());

	let decodedInvoice = $state<any>(null);
	const amount = $derived(decodedInvoice.sections[2]?.value / 1000 || 0);
	let errorDecoding = $state(false);
	let balance = $derived(
		getAmountForTokenSet(
			getProofsOfMintsUnit([mint, ...additionalMints], $proofsStore, currentUnit)
		)
	);

	// Get balance for a specific mint in sats
	const getMintBalance = (mintToCheck: types.Mint) => {
		return getAmountForTokenSet(getProofsOfMintUnit(mintToCheck, $proofsStore, 'sat'));
	};

	// Check if a mint has sufficient balance for the amount
	const hasSufficientBalance = (mintToCheck: types.Mint, amountToCheck: number) => {
		const mintBalance = getMintBalance(mintToCheck);
		return amountToCheck <= mintBalance;
	};
	
	// Get color status for an amount relative to balance
	const getAmountColorStatus = (mintToCheck: types.Mint, amountToCheck: number) => {
		const mintBalance = getMintBalance(mintToCheck);
		
		// If amount exceeds balance, return destructive (red)
		if (amountToCheck > mintBalance) {
			return 'text-destructive';
		}
		
		// Otherwise return primary (default color)
		return 'text-primary';
	};
	
	// Check if an amount is close to the mint's balance (might not leave enough for fees)
	const isAmountNearBalance = (mintToCheck: types.Mint, amountToCheck: number) => {
		const mintBalance = getMintBalance(mintToCheck);
		return amountToCheck > mintBalance * 0.98 && amountToCheck <= mintBalance;
	};
	
	// Get total amount from all mints
	const getTotalAmount = (mints: MintWithAmount[]) => {
		return mints.reduce((sum, m) => sum + (m.amount ?? 0), 0);
	};
	
	// Check if the total equals the invoice amount
	const isValidTotal = (mints: MintWithAmount[]) => {
		const total = getTotalAmount(mints);
		return Math.abs(total - amount) < 1; // Allow small rounding errors
	};
	
	// Check if any mint's amount exceeds the safe threshold (97% of balance)
	const hasUnsafeAmounts = (mints: MintWithAmount[]) => {
		return mints.some(mintToCheck => {
			const mintBalance = getMintBalance(mintToCheck);
			const mintAmount = mintToCheck.amount ?? 0;
			return mintAmount > mintBalance * 0.97;
		});
	};

	// Distribution strategies
	const setEqualDistribution = () => {
		const allMints = [mint, ...additionalMints];
		const amountPerMint = Math.floor(amount / allMints.length);
		// Adjust for rounding errors by adding remainder to first mint
		const remainder = amount - amountPerMint * allMints.length;

		// Set amounts
		allMints.forEach((m, index) => {
			m.amount = amountPerMint + (index === 0 ? remainder : 0);
			// Also update percentage for compatibility during transition
			m.percentage = Math.floor((m.amount / amount) * 100);
		});
	};

	const setRelativeToBalanceDistribution = () => {
		const allMints = [mint, ...additionalMints];
		const totalBalance = allMints.reduce((sum, m) => sum + getMintBalance(m), 0);

		// If total balance is 0, fall back to equal distribution
		if (totalBalance === 0) {
			setEqualDistribution();
			return;
		}

		// Calculate amounts based on balance ratio
		let totalAssigned = 0;
		allMints.forEach((m, index) => {
			if (index === allMints.length - 1) {
				// Last mint gets the remainder to ensure total equals invoice amount
				m.amount = amount - totalAssigned;
			} else {
				const mintBalance = getMintBalance(m);
				const calculatedAmount = Math.floor((mintBalance / totalBalance) * amount);
				m.amount = calculatedAmount;
				totalAssigned += calculatedAmount;
			}
			// Also update percentage for compatibility during transition
			m.percentage = Math.floor((m.amount / amount) * 100);
		});
	};

	const setMaxPrimaryMintDistribution = () => {
		const allMints = [mint, ...additionalMints];
		const primaryMintBalance = getMintBalance(mint);

		// Calculate how much can be paid from primary mint (max 97% of balance)
		const maxPrimaryAmount = Math.min(amount, Math.floor(primaryMintBalance * 0.97));
		mint.amount = maxPrimaryAmount;
		mint.percentage = Math.floor((maxPrimaryAmount / amount) * 100);

		// If primary mint can handle the entire payment
		if (maxPrimaryAmount >= amount) {
			// Primary mint gets almost everything
			mint.amount = amount - (allMints.length - 1);
			mint.percentage = Math.floor((mint.amount / amount) * 100);
			
			// Other mints get minimum 1 sat each
			allMints.slice(1).forEach((m) => {
				m.amount = 1;
				m.percentage = Math.floor((m.amount / amount) * 100);
			});
			return;
		}

		// Distribute remaining amount equally among other mints
		const remainingAmount = amount - maxPrimaryAmount;
		const otherMints = allMints.slice(1);

		if (otherMints.length === 0) return;

		const amountPerMint = Math.floor(remainingAmount / otherMints.length);
		const remainder = remainingAmount - amountPerMint * otherMints.length;

		otherMints.forEach((m, index) => {
			m.amount = amountPerMint + (index === 0 ? remainder : 0);
			// Also update percentage for backward compatibility
			m.percentage = Math.floor((m.amount / amount) * 100);
		});
	};
	
	const setMinPrimaryMintDistribution = () => {
		const allMints = [mint, ...additionalMints];
		const otherMints = allMints.slice(1);
		
		// If no other mints, primary mint must handle everything
		if (otherMints.length === 0) {
			const primaryMintBalance = getMintBalance(mint);
			mint.amount = Math.min(amount, Math.floor(primaryMintBalance * 0.97));
			mint.percentage = Math.floor((mint.amount / amount) * 100);
			return;
		}
		
		// Calculate max safe amount from each non-primary mint (97% of balance)
		let totalAssigned = 0;
		otherMints.forEach(m => {
			const mintBalance = getMintBalance(m);
			m.amount = Math.min(amount - totalAssigned, Math.floor(mintBalance * 0.97));
			m.percentage = Math.floor((m.amount / amount) * 100);
			totalAssigned += m.amount;
			
			// If we've covered the entire amount, we're done
			if (totalAssigned >= amount) {
				// Adjust the last mint to ensure we don't exceed the total
				m.amount -= (totalAssigned - amount);
				m.percentage = Math.floor((m.amount / amount) * 100);
				totalAssigned = amount;
			}
		});
		
		// Primary mint covers any remaining amount
		if (totalAssigned < amount) {
			mint.amount = amount - totalAssigned;
			mint.percentage = Math.floor((mint.amount / amount) * 100);
		} else {
			// Other mints covered everything, primary mint contributes minimum
			mint.amount = 1;
			
			// Adjust last other mint to account for primary's 1 sat
			if (otherMints.length > 0) {
				const lastMint = otherMints[otherMints.length - 1];
				lastMint.amount = Math.max(1, (lastMint.amount ?? 1) - 1);
				lastMint.percentage = Math.floor((lastMint.amount / amount) * 100);
			}
			
			mint.percentage = Math.floor((mint.amount / amount) * 100);
		}
	};

	$effect(() => {
		if (invoice) {
			try {
				decodedInvoice = decode(invoice);
				errorDecoding = false;
			} catch (error) {
				console.error('Error decoding invoice:', error);
				errorDecoding = true;
			}
		}
	});

	const handlePayInvoice = async () => {
		// Single mint payment only
		try {
			if (!mint) {
				toast.warning('No mint selected');
				return;
			}
			if (!invoice) {
				toast.warning('No invoice detected');
				return;
			}
			isProcessing = true;
			const { quote } = await createMeltQuote(mint.url, invoice, {
				unit: currentUnit
			});
			const meltQuote = meltQuotesStore.getBy(quote, 'quote');
			if (!meltQuote) {
				return;
			}
			await meltProofs(meltQuote);
			push('/wallet/send/ln/' + quote);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isProcessing = false;
		}
	};

	const handlePayMulti = async () => {
		try {
			if (!invoice) {
				toast.warning('No invoice detected');
				return;
			}
			isProcessing = true;
			const multiMint = await createMultiMint([mint, ...additionalMints], invoice)
			push('/wallet/send/ln/multi/' + multiMint.id)
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);	
		}
		finally {
			isProcessing = false;
		}
	};

	const addMint = (mintToAdd: types.Mint) => {
		// Add mint directly to additionalMints with minimum amount
		additionalMints = [...additionalMints, { ...mintToAdd, amount: 1 }];
		// Redistribute amounts to maintain total
		setEqualDistribution();
	};
	
	const closeDialog = () => {
		isOpen = false;
	};
</script>

<div class="flex w-80 flex-col gap-4 xl:w-[600px]">
	<div class="mb-2 flex items-center gap-2">
		<Zap class="h-5 w-5 text-yellow-500" />
		<h2 class="text-xl font-bold">Pay Lightning Invoice</h2>
	</div>

	{#if !invoice}
		<Card class="border-dashed bg-muted/30 p-6">
			<p class="text-center text-muted-foreground">No invoice provided</p>
		</Card>
	{:else if errorDecoding}
		<Card class="border-dashed border-destructive bg-destructive/10 p-6">
			<p class="text-center text-destructive-foreground">Invalid Lightning invoice</p>
		</Card>
	{:else if decodedInvoice}
		{@const description =
			decodedInvoice.sections.find((s: any) => s.name === 'description')?.value || 'No description'}
		<Card class="overflow-hidden border">
			<div class="border-b bg-primary/5 p-4">
				<div class="flex items-center justify-between">
					<span class="text-sm font-medium text-muted-foreground">Amount</span>
					<div class="flex flex-col items-end">
						<span class="text-xl font-bold text-primary">{formatAmount(amount, 'sat')}</span>
						{#if $settingsStore[0].currency.useConversion}
							{#await getConversionRate() then rate}
								<span class="text-sm text-muted-foreground">
									≈ {formatAmount(
										(amount ?? 0) * (rate / 1000000),
										$settingsStore[0].currency.conversionUnit
									)}
								</span>
							{/await}
						{/if}
					</div>
				</div>
			</div>

			<div class="space-y-4 p-4">
				{#if description && description !== ''}
					<div class="space-y-1">
						<p class="text-sm font-medium text-muted-foreground">Description</p>
						<p class="break-words rounded bg-muted/50 p-2 text-sm">{description}</p>
					</div>
				{/if}

				<div class="space-y-2">
					<div class="flex items-center gap-1">
						<Wallet class="mr-1 h-4 w-4 text-blue-500" />
						<p class="text-sm font-medium text-muted-foreground">Pay from</p>
					</div>

					<div class="flex flex-col gap-3">
						{#if additionalMints.length === 0}
							<div class="flex items-center gap-2">
								<div class="flex-1">
									<MintSelector disabled={additionalMints.length > 0} bind:mint />
								</div>
								<UnitSelector
									disabled={additionalMints.length > 0}
									bind:currentUnit
									selectedMints={[mint]}
								/>
							</div>
						{:else}
							<!-- additional mints -->
							<div class="space-y-2 rounded-md border border-blue-500/30 bg-blue-500/5 p-3">
								<div class="flex items-center gap-2 rounded bg-muted/30 px-2 py-1">
									<Avatar.Root class="h-8 w-8">
										{#if mint.info && (mint.info as any).icon_url}
											<Avatar.Image src={(mint.info as any).icon_url} alt={mint.info?.name ?? 'Mint'} />
										{:else}
											<Avatar.Fallback class="bg-primary/10 text-primary">{(mint.info?.name ?? 'M').charAt(0).toUpperCase()}</Avatar.Fallback>
										{/if}
									</Avatar.Root>
									<div class="flex-1 overflow-hidden">
										<p class="text-sm font-medium">{mint.info?.name || 'Mint'}</p>
										<p class="truncate text-xs text-muted-foreground">{mint.url}</p>
										{#if mint.amount}
											<p class={`text-xs font-medium ${getAmountColorStatus(mint, mint.amount)}`}>
												{formatAmount(mint.amount, 'sat')}
											</p>
											{#if isAmountNearBalance(mint, mint.amount)}
												<p class="mt-1 text-xs text-amber-600 dark:text-amber-400">
													Warning: Fee reserve needed
												</p>
											{/if}
										{/if}
									</div>
								</div>
								{#each additionalMints as additionalMint}
									<div class="flex items-center gap-2 rounded bg-muted/30 px-2 py-1">
										<Avatar.Root class="h-8 w-8">
											{#if additionalMint.info && (additionalMint.info as any).icon_url}
												<Avatar.Image src={(additionalMint.info as any).icon_url} alt={additionalMint.info?.name ?? 'Mint'} />
											{:else}
												<Avatar.Fallback class="bg-primary/10 text-primary">{(additionalMint.info?.name ?? 'M').charAt(0).toUpperCase()}</Avatar.Fallback>
											{/if}
										</Avatar.Root>
										<div class="flex-1 overflow-hidden">
											<p class="text-sm font-medium">{additionalMint.info?.name || 'Mint'}</p>
											<p class="truncate text-xs text-muted-foreground">{additionalMint.url}</p>
											{#if additionalMint.amount}
												<p class={`text-xs font-medium ${getAmountColorStatus(additionalMint, additionalMint.amount)}`}>
													{formatAmount(additionalMint.amount, 'sat')}
												</p>
												{#if isAmountNearBalance(additionalMint, additionalMint.amount)}
													<p class="mt-1 text-xs text-amber-600 dark:text-amber-400">
														Warning: Fee reserve needed
													</p>
												{/if}
											{/if}
										</div>
										<Button
											variant="ghost"
											size="icon"
											class="h-7 w-7"
											onclick={() => {
												additionalMints = additionalMints.filter(
													(m) => m.url !== additionalMint.url
												);
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="text-muted-foreground hover:text-destructive"
											>
												<path d="M18 6 6 18"></path>
												<path d="m6 6 12 12"></path>
											</svg>
										</Button>
									</div>
								{/each}
							</div>
						{/if}
						<Button
							variant="outline"
							onclick={() => {
								currentUnit = 'sat';
								isOpen = true;
							}}
						>
							<Plus></Plus>
							Add another mint (experimental)
						</Button>
						<div class="flex items-center justify-between rounded bg-muted/30 p-2">
							<span class="text-sm text-muted-foreground">Available balance</span>
							<span class="font-medium">
								{formatAmount(balance, currentUnit)}
							</span>
						</div>
					</div>
				</div>

				{#if additionalMints.length > 0}
					<!-- Multi-mint payment button -->
					<Button
						class="mt-4 w-full"
						variant="default"
						disabled={
							isProcessing || 
							!isValidTotal([mint, ...additionalMints]) || 
							([mint, ...additionalMints]).some(m => !hasSufficientBalance(m, m.amount ?? 0))
						}
						onclick={handlePayMulti}
					>
						{#if isProcessing}
							<div class="flex items-center gap-2">
								<div
									class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
								></div>
								Processing...
							</div>
						{:else}
							<div class="flex items-center gap-2">
								Pay from multiple mints
								<ArrowRight class="h-4 w-4" />
							</div>
						{/if}
					</Button>
					{#if !isValidTotal([mint, ...additionalMints])}
						<p class="mt-2 text-center text-xs text-destructive">
							Total amount must match invoice amount exactly
						</p>
					{:else if ([mint, ...additionalMints]).some(m => !hasSufficientBalance(m, m.amount ?? 0))}
						<p class="mt-2 text-center text-xs text-destructive">
							One or more mints have insufficient balance
						</p>
					{/if}
				{:else}
					<!-- Single mint payment button -->
					<Button
						class="mt-4 w-full"
						variant={amount > balance ? 'destructive' : 'default'}
						disabled={amount > balance || isProcessing}
						onclick={handlePayInvoice}
					>
						{#if isProcessing}
							<div class="flex items-center gap-2">
								<div
									class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
								></div>
								Processing...
							</div>
						{:else if amount > balance}
							Insufficient balance
						{:else}
							<div class="flex items-center gap-2">
								Pay Invoice
								<ArrowRight class="h-4 w-4" />
							</div>
						{/if}
					</Button>
				{/if}
			</div>
		</Card>
	{/if}
</div>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="">Add additional mints to pay from</Dialog.Title>
			<Dialog.Description class="text-destructive">
				Warning! Paying a single invoice from multiple mints is still experimental. Proceed with
				caution.
			</Dialog.Description>
		</Dialog.Header>
		<div class="my-4 max-h-80 space-y-3 overflow-y-auto">
			{#each $mintsStore.filter((m) => ![mint, ...additionalMints]
						.map((m) => m.url)
						.includes(m.url)) as mintToAdd}
				<!-- Clickable mint item area -->
				<button 
					class="w-full text-left flex items-center justify-between rounded border border-muted p-3 hover:bg-muted/30 hover:border-primary/50 transition-colors"
					onclick={() => addMint(mintToAdd)}
				>
					<div class="flex items-center gap-3">
						<Avatar.Root class="h-8 w-8">
							{#if mintToAdd.info && (mintToAdd.info as any).icon_url}
								<Avatar.Image src={(mintToAdd.info as any).icon_url} alt={mintToAdd.info?.name ?? 'Mint'} />
							{:else}
								<Avatar.Fallback class="bg-primary/10 text-primary">{(mintToAdd.info?.name ?? 'M').charAt(0).toUpperCase()}</Avatar.Fallback>
							{/if}
						</Avatar.Root>
						<div>
							<p class="text-sm font-medium">{mintToAdd.info?.name ?? 'Mint'}</p>
							<p class="truncate text-xs text-muted-foreground">{mintToAdd.url}</p>
							<p class="text-xs mt-1">
								Balance: <span class="font-medium">{formatAmount(getMintBalance(mintToAdd), 'sat')}</span>
							</p>
						</div>
					</div>
					<div class="flex items-center text-primary">
						<Plus class="h-4 w-4 mr-1" />
						<span class="text-xs">Add</span>
					</div>
				</button>
			{/each}
		</div>
		{#if amount > 0}
			<div class="mb-6">
				<p class="mb-2 text-sm font-medium">Invoice amount: {formatAmount(amount, 'sat')}</p>
				<div class="space-y-4 rounded-md border p-3">
					<div class="mb-3 flex items-center justify-between">
						<p class="text-sm font-medium">Payment distribution</p>
						<div class="flex flex-wrap gap-1 justify-end">
							<Button
								variant="outline"
								size="sm"
								class="h-7 px-2 text-xs"
								onclick={setEqualDistribution}
							>
								Equal
							</Button>
							<Button
								variant="outline"
								size="sm"
								class="h-7 px-2 text-xs"
								onclick={setRelativeToBalanceDistribution}
							>
								By Balance
							</Button>
							<Button
								variant="outline"
								size="sm"
								class="h-7 px-2 text-xs"
								onclick={setMaxPrimaryMintDistribution}
							>
								Max Primary
							</Button>
							<Button
								variant="outline"
								size="sm"
								class="h-7 px-2 text-xs"
								onclick={setMinPrimaryMintDistribution}
							>
								Min Primary
							</Button>
						</div>
					</div>

					<div class="my-4 h-px bg-muted"></div>
					{#each [mint, ...additionalMints] as selectedMint}
						<div class="space-y-2">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2">
									<Avatar.Root class="h-6 w-6">
										{#if selectedMint.info && (selectedMint.info as any).icon_url}
											<Avatar.Image src={(selectedMint.info as any).icon_url} alt={selectedMint.info?.name ?? 'Mint'} />
										{:else}
											<Avatar.Fallback class="bg-primary/10 text-primary text-xs">{(selectedMint.info?.name ?? 'M').charAt(0).toUpperCase()}</Avatar.Fallback>
										{/if}
									</Avatar.Root>
									<p class="text-sm">{selectedMint.info?.name ?? 'Mint'}</p>
									{#if additionalMints.includes(selectedMint)}
										<button onclick={() => additionalMints.splice(additionalMints.indexOf(selectedMint), 1)}>
											<X></X>
										</button>
									{/if}
								</div>
								<p class="text-sm font-medium">{formatAmount(selectedMint.amount ?? 0, 'sat')}</p>
							</div>
							{#if amount<10000}
							
							{@const remainingNeeded = amount - getTotalAmount([mint, ...additionalMints]) + (selectedMint.amount ?? 1)}
							{@const maxMintBalance = (getMintBalance(selectedMint)*.98)}
							<div class="relative">
								<Slider
									type="single"
									value={selectedMint.amount ?? 1}
									min={1}
									max={amount}
									step={1}
									onValueChange={(newAmount: number) => {
										// Calculate if we're close to the amount needed to complete the total
										const remainingNeeded = amount - getTotalAmount([mint, ...additionalMints]) + (selectedMint.amount ?? 1);
										const snapThreshold = Math.max(5, amount * 0.02); // 2% of total or 5 sats, whichever is larger
										
										// If we're within the threshold, snap to the exact amount needed
										if (Math.abs(newAmount - remainingNeeded) < snapThreshold && remainingNeeded > 0 && remainingNeeded < amount) {
											selectedMint.amount = Math.max(1, remainingNeeded);
										} else {
											selectedMint.amount = Math.max(1, newAmount);
										}
										
										// Update percentage for backward compatibility
										selectedMint.percentage = Math.floor((selectedMint.amount / amount) * 100);
									}}
								/>
								{#if remainingNeeded > 0 && remainingNeeded < amount}
									<!-- Snap to remaining amount marker -->
									<button aria-label="snap to remaining amount"
										class="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-500 rounded cursor-pointer"
										style={`left: calc(${(remainingNeeded / amount) * 100}% - 2px);`}
										onclick={() => {
											selectedMint.amount = remainingNeeded;
											selectedMint.percentage = Math.floor((remainingNeeded / amount) * 100);
										}}
										title="Click to set exact amount needed for total"
									></button>
								{/if}
								
								{#if (maxMintBalance/ amount) * 100 < 100}
								<button aria-label="snap to remaining amount"
								class="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-yellow-500 rounded cursor-pointer"
								style={`left: calc(${(maxMintBalance  / amount) * 100}% - 2px);`}
								title="Click to set exact amount needed for total"
								onclick={() => {
									selectedMint.amount = maxMintBalance;
									selectedMint.percentage = Math.floor(maxMintBalance  / amount * 100);
								}}
							></button>
							{/if}
							</div>

							{/if}
							<div class="mt-1 flex justify-between text-xs">
								<span class="text-muted-foreground"
									>Balance: {formatAmount(getMintBalance(selectedMint), 'sat')}</span
								>
								<span
									class={getAmountColorStatus(
										selectedMint,
										selectedMint.amount ?? 1
									)}
								>
									{Math.floor(((selectedMint.amount ?? 1) / amount) * 100)}%
								</span>
							</div>
							{#if isAmountNearBalance(selectedMint, selectedMint.amount ?? 0)}
								<div class="mt-1 rounded bg-amber-50 p-1 text-xs text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
									<div class="flex items-center gap-1">
										<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
										Warning: Amount is close to balance and may not leave enough for fees
									</div>
								</div>
							{/if}
						</div>
					{/each}

					<div class="mt-4 flex justify-between text-sm font-medium">
						<span>Total:</span>
						<span
							class={isValidTotal([mint, ...additionalMints])
								? 'text-green-500'
								: 'text-destructive'}
						>
							{formatAmount(
								getTotalAmount([mint, ...additionalMints]), 
								'sat'
							)} / {formatAmount(amount, 'sat')}
						</span>
					</div>
				</div>
			</div>
		{/if}


		<Dialog.Footer>
			<Button
				variant="outline"
				onclick={closeDialog}
			>
				Close
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
