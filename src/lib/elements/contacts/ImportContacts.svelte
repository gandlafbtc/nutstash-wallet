<script>
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { discoveredContacts } from '$lib/stores/session/contactdiscover';
	import { Check, LoaderCircle, Plus } from 'lucide-svelte';
	import Contact from './Contact.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { contactsStore } from '$lib/stores/persistent/contacts';
	import Divider from '../ui/Divider.svelte';
	let hasSelected = $state(false);
</script>

<div class="flex h-full w-80 xl:w-[600px] flex-col gap-2">
	<p class="font-bold">Import Contacts</p>
	{#if $discoveredContacts.length}
		<Button
			disabled={hasSelected}
			onclick={() => {
				contactsStore.addMany($discoveredContacts);
			}}
		>
			Import all
		</Button>
		<Divider text="Or select"></Divider>
		<ScrollArea class="h-96">
			{#each $discoveredContacts as contact}
				<div class="relative my-2 flex w-80 xl:w-[600px] gap-2">
					<Contact {contact}></Contact>
					{#if $contactsStore.find((c) => c.npub === contact.npub)}
						<Button disabled={true} class="absolute right-2 m-1">
							<Check></Check>
						</Button>
					{:else}
						<Button
							class="absolute right-2 m-1"
							onclick={() => {
								hasSelected = true;
								contactsStore.addOrUpdate(contact.npub, contact, 'npub');
							}}
						>
							<Plus></Plus>
						</Button>
					{/if}
				</div>
			{/each}
		</ScrollArea>
		<div class="flex gap-2">
			<Button href="/#/wallet/contacts">Done</Button>
		</div>
	{:else}
		<LoaderCircle class="animate-spin"></LoaderCircle>
	{/if}
</div>
