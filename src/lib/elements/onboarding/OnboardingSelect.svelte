<script lang="ts">
	import { mnemonic } from '$lib/stores/persistent/mnemonic';
	import { pop, push } from 'svelte-spa-router';
	import { wordlist } from '@scure/bip39/wordlists/english';
	import { generateMnemonic } from '@scure/bip39';
	import OnboardingHeader from './OnboardingHeader.svelte';

	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { mints } from '$lib/stores/persistent/mints';
	import { proofsStore } from '$lib/stores/persistent/proofs';
	import { reencrypt } from '$lib/init/init';
	import { isOnboarded } from '$lib/stores/local/message';
	import { ensureError } from '$lib/helpers/errors';
	import { LoaderCircle } from 'lucide-svelte';
	let isLegacyWallet = $state(false);
	let isLoading = $state(false);
	onMount(() => {
		const localstorageProofs = localStorage.getItem('proofs');
		const localstorageTokens = localStorage.getItem('tokens');
		if (localstorageProofs?.length || localstorageTokens?.length) {
			isLegacyWallet = true;
			backup();
		}
	});

	const create = async () => {
		const m = generateMnemonic(wordlist, 128);
		await mnemonic.reset();
		await mnemonic.add({ mnemonic: m });
		push('/onboarding/new/secure');
	};

	const migrateWallet = async () => {
		try {
			isLoading = true;
			const mintsString = localStorage.getItem('mints');
			let oldMints;
			if (mintsString?.length) {
				oldMints = JSON.parse(mintsString);
			}
			const proofsString = localStorage.getItem('tokens');
			let proofs;
			if (proofsString?.length) {
				proofs = JSON.parse(proofsString);
			}
			if (oldMints.length) {
				for (const m of oldMints) {
					try {
						await mints.fetchMint(m.mintURL);
					} catch (error) {
						toast.warning('Could not load mint', {
							description: `${m.mintURL}`
						});
					}
				}
			}
			if (proofs.length) {
				await proofsStore.addMany(proofs);
			}
			const m = generateMnemonic(wordlist, 128);
			await mnemonic.reset();
			await mnemonic.add({ mnemonic: m });
			await reencrypt();

			localStorage.removeItem('contacts');
			localStorage.removeItem('history');
			localStorage.removeItem('message');
			localStorage.removeItem('mint-requests');
			localStorage.removeItem('mints');
			localStorage.removeItem('nostr-messages');
			localStorage.removeItem('nostr-privkey');
			localStorage.removeItem('nostr-pubkey');
			localStorage.removeItem('nostr-relays');
			localStorage.removeItem('pending-tokens');
			localStorage.removeItem('selfhosted-sync-tokens');
			localStorage.removeItem('setting-check-non-pending');
			localStorage.removeItem('setting-check-pending');
			localStorage.removeItem('setting-check-token-auto');
			localStorage.removeItem('theme');
			localStorage.removeItem('tokens');
			localStorage.removeItem('use-external-nostr');
			localStorage.removeItem('use-nostr');

			isOnboarded.set(true);
			toast.success('Wallet migrated');
			push('/onboarding/new/secure');
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};

	const backup = () => {
		const lsKeys = [];
		for (let i = 0; i < localStorage.length; i++) {
			lsKeys.push(localStorage.key(i));
		}
		let ls: any = {};
		for (const key of lsKeys) {
			if (!key) {
				continue;
			}
			ls[key] = localStorage.getItem(key);
		}
		doExport(ls);
	};
	const doExport = async (backupObj: any) => {
		let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupObj));
		let downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute('href', dataStr);
		downloadAnchorNode.setAttribute('download', 'nutstash_legacy_backup.json');
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
		toast.success('Exported legacy backup');
	};
</script>

<OnboardingHeader></OnboardingHeader>

