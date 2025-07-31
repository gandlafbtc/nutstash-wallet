<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import ContactSearch from '$lib/elements/contacts/ContactSearch.svelte';
	import { ensureError, sendNip17DirectMessageToNpub, type types } from '@gandlaf21/cashu-wallet-engine';
	import { ScanIcon, Send, XIcon } from 'lucide-svelte';
	import SimpleScanner from '../../scanner/simple_scanner/SimpleScanner.svelte';
	import { npub_or_pubkey } from '$lib/paraglide/messages';
	import { checkValidPubkey } from '@gandlaf21/cashu-wallet-engine/util';
	import { toast } from 'svelte-sonner';
	import * as Avatar from '$lib/components/ui/avatar/';
	import { Badge } from '$lib/components/ui/badge';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { openSendNostrDrawer } from '$lib/stores/session/drawer';
	import { nip19 } from 'nostr-tools';

	let { data }: { data: string } = $props();
	let currentTab = $state('npub');
	let scanPubKey = $state(false);
	let selectedContact: types.Contact | undefined = $state(undefined);
	let enteredNpub = $state('');
	let isLoading = $state(false);
	
	const clearContact = () => {
		selectedContact = undefined;
		enteredNpub = '';
	};

	$effect(() => {
		if (selectedContact) {
			enteredNpub = selectedContact.npub;
			if (currentTab === 'contact') {
				currentTab = 'npub';
				scanPubKey = false;
			}
		}
	});



	const sendDM = async () => {
		try {
			if (enteredNpub.length === 66) {
				enteredNpub = enteredNpub.slice(2);
			}
			if (enteredNpub.length == 64) {
				enteredNpub = nip19.npubEncode(enteredNpub)
			}
			isLoading = true;
			await sendNip17DirectMessageToNpub(enteredNpub, data)
			openSendNostrDrawer.set(false);
			toast.success('Message sent');
	
		} catch (error) {
			const err = ensureError(error)
			toast.error('Failed to send message', {description: err.message});
			console.error(error);		
		}
		finally {
			isLoading = false;
		}

	}
</script>

<div class="flex min-h-96 w-80 flex-col gap-2 xl:w-[600px]">
	<Tabs.Root bind:value={currentTab}>
		<Tabs.List>
			<Tabs.Trigger value="npub">Npub</Tabs.Trigger>
			<Tabs.Trigger onclick={() => (selectedContact = undefined)} value="contact"
				>Contact</Tabs.Trigger
			>
		</Tabs.List>
	</Tabs.Root>

	{#if currentTab === 'contact'}
		<div class="">
			<ContactSearch bind:selectedContact />
		</div>
	{:else if scanPubKey}
		<SimpleScanner bind:isScanning={scanPubKey} bind:scannedResult={enteredNpub}></SimpleScanner>
	{:else}

		<div class="relative">
			<button class="absolute right-2 top-2" onclick={() => (scanPubKey = true)}>
				<ScanIcon></ScanIcon>
			</button>
			<Input
				disabled={selectedContact ? true : false}
				placeholder={npub_or_pubkey()}
				bind:value={enteredNpub}
			/>
		</div>
        {#if selectedContact}
            <div class="mt-2">

                <Badge variant="secondary" class="flex items-center justify-between gap-2 py-1 pl-1 pr-2">
                    <Avatar.Root class='h-5 w-5'>
                        <Avatar.Image src={selectedContact.picture ?? ''} alt={selectedContact.alias} />
                        <Avatar.Fallback
                            >{selectedContact.alias
                                .split(' ')
                                .reduce((acc, cur) => acc + '' + cur[0]?.toUpperCase(), '')}</Avatar.Fallback
                        >
                    </Avatar.Root>
                    <span>{selectedContact.alias}</span>
                    <button 
                        class="ml-2 flex h-4 w-4 items-center justify-end rounded-full bg-muted/60 hover:bg-muted"
                        onclick={clearContact}
                        aria-label="Clear contact"
                    >
                        <XIcon class="h-3 w-3" />
                    </button>
                </Badge>
            </div>
        {/if}
		<Textarea value={data} disabled>
					
		</Textarea>
		<Button disabled={!enteredNpub} onclick={sendDM}>
			<Send></Send>
			Send
		</Button>
	{/if}
</div>
