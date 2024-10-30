<script lang="ts">
    import { token } from "$lib/stores/tokens";
    import { mints, selectedMints } from "$lib/stores/mints";
    // import Tokens from '../tokens/Tokens.svelte';
    import { onMount } from "svelte";
    import {
        formatAmount,
        getAmountForTokenSet,
        getTokensForMints,
    } from "$lib/util/walletUtils";
    import { pendingTokens } from "$lib/stores/pendingtokens";
    import {
        checkAutomatically,
        checkNonPending,
        checkPending,
        unit,
    } from "../../stores/settings";
    import CheckTokens from "./CheckTokens.svelte";
    import { showShortCuts } from "../../stores/showShortCuts";
    import { Download, QrCode, Upload } from "lucide-svelte";
    import type { Mint } from "$lib/model/mint";
    import UnitSelector from "$lib/elements/ui/UnitSelector.svelte";
    import MintSelector from "$lib/elements/ui/MintSelector.svelte";
    import MintSelectorMulti from "../ui/MintSelectorMulti.svelte";
    import { push } from "svelte-spa-router";
    import * as Drawer from "$lib/components/ui/drawer";
    import Receive from "./receive/Receive.svelte";
    import { buttonVariants } from "$lib/components/ui/button";
    import Scanner from "./scanner/Scanner.svelte";

    let currentUnit = $state('sat')

    let openReceiveDrawer = $state(false)
    let openScannerDrawer = $state(false)

    onMount(() => {
        const keyDown = (e: KeyboardEvent) => {
            if (e.key === "R") {
            } else if (e.key === "S") {
                if ($mints.length) {
                }
            } else if (e.key === "B") {
            }
        };
        window.addEventListener("keydown", keyDown);

        return () => {
            // this function is called when the component is destroyed
            window.removeEventListener("keydown", keyDown);
        };
    });
</script>

<div class="flex items-center justify-center flex-col gap-5 w-full h-full">
    <div class="w-80">
        <MintSelectorMulti></MintSelectorMulti>
    </div>
    <p class="text-7xl">
        {formatAmount(getAmountForTokenSet(getTokensForMints($mints, $token, currentUnit)), currentUnit, false)}
    </p>
    <div class="flex gap-2 items-center justify-center">
        <UnitSelector bind:currentUnit={currentUnit} selectedMints={$mints.filter((m)=>$selectedMints.includes(m.mintURL))}></UnitSelector>
    </div>
    {#if !$checkAutomatically && ($checkNonPending || $checkPending)}
        <CheckTokens></CheckTokens>
    {/if}

    <div class="flex flex-col gap-5 w-64 py-5">
        <!-- {#if getLockedTokens($token).length}
                    <ClaimOfflineTokens></ClaimOfflineTokens>
					{/if} -->
    </div>
</div>
<div
    class="w-full bottom-0 fixed bg-primary-foreground flex items-center justify-center"
>
<Drawer.Root bind:open={openReceiveDrawer}>
    <Drawer.Trigger>
    </Drawer.Trigger>
    <Drawer.Content>
      <Drawer.Header class="flex flex-col justify-center items-center gap-3 text-center">
        <Drawer.Title>Receive via ecash or Lightning</Drawer.Title>
        <Drawer.Description>This action cannot be undone.</Drawer.Description>
      </Drawer.Header>
      <Receive bind:openScannerDrawer></Receive>
      <Drawer.Footer class="flex flex-col justify-center items-center gap-3 text-center">
        <Drawer.Close class={buttonVariants({ variant: "outline" })+ " w-80"}
          >Cancel</Drawer.Close
        >
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
    
  <button onclick={() => openReceiveDrawer = !openReceiveDrawer}
        class="flex-grow z-0 pr-4 flex gap-2 items-center justify-center h-full py-4 transition-all duration-300 opacity-70 hover:opacity-100 active:bg-secondary"
    >
    
        <Download></Download>
        &nbsp; Receive
    </button>
    <button
        class="z-10 rounded-full bg-pink-600 p-8 -m-6 transition-all duration-300 hover:bg-pink-700 hover:p-10 flex-shrink active:bg-pink-500"
        onclick={() => openScannerDrawer= !openScannerDrawer}>
        <QrCode></QrCode>
    </button>
    <button
        class="flex-grow z-0 pl-4 flex gap-2 items-center justify-center py-4 transition-all duration-300 opacity-70 hover:opacity-100 active:bg-secondary"
        >
        <Upload></Upload>
        &nbsp; Send &nbsp;&nbsp;
    </button>
</div>

<Drawer.Root bind:open={openScannerDrawer}>
    <Drawer.Trigger>
    </Drawer.Trigger>
    <Drawer.Content>
      <Drawer.Header class="flex flex-col justify-center items-center gap-3 text-center">
        <Drawer.Title>Scan a QR code</Drawer.Title>
        <Drawer.Description>You can scan a cashu token, a lightning address or invoice, a pubkey and more!</Drawer.Description>
      </Drawer.Header>
      <Scanner></Scanner>
      <Drawer.Footer class="flex flex-col justify-center items-center gap-3 text-center">
        <Drawer.Close class={buttonVariants({ variant: "outline" })+ " w-80"}
          >Cancel</Drawer.Close
        >
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
    