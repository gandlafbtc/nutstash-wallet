<script lang="ts">
	import { formatAmount } from '$lib/util/walletUtils';
	import { ArrowDownRight, ArrowUpRight, Banknote, Zap, Timer, X, HandCoins } from 'lucide-svelte';
	import { formatDistance } from 'date-fns';
	import { now } from '$lib/stores/session/time';
	import {
		EXPIRED,
		type StoredMeltQuote,
		type StoredMintQuote,
		type StoredTransaction
	} from '$lib/db/models/types';
	import { t_ago, t_fee } from '$lib/paraglide/messages';
	interface Props {
		item: StoredTransaction | StoredMeltQuote | StoredMintQuote;
	}

	let { item }: Props = $props();

	let isExpired = $derived(item.type === 'mint' && item.state === EXPIRED.EXPIRED);
	const getUrlForItem = (item: StoredTransaction | StoredMeltQuote | StoredMintQuote): string => {
		if (item.type === 'mint') {
			return `/#/wallet/receive/ln/${item.quote}`;
		} else if (item.type === 'melt') {
			return `/#/wallet/send/ln/${item.quote}`;
		} else if (item.type === 'receive') {
			return `/#/wallet/send/cashu/${item.id}`;
		} else if (item.type === 'send') {
			return `/#/wallet/send/cashu/${item.id}`;
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
			{item.mintUrl}
		</p>
	</div>
	<div class="flex flex-col items-end gap-1">
		<span>
			{formatAmount(item.amount, item.unit)}
		</span>
		{#if item.type === 'send' || item.type === 'receive' || item.type === 'melt'}
			<span class="text-xs text-muted-foreground">
				{formatAmount(item.fees ?? 0, item.unit)}
				{t_fee()}
			</span>
		{/if}
	</div>
</a>
