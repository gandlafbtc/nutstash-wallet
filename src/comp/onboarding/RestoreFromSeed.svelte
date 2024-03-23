<script lang="ts">
	import { toast } from '../../stores/toasts';
	import { wordlist } from '@scure/bip39/wordlists/english';
	import { validateMnemonic } from '@scure/bip39';
	import { mints } from '../../stores/mints';
	import { CashuMint, CashuWallet, deriveKeysetId, type Proof } from '@cashu/cashu-ts';
	import { updateCount } from '../../actions/walletActions';
	import { token } from '../../stores/tokens';
	import { getAmountForTokenSet, getKeysForUnit } from '../util/walletUtils';
	import { mnemonic } from '../../stores/mnemonic';
	import RecommendedMints from './RecommendedMints.svelte';
	import CheckTokens from '../wallet/CheckTokens.svelte';
	import { checkNonPending } from '../../stores/settings';
	import { isOnboarded } from '../../stores/message';
	import type { Mint } from '../../model/mint';
	import KeysetModal from './KeysetModal.svelte';

	export let isRestore;

	let isRestoring = false;
	let isRestored = false;
	let isShowMints = false;

	let restoreSeed: Array<string> = new Array(12);
	let restoredAmount = 0;
	let seedString: string = '';
	let totalCount = 0;
	let lookedForMore = 0;

	let keysetMap: { mint: Mint; keysets: { id: string; isSelected: boolean }[] }[] = [];

	const populateSeed = () => {
		setTimeout(() => {
			restoreSeed = seedString.split(' ');
		}, 100);
	};

	const restore = async () => {
		const seed = restoreSeed.join(' ');
		isRestoring = true;
		if (!validateMnemonic(seed, wordlist)) {
			toast('warning', 'not a valid seed phrase', 'could not restore from seed');
			isRestoring = false;

			return;
		}
		for (const mint of $mints) {
			const keys = getKeysForUnit(mint.keys)
			const cashuMint = new CashuMint(mint.mintURL);
			const wallet = new CashuWallet(cashuMint, keys, seed);

			const keysets: string[] = getSelectedKeysetsForMint(mint.mintURL);

			if (!keysets.length) {
				keysets.push(wallet.keysetId);
			}

			for (const keyset of keysets) {
				const { proofs, endCount } = await lookForProofs(wallet, 100, totalCount, keyset);
				
				updateCount(wallet.keysetId, endCount);
				token.update((state) => [...proofs, ...state]);
				restoredAmount += getAmountForTokenSet(proofs);
				totalCount = endCount;
			}
		}
		isRestoring = false;
		isRestored = true;
		mnemonic.set(restoreSeed);
		checkNonPending.set(true);
	};

	const lookForProofs = async (
		wallet: CashuWallet,
		count: number,
		start: number,
		keysetId?: string,
		foundProofs?: Proof[]
	) => {
		const { proofs } = await wallet.restore(start, count, keysetId);
		foundProofs = foundProofs ?? [];
		if (proofs.length) {
			foundProofs.push(...proofs);
			lookForProofs(wallet, count, start + count, keysetId, foundProofs);
		}
		return { proofs: foundProofs, endCount: count + start };
	};
	const lookForMore = () => {
		lookedForMore++;
		restore();
	};
	const finish = () => {
		checkNonPending.set(false);
		isOnboarded.set(true);
	};

	function getSelectedKeysetsForMint(mintUrl: string): string[] {
		const entry = keysetMap.find((m) => m.mint.mintURL === mintUrl);
		return entry?.keysets.filter((k) => k.isSelected).map((k) => k.id) ?? [];
	}

	function lookAgain() {
		lookedForMore = 0;
		totalCount = 0;
		restore();
	}

	function showMints() {
		if (!validateMnemonic(seedString, wordlist)) {
			toast('error', 'the seed phrase was invalid', 'mnemonic is not valid');
			return;
		}

		isShowMints = true;
	}
</script>

{#if isRestored}
	<div class="flex-col flex gap-4">
		<p class="text-8xl">
			{$token.reduce((count, t) => {
				return count + t.amount;
			}, 0) ?? 0}
		</p>
		<div class="flex gap-2 items-center justify-center">
			<p class="text-4xl">sats</p>
		</div>
		<p>
			{totalCount} Tokens have been recreated from this seed. Most likely, most of the tokens have been
			spent already.
		</p>

		<p class="text-sm">check now!</p>
		<div>
			<CheckTokens></CheckTokens>
		</div>
		<p>If you couldn't restore tokens, you can try the following options</p>
		<div class="flex gap-2 w-full">
			<button
				class="btn flex-grow btn-md {lookedForMore > 2 || isRestoring ? 'btn-disabled' : ''}"
				on:click={lookForMore}
			>
				{#if isRestoring}
					<div class="loading"></div>
				{:else}
					look for more
				{/if}
			</button>
			<button
				class="btn flex-grow btn-md {isRestoring ? 'btn-disabled' : 'btn-secondary'}"
				on:click={lookAgain}
			>
				{#if isRestoring}
					<div class="loading"></div>
				{:else}
					look again
				{/if}
			</button>
		</div>
		<KeysetModal bind:keysetMap></KeysetModal>

		<div class="flex justify-center gap-2 w-full">
			<button class="btn btn-primary w-full" on:click={finish}>finish</button>
		</div>
	</div>
{:else if !isShowMints}
	<div class="flex flex-col gap-4">
		<p>Insert your seed phrase in the correct order</p>
		<input
			type="text"
			class="input input-primary input-sm"
			placeholder="or paste seed here..."
			on:paste={populateSeed}
			bind:value={seedString}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					showMints();
				}
			}}
		/>
		<div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
			{#each restoreSeed as input, i}
				<div class="flex gap-1 items-end justify-end">
					<p>{i + 1}.</p>
					<input type="text" class="input input-sm w-24 bg-base-300" bind:value={restoreSeed[i]} />
				</div>
			{/each}
		</div>
		<div class="gap-5 flex flex-col items-center justify-center w-full pt-3">
			<button
				class="btn {restoreSeed.includes(undefined) || isRestoring
					? 'btn-disabled'
					: 'btn-primary'}"
				on:click={showMints}
			>
				{#if isRestoring}
					<div class="loading"></div>
				{:else}
					restore
				{/if}
			</button>
			<button class="link" on:click={() => (isRestore = false)}> abort </button>
		</div>
	</div>
{:else}
	<RecommendedMints {restore} bind:isSetupMints={isShowMints} />
{/if}
