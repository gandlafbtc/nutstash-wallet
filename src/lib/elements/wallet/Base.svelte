<script lang="ts">
	import { onMount } from 'svelte';
	import Router, { pop, location } from 'svelte-spa-router';
	import { WALLET_ROUTE_PREFIX, walletRoutes } from '$lib/routes';
	import WalletLock from './WalletLock.svelte';
	import Menu from './menu/Menu.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { statusMessage } from '$lib/stores/session/statusMessage';
	import { mints } from '$lib/stores/persistent/mints';
	import { usePassword } from '$lib/stores/local/usePassword';
	import PasswordInput from '../security/PasswordInput.svelte';
	import Breadcrumb from './menu/Breadcrumb.svelte';
	import AddMint from '../mint/AddMint.svelte';
	import DiscoverMints from '../mint/DiscoverMints.svelte';
	import OnboardingHeader from '../onboarding/OnboardingHeader.svelte';
	import { AlignJustify, ChevronsLeft } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { page } from '$app/stores';
	import { t_back, to_use_the_wallet_add_mint, welcome_to_nutstash } from '$lib/paraglide/messages';
	import UseKvacToggle from '../settings/UseKvacToggle.svelte';

	let sidebar = $state('');

	onMount(async () => {
		setTimeout(async () => {}, 300);
	});
</script>

<PasswordInput>
	{#if $mints.length}
		<Sidebar.Provider class="h-full">
			<Menu bind:sidebar></Menu>
			<div class="fixed z-10 flex w-full items-center justify-between bg-background p-4">
				<div class="h-6">
					<Button variant="ghost" onclick={() => sidebar.toggle()}>
						<AlignJustify class="h-5 w-5"></AlignJustify>
					</Button>
				</div>

				<!-- {/if} -->
				{#if $statusMessage}
					<Badge></Badge>
				{/if}
				<div>
					{#if $usePassword}
						<WalletLock></WalletLock>
					{/if}
				</div>
			</div>

			<div class="flex h-full w-full items-center justify-center">
				<div class="flex h-full flex-col items-center justify-center gap-2">
					<div class="relative z-50 flex h-16 w-72 items-center justify-between">
						<div class="fixed z-50 flex h-16 w-72 items-center justify-between">
							<div class="w-20">
								{#if $location !== '/wallet/'}
									<Button
										variant="link"
										onclick={() => {
											pop();
										}}
									>
										<ChevronsLeft></ChevronsLeft>
										{t_back()}
									</Button>
								{/if}
							</div>
							<a href="/#/wallet/">
								<img
									src="/nutstash-written.svg"
									alt="logo text"
									class="w-32 transition-all duration-500"
								/>
							</a>
							<!-- <div class="hidden w-20 sm:block"></div> -->
							<div class="w-20 sm:block">
								<UseKvacToggle></UseKvacToggle>
							</div>
						</div>
					</div>
					<Router routes={walletRoutes} prefix={WALLET_ROUTE_PREFIX}></Router>
				</div>
			</div>
		</Sidebar.Provider>
	{:else}
		<OnboardingHeader hasBack={false}></OnboardingHeader>
		<div class="flex h-screen w-full flex-col items-center justify-start gap-5 pt-32">
			<p class="font-bold">{welcome_to_nutstash()}</p>

			{to_use_the_wallet_add_mint()}
			<div class="flex flex-col gap-1">
				<AddMint></AddMint>
			</div>
			<div class="flex flex-col gap-1">
				<DiscoverMints></DiscoverMints>
			</div>
		</div>
	{/if}
</PasswordInput>
