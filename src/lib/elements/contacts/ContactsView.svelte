<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog  from "$lib/components/ui/dialog";
    import Input from "$lib/components/ui/input/input.svelte";
    import { Download, Plus } from "lucide-svelte";
    import { wordlist } from "@scure/bip39/wordlists/english";
    import { contactsStore } from "$lib/stores/persistent/contacts";
    import { toast } from "svelte-sonner";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import Contact from "./Contact.svelte";

    let isOpen = $state(false);
    let isLoading = $state(false);

    let npubToAdd = $state('')
    let npubToAddAlias = $state('')

    let importNpub = $state('')

    let loadedContacts = $state([]);

    const loadContactList= () => {

    }

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
                const wrodlistLength  = wordlist.length
                alias = wordlist[Math.floor(Math.random() * wrodlistLength)]+' '+ wordlist[Math.floor(Math.random() * wrodlistLength)]
            }
            await contactsStore.addOrUpdate(npub, {npub, alias}, 'npub')
            toast.success('Added contact '+ alias)
        } catch (error) {
            
        }
        finally {
            isLoading = false;
        }
        
    
    }

</script>
<div class="w-80 flex flex-col gap-2">

    <Button onclick={() => isOpen =!isOpen}>
        <Download></Download>
        Import contacts
    </Button>
    <div class="flex gap-2">
        <Input placeholder='npub' bind:value={npubToAdd}/>
        <Input placeholder='alias' bind:value={npubToAddAlias}/>
        <Button onclick={add}>
            <Plus></Plus>
            Add
        </Button>
    </div>
    <ScrollArea>
        {#each $contactsStore as contact}
        <a href={`/#/wallet/contacts/chat/${contact.npub}`}>
            <Contact {contact}></Contact>
        </a>
        {/each}
    </ScrollArea>
</div>




<Dialog.Root bind:open={isOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title
                >Enter NPUB to import contact list</Dialog.Title
            >
            <Dialog.Description>
                Load any follow list from nostr
            </Dialog.Description>
        </Dialog.Header>
        <div class="flex flex-col gap-2">
            <span>Enter NPUB</span>
            <Input
                type="text"
                placeholder="npub1..."
                bind:value={importNpub}
            />
        </div>
        <Dialog.Footer>
            <Button
                variant="outline"
                onclick={() => {
                    isOpen = false;
                }}
            >
                Cancel
            </Button>
            <Button variant="destructive" onclick={loadContactList}>
                Decrypt
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>