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

<div class="flex h-full w-80 flex-col gap-5">
	<div class="flex flex-col gap-2">
		<p class="font-bold">Keys</p>
		<p>
			Keys are used to unlock locked ecash tokens. The pubkey that is used for locking will be
			revealed to the mint when the ecash is unlocked.
		</p>
		<p>It is advised to not reuse keys to preserve unlinkability of transactions.</p>
	</div>
	<div class="flex gap-2">
		<Button class="flex-grow" onclick={createNew}>
			<Plus></Plus>
			Create new Keys
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
