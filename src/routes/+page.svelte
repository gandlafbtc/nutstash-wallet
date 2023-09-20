<script lang="ts">
	import Mint from '../comp/mint/Mint.svelte';
	import Setting from '../comp/Setting.svelte';
	import Wallet from '../comp/wallet/Wallet.svelte';
	import { theme } from '../stores/theme';
	import Logo from '../comp/elements/Logo.svelte';
	import { isOnboarded } from '../stores/message';
	import { nostrMessages } from '../stores/nostr';
	import { mints } from '../stores/mints';
	import Donate from '../comp/elements/Donate.svelte';
	import Code from '../comp/elements/Code.svelte';
	import { version } from '../stores/version';
	import { activeTab } from '../stores/activeTab';
	import { isSyncMints, isSyncTokens } from '../stores/selfhosted';
	import Onboarding from '../comp/onboarding/Onboarding.svelte';
	import RecommendedMints from '../comp/onboarding/RecommendedMints.svelte';
	import { page } from '$app/stores';

	$activeTab = 'wallet';

	const changeTab = (tabName: string) => {
		$activeTab = tabName;
	};
</script>

<div
	class="w-full grid lg:grid-cols-4 h-screen max-h-screen p-1 bg-gradient-to-br from-primary to-secondary overflow-auto"
	data-theme={$theme}
>
	{#if !$isOnboarded && !$page.url.searchParams?.get('token') && !$page.url.searchParams?.get('mint')}
		<Onboarding />
	{:else}
		<div class="hidden lg:flex" />
		<div class="col-span-2 mx-0.5 flex flex-shrink-0 flex-col h-full xl:mx-0 xl:w-full">
			<div class="dropdown">
				<div class="bg-opacity-100 h-full">
					<div class="tabs w-full flex-grow-0">
						<button
							on:click={() => changeTab('wallet')}
							class="gap-1 tab tab-lifted tab-border-none tab-lg flex-1 {$activeTab === 'wallet'
								? 'tab-active'
								: ''}"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-6 h-6"
							>
								<path
									d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z"
								/>
							</svg>
							<p class="hidden lg:flex">Wallet</p>
							{#if $nostrMessages.filter((nM) => {
								return !nM.isAccepted;
							}).length > 0}
								<span class="flex h-3 w-3">
									<div
										class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-info opacity-75"
									/>
									<div class="relative inline-flex rounded-full h-2 w-2 bg-info" />
								</span>
							{/if}
						</button>
						<button
							on:click={() => changeTab('mint')}
							class="gap-1 tab tab-lifted tab-border-none tab-lg flex-1 {$activeTab === 'mint'
								? 'tab-active'
								: ''}"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-6 h-6"
							>
								<path
									d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z"
								/>
								<path
									fill-rule="evenodd"
									d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z"
									clip-rule="evenodd"
								/>
								<path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
							</svg>
							<p class="hidden lg:flex">Mints</p>
						</button>
						<button
							on:click={() => changeTab('setting')}
							class="gap-1 tab tab-lifted tab-border-none tab-lg flex-1 {$activeTab === 'setting'
								? 'tab-active'
								: ''}"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-6 h-6"
							>
								<path
									fill-rule="evenodd"
									d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
									clip-rule="evenodd"
								/>
							</svg>
							<p class="hidden lg:flex">Settings</p></button
						>
					</div>
				</div>
			</div>
			<div
				class="bg-base-100 grid w-full h-full overflow-auto flex-grow gap-3 rounded-xl p-6 shadow-xl {$activeTab ===
				'wallet'
					? 'rounded-tl-none'
					: ''} {$activeTab === 'setting' ? 'rounded-tr-none' : ''}"
			>
				{#if $activeTab === 'wallet'}
					<Wallet />
				{/if}
				{#if $activeTab === 'mint'}
					<Mint />
				{/if}
				{#if $activeTab === 'setting'}
					<Setting />
				{/if}
			</div>
		</div>
		<div class="hidden lg:flex" />
		<div />
		<div class="flex justify-end items-center flex-col col-span-2">
			<div class="w-full items-end justify-between flex">
				<Donate />
				<div class="flex items-baseline gap-1 justify-center">
					<div class="flex gap-2 items-center">
						<div class="w-6 h6">
							{#if $isSyncMints || $isSyncTokens}
								<div class="btn btn-success btn-disabled loading btn-square btn-xs" />
							{/if}
						</div>
						<Logo />
					</div>
					<p class="text-base-300 text-xs">
						{$version}
					</p>
				</div>
				<Code />
			</div>
		</div>
		<div />
	{/if}
</div>
