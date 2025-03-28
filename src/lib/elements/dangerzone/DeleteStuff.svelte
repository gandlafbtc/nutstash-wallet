<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { DB } from '$lib/db/db';
	import { ensureError } from '$lib/helpers/errors';
	import {
		are_you_sure_you_want_to_delete_all_data,
		delete_wallet,
		deleted_wallet_reloading,
		restart_failed,
		t_cancel,
		t_warning,
		these_actions_cannot_be_undone,
		wallet_restart,
		yes_delete_wallet,
		your_wallet_will_be_gone
	} from '$lib/paraglide/messages';
	import { isOnboarded } from '$lib/stores/local/message';
	import { selectedMint } from '$lib/stores/local/selectedMints';
	import { usePassword } from '$lib/stores/local/usePassword';
	import { delay } from '$lib/util/utils';
	import { toast } from 'svelte-sonner';

	let isOpen = $state(false);

	const deleteAll = async () => {
		try {
			isOpen = false;
			usePassword.set(undefined);
			selectedMint.set(-1);
			isOnboarded.set(false);
			DB.deleteDatabase();
			toast.promise(delay(1000), {
				loading: deleted_wallet_reloading(),
				success: wallet_restart()
			});
			await delay(2000);
			window.location.reload();
			await delay(2000);
			toast.error(restart_failed());
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		}
	};
</script>

<div class="flex h-full w-80 flex-col gap-5 xl:w-[600px]">
	<p class="text-destructive">
		<span class="font-bold"> {t_warning()}! </span>
		{these_actions_cannot_be_undone()}
	</p>
	<Button
		variant="destructive"
		onclick={() => {
			isOpen = true;
		}}
	>
		{delete_wallet()}
	</Button>
</div>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-destructive"
				>{are_you_sure_you_want_to_delete_all_data()}</Dialog.Title
			>
			<Dialog.Description>
				{your_wallet_will_be_gone()}
			</Dialog.Description>
		</Dialog.Header>

		<Dialog.Footer>
			<Button
				variant="outline"
				onclick={() => {
					isOpen = false;
				}}
			>
				{t_cancel()}
			</Button>
			<Button variant="destructive" onclick={deleteAll}>{yes_delete_wallet()}</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
