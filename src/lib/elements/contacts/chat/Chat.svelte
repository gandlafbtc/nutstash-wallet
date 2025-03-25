<script lang="ts">
	import { sendNip17DirectMessageToNpub } from '$lib/actions/nostr';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { contactsStore } from '$lib/stores/persistent/contacts';
	import { messagesStore } from '$lib/stores/persistent/message';
	import { getBy } from '$lib/stores/persistent/helper/storeHelper';
	import { toast } from 'svelte-sonner';
	import { params } from 'svelte-spa-router';
	import Message from './Message.svelte';
	import { nip19 } from 'nostr-tools';
	import MeMessageWrapper from './MeMessageWrapper.svelte';
	import ThemMessageWrapper from './ThemMessageWrapper.svelte';
	import SendEcashButton from './SendEcashButton.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { LoaderCircle, Send } from 'lucide-svelte';
	import AddContact from '../AddContact.svelte';
	import { onMount } from 'svelte';

	let contact = $derived(getBy($contactsStore, $params?.npub ?? '', 'npub'));

	let isSending = $state(false);

	let pubkey = $derived(nip19.decode(contact?.npub ?? '').data);

	const sortAndReadMessages = async () => {
		const chatMessages = [...$messagesStore]
			.filter((m) => m.pubkey === pubkey || m.tags[0][1] === pubkey)
			.sort((a, b) => b.created_at - a.created_at);
		return chatMessages;
	};

	let sortedMessages = $derived(sortAndReadMessages());

	let chatText = $state('');

	let sendMessage = async () => {
		if (!contact) {
			toast('Select a contact');
			return;
		}
		await sendNip17DirectMessageToNpub(contact.npub, chatText);
		isSending = true;
		setTimeout(() => {
			isSending = false;
		}, 1000);
		chatText = '';
	};

	let sendEcashToNpub = async (tokenString: string) => {
		if (!contact) {
			toast('Select a contact');
			return;
		}
		await sendNip17DirectMessageToNpub(contact.npub, tokenString);
	};
</script>

<div class="flex h-full w-80 flex-col items-start gap-3 xl:w-[600px]">
	{#if contact}
		<div class="flex h-20 items-center justify-center gap-2">
			<Avatar.Root>
				<Avatar.Image src={contact.picture ?? ''} alt={contact.alias} />
				<Avatar.Fallback
					>{contact.alias
						.split(' ')
						.reduce((acc, cur) => acc + '' + cur[0]?.toUpperCase(), '')}</Avatar.Fallback
				>
			</Avatar.Root>
			{contact.alias}
		</div>
		<div class="w-80 xl:w-[600px]">
			<div class="flex h-2/3 w-full flex-col-reverse overflow-auto pb-32">
				{#await sortedMessages}
					<LoaderCircle class="animate-spin"></LoaderCircle>
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
			<div class="fixed bottom-0 flex w-80 gap-2 bg-background py-2 xl:w-[600px]">
				<Textarea bind:value={chatText}></Textarea>
				<div class="flex flex-col gap-2">
					<Button onclick={sendMessage} disabled={isSending}>
						<Send></Send>
					</Button>
					<SendEcashButton to={contact} sendCallback={sendEcashToNpub}></SendEcashButton>
				</div>
			</div>
		</div>
	{:else}
		<p class="font-bold">Add contact</p>

		<p class="w-80 overflow-clip text-ellipsis xl:w-[600px]"></p>
		<AddContact npubToAdd={$params?.npub}></AddContact>
	{/if}
</div>
