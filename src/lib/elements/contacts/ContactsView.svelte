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
	import { add_contact, enter_npub, enter_npub_to_import_contact_list_from_nostr, import_contacts, load_any_follow_list_from_nostr, not_an_npub, t_cancel, t_contacts, t_discover } from '$lib/paraglide/messages';

	let isOpen = $state(false);

	let importNpub = $state('');

	const loadContactList = () => {
		if (!importNpub.startsWith('npub')) {
			toast.warning(not_an_npub());
			return;
		}

		discoverContacts(importNpub);
		push('/wallet/contacts/import');
	};
</script>

<div class="flex h-full w-80 flex-col gap-2 xl:w-[600px]">
	<p class="text-lg font-bold">{t_contacts()}</p>
	<div class="flex w-full gap-2">
		<Button onclick={() => (isOpen = !isOpen)}>
			<Download></Download>
			{import_contacts()}
		</Button>
		<Button href="/#/wallet/contacts/add">{add_contact()}</Button>
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
			<Dialog.Title>{enter_npub_to_import_contact_list_from_nostr()}</Dialog.Title>
			<Dialog.Description>{load_any_follow_list_from_nostr()}</Dialog.Description>
		</Dialog.Header>
		<div class="flex h-72 flex-col gap-2">
			<span>{enter_npub()}</span>
			<Input type="text" placeholder="npub1..." bind:value={importNpub} />
		</div>
		<Dialog.Footer>
			<Button
				variant="outline"
				onclick={() => {
					isOpen = false;
				}}
			>
				{t_cancel()}
			</Button>
			<Button onclick={loadContactList}>{t_discover()}</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
