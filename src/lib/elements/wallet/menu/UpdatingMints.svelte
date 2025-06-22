<script lang="ts">
    import { onMount } from "svelte";
  	import { mintsStore } from "@gandlaf21/cashu-wallet-engine/stores";
	import { CheckCircle2, Info, LoaderCircle } from "lucide-svelte";
	import { fly, slide } from "svelte/transition";
   
  let isLoading = $state(false)   
  let rejected: PromiseRejectedResult[]  = $state([])  
  let isDone = $state(false)   
  onMount(async () => {
      isLoading = true
        const resolved = await Promise.allSettled(
          $mintsStore.map(mint=> {
          return mintsStore.fetchMint(mint.url)
        }))
        rejected = resolved.filter(r=> r.status==='rejected')
        isLoading = false
        setTimeout(() => {
          isDone = true
        }, 3000);
    });
  </script>
   
{#if !isDone}
<div class="flex items-center gap-0.5" transition:fly >
  {#if isLoading}
  <div class="flex gap-1 items-center" >
    <LoaderCircle class='animate-spin h-3'></LoaderCircle>
    <p class="text-xs text-muted">
      Updating mints...
    </p>
  </div>
  {:else if !isLoading && rejected.length === 0}
  <div class="flex gap-1 items-center">
    <CheckCircle2 class='h-3 text-green-500'></CheckCircle2>
    <p class="text-xs text-muted">
      All mints updated
    </p>
  </div>
  {:else if !isLoading && rejected.length > 0}
  <div class="flex gap-1 items-center">
    <Info class='h-3 text-green-yellow'></Info>
    <p class="text-xs text-muted">
      {rejected.length} mints not updated
    </p>
  </div>
  {/if}
</div>
{/if}