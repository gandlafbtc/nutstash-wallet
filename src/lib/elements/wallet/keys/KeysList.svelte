<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { keysStore } from '$lib/stores/persistent/keys';
	import { Check, CheckCircle, Copy, Plus, QrCode } from 'lucide-svelte';
	import Keypair from './Keypair.svelte';
	import AddKey from './AddKey.svelte';
	import { ensureError } from '$lib/helpers/errors';
	import { toast } from 'svelte-sonner';
	import { copyTextToClipboard } from '$lib/util/utils';
	import { key } from '$lib/stores/session/key';
	import {
		create_new_keys,
		it_is_advised_not_to_reuse_keys_to_preserve_unlinkability_of_transactions,
		keys_are_used_to_unlock_locked_ecash_tokens
	} from '$lib/paraglide/messages';

	let isLoading = $state(false);

	let inputKey = $state('');

	const createNew = async () => {
		try {
			isLoading = true;
			await keysStore.createNewKeypair();
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex h-full w-80 flex-col gap-5 xl:w-[600px]">
	<div class="flex flex-col gap-2">
		<p>
			{keys_are_used_to_unlock_locked_ecash_tokens()}
		</p>
		<p>{it_is_advised_not_to_reuse_keys_to_preserve_unlinkability_of_transactions()}</p>
	</div>
	<div class="flex gap-2">
		<Button class="flex-grow" onclick={createNew}>
			<Plus></Plus>
			{create_new_keys()}
		</Button>

		<AddKey></AddKey>
	</div>

	<div>
		{#each $keysStore as keypair, i}
			<div class="flex items-center gap-1">
				{#if i === $keysStore.length - 1}
					<div class="text-nutstashsecondary">
						<CheckCircle></CheckCircle>
					</div>
				{:else}
					<button onclick={() => copyTextToClipboard(keypair.publicKey)}>
						<Copy></Copy>
					</button>
				{/if}
				<Keypair {keypair}></Keypair>
			</div>
		{/each}
	</div>
</div>
