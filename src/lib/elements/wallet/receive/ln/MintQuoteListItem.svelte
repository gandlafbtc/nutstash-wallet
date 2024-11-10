<script lang="ts">
    import * as Tooltip from "$lib/components/ui/tooltip";
    import {
        formatAmount,
        formatSecToMinStr,
    } from "$lib/util/walletUtils";
    import * as Card from "$lib/components/ui/card";
    import { Copy, Banknote, CircleCheck, RefreshCcw } from "lucide-svelte";
    import { copyTextToClipboard, getHostFromUrl } from "$lib/util/utils";
    import { decode } from "@gandlaf21/bolt11-decode";
    import { EXPIRED, type StoredMintQuote } from "$lib/db/models/types";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import { mintProofs } from "$lib/actions/actions";
    import QrCode from "$lib/elements/ui/QRCode.svelte";
    import { now } from "$lib/stores/session/time";
    import Button from "$lib/components/ui/button/button.svelte";

    let {
        quote,
        isListView = true,
    }: {
        quote: StoredMintQuote;
        isListView?: boolean;
    } = $props();

    const tryMint = async () => {
        mintProofs(quote)
    };

    const decodedInvoice = $derived(decode(quote.request));
</script>

<Card.Root
    class="w-80 m-3 {quote.state === EXPIRED.EXPIRED
        ? 'bg-red-700 bg-opacity-20 opacity-40'
        : ''}"
>
    <Card.Header>
        <Card.Title class="text-nowrap flex flex-col justify-start relative">
            <div class="flex-shrink max-w-48 h-10 overflow-clip text-ellipsis">
                <a
                    href={`/#/wallet/receive/ln/${quote.quote}`}
                    class="underline"
                >
                    Invoice #{quote.quote}
                </a>
            </div>
            {#if isListView}
                <button
                    onclick={() => (isListView = !isListView)}
                    class="absolute -right-2 -top-2"
                >
                    <QrCode data={quote.request} QRsize="small"
                    ></QrCode>
                </button>
            {/if}
        </Card.Title>
        <Card.Description>
            <div class="max-w-48 overflow-clip text-ellipsis">
                <a
                    class="underline"
                    href={`/#/wallet/mint/${getHostFromUrl(quote.mintUrl??'')}`}
                >
                    {quote.mintUrl}
                </a>
            </div>
        </Card.Description>
    </Card.Header>
    <Card.Content class="flex flex-col gap-3">
        {#if !isListView}
            <button onclick={() => (isListView = !isListView)}>
                <QrCode data={quote.request} QRsize="medium"
                ></QrCode>
            </button>
        {/if}
        <div class="flex gap-2 items-center">
            <p class="text-xs">Pay</p>
            <Badge variant="outline">
                {formatAmount(decodedInvoice.sections[2].value / 1000, "sat")}
            </Badge>
            <p class="text-xs">to get</p>
            <Badge variant="outline"
                >{formatAmount(quote.amount, quote.unit)}</Badge
            >
        </div>
        <button
            class="flex gap-2"
            onclick={() => copyTextToClipboard(quote.request)}
        >
            <p class="w-52 overflow-clip text-sm text-ellipsis">
                {quote.request}
            </p>
            <Copy class="h-5 w-5"></Copy>
        </button>
    </Card.Content>
    <Card.Footer class="flex justify-between h-12">
        {#if !isListView}
             <Button href="/#/wallet/">Close</Button>
        {/if}
        <div>
            {#if quote.state === "UNPAID"}
                    <Badge variant="secondary">
                        {formatSecToMinStr(
                            quote.expiry - Math.floor($now / 1000),
                        )}
                    </Badge>
            {/if}
        </div>
        <div class="flex gap-1">
            {#if quote.state === "UNPAID"}
                <Badge variant="destructive">
                    {quote.state}
                </Badge>
                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Badge
                                class="cursor-pointer h-full"
                                onclick={tryMint}
                            >
                                <RefreshCcw class="w-4 h-4"></RefreshCcw>
                            </Badge>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                            <p>Update</p>
                        </Tooltip.Content>
                    </Tooltip.Root>
                </Tooltip.Provider>
            {:else if quote.state === EXPIRED.EXPIRED}
                <Badge variant="destructive">
                    {quote.state}
                </Badge>
            {:else}
                <Badge variant="outline" class="text-green-600">
                    <CircleCheck class="w-4 h-4"></CircleCheck>
                    {quote.state}
                </Badge>
                {#if quote.state === "PAID"}
                    <Tooltip.Provider>
                        <Tooltip.Root>
                            <Tooltip.Trigger>
                                <Badge
                                    class="cursor-pointer h-full"
                                    onclick={tryMint}
                                >
                                    <Banknote class="w-4 h-4"></Banknote>
                                </Badge>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <p>Request mint</p>
                            </Tooltip.Content>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                {/if}
            {/if}
        </div>
    </Card.Footer>
</Card.Root>
