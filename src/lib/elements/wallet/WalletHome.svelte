<script lang="ts">
  import {  getUnitSymbol } from "$lib/util/walletUtils";
  import { Download,  QrCode,  Upload } from "lucide-svelte";
  import UnitSelector from "$lib/elements/ui/UnitSelector.svelte";
  import { selectedMint } from "$lib/stores/local/selectedMints";
  import { proofsStore } from "$lib/stores/persistent/proofs";
  import { mints } from "$lib/stores/persistent/mints";
  import { getByMany } from "$lib/stores/persistent/helper/storeHelper";
  import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
  import {
    openReceiveDrawer,
    openScannerDrawer,
    openSendDrawer,
  } from "$lib/stores/session/drawer";
  import CompactHistory from "../data/history/CompactHistory.svelte";
  import NumberFlow, { type Format } from "@number-flow/svelte";
  import { css, getDivider } from "$lib/util/utils";
  import QuickPaste from "./QuickPaste.svelte";
  import NfcListenerButton from "./send/ecash/NFCListenerButton.svelte";
  import isTauri from "$lib/tauri/deviceHelper";
  import { untrack } from "svelte";
    import MintCarousel from "../mint/mintDropdown/MintCarousel.svelte";

  let currentUnit = $state("sat");

  let { divider, fraction } = $derived(getDivider(currentUnit));

  $effect(() => {
    const numberFlowElement = untrack(() =>
      document.getElementById("number-flow"),
    );
    if (amount !== undefined && currentUnit && $selectedMint!==undefined) {
      const elements = numberFlowElement?.shadowRoot?.querySelectorAll(
        ".number .number__inner .section .digit .is-current",
      );
      if (!elements || elements.length === 0) {
        return;
      }

      let hasNonZeroDigit = false
      for (const [i, element] of elements.entries()) {
        if (hasNonZeroDigit) {
          css(element, {
            opacity: "1",
          });
          continue
        }
        const elementsBefore = [...elements]
          .slice(0, i+1)
          .map((e) => e.textContent);
        if (elementsBefore.find((e) => e !== "0")) {
          hasNonZeroDigit = true          
          css(element, {
            opacity: "1",
          });
        }
        else {
          css(element, {
            opacity: "0.1",
          });
        }
      }

    }
  });

  let activeMints = $derived.by(
    ()=> {
      if ($selectedMint === -1) {
      return $mints  
    }
    return [$mints[$selectedMint]]
  }
  );
  let keysetIds = $derived(
    activeMints
      .map((m) => m.keysets.keysets)
      .flat()
      .filter((k) => k.unit === currentUnit)
      .map((k) => k.id),
  );
  let amount = $derived(
    getByMany($proofsStore, keysetIds, "id").reduce((a, b) => a + b.amount, 0),
  );
</script>

<div
  class="flex items-center justify-start flex-col gap-5 w-full h-full"
>
  <div class="w-80">
    <QuickPaste></QuickPaste>
  </div>
  <div>
    <MintCarousel></MintCarousel>
  </div>
  <div>
    <!-- todo fix this later -->
    {#if !isTauri}
      <NfcListenerButton></NfcListenerButton>
    {/if}
  </div>
  <div class="flex gap-2 items-center justify-between w-full">
    <p class="text-4xl">
      {getUnitSymbol(currentUnit, false)}
      <NumberFlow
        id="number-flow"
        value={amount / divider}
        format={{
          minimumFractionDigits: fraction,
          maximumFractionDigits: fraction,
        }}
      ></NumberFlow>
    </p>
    <UnitSelector
      bind:currentUnit
      selectedMints={activeMints}
    ></UnitSelector>
  </div>

  <ScrollArea
    class="from-background flex flex-col gap-5 w-80 h-full mb-20 p-2 relative overflow-y-hidden
  after:bg-gradient-to-t after:z-10 after:absolute after:h-10 after:w-full  after:bottom-0 after:pointer-events-none
  before:bg-gradient-to-b before:z-10 before:absolute before:w-full before:h-10 before:top-0 before:bottom-0 before:pointer-events-none"
  >
    <CompactHistory></CompactHistory>
  </ScrollArea>
</div>
<div
  class="z-10 bottom-bar w-full bottom-0 fixed bg-primary-foreground flex items-center justify-center shadow-lg"
>
  <button
    onclick={() => openReceiveDrawer.set(true)}
    class="flex-grow z-0 flex gap-2 items-center justify-center h-full pb-3 pt-4 transition-all duration-300 opacity-70 hover:opacity-100 active:bg-secondary"
  >
    <Download></Download>
    &nbsp; Receive
  </button>
  <button
    class="z-10 rounded-full bg-nutstash p-8 -m-6 transition-all duration-300 hover:bg-nutstashsecondary hover:p-9 flex-shrink active:bg-nutstashsecondary"
    onclick={() => openScannerDrawer.set(true)}
  >
    <QrCode></QrCode>
  </button>
  <button
    onclick={() => openSendDrawer.set(true)}
    class="flex-grow z-0 pl-4 flex gap-2 items-center justify-center pb-3 pt-4 transition-all duration-300 opacity-70 hover:opacity-100 active:bg-secondary"
  >
    <Upload></Upload>
    &nbsp; Send &nbsp;&nbsp;
  </button>
</div>


<style>
  .bottom-bar {
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 1);
  }
</style>