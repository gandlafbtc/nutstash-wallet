<script lang="ts">
	import { createNewNostrKeys, nostrKeys } from "$lib/stores/persistent/nostr";
	import { onMount } from "svelte";
	import { mnemonic, seed } from "$lib/stores/persistent/mnemonic";
	import { deriveSeedFromMnemonic } from "@cashu/cashu-ts";
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
    import { init } from "$lib/init/init";
    import PasswordInput from "../security/PasswordInput.svelte";
    import Breadcrumb from "./menu/Breadcrumb.svelte";

	onMount(() => {
		init()
		if (!$selectedMints.length) {
			selectedMints.set($mints.map(mint => mint.url));
		}


		setTimeout(() => {
			if (!$nostrKeys.length) {
				createNewNostrKeys();
			}
			if ($mnemonic.length) {
				seed.set(deriveSeedFromMnemonic($mnemonic.join(" ")));
			}
		}, 300);

		const keyDown = (e: KeyboardEvent) => {
			if (e.key === "W") {
			} else if (e.key === "M") {
			} else if (e.key === "O") {
			}
		};
		window.addEventListener("keydown", keyDown);

		return () => {
			// this function is called when the component is destroyed
			window.removeEventListener("keydown", keyDown);
		};
	});
</script>

<PasswordInput>
	<Sidebar.Provider class="h-full" data-vaul-drawer-wrapper >
		<Menu></Menu>
		<div class="fixed left-5 top-5">
			<Sidebar.Trigger></Sidebar.Trigger>
		</div>
		<div  class="fixed top-6 inset-x-0 max-w-max mx-auto flex items-center justify-center">
			<Breadcrumb></Breadcrumb>
		{#if $statusMessage}
		<!-- content here -->
			<Badge></Badge>
			{/if}
		</div>
	<div class="w-full h-full flex items-center justify-center">
		{#if $usePassword}
		<div  class="fixed top-5 right-5">
			<WalletLock></WalletLock>
		</div>
		{/if}
		<div class="wf-full h-full flex items-center justify-center">
			<Router routes={walletRoutes} prefix={WALLET_ROUTE_PREFIX}></Router>
		</div>
		
	</div>
</Sidebar.Provider>
</PasswordInput>
