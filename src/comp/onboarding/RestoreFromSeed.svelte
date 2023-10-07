<script lang="ts">
	import { toast } from "../../stores/toasts";
	import { wordlist } from '@scure/bip39/wordlists/english';
	import { validateMnemonic } from '@scure/bip39';
	import { mints } from "../../stores/mints";
	import { CashuMint, CashuWallet, deriveKeysetId, type Proof } from "@cashu/cashu-ts";
	import { updateCount, updateMintKeys } from "../../actions/walletActions";
	import { token } from "../../stores/tokens";
	import { getAmountForTokenSet } from "../util/walletUtils";
	import { mnemonic } from "../../stores/mnemonic";
	import RecommendedMints from "./RecommendedMints.svelte";
	import CheckTokens from "../wallet/CheckTokens.svelte";
	import { checkNonPending } from "../../stores/settings";
	import { isOnboarded } from "../../stores/message";

    export let isRestore


    let isRestoring = false;
	let isRestored = false;

    let restoreSeed: Array<string> = new Array(12);
    let restoredAmount = 0;
    let seedString: string = '';
    let totalCount = 0
    let lookedForMore = 0 

const populateSeed = () => {
    setTimeout(() => {
        restoreSeed = seedString.split(' ');
    }, 100);
};

	const restore = async () => {
		const seed = restoreSeed.join(' ');
		isRestoring = true
		if (!validateMnemonic(seed, wordlist)) {
			toast('warning', 'not a valid seed phrase', 'could not restore from seed');
        isRestoring=false

			return;
		}
		for (const mint of $mints) {
			const cashuMint = new CashuMint(mint.mintURL);
			const wallet = new CashuWallet(cashuMint, mint.keys, seed);
			const { proofs, newKeys, endCount } = await lookForProofs(wallet, 100, totalCount)
			if (newKeys) {
				updateMintKeys(mint, newKeys);
			}
			updateCount(deriveKeysetId(mint.keys), endCount)
			token.update((state) => [...proofs, ...state]);
			restoredAmount += getAmountForTokenSet(proofs);
            totalCount=endCount
		}
        isRestoring=false
        isRestored=true
		mnemonic.set(restoreSeed.join(' '));
        checkNonPending.set(true)
	};

	const lookForProofs = async (wallet: CashuWallet, count:number, start:number, foundProofs?: Proof[]) => {
		const { proofs, newKeys } = await wallet.restore(count, start);
		foundProofs = foundProofs??[]
		if (proofs.length) {
			foundProofs.push(...proofs)
			console.log("foundProofs!")
			lookForProofs(wallet,count,start+count,foundProofs)
		}
		return {proofs: foundProofs, newKeys, endCount: count+start}
	}
    const lookForMore = () => {
        lookedForMore++
        restore()
    }
    const finish = () => {
        checkNonPending.set(false)
        isOnboarded.set(true)
    }
    
</script>

<div class="card max-w-xl bg-base-100 shadow-xl">
    <div class="card-body">
        {#if $mints.length}
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
                Tokens have been recreated from this seed. Most likely, most of the tokens have been spent already. You can check 
            </p>
            
            <p class="text-sm">
                check now!
            </p>
            <div>
                <CheckTokens></CheckTokens>
            </div>
            <div class="flex justify-center gap-2">
                <button class="btn btn-md {lookedForMore>2 || isRestoring? 'btn-disabled':''}" on:click={lookForMore}>
                    {#if isRestoring}
                    <div class="loading"></div>
                    {:else}
                    look for more
                    {/if}
                </button><button class="btn" on:click={finish}>finish</button>
            </div>
        </div>
            {:else}
            <p>Insert your seed phrase in the correct order</p>
            <input
            type="text"
                class="input input-primary input-sm"
                placeholder="or paste seed here... you lazy bastard"
                on:paste={populateSeed}
                bind:value={seedString}
            />
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {#each restoreSeed as input, i}
                    <div class="flex gap-1">
                        <p>{i + 1}.</p>
                        <input
                            type="text"
                            class="input input-sm w-24 bg-base-300"
                            bind:value={restoreSeed[i]}
                        />
                    </div>
                {/each}
            </div>
            <div class="card-actions flex items-center justify-center w-full pt-3">
                <button class="btn" on:click={() => (isRestore = false)}> abort </button>
                <button
                    class="btn {restoreSeed.includes(undefined) || isRestoring
                        ? 'btn-disabled'
                        : 'btn-primary'}"
                    on:click={restore}
                >
                {#if isRestoring}
                <div class="loading"></div>
                {:else}
                restore
                {/if}
                </button>
            </div>
            {/if}
        {:else}
            <RecommendedMints isRestore={true} />
        {/if}
    </div>
</div>