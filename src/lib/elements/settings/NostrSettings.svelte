<script>
    import { reconnect } from "$lib/actions/nostr";
    import Button from "$lib/components/ui/button/button.svelte";
import Input from "$lib/components/ui/input/input.svelte";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import { relaysStore } from "$lib/stores/persistent/relays";
    import { Trash } from "lucide-svelte";
    import { toast } from "svelte-sonner";

    let relayUrl = $state('')

    let hasChanges = $state(false)

    const addRelay = async () => {
        if ($relaysStore.find(r=> r.url===relayUrl)) {
            toast.warning('Relay already exists')
            return
        }
        await relaysStore.add({url: relayUrl, isOn: true})
        hasChanges = true
    }

    const applyChanges = async () => {
        if (!hasChanges) return
        await reconnect()
        hasChanges = false
    }


</script>
<div class="w-80 gap-3 flex flex-col h-full items-start mt-32">
    <div class="flex gap-2 items-center">

        <span class="font-bold">
            Relays
        </span>
        {#if hasChanges}
             <Button onclick={applyChanges}>
                Apply Changes
             </Button>
        {/if}
    </div>
    <div class="flex gap-2 w-full">
        <Input placeholder='wss://...'  bind:value={relayUrl} />
        <Button onclick={addRelay}>Add Relay</Button>
    </div>

    {#each $relaysStore as relay}
        <div class="flex border rounded-lg gap-2 items-center p-4 my-2 justify-between w-full">
            <button onclick={async()=> {
                await relaysStore.remove(relay.url,'url')
                hasChanges = true;
                }} >
                <Trash></Trash>
            </button>
            <p class="flex gap-2 items-center">
                <span>
                    {relay.url}

                </span>
                {#if relay.hasConnection}
                     <div class="rounded-full h-2 w-2 bg-green-500">

                     </div>
                {/if}
            </p>
            <Switch bind:checked={relay.isOn} onclick={async ()=>
            {
                await relaysStore.addOrUpdate(relay.url, relay,'url')
                hasChanges = true;
            }
            } />
        </div>     
    {/each}
</div>