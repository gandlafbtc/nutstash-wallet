<script lang="ts">
	import { onMount } from "svelte";
	import Router, { pop, location } from "svelte-spa-router";
	import { WALLET_ROUTE_PREFIX, walletRoutes } from "$lib/routes";
	import WalletLock from "./WalletLock.svelte";
	import Menu from "./menu/Menu.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import Badge from "$lib/components/ui/badge/badge.svelte";
	import { statusMessage } from "$lib/stores/session/statusMessage";
	import { mints } from "$lib/stores/persistent/mints";
	import { usePassword } from "$lib/stores/local/usePassword";
	import PasswordInput from "../security/PasswordInput.svelte";
	import Breadcrumb from "./menu/Breadcrumb.svelte";
	import AddMint from "../mint/AddMint.svelte";
	import DiscoverMints from "../mint/DiscoverMints.svelte";
	import OnboardingHeader from "../onboarding/OnboardingHeader.svelte";
	import { AlignJustify, ChevronsLeft } from "lucide-svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { page } from "$app/stores";

	let sidebar = $state("");

	onMount(async () => {
		setTimeout(async () => {}, 300);
	});
</script>

<PasswordInput>
	{#if $mints.length}
		<Sidebar.Provider class="h-full">
			<Menu bind:sidebar></Menu>
			<div
				class="fixed bg-background flex w-full items-center justify-between p-4 z-10"
			>
				<div class="h-6">
					<Button variant="ghost" onclick={() => sidebar.toggle()}>
						<AlignJustify class="w-5 h-5"></AlignJustify>
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

			<div class="w-full h-full flex items-center justify-center">
				<div class="h-full flex flex-col items-center justify-center gap-2">
					<div
						class="relative h-16 z-50 flex items-center justify-between w-72"
					>
						<div
							class="fixed h-16 z-50 flex items-center justify-between w-72"
						>
							<div class="w-20">
								{#if $location !== "/wallet/"}
								<Button
								variant="link"
								onclick={() => {
									pop();
								}}
									>
									<ChevronsLeft></ChevronsLeft>
									Back
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
							<div class="hidden sm:block w-20"></div>
						</div>
					</div>
					<Router routes={walletRoutes} prefix={WALLET_ROUTE_PREFIX}
					></Router>
				</div>
			</div>
		</Sidebar.Provider>
	{:else}
		<OnboardingHeader hasBack={false}></OnboardingHeader>
		<div
			class="flex flex-col gap-5 items-center justify-start pt-32 w-full h-screen"
		>
			<p class="font-bold">Welcome to nutstash!</p>

			To use the wallet, add a mint.
			<div class="flex-col flex gap-1">
				<AddMint></AddMint>
			</div>
			<div class="flex-col flex gap-1">
				<DiscoverMints></DiscoverMints>
			</div>
		</div>
	{/if}
</PasswordInput>
