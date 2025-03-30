<script lang="ts">
	import { Check, Type, Coins, Timer, PlugZap, CircleCheckBig } from 'lucide-svelte';
	import {
		offlineProofsStore,
		pendingProofsStore,
		proofsStore,
		spentProofsStore
	} from '$lib/stores/persistent/proofs';
	import type { Proof } from '@cashu/cashu-ts';
	import * as Select from '$lib/components/ui/select';
	import { available_mints, load_more, nothing_here_yet, t_ecash } from '$lib/paraglide/messages';

	type ProofType = 'OFFLINE' | 'SPENT' | 'PENDING' | 'DEFAULT';

	let selectedStoresOptions = ['DEFAULT', 'PENDING', 'SPENT', 'OFFLINE'];
	let selectedStores: ProofType[] = $state(['DEFAULT']);

	const getSelectedProofsStores = () => {
		const items: (Proof & { type: ProofType })[] = [];
		if (selectedStores.includes('DEFAULT')) {
			const ps = $proofsStore.map((p): Proof & { type: ProofType } => {
				const pt = p as Proof & { type: ProofType };
				pt.type = 'DEFAULT';
				return pt;
			});
			items.push(...ps);
		}
		if (selectedStores.includes('PENDING')) {
			const ps = $pendingProofsStore.map((p): Proof & { type: ProofType } => {
				const pt = p as Proof & { type: ProofType };
				pt.type = 'PENDING';
				return pt;
			});
			items.push(...ps);
		}
		if (selectedStores.includes('SPENT')) {
			const ps = $spentProofsStore.map((p): Proof & { type: ProofType } => {
				const pt = p as Proof & { type: ProofType };
				pt.type = 'SPENT';
				return pt;
			});
			items.push(...ps);
		}
		if (selectedStores.includes('OFFLINE')) {
			const ps = $offlineProofsStore.map((p): Proof & { type: ProofType } => {
				const pt = p as Proof & { type: ProofType };
				pt.type = 'OFFLINE';
				return pt;
			});
			items.push(...ps);
		}
		return items;
	};

	let items = $derived.by(getSelectedProofsStores);

	let limit = $state(5);

	let latest = $derived(items.slice(0, limit));
</script>

<div class="flex h-full flex-col gap-2">
	<p class="text-lg font-bold">{t_ecash()}</p>
	<Select.Root type="multiple" name="mint-single" bind:value={selectedStores} allowDeselect={false}>
		<Select.Trigger class="w-80 xl:w-[600px]">
			<Type class="h-5 w-5"></Type>
			{selectedStores.join(', ')}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.GroupHeading>{available_mints()}</Select.GroupHeading>
				{#each selectedStoresOptions as o}
					<Select.Item value={o} label={o}>{o}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
	<div class="mt-6 flex w-full gap-2">
		<div class="flex w-full flex-col gap-2">
			{#each latest as item}
				<a
					href={`/#/wallet/ecash/${item.type}/${item.secret}`}
					class="flex w-full items-center justify-between rounded-xl border p-5"
				>
					<div class="relative">
						<Coins class="text-yellow-500"></Coins>
						<div class="absolute -right-2 -top-2">
							{#if item.type === 'DEFAULT'}
								<Check class="h-4 w-4 text-green-600"></Check>
							{:else if item.type === 'PENDING'}
								<Timer class="h-4 w-4 text-white"></Timer>
							{:else if item.type === 'OFFLINE'}
								<PlugZap class="h-4 w-4 text-red-600"></PlugZap>
							{:else if item.type === 'SPENT'}
								<CircleCheckBig class="h-4 w-4 text-purple-600"></CircleCheckBig>
							{/if}
						</div>
					</div>

					<span class="text-sm"> </span>
					<div class="flex flex-col items-end gap-1">
						<span>
							{item.amount}
						</span>
						<span class="text-xs text-secondary">
							{item.id}
						</span>
					</div>
				</a>
			{/each}
			{#if latest.length >= items.length}
				<button class="flex w-full rounded-xl border p-5 opacity-45">
					<span class="text-xs">
						{#if !items.length}
							{nothing_here_yet()}
						{/if}
					</span>
				</button>
			{:else}
				<button
					class="flex w-full rounded-xl border p-5"
					onclick={() => {
						if (limit + 5 < items.length) {
							limit += 5;
						} else {
							limit = items.length;
						}
					}}
				>
					<span class="text-xs">{load_more()}</span>
				</button>
			{/if}
		</div>
	</div>
</div>
