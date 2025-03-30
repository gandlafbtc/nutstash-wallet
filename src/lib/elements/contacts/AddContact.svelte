<script lang="ts">
	import { createAlias } from '$lib/actions/nostr';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { ensureError } from '$lib/helpers/errors';
	import { t_add } from '$lib/paraglide/messages';
	import { contactsStore } from '$lib/stores/persistent/contacts';
	import { Plus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { push } from 'svelte-spa-router';

	let { npubToAdd = '' } = $props();
	let npubToAddAlias = $state('');
	let isLoading = $state(false);

	const add = () => {
		addContact(npubToAdd, npubToAddAlias);
		npubToAdd = '';
		npubToAddAlias = '';
	};

	const addContact = async (npub: string, alias?: string) => {
		try {
			if (!npub.startsWith('npub')) {
				toast.warning('Invalid npub');
				return;
			}
			isLoading = true;
			if (!alias) {
				alias = createAlias();
			}
			await contactsStore.addOrUpdate(npub, { npub, alias }, 'npub');
			toast.success('Added contact ' + alias);
			push('/wallet/contacts/chat/' + npub);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex w-80 flex-col gap-2 xl:w-[600px]">
	<Input placeholder="npub" bind:value={npubToAdd} />
	<Input placeholder="alias" bind:value={npubToAddAlias} />
	<Button onclick={add}>
		<Plus></Plus>
		{t_add()}
	</Button>
</div>
