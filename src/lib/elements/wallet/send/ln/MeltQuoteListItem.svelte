<script lang="ts">
    import * as Tooltip from "$lib/components/ui/tooltip";
    import { formatAmount, formatSecToMinStr } from "$lib/util/walletUtils";
    import * as Card from "$lib/components/ui/card";
    import { Copy, Banknote, CircleCheck, RefreshCcw } from "lucide-svelte";
    import { copyTextToClipboard, getHostFromUrl } from "$lib/util/utils";
    import { decode } from "@gandlaf21/bolt11-decode";
    import {
        EXPIRED,
        type StoredMeltQuote,
        type StoredMintQuote,
    } from "$lib/db/models/types";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import { mintProofs } from "$lib/actions/actions";
    import QrCode from "$lib/elements/ui/QRCode.svelte";
    import { now } from "$lib/stores/session/time";
    import Button from "$lib/components/ui/button/button.svelte";
    import { MeltQuoteState } from "@cashu/cashu-ts";

    let {
        quote,
        isListView = true,
    }: {
        quote: StoredMeltQuote;
        isListView?: boolean;
    } = $props();

    let isLoading = $state(false);

    const confirmPayment = async () => {
        try {
            isLoading = true;
        } catch (error) {
        } finally {
            isLoading = false;
        }
    };
</script>

<Card.Root
    class="w-80 m-3 {quote.state === EXPIRED.EXPIRED
        ? 'bg-red-700 bg-opacity-20 opacity-40'
        : ''}"
>
    <Card.Header>
        <Card.Title class="text-nowrap flex flex-col justify-start relative">
            <div class="flex-shrink max-w-48 h-10 overflow-clip text-ellipsis">
                <a href={`/#/wallet/send/ln/${quote.quote}`} class="underline">
                    Payment #{quote.quote}
                </a>
            </div>
        </Card.Title>
        <Card.Description>
            <div class="max-w-48 overflow-clip text-ellipsis">
                <a
                    class="underline"
                    href={`/#/wallet/mint/${getHostFromUrl(quote.mintUrl ?? "")}`}
                >
                    {quote.mintUrl}
                </a>
            </div>
        </Card.Description>
    </Card.Header>
    <Card.Content class="flex flex-col gap-3">
        <div class="flex gap-2 items-center"></div>
        <div>
            {#if quote.state === "UNPAID"}
                <Badge variant="secondary">
                    {formatSecToMinStr(quote.expiry - Math.floor($now / 1000))}
                </Badge>
            {/if}
        </div>
    </Card.Content>
    <Card.Footer class="flex justify-between h-12">
        {#if !isListView}
            <Button variant="outline" href="/#/wallet/">Close</Button>
        {/if}

        {#if quote.state === MeltQuoteState.UNPAID}
            <Button disabled={isLoading}>Confirm Payment</Button>
        {:else if quote.state === MeltQuoteState.PAID}
        {:else if quote.state === MeltQuoteState.PENDING}
        {:else if quote.state === EXPIRED.EXPIRED}
        {/if}
    </Card.Footer>
</Card.Root>
