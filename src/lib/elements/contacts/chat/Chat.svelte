<script lang="ts">
    import { sendNip17DirectMessageToNpub } from "$lib/actions/nostr";
    import Button from "$lib/components/ui/button/button.svelte";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { contactsStore } from "$lib/stores/persistent/contacts";
    import { messagesStore } from "$lib/stores/persistent/contacts copy";
    import { getBy } from "$lib/stores/persistent/helper/storeHelper";
    import { keysStore } from "$lib/stores/persistent/keys";
    import { Banknote, Send } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import { params } from "svelte-spa-router";
    import Message from "./Message.svelte";
    import { nip19 } from "nostr-tools";
    import { onMount } from "svelte";
    import MeMessageWrapper from "./MeMessageWrapper.svelte";
    import ThemMessageWrapper from "./ThemMessageWrapper.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import MintSelector from "$lib/elements/ui/MintSelector.svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import SendEcash from "./SendEcash.svelte";
    import * as Avatar from "$lib/components/ui/avatar";

    let contact = $derived(getBy($contactsStore, $params?.npub ?? "", "npub"));

    let scrollArea = $state();

    let pubkey = $derived(nip19.decode(contact?.npub ?? "").data);

    let sortedMessages = $derived(
        [...$messagesStore].sort((a, b) => b.created_at - a.created_at),
    );

    let chatText = $state("");

    let sendMessage = () => {
        if (!contact) {
            toast("Select a contact");
            return;
        }
        sendNip17DirectMessageToNpub(contact.npub, chatText);
    };

    let sendEcashToNpub = (tokenString: string) => {
        if (!contact) {
            toast("Select a contact");
            return;
        }
        sendNip17DirectMessageToNpub(contact.npub, tokenString);
    };
</script>

{#if contact}
    <div class="flex flex-col items-start gap-3 w-80 h-full mt-32">
        <div class="h-20 flex items-center justify-center gap-2">
            <Avatar.Root>
                <Avatar.Image src="" alt={contact.alias} />
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
            </div>
            <div class="w-80 flex gap-2">
                <Textarea bind:value={chatText}></Textarea>
                <div class="flex gap-2 flex-col">
                    <Button onclick={sendMessage}>
                        <Send></Send>
                    </Button>
                    <SendEcash to={contact} sendCallback={sendEcashToNpub}
                    ></SendEcash>
                </div>
            </div>
        </div>
    </div>
{:else}
    Contact not found
{/if}
