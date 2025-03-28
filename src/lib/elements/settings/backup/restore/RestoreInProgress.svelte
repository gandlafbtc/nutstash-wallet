<script lang="ts">
	import { mints } from '$lib/stores/persistent/mints';
	import { onDestroy, onMount } from 'svelte';
	import { Coins, Landmark, LoaderCircle } from 'lucide-svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import RestoreMint from './RestoreMint.svelte';
	import NumberFlow from '@number-flow/svelte';
	import { restoredProofs } from '$lib/stores/session/restoredproofs';
	import {
		getAmountForTokenSet,
		getUnitForKeysetId,
		getUnitsForMints,
		getUnitSymbol
	} from '$lib/util/walletUtils';
	import type { Proof } from '@cashu/cashu-ts';
	import UnitDisplay from './UnitDisplay.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Divider from '$lib/elements/ui/Divider.svelte';
	import { proofsStore } from '$lib/stores/persistent/proofs';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import { push } from 'svelte-spa-router';
	import { add_restored_to_wallet, added_restored_ecash_to_your_wallet, adding_will_replace_ecash, restore_in_progress, restore_process_completed, t_add, t_cancel, t_summary, wallet_already_contains_ecash } from '$lib/paraglide/messages';

	const restoreMints = $derived($mints);

	let isOpen = $state(false);

	const getUnitProofs = (proofs: Proof[]) => {
		const unitProofs: { proofs: Proof[]; unit: string }[] = [];
		for (const proof of proofs) {
			const unit = getUnitForKeysetId(restoreMints, proof.id);
			let unitProof = unitProofs.find((u) => u.unit === unit);
			if (!unitProof) {
				unitProof = { proofs: [], unit: unit };
				unitProofs.push(unitProof);
			}
			unitProof.proofs.push(proof);
		}
		return unitProofs;
	};

	let restoredUnits = $derived(getUnitProofs($restoredProofs));
	$inspect(restoredUnits);
	const restores: (() => Promise<void>)[] = [];
	let mintsRestored = $state(0);
	let progress = $state(0);
	let inprogress = $state(false);

	onMount(async () => {
		setTimeout(async () => {
			inprogress = true;
			for await (const [i, r] of restores.entries()) {
				await r();
				mintsRestored++;
				progress = ((i + 1) / restores.length) * 100;
			}
			toast.success(restore_process_completed());
			inprogress = false;
		}, 200);
	});

	onDestroy(() => {
		restoredProofs.set([]);
	});
	const addToWallet = async (enforceAdd = false) => {
		if ($proofsStore.length && !enforceAdd) {
			isOpen = true;
			return;
		}
		await proofsStore.reset();
		await proofsStore.addMany($restoredProofs);
		restoredProofs.set([]);
		toast.success(added_restored_ecash_to_your_wallet());
		isOpen = false;
		push('/wallet/');
	};
</script>

<div class="flex h-full w-80 flex-col gap-2 xl:w-[600px]">
	<div>
		<span class="flex items-center gap-2 text-lg font-bold">
			{restore_in_progress()}
			{#if inprogress}
				<LoaderCircle class="animate-spin"></LoaderCircle>
			{/if}
		</span>
	</div>
	<div class="flex flex-col gap-3 rounded-lg border p-4">
		<span class="font-bold"> {t_summary()} </span>
		<div class="grid grid-cols-3 gap-3">
			<div class="flex items-center gap-2">
				<Landmark></Landmark>

				<NumberFlow value={mintsRestored}></NumberFlow>
			</div>
			<div class="flex items-center gap-2">
				<Coins></Coins>
				<NumberFlow value={$restoredProofs.length}></NumberFlow>
			</div>
			{#each restoredUnits as up}
				<UnitDisplay amount={getAmountForTokenSet(up.proofs)} unit={up.unit}></UnitDisplay>
			{/each}
		</div>
		<Progress value={progress}></Progress>
	</div>
	<div class="w-full">
		<Button disabled={progress < 100} class="w-full" onclick={() => addToWallet()}>
			{add_restored_to_wallet()}
		</Button>
	</div>
	<Divider text="Restoring mints"></Divider>

	{#each restoreMints as mint, i}
		<div class="my-2">
			<RestoreMint {mint} bind:restore={restores[i]}></RestoreMint>
		</div>
	{/each}
</div>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-destructive">{wallet_already_contains_ecash()}!</Dialog.Title>
			<Dialog.Description>
				{adding_will_replace_ecash()}
			</Dialog.Description>
		</Dialog.Header>

		<Dialog.Footer class="flex gap-2">
			<Button
				variant="outline"
				onclick={() => {
					isOpen = false;
				}}
			>
				{t_cancel()}
			</Button>
			<Button variant="destructive" onclick={() => addToWallet(true)}>{t_add()}</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
