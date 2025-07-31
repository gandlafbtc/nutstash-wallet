<script lang="ts">
	import { formatAmount } from '@gandlaf21/cashu-wallet-engine/util';
	import { ArrowDownRight, ArrowUpRight, Banknote, Zap, Timer, X, HandCoins } from 'lucide-svelte';
	import { formatDistance } from 'date-fns';
	import { now } from '$lib/stores/session/time';
	import {
		types
	} from '@gandlaf21/cashu-wallet-engine';
	import { t_ago, t_fee } from '$lib/paraglide/messages';
	import Page from '../../../../routes/+page.svelte';
	import { meltQuotesStore } from '@gandlaf21/cashu-wallet-engine/stores';
	import { decode } from '@gandlaf21/bolt11-decode';
	interface Props {
		item: types.StoredTransaction | types.StoredMeltQuote | types.StoredMintQuote | types.MultiMeltQuote;
	}

	let { item }: Props = $props();

	let isExpired = $derived(item.type === 'mint' && item.state === types.EXPIRED.EXPIRED);
	const getUrlForItem = (item: types.StoredTransaction | types.StoredMeltQuote | types.StoredMintQuote | types.MultiMeltQuote): string => {
		if (item.type === 'mint') {
			return `/#/wallet/receive/ln/${item.quote}`;
		} else if (item.type === 'melt') {
			return `/#/wallet/send/ln/${item.quote}`;
		} else if (item.type === 'receive') {
			return `/#/wallet/send/cashu/${item.id}`;
		} else if (item.type === 'send') {
			return `/#/wallet/send/cashu/${item.id}`;
		} else if (item.type === 'multi-melt') {
			return `/#/wallet/send/ln/multi/${item.id}`	
		} else {
			return `/#/wallet/`;
		}
	};
</script>

<a
	class="flex w-full items-center justify-between rounded-xl border p-3"
	class:opacity-50={isExpired}
	href={getUrlForItem(item)}
>
	<div class="relative">
		{#if item.type === 'mint'}
			<Zap class="text-yellow-500"></Zap>
			<div class="absolute -left-2 -top-1">
				<ArrowDownRight class="h-4 w-4 text-green-600"></ArrowDownRight>
			</div>
			{#if item.state === 'UNPAID'}
				<div class="absolute -right-3 -top-1">
					<Timer class="h-4 w-4"></Timer>
				</div>
				{#if isExpired}
					<div class="absolute -right-4 -top-2">
						<X class="h-6 w-6 text-red-600"></X>
					</div>
				{/if}
			{:else if item.state === 'PAID'}
				<div class="absolute -right-3 -top-1">
					<HandCoins class="h-4 w-4"></HandCoins>
				</div>
			{/if}
		
		{:else if item.type === 'multi-melt'}
		<Zap class="text-blue-500"></Zap>
		<div class="absolute -left-2 -top-1">
			<ArrowUpRight class="h-4 w-4 text-red-600"></ArrowUpRight>
		</div>
	
		{:else if item.type === 'melt'}
			<Zap class="text-yellow-500"></Zap>
			<div class="absolute -left-2 -top-1">
				<ArrowUpRight class="h-4 w-4 text-red-600"></ArrowUpRight>
			</div>
			{#if item.state === 'UNPAID'}
				<div class="absolute -right-3 -top-1">
					<Timer class="h-4 w-4"></Timer>
				</div>
				{#if isExpired}
					<div class="absolute -right-4 -top-2">
						<X class="h-6 w-6 text-red-600"></X>
					</div>
				{/if}
			{:else if item.state === 'PAID'}
				<!-- <div class="absolute -top-1 -right-3">
                    <Check class="w-4 h-4 text-green-500"></Check>
                </div> -->
			{:else if item.state === 'PENDING'}
				<div class="absolute -right-3 -top-1">
					<Timer class="h-4 w-4 text-red-600"></Timer>
				</div>
			{/if}
		{:else if item.type === 'send'}
			<Banknote class="text-violet-600"></Banknote>
			<div class="absolute -left-2 -top-1">
				<ArrowUpRight class="h-4 w-4 text-red-600"></ArrowUpRight>
			</div>
		{:else if item.type === 'receive'}
			<Banknote class="text-violet-600"></Banknote>
			<div class="absolute -left-2 -top-1">
				<ArrowDownRight class="h-4 w-4 text-green-600"></ArrowDownRight>
			</div>
		{/if}
	</div>
	<div class="flex flex-col items-start gap-1">
		<span class="text-sm">
			{formatDistance($now, item.lastChangedAt)}
			{t_ago()}
		</span>
		<p class="w-44 overflow-clip text-ellipsis text-nowrap text-xs text-muted-foreground">
			{#if item.type === 'multi-melt'}
			{item.quoteIds.length} mints			  
			{:else}
			  
			{item.mintUrl}
			{/if}
		</p>
	</div>
	<div class="flex flex-col items-end gap-1">
		<span>
			{#if item.type === 'multi-melt'}
			    {formatAmount(Math.floor(decode(item.invoice).sections[2].value / 1000), 'sat')}
			{:else}
				{formatAmount(item.amount, item.unit)}
			{/if}
		</span>
		{#if item.type === 'send' || item.type === 'receive' || item.type === 'melt'}
			<span class="text-xs text-muted-foreground">
				{formatAmount(item.fees ?? 0, item.unit)}
				{t_fee()}
			</span>
		{/if}
	</div>
</a>
