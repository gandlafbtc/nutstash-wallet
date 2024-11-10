<script lang="ts">
    import { meltQuotesStore } from "$lib/stores/persistent/meltquotes";
    import { mintQuotesStore } from "$lib/stores/persistent/mintquotes";
    import { transactionsStore } from "$lib/stores/persistent/transactions";
    import { formatAmount } from "$lib/util/walletUtils";
    import {
        ArrowDownRight,
        ArrowUpRight,
        Banknote,
        Zap,
        Timer,
        X,
        HandCoins
    } from "lucide-svelte";
    import { formatDistance } from "date-fns";
    import { now } from "$lib/stores/session/time";
    import {
    EXPIRED,
        type StoredMeltQuote,
        type StoredMintQuote,
        type StoredTransaction,
    } from "$lib/db/models/types";
    let items = $derived([
        ...$transactionsStore,
        ...$mintQuotesStore,
        ...$meltQuotesStore,
    ]);

    let limit = $state(5);

    let latest = $derived(
        items.sort((a, b) => b.lastChangedAt - a.lastChangedAt).slice(0, limit),
    );

    const getUrlForItem = (
        item: StoredTransaction | StoredMeltQuote | StoredMintQuote,
    ): string => {
        if (item.type === "mint") {
            return `/#/wallet/receive/ln/${item.quote}`;
        } else if (item.type === "melt") {
            return `/#/wallet/send/ln/${item.quote}`;
        } else if (item.type === "receive") {
            return `/#/wallet/send/cashu/${item.id}`;
        } else if (item.type === "send") {
            return `/#/wallet/send/cashu/${item.id}`;
        } else {
            return `/#/wallet/`;
        }
    };
</script>

<div class="flex gap-2 w-full mt-6">
    <div class="flex gap-2 flex-col w-full">
        {#each latest as item}
            {@const isExpired =
                item.type === "mint" &&
                item.state === EXPIRED.EXPIRED}
            <a
                class="border rounded-xl p-5 w-full flex justify-between items-center"
                class:opacity-50={isExpired}
                href={getUrlForItem(item)}
            >
                {#if item.type === "mint"}
                    <div class="relative">
                        <Zap class="text-yellow-500"></Zap>
                        <div class="absolute -top-1 -left-2">
                            <ArrowDownRight class="w-4 h-4 text-green-600"
                            ></ArrowDownRight>
                        </div>
                        {#if item.state === "UNPAID"}
                            <div class="absolute -top-1 -right-3">
                                <Timer class="w-4 h-4"></Timer>
                            </div>
                            {#if isExpired}
                                <div class="absolute -top-2 -right-4">
                                    <X class="w-6 h-6 text-red-600"></X>
                                </div>
                            {/if}
                        {:else if item.state==='PAID'}
                            <div class="absolute -top-1 -right-3">
                                <HandCoins class="w-4 h-4"></HandCoins>
                            </div>
                        {/if}

                    </div>
                {:else if item.type === "melt"}
                    <div class="relative">
                        <Zap class="text-yellow-500"></Zap>
                        <div class="absolute -top-1 -left-2">
                            <ArrowUpRight class="w-4 h-4 text-red-600"
                            ></ArrowUpRight>
                        </div>
                    </div>
                {:else if item.type === "send"}
                    <div class="relative">
                        <Banknote class="text-violet-600"></Banknote>
                        <div class="absolute -top-1 -left-2">
                            <ArrowUpRight class="w-4 h-4 text-red-600"
                            ></ArrowUpRight>
                        </div>
                    </div>
                {:else if item.type === "receive"}
                    <div class="relative">
                        <Banknote class="text-violet-600"></Banknote>
                        <div class="absolute -top-1 -left-2">
                            <ArrowDownRight class="w-4 h-4 text-green-600"
                            ></ArrowDownRight>
                        </div>
                    </div>
                {/if}
                <div class="flex flex-col gap-1 items-center">

                    <span class="text-sm">
                        {formatDistance($now, item.lastChangedAt)} ago
                    </span>
                    <span class="text-xs text-secondary overflow-clip text-ellipsis">
                        {item.mintUrl}
                    </span>
                </div>
                <div class="flex flex-col gap-1 items-end">
                    <span>
                        {formatAmount(item.amount, item.unit)}
                    </span>
                    {#if item.type==='send' || item.type==='receive'}
                    <span class="text-xs text-secondary">
                        {formatAmount(item.fees ?? 0, item.unit)} fee
                    </span>
                    {/if}
                </div>
            </a>
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
