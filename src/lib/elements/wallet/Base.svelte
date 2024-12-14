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
    import { isOnboarded } from "$lib/stores/local/message";
    import FileBackupButton from "../settings/backup/FileBackupButton.svelte";

	let sidebar = $state("");


	let isMigrate = $state(false);
  onMount(async () => {
        if ($page.url.hostname === "v2.nutstash.app") {
        // if ($page.url.hostname === "localhost") {
            if ($isOnboarded) {
              isMigrate = true;
            }
        }
  });
</script>

<PasswordInput>
	{#if isMigrate}
<div class="w-full flex flex-col gap-2 items-center h-screen justify-center">
	<img src="/nutstash_app.svg" alt="logo" class="w-32">
<p class="font-bold">
  Thank you for trying out the nutstash 2 alpha!
</p>
  <p>
    Nutstash 2 has now entered beta phase, and is moved to the primary domain at https://wallet.nutstash.app
  </p>
  <p>
    If you wish to continue using this nutstash wallet, please create a backup and import it at the new domain.
  </p>
  <div class="flex flex-col gap-5 pt-8">

	  <p class="font-bold">
		  1. Export your existing wallet
		</p>
		<FileBackupButton></FileBackupButton>
		<p class="font-bold">
			2. After exporting, click on the link bellow to import your wallet on the new domain
		</p>
		<a class="underline" href="https://wallet.nutstash.app/#/onboarding/restore/file">
			Go to new wallet
		</a>
	</div>
</div>
{:else} 
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
							<img
							src="/nutstash-written.svg"
							alt="logo text"
							class="w-32 transition-all duration-500"
							/>
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
	{/if}
</PasswordInput>
