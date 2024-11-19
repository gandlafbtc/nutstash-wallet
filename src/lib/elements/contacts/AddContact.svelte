<script lang="ts">
    import { createAlias } from "$lib/actions/nostr";
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import { contactsStore } from "$lib/stores/persistent/contacts";
    import { wordlist } from "@scure/bip39/wordlists/english";
    import { Plus } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import { push } from "svelte-spa-router";

    let {npubToAdd=''} = $props()
    let npubToAddAlias = $state('')
    let isLoading = $state(false);

    const add = () => {
        addContact(npubToAdd, npubToAddAlias)
        npubToAdd = ''
        npubToAddAlias = ''
    }

    const addContact =async (npub: string, alias?: string) => {
        try {
            if (!npub.startsWith('npub')) {
                toast.warning('Invalid npub')
                return
            }
            isLoading = true;
            if (!alias) {
                alias = createAlias()
            }
            await contactsStore.addOrUpdate(npub, {npub, alias}, 'npub')
            toast.success('Added contact '+ alias)
            push('/wallet/contacts/chat/'+npub)
        } catch (error) {
            console.log(error)
        }
        finally {
            isLoading = false;
        }
        
    
    }
</script>

<div class="flex gap-2">
        <Input placeholder='npub' bind:value={npubToAdd}/>
        <Input placeholder='alias' bind:value={npubToAddAlias}/>
        <Button onclick={add}>
            <Plus></Plus>
            Add
        </Button>
    </div>