<script lang="ts">
	import { consumed_by, created_by, t_not_found } from '$lib/paraglide/messages';
	import { meltQuotesStore } from '$lib/stores/persistent/meltquotes';
	import { mintQuotesStore } from '$lib/stores/persistent/mintquotes';
	import { mints } from '$lib/stores/persistent/mints';
	import {
		offlineProofsStore,
		pendingProofsStore,
		proofsStore,
		spentProofsStore
	} from '$lib/stores/persistent/proofs';
	import { transactionsStore } from '$lib/stores/persistent/transactions';
	import { formatAmount, getUnitForKeysetId } from '$lib/util/walletUtils';
	import { Coins } from 'lucide-svelte';
	import { params } from 'svelte-spa-router';

	let allProofs = $derived([
		...$proofsStore,
		...$offlineProofsStore,
		...$pendingProofsStore,
		...$spentProofsStore
	]);

	let proof = $derived(allProofs.find((p) => p.secret === $params?.secret));

	let unit = $derived.by(() => {
		if (!proof) {
			return 'sat';
		}
		return getUnitForKeysetId($mints, proof.id);
	});

	//creators
	let mintQuote = $derived(
		$mintQuotesStore.find((mq) => mq.out?.find((mqp) => mqp.id === proof?.id))
	);
	let transactionOut = $derived(
		$transactionsStore.find((tx) => tx.out?.find((txo) => txo.id === proof?.id))
	);
	let meltQuoteOut = $derived(
		$meltQuotesStore.find((mq) => mq.out?.find((mqp) => mqp.id === proof?.id))
	);

	//consumers
	let transactionIn = $derived(
		$transactionsStore.find((tx) => tx.in?.find((txi) => txi.id === proof?.id))
	);
	let meltQuoteIn = $derived(
		$meltQuotesStore.find((mq) => mq.in?.find((mqp) => mqp.id === proof?.id))
	);
</script>

{#if proof}
	<div class="flex w-80 flex-col gap-2 rounded-xl border p-5 xl:w-[600px]">
		<div class="flex items-center justify-between">
			<div class="relative">
				<Coins class="text-yellow-500"></Coins>
				<div class="absolute -right-2 -top-2"></div>
			</div>

			<span class="text-sm"> </span>
			<div class="flex flex-col items-end gap-1">
				<span>
					{formatAmount(proof.amount, unit)}
				</span>
				<span class="text-xs text-secondary">
					{proof.id}
				</span>
			</div>
		</div>
		<div>
			{#if mintQuote || transactionOut || meltQuoteOut}
				<span> {created_by()}: </span>
				<!-- created by -->
				{#if mintQuote}
					<a
						class="cursor-pointer overflow-clip text-ellipsis hover:underline"
						href={`/#/wallet/receive/ln/${mintQuote.quote}`}
					>
						{mintQuote.quote}
					</a>
				{/if}
				{#if transactionOut}
					<a
						class="cursor-pointer overflow-clip text-ellipsis hover:underline"
						href={`/#/wallet/send/cashu/${transactionOut.id}`}
					>
						{transactionOut.id}
					</a>
				{/if}
				{#if meltQuoteOut}
					<a
						class="cursor-pointer overflow-clip text-ellipsis hover:underline"
						href={`/#/wallet/send/ln/${meltQuoteOut.quote}`}
					>
						{meltQuoteOut.quote}
					</a>
				{/if}
			{/if}

			{#if meltQuoteIn || transactionIn}
				<span> {consumed_by()}: </span>
				<!-- consumed by -->
				{#if meltQuoteIn}
					<a
						class="cursor-pointer overflow-clip text-ellipsis hover:underline"
						href={`/#/wallet/send/ln/${meltQuoteIn.quote}`}
					>
						{meltQuoteIn.quote}
					</a>
				{/if}
				{#if transactionIn}
					<a
						class="cursor-pointer overflow-clip text-ellipsis hover:underline"
						href={`/#/wallet/send/cashu/${transactionIn.id}`}
					>
						{transactionIn.id}
					</a>
				{/if}
			{/if}
		</div>
	</div>
{:else}
	{t_not_found()}
{/if}
