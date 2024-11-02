<script lang="ts">
  import { mints } from "$lib/stores/persistent/mints";
  // import Tokens from '$lib/tokens/Tokens.svelte';
  import {
    formatAmount,
    getAmountForTokenSet,
    getTokensForMints,
  } from "$lib/util/walletUtils";
  import {
    checkAutomatically,
    checkNonPending,
    checkPending,
  } from "$lib/stores/persistent/settings";
  import CheckTokens from "./CheckTokens.svelte";
  import { Download, QrCode, Upload } from "lucide-svelte";
  import UnitSelector from "$lib/elements/ui/UnitSelector.svelte";
  import MintSelectorMulti from "$lib/elements/ui/MintSelectorMulti.svelte";
  import * as Drawer from "$lib/components/ui/drawer";
  import Receive from "./receive/Receive.svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  import Scanner from "./scanner/Scanner.svelte";
  import { selectedMints } from "$lib/stores/local/selectedMints";
  import { proofs } from "$lib/stores/persistent/proofs";

  let currentUnit = $state("sat");

  let openReceiveDrawer = $state(false);
  let openScannerDrawer = $state(false);
</script>

<div class="flex items-center justify-start pt-20 flex-col gap-5 w-full h-full">
  <div class="w-80 h-48 flex items-start">
    <MintSelectorMulti></MintSelectorMulti>
  </div>
  <p class="text-7xl">
    {formatAmount(
      getAmountForTokenSet(getTokensForMints($mints, $proofs, currentUnit)),
      currentUnit,
    )}
  </p>
  <div class="flex gap-2 items-center justify-center">
    <UnitSelector
      bind:currentUnit
      selectedMints={$mints.filter((m) => $selectedMints.includes(m.url))}
    ></UnitSelector>
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
  <Drawer.Root
    bind:open={openReceiveDrawer}
    controlledOpen={openReceiveDrawer}
    handleOnly={true}
  >
    <Drawer.Content>
      <Drawer.Header
        class="flex flex-col justify-center items-center gap-3 text-center"
      >
        <Drawer.Title>Receive via ecash or Lightning</Drawer.Title>
        <Drawer.Description
          >Enter an amount to receive via Lightning or paste a token to receive
          eCash.</Drawer.Description
        >
      </Drawer.Header>
      <Receive bind:openScannerDrawer></Receive>
      <Drawer.Footer
        class="flex flex-col justify-center items-center gap-3 text-center"
      >
        <Drawer.Close
          class={buttonVariants({ variant: "outline" }) + " w-80"}
          onclick={() => (openReceiveDrawer = !openReceiveDrawer)}
          >Cancel</Drawer.Close
        >
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>

  <button
    onclick={() => (openReceiveDrawer = !openReceiveDrawer)}
    class="flex-grow z-0 flex gap-2 items-center justify-center h-full transition-all duration-300 opacity-70 hover:opacity-100 active:bg-secondary"
  >
    <Download></Download>
    &nbsp; Receive
  </button>
  <button
    class="z-10 rounded-full bg-pink-600 p-8 -m-6 transition-all duration-300 hover:bg-pink-700 hover:p-10 flex-shrink active:bg-pink-500"
    onclick={() => (openScannerDrawer = !openScannerDrawer)}
  >
    <QrCode></QrCode>
  </button>
  <button
    class="flex-grow z-0 pl-4 flex gap-2 items-center justify-center pb-3 pt-4 transition-all duration-300 opacity-70 hover:opacity-100 active:bg-secondary"
  >
    <Upload></Upload>
    &nbsp; Send &nbsp;&nbsp;
  </button>
</div>

<Drawer.Root bind:open={openScannerDrawer} nested={true}>
  <Drawer.Content>
    <Drawer.Header
      class="flex flex-col justify-center items-center gap-3 text-center"
    >
      <Drawer.Title>Scan a QR code</Drawer.Title>
      <Drawer.Description
        >You can scan a cashu token, a lightning address or invoice, a pubkey
        and more!</Drawer.Description
      >
    </Drawer.Header>
    <Scanner></Scanner>
    <Drawer.Footer
      class="flex flex-col justify-center items-center gap-3 text-center"
    >
      <Drawer.Close class={buttonVariants({ variant: "outline" }) + " w-80"}
        >Cancel</Drawer.Close
      >
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
