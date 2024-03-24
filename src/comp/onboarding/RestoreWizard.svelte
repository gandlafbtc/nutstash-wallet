<script lang="ts">
	import { isOnboarded } from "../../stores/message";
	import { mints } from "../../stores/mints";
	import { mnemonic, seed } from "../../stores/mnemonic";
	import { checkNonPending, isRestoring } from "../../stores/settings";
	import { token } from "../../stores/tokens";
	import AddMintForm from "../elements/AddMintForm.svelte";
	import { getAmountForTokenSet } from "../util/walletUtils";
	import CheckTokens from "../wallet/CheckTokens.svelte";
	import MintRestoreCard from "./MintRestoreCard.svelte";

	let countStep = 50

	let isAutosearched=false

	let mintSearches: (()=>void)[] = []

	function autoSearch () {
		isAutosearched = true
		for (const f of mintSearches) {
			f()
		}
	}

	function abortRestore() {
		mnemonic.set([])
		seed.set(new Uint8Array())
		isRestoring.set(false)
		isOnboarded.set(false)
		checkNonPending.set(false);
	}

	function finish () {
		isRestoring.set(false)
		checkNonPending.set(false);
	}

</script>

<div class="flex max-w-5xl w-full h-full bg-base-100 rounded-lg justify-between items-center flex-col gap-2 p-3">
	<div class="flex flex-col gap-2 w-full items-center">
		<h1 class="font-bold text-2xl">
			Ecash restore wizard 🪄
		</h1>
		<div class="flex">
			<AddMintForm></AddMintForm>
		</div>
		{#if $mints.length}
		<div>
			<p class="text-secondary">
				Search per tap ({countStep})
			</p>
			<input type="range" min="10" max="200" bind:value={countStep} class="range range-secondary">
		</div>
		<div class="flex gap-2 p-2 rounded-lg w-full bg-base-200 justify-between items-center">
			<button class="btn {isAutosearched?'btn-disabled':'btn-secondary'}" on:click={autoSearch}>
				Auto search
			</button>
			<CheckTokens></CheckTokens>
			<div class="flex gap-2 items-center">
				<div class="flex flex-col justify-start items-end">
					<p class="font-bold text-xl">
						{$token.length}
					</p>
					<p class="text-sm">
						({getAmountForTokenSet($token)} sats)
					</p>
				</div>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-warning">
					<path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
					<path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
					<path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
					<path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
				</svg>
			</div>
		</div>
		{/if}
		{#each $mints as mint, i}
			 <MintRestoreCard {mint} {countStep} bind:mintAutoSearch={mintSearches[i]}>

			 </MintRestoreCard>
		{/each}
	</div>
	<div class="flex flex-col gap-2">
		<button class="btn btn-primary" on:click={finish}> Finish </button>
		<button class="link" on:click={abortRestore}> abort </button>
	</div>
	</div>
