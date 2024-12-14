<script lang="ts">
    import type { StoredSwap } from "$lib/db/models/types";
    import { getBy } from "$lib/stores/persistent/helper/storeHelper";
    import { meltQuotesStore } from "$lib/stores/persistent/meltquotes";
    import { mintQuotesStore } from "$lib/stores/persistent/mintquotes";
    import { swapsStore } from "$lib/stores/persistent/swap";
    import { formatAmount } from "$lib/util/walletUtils";
    import { ArrowDown, CheckCircle } from "lucide-svelte";

    interface Props {swap: StoredSwap}
    
    let {swap}: Props = $props();

    let mintquote = $derived(getBy($mintQuotesStore, swap?.mintQuoteId??'', 'quote'))
    let meltquote = $derived(getBy($meltQuotesStore, swap?.meltQuoteId??'', 'quote'))
</script>

{#if mintquote && meltquote}

<a href={`/#/wallet/settings/mints/swap/${swap.mintQuoteId}`} class="p-4 flex border rounded-lg flex-col relative">
    <div class="absolute top-2 right-2">
        {#if mintquote.state==='ISSUED'}
            <CheckCircle class='w-5 h-5 text-green-500'></CheckCircle>
        {/if}
    </div>
    <div class="flex gap-1">
        <p class="w-48 text-nowrap overflow-clip text-ellipsis">
            {meltquote.mintUrl} 
        </p>
        {formatAmount(meltquote.amount, meltquote.unit)}
    </div>
    <div class="w-full flex justify-center">
        <ArrowDown></ArrowDown>
    </div>
    <div class="flex gap-1">
        <p class="w-48 text-nowrap overflow-clip text-ellipsis">
            {mintquote.mintUrl} 
        </p>
        {formatAmount(mintquote.amount, mintquote.unit)}
    </div>
    
</a>
{:else}
Swap not found
{/if}
<style>

</style>