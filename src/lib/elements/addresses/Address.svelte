<script lang="ts">
    import Input from "$lib/components/ui/input/input.svelte";
    import { nip19 } from "nostr-tools";
import QrCode from "../ui/QRCode.svelte";
    import { Copy } from "lucide-svelte";
    import { copyTextToClipboard } from "$lib/util/utils";

    const {pub}: {pub:string}= $props()

    let npub = nip19.npubEncode(pub.slice(2))
</script>



<div class="flex gap-2 flex-col p-4 border rounded-lg my-2">
    <QrCode data={npub}></QrCode>
    <div class="flex gap-2 items-center">
        <Input readonly value={npub}></Input>
        <button class="" onclick={()=>copyTextToClipboard(npub)}>
            <Copy></Copy>
        </button>
    </div>
</div>