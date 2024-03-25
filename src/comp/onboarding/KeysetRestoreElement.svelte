<script lang="ts">
	import { toast } from '../../stores/toasts';
	import { wordlist } from '@scure/bip39/wordlists/english';
	import { validateMnemonic } from '@scure/bip39';
	import { mints } from '../../stores/mints';
	import {
		CashuMint,
		CashuWallet,
		deriveKeysetId,
		type MintKeyset,
		type Proof
	} from '@cashu/cashu-ts';
	import { updateCount } from '../../actions/walletActions';
	import { token } from '../../stores/tokens';
	import { getAmountForTokenSet, getKeysForKeysetId, getKeysForUnit } from '../util/walletUtils';
	import { mnemonic, seed } from '../../stores/mnemonic';
	import { checkNonPending, isRestoring } from '../../stores/settings';
	import { isOnboarded } from '../../stores/message';
	import type { Mint } from '../../model/mint';
	import { counts } from '../../stores/counts';
	import { onMount } from 'svelte';
	import { channelMessageEvent } from 'nostr-tools/nip28';

	export let ks: MintKeyset;
	export let mint: Mint;
	export let countStep: number
	export const ksAutoSearch = async () => {
		const isFoundProofs = await search()
		if (isFoundProofs) {
			ksAutoSearch()
		}
	}

	type Search = {
		from: number;
		to: number;
		found?: number;
		amount?: number;
		isSkipped:boolean
	};

	let searches: Search[] = [];
	const cashuMint = new CashuMint(mint.mintURL);
	let wallet: CashuWallet


	onMount(()=> {
		if(!$counts.find((c)=>c.keysetId===ks.id)?.count){
			counts.update(cts=> [{count:1, keysetId: ks.id},...cts])
		}
	})

	async function search(): Promise<boolean> {
		wallet = wallet?wallet:new CashuWallet(cashuMint, getKeysForKeysetId(mint.keys,ks.id), $seed);
		const currentCount  = $counts.find((c)=>c.keysetId===ks.id)
		if (!currentCount) {
			throw new Error("could not update count");
		}
		const count = currentCount.count
		incrCount(currentCount)
		const { proofs } = await wallet.restore(count, countStep, ks.id);
		if (proofs) {
			token.update(ctx=> [...proofs,...ctx])
		}
		searches.push({
			isSkipped:false,
			from: count,
			to: count+countStep,
			found: proofs.length,
			amount: getAmountForTokenSet(proofs)
		})
		searches=searches
		return proofs.length?true:false
	}

	function incrCount (currentCount: { keysetId: string; count: number; }) {
		counts.update((cts)=> {
			if (!currentCount) {
				throw new Error("could not update count");
			}
			currentCount.count = currentCount?.count+countStep
			const others = cts.filter((c)=>c.keysetId!==ks.id)
			others.push(currentCount)
			return others
		})
	}

	function skip() {
		const currentCount  = $counts.find((c)=>c.keysetId===ks.id)		
		if (!currentCount) {
			throw new Error("could not update count");
		}
		const count = currentCount.count
		incrCount(currentCount)
		searches.push({
			isSkipped:true,
			from: count,
			to: count+countStep
		})
		searches=searches
	}

</script>

<div class="flex gap-1 justify-center flex-col bg-base-300 p-1 rounded-md">
	<div class="flex gap-1 justify-between">
		<div class="flex gap-1">

			<button
			class="btn btn-xs {mint.keys.map((m) => m.id).includes(ks.id) ? 'btn-secondary' : ''}"
			on:click={search}
			>
			Search
		</button>
		<button class="btn btn-xs" on:click={skip}> Skip ahead </button>
	</div>
	<p class="italic text-xs {ks.active?'text-secondary':'text-neutral'}">
		{ks.id}
	</p>
	</div>
	<div class="flex gap-1 min-h-16 flex-wrap pt-2">
		{#each searches as s}
			{#if s.isSkipped}
				<div class="flex flex-col gap-1 p-1 rounded-lg bg-base-100">
					<p class="italic text-neutral text-xs">
						Skipped
					</p>
					<p class="text-sm">
						{s.from} - {s.to}
					</p>
				</div>
			{:else}
			<div class="flex flex-col gap-1 p-1 rounded-lg bg-base-100 border-secondary border">
				<p class="italic text-neutral text-xs">
					Searched
				</p>
				<div class="flex gap-1 text-sm">
					<span>
						{s.from} - {s.to}
					</span>
					{#if s.found}
					<p class="flex gap-1">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-warning">
							<path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
							<path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
							<path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
							<path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
						  </svg> 
						<span>
							{s.found} ({s.amount} sats)
						</span>
						</p>
					{/if}
				</div>
			</div>
			{/if}

		{/each}
	</div>
</div>
