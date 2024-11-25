<script lang="ts">
	import { onMount } from "svelte";
	import Router from "svelte-spa-router";
	import { WALLET_ROUTE_PREFIX, walletRoutes } from "$lib/routes";
	import WalletLock from "./WalletLock.svelte";
	import Menu from "./menu/Menu.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import Badge from "$lib/components/ui/badge/badge.svelte";
	import { statusMessage } from "$lib/stores/session/statusMessage";
	import { mints } from "$lib/stores/persistent/mints";
	import { selectedMints } from "$lib/stores/local/selectedMints";
	import { usePassword } from "$lib/stores/local/usePassword";
	import PasswordInput from "../security/PasswordInput.svelte";
	import Breadcrumb from "./menu/Breadcrumb.svelte";
	import AddMint from "../mint/AddMint.svelte";
	import DiscoverMints from "../mint/DiscoverMints.svelte";
	import OnboardingHeader from "../onboarding/OnboardingHeader.svelte";
	import { AlignJustify } from "lucide-svelte";
    import { isMobile } from "$lib/tauri/deviceHelper";
	
	let sidebar = $state("") 

	onMount(async () => {
		if (!$selectedMints.length) {
			selectedMints.set($mints.map((mint) => mint.url));
		}
		setTimeout(async () => {}, 300);
	});
</script>

<PasswordInput>
	{#if $mints.length}
		<Sidebar.Provider class="h-full">
			<Menu bind:sidebar={sidebar}></Menu>
			<div
				class="fixed bg-background flex w-full items-center justify-between p-4"
			>
				<div>
					<button onclick={()=> sidebar.toggle()}>
						<AlignJustify class='w-5 h-5'></AlignJustify>
					</button>
				</div>
				{#if isMobile}
					<img src="/nutstash-written.svg" alt="logo text" class='h-8 transition-all duration-500 {sidebar?.open?'opacity-0':''}'>
				{:else}
				<Breadcrumb></Breadcrumb>
				{/if}
				{#if $statusMessage}
					<Badge></Badge>
				{/if}
				<div>
					{#if $usePassword}
						<WalletLock></WalletLock>
					{/if}
				</div>
			</div>
			<div class="w-full h-full flex items-center justify-center">
				<div class="wf-full h-full flex items-center justify-center">
					<Router routes={walletRoutes} prefix={WALLET_ROUTE_PREFIX}
					></Router>
				</div>
			</div>
		</Sidebar.Provider>
	{:else}
		<OnboardingHeader hasBack={false}></OnboardingHeader>
		<div
			class="flex flex-col gap-5 items-center justify-start w-full h-full mt-32"
		>
			<p class="font-bold">Welcome to nutstash!</p>

			To use the wallet, add a mint.
			<div class="flex-col flex gap-1">
				<p class="text-sm">Add mint manually</p>
				<AddMint></AddMint>
			</div>
			<div class="flex-col flex gap-1">
				<DiscoverMints></DiscoverMints>
			</div>
		</div>
	{/if}
</PasswordInput>
