<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import type { Mint } from '$lib/db/models/types';
	import { seed } from '$lib/stores/persistent/mnemonic';
	import { restoredProofs } from '$lib/stores/session/restoredproofs';
	import { getUnitSymbol } from '$lib/util/walletUtils';
	import {
		CashuMint,
		CashuWallet,
		CheckStateEnum,
		type MintKeyset,
		type Proof
	} from '@cashu/cashu-ts';
	import { LoaderCircle } from 'lucide-svelte';
	import { hashToCurve } from '@cashu/crypto/modules/common';
	import { countsStore } from '$lib/stores/persistent/counts';
	import { toast } from 'svelte-sonner';

	const INCREMENT = 25;

	const enc = new TextEncoder();

	let { mint, restore = $bindable() }: { mint: Mint; restore: () => Promise<void> } = $props();
	let status = $state('waiting');
	let statusMessage = $state('');
	let statusMessage2 = $state('');
	let progress = $state(0);

	restore = async () => {
		await restoreMint();
	};

	const restoreMint = async () => {
		try {
			statusMessage = 'Loading mint keysets...';
			const cashuMint = new CashuMint(mint.url);
			const allKeysets = await cashuMint.getKeySets();
			progress = 5;

			const ksLen = allKeysets.keysets.length;
			const hexDigitsRegex = /^[0-9A-Fa-f]+$/;
			for (const [i, ks] of allKeysets.keysets.entries()) {
				if (!hexDigitsRegex.test(ks.id)) {
					toast.info(`Skipping ${ks.id}. Not a hex keyset.`);
					continue;
				}
				statusMessage = `Keyset ${i + 1} of ${ksLen} (${ks.id} / ${getUnitSymbol(ks.unit)}):`;
				statusMessage2 = 'loading keys...';
				await restoreKeyset(cashuMint, ks);
				progress = Math.floor(((i + 1) / ksLen) * 100);
				statusMessage2 = '';
			}
			statusMessage = 'All keysets restored';
			status = 'done';
			progress = 100;
		} catch (error) {
			// todo - improve how errors are collected
			status = 'error';
			statusMessage = error.message;
			statusMessage2 = '';
			throw error;
		}
	};
	const restoreKeyset = async (cashuMint: CashuMint, ks: MintKeyset) => {
		try {
			const keys = await cashuMint.getKeys(ks.id);
			const cashuWallet = new CashuWallet(cashuMint, {
				keys: keys.keysets,
				keysets: [ks],
				bip39seed: $seed
			});
			const { keysetProofs, count } = await restoreBatch(cashuWallet, 0, ks.id);
			await countsStore.addOrUpdate(ks.id, { count: count + 1, keysetId: ks.id }, 'keysetId');
			statusMessage2 = `checking proof states`;
			const proofStates = await cashuWallet.checkProofsStates(keysetProofs);

			//todo - also for pending?
			const unspentProofStateYs = proofStates
				.filter((ps) => ps.state === CheckStateEnum.UNSPENT)
				.map((ps) => ps.Y);
			const unspentKeysetProofs = keysetProofs.filter((p) =>
				unspentProofStateYs.includes(hashToCurve(enc.encode(p.secret)).toHex(true))
			);

			restoredProofs.update((ctx) => [...unspentKeysetProofs, ...ctx]);
		} catch (error) {
			status = 'error';
			statusMessage = error.message;
			statusMessage2 = '';
			throw error;
		}
	};

	const restoreBatch = async (cashuWallet: CashuWallet, from: number, keysetId: string) => {
		let keysetProofs: Proof[] = [];
		try {
			let newProofs: Proof[] = [];
			let lastFound = 0;
			let noProofsFoundCounter = 0;
			const noProofsFoundLimit = 3;

			do {
				newProofs = [];
				statusMessage2 = `restore ${from}...${from + INCREMENT}`;
				const { proofs } = await cashuWallet.restore(from, INCREMENT, { keysetId });
				newProofs = [...proofs];
				keysetProofs.push(...proofs);
				from = from + INCREMENT;
				if (newProofs.length) {
					noProofsFoundCounter = 0;
					lastFound = from;
				} else {
					noProofsFoundCounter++;
				}
			} while (noProofsFoundCounter < noProofsFoundLimit);

			return { keysetProofs, count: lastFound + 1 };
		} catch (error) {
			statusMessage2 = '';
			statusMessage = error.message;
			status = 'error';
			throw error;
		}
	};
</script>

<div class="flex flex-col gap-2 rounded-lg border p-4">
	<div class="flex w-full justify-between gap-2">
		<span class="w-64 overflow-clip text-ellipsis">
			{mint.url}
		</span>
		{#if status === 'done'}
			<Badge variant="outline" class="text-green-500">Done</Badge>
		{:else if status === 'error'}
			<Badge variant="destructive">Error</Badge>
		{:else if status === 'inprogress'}
			<LoaderCircle class="h-4 w-4 animate-spin"></LoaderCircle>
		{:else}
			<Badge variant="outline">waiting..</Badge>
		{/if}
	</div>
	<div class="h-16">
		<span class="text-xs text-gray-500">
			{statusMessage}
			{statusMessage2}
		</span>
	</div>
	<Progress value={progress}></Progress>
</div>