{#if isLegacyWallet}
	<div class="flex h-screen w-full justify-center">
		<div class="flex w-80 max-w-4xl flex-col items-center justify-center p-2 xl:w-[600px]">
			<h1 class="mb-4 text-xl font-bold">Upgrading nutstash</h1>
			{#if isLoading}
				<LoaderCircle class="animate-spin"></LoaderCircle>
			{:else}
				<p class="mb-4 text-sm">
					Looks like you were using an older nutstash version. In order to keep using nutstash, we
					need to migrate your wallet. We've already exported a backup for you, so go ahead whenever
					you feel ready.
				</p>

				<button
					onclick={migrateWallet}
					class="m-2 flex w-full max-w-4xl cursor-pointer items-center gap-3 rounded-lg border p-2 transition-opacity duration-300 hover:opacity-100 sm:opacity-70"
				>
					<svg
						class="h-10 w-10 text-nutstash"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.1647 6.59821C9.95372 7.47821 9.63972 8.36021 8.99972 9.00021C8.35972 9.64021 7.47872 9.95421 6.59772 10.1652C5.16828 10.5075 3.91423 11.3627 3.07351 12.5684C2.23278 13.774 1.86388 15.2464 2.03679 16.706C2.20971 18.1657 2.91241 19.5111 4.01156 20.487C5.11072 21.4629 6.52986 22.0013 7.99972 22.0002C15.7317 22.0002 21.9997 15.7322 21.9997 8.00021C22.0008 6.53035 21.4624 5.11121 20.4865 4.01205C19.5106 2.9129 18.1652 2.2102 16.7056 2.03728C15.2459 1.86437 13.7736 2.23327 12.5679 3.07399C11.3622 3.91472 10.5071 5.16877 10.1647 6.59821Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M5.34082 10.6198C5.60446 11.2131 6.00855 11.7333 6.51818 12.1355C7.02782 12.5377 7.62769 12.8098 8.26601 12.9283C8.90432 13.0468 9.56188 13.0081 10.1819 12.8157C10.802 12.6232 11.3658 12.2828 11.8248 11.8236C12.2839 11.3645 12.6242 10.8006 12.8166 10.1805C13.0089 9.56045 13.0474 8.90288 12.9288 8.26459C12.8102 7.6263 12.538 7.02648 12.1357 6.51692C11.7334 6.00736 11.2131 5.60337 10.6198 5.33984"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<div class="flex-col gap-2 text-start">
						<h2 class="font-bold text-nutstash">Migrate now</h2>
						<p class="">Migrate ecash and mints</p>
						<p class="opacity-40">Only ecash and mints will be migrated.</p>
					</div>
				</button>
			{/if}
		</div>
	</div>
{:else}
	<div class="flex h-screen w-full justify-center">
		<div class="flex w-80 max-w-4xl flex-col items-center justify-center p-2 xl:w-[600px]">
			<h1 class="mb-4 text-xl font-bold">Select your way to start!</h1>

			<button
				onclick={create}
				class="m-2 flex w-full max-w-4xl cursor-pointer items-center gap-3 rounded-lg border p-2 transition-opacity duration-300 hover:opacity-100 sm:opacity-70"
			>
				<svg
					class="h-10 w-10 text-nutstash"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10.1647 6.59821C9.95372 7.47821 9.63972 8.36021 8.99972 9.00021C8.35972 9.64021 7.47872 9.95421 6.59772 10.1652C5.16828 10.5075 3.91423 11.3627 3.07351 12.5684C2.23278 13.774 1.86388 15.2464 2.03679 16.706C2.20971 18.1657 2.91241 19.5111 4.01156 20.487C5.11072 21.4629 6.52986 22.0013 7.99972 22.0002C15.7317 22.0002 21.9997 15.7322 21.9997 8.00021C22.0008 6.53035 21.4624 5.11121 20.4865 4.01205C19.5106 2.9129 18.1652 2.2102 16.7056 2.03728C15.2459 1.86437 13.7736 2.23327 12.5679 3.07399C11.3622 3.91472 10.5071 5.16877 10.1647 6.59821Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M5.34082 10.6198C5.60446 11.2131 6.00855 11.7333 6.51818 12.1355C7.02782 12.5377 7.62769 12.8098 8.26601 12.9283C8.90432 13.0468 9.56188 13.0081 10.1819 12.8157C10.802 12.6232 11.3658 12.2828 11.8248 11.8236C12.2839 11.3645 12.6242 10.8006 12.8166 10.1805C13.0089 9.56045 13.0474 8.90288 12.9288 8.26459C12.8102 7.6263 12.538 7.02648 12.1357 6.51692C11.7334 6.00736 11.2131 5.60337 10.6198 5.33984"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>

				<div class="flex-col gap-2 text-start">
					<h2 class="font-bold text-nutstash">Create new wallet</h2>
					<p class="">Create a new nutstash wallet.</p>
					<p class="opacity-40">
						If you have no cashu seed phrase or nutstash backup file, select this option.
					</p>
				</div>
			</button>
			<a
				href="/#/onboarding/restore/seed"
				class="m-2 flex w-full max-w-4xl cursor-pointer items-center gap-3 rounded-lg border p-2 opacity-70 transition-opacity duration-300 hover:opacity-100"
			>
				<svg
					class="text h-10 w-10 text-green-500"
					viewBox="0 0 25 23"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3.125 3.6875H0C0 9.72754 4.89746 14.625 10.9375 14.625V21.6562C10.9375 22.0859 11.2891 22.4375 11.7188 22.4375H13.2812C13.7109 22.4375 14.0625 22.0859 14.0625 21.6562V14.625C14.0625 8.58496 9.16504 3.6875 3.125 3.6875ZM21.875 0.5625C17.7637 0.5625 14.1895 2.83301 12.3193 6.1875C13.6719 7.66211 14.6729 9.4541 15.2002 11.4414C20.7031 10.8701 25 6.22168 25 0.5625H21.875Z"
					/>
				</svg>

				<div class="flex-col gap-2 text-start">
					<h2 class="font-bold text-green-500">Restore lost nuts</h2>
					<p class="">Recover ecash from a lost wallet with your seed phrase.</p>
					<p class="opacity-40">Select this option to recreate a lost wallet.</p>
				</div>
			</a>

			<a
				href="/#/onboarding/restore/file"
				class="m-2 flex w-full max-w-4xl cursor-pointer items-center gap-3 rounded-lg border p-2 opacity-70 transition-opacity duration-300 hover:opacity-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-10 w-10 text-nutstashsecondary"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
					/>
				</svg>

				<div class="flex-col gap-2 text-start">
					<h2 class="font-bold text-nutstashsecondary">Import wallet file</h2>
					<p class="">Load a wallet from a backup file.</p>
					<p class="opacity-40">
						Select this option if you have exported a nutstash wallet and want to import it.
					</p>
				</div>
			</a>
		</div>
	</div>
{/if}
