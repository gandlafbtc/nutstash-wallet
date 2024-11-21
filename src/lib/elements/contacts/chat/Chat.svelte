<script lang="ts">
    import { sendNip17DirectMessageToNpub } from "$lib/actions/nostr";
    import Button from "$lib/components/ui/button/button.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { contactsStore } from "$lib/stores/persistent/contacts";
    import { messagesStore } from "$lib/stores/persistent/message";
    import { getBy } from "$lib/stores/persistent/helper/storeHelper";
    import { toast } from "svelte-sonner";
    import { params } from "svelte-spa-router";
    import Message from "./Message.svelte";
    import { nip19 } from "nostr-tools";
    import MeMessageWrapper from "./MeMessageWrapper.svelte";
    import ThemMessageWrapper from "./ThemMessageWrapper.svelte";
    import SendEcash from "./SendEcash.svelte";
    import * as Avatar from "$lib/components/ui/avatar";
    import { LoaderCircle, Send } from "lucide-svelte";
    import AddContact from "../AddContact.svelte";
    import { onMount } from "svelte";

    let contact = $derived(getBy($contactsStore, $params?.npub ?? "", "npub"));

    let scrollArea = $state();

    let isSending = $state(false)

    let pubkey = $derived(nip19.decode(contact?.npub ?? "").data);

    const sortAndReadMessages = async ()=> {
        const chatMessages = [...$messagesStore]
        .filter(m=> m.pubkey===pubkey || m.tags[0][1] === pubkey)
        .sort((a, b) => b.created_at - a.created_at)
        return chatMessages
    }

    let sortedMessages = $derived(
        sortAndReadMessages()
    );

    let chatText = $state("");

    let sendMessage =async () => {
        if (!contact) {
            toast("Select a contact");
            return;
        }
        await sendNip17DirectMessageToNpub(contact.npub, chatText);
        isSending = true;
        setTimeout(() => {
            isSending = false;
        }, 1000);
        chatText=''
    };

    let sendEcashToNpub =async (tokenString: string) => {
        if (!contact) {
            toast("Select a contact");
            return;
        }
        await sendNip17DirectMessageToNpub(contact.npub, tokenString);
    };

</script>

<div class="flex flex-col items-start gap-3 w-80 h-full mt-32">
{#if contact}
        <div class="h-20 flex items-center justify-center gap-2">
            <Avatar.Root>
                <Avatar.Image src={contact.picture??''} alt={contact.alias} />
                <Avatar.Fallback
                    >{contact.alias
                        .split(" ")
                        .reduce(
                            (acc, cur) => acc + "" + cur[0]?.toUpperCase(),
                            "",
                        )}</Avatar.Fallback
                >
            </Avatar.Root>
            {contact.alias}
        </div>
        <div class="h-screen">
            <div class="flex flex-col-reverse overflow-auto h-2/3">
                {#await sortedMessages}
                    <LoaderCircle class='animate-spin'></LoaderCircle>
                {:then sortedMessages}
                {#each sortedMessages as message}
                {#if message.tags[0][1] === pubkey}
                <MeMessageWrapper>
                    <Message {message}></Message>
                </MeMessageWrapper>
                {:else if message.pubkey === pubkey}
                <ThemMessageWrapper>
                    <Message alias={contact.alias} {message}></Message>
                </ThemMessageWrapper>
                {/if}
                {/each}
                {/await}
            </div>
            <div class="w-80 flex gap-2">
                <Textarea bind:value={chatText}></Textarea>
                <div class="flex gap-2 flex-col">
                    <Button onclick={sendMessage} disabled={isSending}>
                        <Send></Send>
                    </Button>
                    <SendEcash to={contact} sendCallback={sendEcashToNpub}
                    ></SendEcash>
                </div>
            </div>
        </div>
        {:else}
            <p class="font-bold">
                Add contact
            </p>            
            
            <p class="overflow-clip text-ellipsis w-80">
                
            </p>
            <AddContact npubToAdd={$params?.npub}></AddContact>
        {/if}
    </div>
        