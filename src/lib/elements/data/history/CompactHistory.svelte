<script lang="ts">
    import { meltQuotesStore } from "$lib/stores/persistent/meltquotes";
    import { mintQuotesStore } from "$lib/stores/persistent/mintquotes";
    import { transactionsStore } from "$lib/stores/persistent/transactions";

    import CompactHistoryItem from "./CompactHistoryItem.svelte";
    let items = $derived([
        ...$transactionsStore,
        ...$mintQuotesStore,
        ...$meltQuotesStore,
    ]);

    let limit = $state(2);

    let latest = $derived(
        [...items].sort((a, b) => b.lastChangedAt - a.lastChangedAt).slice(0, limit),
    );

    
</script>

<div class="flex gap-2 w-full mt-6">
    <div class="flex gap-2 flex-col w-full">
        {#each latest as item}
            <CompactHistoryItem {item}></CompactHistoryItem>
        {/each}
        {#if latest.length >= items.length}
            <button class="border rounded-xl p-5 w-full flex opacity-45">
                <span class="text-xs">
                    {#if !items.length}
                        No history items yet ...
                    {/if}
                </span>
            </button>
        {:else}
            <button
                class="border rounded-xl p-5 w-full flex"
                onclick={() => {
                    if (limit + 5 < items.length) {
                        limit += 5;
                    } else {
                        limit = items.length;
                    }
                }}
            >
                <span class="text-xs">Load more...</span>
            </button>
        {/if}
    </div>
</div>
