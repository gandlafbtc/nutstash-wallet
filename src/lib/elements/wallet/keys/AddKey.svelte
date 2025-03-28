<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import { ensureError } from '$lib/helpers/errors';
	import {
		add_key,
		add_key_manually,
		key_already_exists,
		keys_that_are_added_manually_not_restore,
		t_add,
		t_attention,
		t_close
	} from '$lib/paraglide/messages';
	import { keysStore } from '$lib/stores/persistent/keys';
	import { add } from 'date-fns';
	import { Plus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	let isLoading = $state(false);
	let isOpen = $state(false);
	let inputKey = $state('');
	const addKey = async () => {
		try {
			isLoading = true;
			if ($keysStore.find((ks) => ks.privateKey === inputKey)) {
				toast.warning(key_already_exists());
				return;
			}

			await keysStore.addKey(inputKey);
			isOpen = false;
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};
</script>

<Button variant="outline" onclick={() => (isOpen = true)}>
	<Plus></Plus>
	{add_key()}
</Button>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{add_key_manually()}</Dialog.Title>
			<Dialog.Description
				><span class="text-destructive">{t_attention()}</span
				>{keys_that_are_added_manually_not_restore()}</Dialog.Description
			>
		</Dialog.Header>
		<Input placeholder="private key" bind:value={inputKey}></Input>
		<Dialog.Footer>
			<Button
				variant="outline"
				onclick={() => {
					isOpen = false;
				}}
			>
				{t_close()}
			</Button>
			<Button onclick={addKey}>{t_add()}</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
