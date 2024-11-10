<script lang="ts">
  import {
    formatAmount,
    getUnitSymbol,
  } from "$lib/util/walletUtils";
  import { Download, QrCode, Upload } from "lucide-svelte";
  import UnitSelector from "$lib/elements/ui/UnitSelector.svelte";
  import MintSelectorMulti from "$lib/elements/ui/MintSelectorMulti.svelte";
  import { selectedMints } from "$lib/stores/local/selectedMints";
  import { proofsStore } from "$lib/stores/persistent/proofs";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import { getBy, getByMany } from "$lib/stores/persistent/helper/storeHelper";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { openReceiveDrawer, openScannerDrawer, openSendDrawer } from "$lib/stores/session/drawer";
    import CompactHistory from "../data/history/CompactHistory.svelte";
import NumberFlow from '@number-flow/svelte'

  let currentUnit = $state("sat");

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
    <NumberFlow value={amount}></NumberFlow> {getUnitSymbol(currentUnit, false)}
    <span class="text-xs">
      {(currentUnit)}
    </span>
  </p>
  <div class="flex gap-2 items-center justify-center">
    <UnitSelector
      bind:currentUnit
      selectedMints={$mints.filter((m) => $selectedMints.includes(m.url))}
    ></UnitSelector>
  </div>

  <ScrollArea class="from-background flex flex-col gap-5 w-80 h-full mb-20 p-2 relative overflow-y-hidden
  after:bg-gradient-to-t after:z-10 after:absolute after:h-10 after:w-full  after:bottom-0 after:pointer-events-none
  before:bg-gradient-to-b before:z-10 before:absolute before:w-full before:h-10 before:top-0 before:bottom-0 before:pointer-events-none">
    <CompactHistory></CompactHistory>
  </ScrollArea>
</div>
<div
  class="w-full bottom-0 fixed bg-primary-foreground flex items-center justify-center"
>


  <button
  onclick={() => (openReceiveDrawer.set(true))}
  class="flex-grow z-0 flex gap-2 items-center justify-center h-full pb-3 pt-4 transition-all duration-300 opacity-70 hover:opacity-100 active:bg-secondary"
  >
    <Download></Download>
    &nbsp; Receive
  </button>
  <button
    class="z-10 rounded-full bg-pink-600 p-8 -m-6 transition-all duration-300 hover:bg-pink-700 hover:p-9 flex-shrink active:bg-pink-500"
    onclick={() => (openScannerDrawer.set(true))}
  >
    <QrCode></QrCode>
  </button>
  <button
  onclick={() => (openSendDrawer.set(true))}
    class="flex-grow z-0 pl-4 flex gap-2 items-center justify-center pb-3 pt-4 transition-all duration-300 opacity-70 hover:opacity-100 active:bg-secondary"
  >
    <Upload></Upload>
    &nbsp; Send &nbsp;&nbsp;
  </button>
</div>

