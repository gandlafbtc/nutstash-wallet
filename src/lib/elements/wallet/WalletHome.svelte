<script lang="ts">
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
  import { proofsStore } from "$lib/stores/persistent/proofs";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import ScannerDrawer from "./scanner/ScannerDrawer.svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import { getBy, getByMany } from "$lib/stores/persistent/helper/storeHelper";

  let currentUnit = $state("sat");

  let openReceiveDrawer = $state(false);
  let openScannerDrawer = $state(false);

  let activeMints = $derived($selectedMints.map(url => getBy($mints, url, 'url')).filter(m=> m!==undefined))
  let keysetIds = $derived(activeMints.map(m => m.keysets.keysets).flat().filter(k=> k.unit===currentUnit).map(k=> k.id))
  let amount = $derived(getByMany($proofsStore, keysetIds, 'id').reduce((a,b)=> a+b.amount, 0))
</script>

<div class="flex items-center justify-start pt-20 flex-col gap-5 w-full h-full">
  <div class="w-80 flex items-start">
    <MintSelectorMulti></MintSelectorMulti>
  </div>
  <div class="w-80 h-28">
    <Textarea 
    class="w-80 border-dashed resize-none rounded-none focus-visible:outline-transparent focus:outline-transparent"
    
    inputmode="none"
    placeholder="Quickpaste: paste token, invoice etc." ></Textarea>
  </div>
  <p class="text-7xl">
    {formatAmount(
      amount,
      currentUnit
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
    class="flex-grow z-0 flex gap-2 items-center justify-center h-full pb-3 pt-4 transition-all duration-300 opacity-70 hover:opacity-100 active:bg-secondary"
  >
    <Download></Download>
    &nbsp; Receive
  </button>
  <button
    class="z-10 rounded-full bg-pink-600 p-8 -m-6 transition-all duration-300 hover:bg-pink-700 hover:p-9 flex-shrink active:bg-pink-500"
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

<ScannerDrawer bind:openScannerDrawer></ScannerDrawer>
