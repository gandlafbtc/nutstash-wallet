<script lang="ts">
    import { formatSecToMinStr, formatTime } from "$lib/util/walletUtils";
    import * as Card from "$lib/components/ui/card";
    import LightningInvoice from "./LightningInvoice.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import { Copy } from "lucide-svelte";
    import { copyTextToClipboard } from "$lib/util/utils";
    import { decode } from "@gandlaf21/bolt11-decode";
  import type { StoredMintQuote } from "$lib/db/models/types";


    let {quote, millisNow}: {quote: StoredMintQuote, millisNow: number} = $props()
    
    const decodedInvoice = decode(quote.request)

</script>

    <Card.Root class="h-20">
        <Card.Content
        class="flex items-center justify-center p-4"
        >
        {quote.mintUrl}
    {formatTime(quote.createdAt)}
    {formatSecToMinStr(quote.expiry-Math.floor(millisNow/1000))}
    {quote.state}
    {quote.quote}
    {quote.unit}
    {quote.amount}
    </Card.Content>
</Card.Root>
    
<div class="p-1">
    <Card.Root >
        <Card.Content
        class="flex items-center justify-center p-4"
        >
        <LightningInvoice invoice={quote.request}>
            
        </LightningInvoice>
        
    </Card.Content>
</Card.Root>
</div>
<Card.Root class="h-20">
    <Card.Content
    class="flex gap-2 items-center justify-center p-4"
    >
<Input value={quote.request}></Input>
<button onclick={()=> copyTextToClipboard(quote.request)}>
    <Copy class='h-5 w-5'>
        
    </Copy>
</button>

</Card.Content>
</Card.Root>