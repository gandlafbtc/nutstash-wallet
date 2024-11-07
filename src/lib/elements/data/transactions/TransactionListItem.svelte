<script lang="ts">
    import * as Tooltip from "$lib/components/ui/tooltip";
    import { formatAmount, formatSecToMinStr } from "$lib/util/walletUtils";
    import * as Card from "$lib/components/ui/card";
    import { Copy, Banknote, CircleCheck, RefreshCcw } from "lucide-svelte";
    import { copyTextToClipboard, getHostFromUrl } from "$lib/util/utils";
    import { decode } from "@gandlaf21/bolt11-decode";
    import type { StoredTransaction } from "$lib/db/models/types";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import QrCode from "$lib/elements/ui/QRCode.svelte";
    import { getEncodedTokenV4, type Token } from "@cashu/cashu-ts";
    import Button from "$lib/components/ui/button/button.svelte";
    import BigTokenQr from "$lib/elements/ui/BigTokenQR.svelte";

    let {
        tx,
        isListView = true,
    }: {
        tx: StoredTransaction;
        isListView?: boolean;
    } = $props();

    let token: Token = $derived({
        mint: tx.mint,
        proofs: tx.out,
        unit: tx.unit,
        memo: tx.memo,
    });
    let encodedToken = $derived(getEncodedTokenV4(token));
</script>

<Card.Root class="m-3">
    <Card.Header>
        <Card.Title class="text-nowrap flex flex-col justify-start relative">
            <div
                class="flex-shrink max-w-48
            h-10 overflow-clip text-ellipsis"
            >
                <a href={`/#/wallet/send/cashu/${tx.id}`} class="underline">
                    {tx.type} #{tx.id}
                </a>
            </div>
        </Card.Title>
        <Card.Description>
            <div class="max-w-48 overflow-clip text-ellipsis">
                <a
                    class="underline"
                    href={`/#/wallet/mint/${getHostFromUrl(tx.mint ?? "")}`}
                >
                    {tx.mint}
                </a>
            </div>
        </Card.Description>
    </Card.Header>
    <Card.Content class="flex flex-col gap-3">
        <button>
            {#if !isListView}
                <!-- content here -->
                {#if encodedToken}
                    {#if encodedToken.length > 300}
                        <BigTokenQr size={[3]} speed={[3]} token={encodedToken}
                        ></BigTokenQr>

                    {:else}
                        <QrCode data={encodedToken} QRsize="medium"></QrCode>
                    {/if}
                {/if}
            {/if}
        </button>
        <div class="flex gap-2 justify-center items-center">
            <Badge variant="outline" class="text-2xl">
                {formatAmount(tx.amount - (tx.fees ?? 0), "sat")}
            </Badge>
        </div>
        <button
            class="flex gap-2"
            onclick={() => copyTextToClipboard(encodedToken)}
        >
            <div class="h-5 overflow-clip">
                <p class="w-52 overflow-clip text-sm text-ellipsis">
                    {encodedToken}
                </p>
            </div>
            <Copy class="h-5 w-5"></Copy>
        </button>
    </Card.Content>
    <Card.Footer class="flex justify-between h-12">
        {#if isListView}
            <Button href={`/#/wallet/send/cashu/${tx.id}`}>Show</Button>
        {:else}
            <Button href="/#/wallet/">Close</Button>
        {/if}
    </Card.Footer>
</Card.Root>
