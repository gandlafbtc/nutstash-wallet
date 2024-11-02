<script lang="ts">
    import {
        formatSecToMinStr,
        formatTime,
        getUnitSymbol,
    } from "$lib/util/walletUtils";
    import * as Card from "$lib/components/ui/card";
    import LightningInvoice from "./LightningInvoice.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import { Copy } from "lucide-svelte";
    import { copyTextToClipboard } from "$lib/util/utils";
    import { decode } from "@gandlaf21/bolt11-decode";
    import type { StoredMintQuote } from "$lib/db/models/types";
    import { params } from "svelte-spa-router";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";

    let { quote, millisNow }: { quote: StoredMintQuote; millisNow: number } =
        $props();

    const decodedInvoice = decode(quote.request);
</script>

<Card.Root class="w-80 m-3">
    <Card.Header>
        <Card.Title class="w-60 overflow-hidden text-ellipsis text-nowrap">
            <a href={`/#/wallet/receive/ln/${quote.quote}`} class="underline">
                Invoice #{quote.quote}
            </a>
        </Card.Title>
        <Card.Description>
            {quote.mintUrl}
        </Card.Description>
    </Card.Header>
    <Card.Content class="flex gap-1">
        <Input value={quote.request}></Input>
        <button onclick={() => copyTextToClipboard(quote.request)}>
            <Copy class="h-5 w-5"></Copy>
        </button>
    </Card.Content>
    <Card.Footer class="flex justify-between">
        <Badge variant="destructive">
            {quote.state}
        </Badge>
        <Badge variant="secondary">
            {formatSecToMinStr(quote.expiry - Math.floor(millisNow / 1000))}
        </Badge>
    </Card.Footer>
</Card.Root>
