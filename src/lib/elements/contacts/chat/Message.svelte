<script lang="ts">
    import type { Message } from "$lib/db/models/types";
    import ReceiveCard from "$lib/elements/wallet/receive/ecash/ReceiveCard.svelte";
    import { keysStore } from "$lib/stores/persistent/keys";
    import { now } from "$lib/stores/session/time";
    import { getDecodedToken } from "@cashu/cashu-ts";
    import { formatDistance } from "date-fns";
    import { nip19 } from "nostr-tools";

    let { message, alias }: { message: Message, alias?:string } = $props();

</script>

<div class="flex gap-1">
    <span class="w-60 text-ellipsis overflow-clip flex text-nowrap gap-3 items-baseline">
        {#if message.pubkey === $keysStore[$keysStore.length - 1].publicKey.slice(2)}
        <span class="font-bold">

            Me
        </span>
        {:else}
            <span class="font-bold">{alias}</span>
            <div class="text-sm opacity-35 w-32 text-ellipsis overflow-clip">
                {nip19.npubEncode(message.pubkey)}
            </div>
        {/if}
    </span>
</div>
<div class="break-words break-all">
    {#if message.content.startsWith('cashuB')}
        <ReceiveCard token={getDecodedToken(message.content)}></ReceiveCard>
    {:else}
        
    {message.content}
    {/if}
</div>
<div class="text-xs opacity-35">
    {formatDistance($now, message.created_at*1000)} ago
</div>
<!-- {JSON.stringify(message)} -->
