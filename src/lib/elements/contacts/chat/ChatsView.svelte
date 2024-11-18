<script lang="ts">
    import type { Message } from "$lib/db/models/types";


    import { messagesStore } from "$lib/stores/persistent/contacts copy";
    import { keysStore } from "$lib/stores/persistent/keys";
    import { now } from "$lib/stores/session/time";
    import { formatDistance } from "date-fns";
    import RecentChat from "./RecentChat.svelte";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";

    let allpubkeys = $derived(new Set([...$messagesStore.map(m=> [m.pubkey,m.tags[0][1]]).flat()]))

    const getLatestMessages = () => {
        const latestMap: Map<string, Message>  = new Map()
        for (const message of $messagesStore) {
            
            if (latestMap.has(message.tags[0][1])) {
                if ( message.created_at > ((latestMap.get(message.tags[0][1])?.created_at)??0)) {
                    latestMap.set(message.tags[0][1], message)    
                }
            }
            else {
                latestMap.set(message.tags[0][1], message)
            }
            
            if (latestMap.has(message.pubkey)) {
                if ( message.created_at > ((latestMap.get(message.pubkey)?.created_at)??0)) {
                    latestMap.set(message.pubkey, message)    
                }
            }
            else {
                latestMap.set(message.pubkey, message)
            }
        }
        latestMap.delete($keysStore[$keysStore.length-1].publicKey.slice(2))
        return latestMap
    }

    let latestMessageForPubKey = $derived.by(getLatestMessages)
</script>

<div class="w-80 mt-32 flex flex-col">
    <ScrollArea>

        {#each latestMessageForPubKey.entries() as message}
        <RecentChat {message}></RecentChat>
        {/each}
    </ScrollArea>
</div>