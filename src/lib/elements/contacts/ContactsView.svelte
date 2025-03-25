<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Download } from 'lucide-svelte';
	import { contactsStore } from '$lib/stores/persistent/contacts';
	import Contact from './Contact.svelte';
	import { discoverContacts } from '$lib/actions/nostr';
	import { push } from 'svelte-spa-router';
	import { toast } from 'svelte-sonner';
	import { keysStore } from '$lib/stores/persistent/keys';
	import { npubEncode } from 'nostr-tools/nip19';

	let isOpen = $state(false);

	let importNpub = $state('');

	const loadContactList = () => {
		if (!importNpub.startsWith('npub')) {
			toast.warning('Use an NPub to import contacts from');
			return;
		}

		discoverContacts(importNpub);
		push('/wallet/contacts/import');
	};
</script>

<div class="flex h-full w-80 xl:w-[600px] flex-col gap-2">
	<p class="text-lg font-bold">Contacts</p>
	<div class="flex w-full gap-2">
		<Button onclick={() => (isOpen = !isOpen)}>
			<Download></Download>
			Import contacts
		</Button>
		<Button href="/#/wallet/contacts/add">Add contact</Button>
	</div>

	{#each $contactsStore as contact}
		<div class="my-2">
			<a class="" href={`/#/wallet/contacts/chat/${contact.npub}`}>
				<Contact {contact}></Contact>
			</a>
		</div>
	{/each}
</div>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Enter NPUB to import contact list</Dialog.Title>
			<Dialog.Description>Load any follow list from nostr</Dialog.Description>
		</Dialog.Header>
		<div class="flex h-72 flex-col gap-2">
			<span>Enter NPUB</span>
			<Input type="text" placeholder="npub1..." bind:value={importNpub} />
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
			<Button onclick={loadContactList}>Discover</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
