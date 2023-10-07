<script lang="ts">
	import RecommendedMints from './RecommendedMints.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { mnemonic } from '../../stores/mnemonic';
	import { CashuMint, CashuWallet, generateNewMnemonic } from '@cashu/cashu-ts';
	import { validateMnemonic } from '@scure/bip39';
	import { wordlist } from '@scure/bip39/wordlists/english';
	import { toast } from '../../stores/toasts';
	import Mnemonic from '../elements/Mnemonic.svelte';
	import { browser } from '$app/environment';
	import { token } from '../../stores/tokens';
	import { updateMintKeys } from '../../actions/walletActions';
	import { mints } from '../../stores/mints';
	import { getAmountForTokenSet } from '../util/walletUtils';
	import { isOnboarded } from '../../stores/message';

	let setUpMint = false;

	let isRestore = false;
	let isRestoring = false;

	let restoreSeed: Array<string> = new Array(12);

	let seedString: string = '';

	const populateSeed = () => {
		setTimeout(() => {
			restoreSeed = seedString.split(' ');
		}, 100);
	};

	const doSetupMint = async () => {
		await goto('/', {
			replaceState: true,
			keepFocus: true,
			noScroll: true
		});
		setUpMint = true;
	};

	const createMnemonic = () => {
		mnemonic.set(generateNewMnemonic());
	};
	const restore = async () => {
		//todo restore logic
		const seed = restoreSeed.join(' ');
		let restoredAmount = 0;
		if (!validateMnemonic(seed, wordlist)) {
			toast('warning', 'not a valid seed phrase', 'could not restore from seed');
			return;
		}
		for (const mint of $mints) {
			const cashuMint = new CashuMint(mint.mintURL);
			const wallet = new CashuWallet(cashuMint, mint.keys, seed);
			const { proofs, newKeys } = await wallet.restore(100);
			if (newKeys) {
				updateMintKeys(mint, newKeys);
			}
			token.update((state) => [...proofs, ...state]);
			restoredAmount += getAmountForTokenSet(proofs);
		}
		mnemonic.set(restoreSeed.join(' '));
		isRestore = false;
		toast('success', `${restoredAmount} sats were restored`, 'Seed imported');
		isOnboarded.set(true);
	};
</script>

<div />
{#if !setUpMint}
	<div class="flex items-center col-span-2 text-white">
		<div class="flex flex-col w-full items-center justify-center text-center col-span-2 gap-2">
			<div class="carousel max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
				<div id="1" class="carousel-item w-full flex flex-col items-center justify-center gap-2">
					<div class="w-32 h-32">
						<img src="/nutstash_app.svg" alt="" />
					</div>
					<h1 class="text-lg font-bold">Welcome to nutstash</h1>
					<p>Nutstash is still in beta development. Please use at own risk.</p>
					<div class="flex gap-2 items-center h-24">
						<a href="#2" class="">
							<span class="relative flex h-10 w-10">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-10 h-10 relative inline-flex rounded-full"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</span>
						</a>
					</div>
				</div>
				<div id="2" class="carousel-item w-full flex flex-col items-center justify-center gap-2">
					<img src="/icons/shades.svg" alt="shades" class=" w-32" />
					<h1 class="text-lg font-bold">Ecash for Privacy</h1>
					<p>
						nutstash is a custodial lightning wallet that uses the Cashu ecash protocol to protect
						your privacy.
					</p>
					<div class="flex gap-2 items-center h-24">
						<a href="#3" class="">
							<span class="relative flex h-10 w-10">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-10 h-10 relative inline-flex rounded-full"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</span>
						</a>
					</div>
				</div>
				<div id="3" class="carousel-item w-full flex flex-col items-center justify-center gap-2">
					<img src="/icons/stache.svg" alt="stache" class="w-32" />
					<h1 class="text-lg font-bold">Transact Anonymously</h1>
					<p>
						Ecash works without accounts. Cashu tokens are bearer assets, that are stored locally on
						your nutstash wallet.
					</p>
					<div class="flex gap-2 items-center h-24">
						<a href="#4" class="">
							<span class="relative flex h-10 w-10">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-10 h-10 relative inline-flex rounded-full"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</span>
						</a>
					</div>
				</div>
				<div id="4" class="carousel-item w-full flex flex-col items-center justify-center gap-2">
					<img src="/icons/coin.gif" alt="loading" class="h-20" />

					<h1 class="text-lg font-bold">Deterministic backups</h1>
					{#if isRestore}
						<div class="card max-w-xl bg-base-100 shadow-xl">
							<div class="card-body">
								{#if $mints.length}
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
											restore
										</button>
									</div>
								{:else}
									<RecommendedMints isRestore={true} />
								{/if}
							</div>
						</div>
					{/if}
					{#if $mnemonic}
						<div class="card max-w-xl bg-base-100 shadow-xl">
							<div class="card-body">
								<Mnemonic />
								<div class="card-actions flex items-center justify-center w-full pt-3">
									<a href="#5" class="btn btn-primary"> i wrote it down </a>
								</div>
							</div>
						</div>
					{:else if !isRestore}
						<p>
							By creating a seed phrase token secrets and blinding factors will be generated
							deterministically, so that in case of loss of wallet data the tokens can be restored
							with the mints help.
						</p>
					{/if}
					<div class="flex flex-col gap-4">
						{#if !$mnemonic && !isRestore}
							<button class="btn btn-primary" on:click={createMnemonic}> create new seed </button>
							<button class="btn btn-secondary" on:click={() => (isRestore = true)}>
								restore from seed
							</button>
							<a href="#5" class="text-xl link flex justify-center items-center">
								skip <span class="relative flex h-10 w-10">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
										/>
									</svg>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-10 h-10 relative inline-flex rounded-full"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
										/>
									</svg>
								</span>
							</a>
						{/if}
					</div>
				</div>
				<div id="5" class="carousel-item w-full flex flex-col items-center justify-center gap-2">
					<h1 class="text-lg font-bold">Choose your custodian</h1>
					<p>
						nutstash is <b> not </b> the custodian. The custodian of your sats are the mints you connect
						to.
					</p>
					<div class="flex gap-2">
						<button
							class="btn btn-primary"
							on:click={() => {
								doSetupMint();
							}}
						>
							Set up Mints
						</button>
					</div>
				</div>
			</div>
			<div class="w-40 flex mt-10 justify-center gap-3">
				<a
					href="#1"
					class="bg-base-100 {$page.url.hash === '#1'
						? 'opacity-80'
						: 'opacity-40'} w-2 h-2 rounded-full"
				/>
				<a
					href="#2"
					class="bg-base-100 {$page.url.hash === '#2'
						? 'opacity-80'
						: 'opacity-40'} w-2 h-2 rounded-full"
				/>
				<a
					href="#3"
					class="bg-base-100 {$page.url.hash === '#3'
						? 'opacity-80'
						: 'opacity-40'} w-2 h-2 rounded-full"
				/>
				<a
					href="#4"
					class="bg-base-100 {$page.url.hash === '#4'
						? 'opacity-80'
						: 'opacity-40'} w-2 h-2 rounded-full"
				/>
				<a
					href="#5"
					class="bg-base-100 {$page.url.hash === '#5'
						? 'opacity-80'
						: 'opacity-40'} w-2 h-2 rounded-full"
				/>
			</div>
		</div>
	</div>

	<!-- {:else if page!==5}
	<div class="flex items-center justify-center w-full col-span-2">
		<div class="coin">
		</div>
	</div> -->
	<!-- {/if} -->
{:else}
	<!-- else content here -->
	<RecommendedMints />
{/if}
<div />
