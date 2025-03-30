<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { usePassword } from '$lib/stores/local/usePassword';
	import { Lock, LockOpen } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import { checkIfKeysMatch, decrypt, encrypt, kdf } from '$lib/actions/encryption';
	import { key } from '$lib/stores/session/key';
	import { toast } from 'svelte-sonner';
	import { DEFAULT_PASS } from '$lib/stores/static/pass';
	import { reencrypt } from '$lib/init/init';
	import { ensureError } from '$lib/helpers/errors';
	import {
		are_you_sure_remove_passphrase,
		encryption_disabled,
		enter_current_pass_to_confirm,
		incorrect_passphrase,
		no_key_set,
		remove_encryption,
		set_up_passphrase,
		t_cancel,
		t_change,
		t_remove,
		this_will_leave_wallet_unencrypted,
		wallet_is_not_encrypted,
		wallet_is_protected_by_passphrase
	} from '$lib/paraglide/messages';

	let isOpen = $state(false);
	let isLoading = $state(false);

	let pass = $state('');
	const removeEncryption = async () => {
		try {
			if (!$key) {
				throw new Error(no_key_set());
			}
			isLoading = true;
			if ($usePassword && $key) {
				if (!(await checkIfKeysMatch($key, await kdf(pass)))) {
					return toast.warning(incorrect_passphrase());
				}
			}
			key.set(await kdf(DEFAULT_PASS));
			usePassword.set(false);
			await reencrypt();
			isOpen = false;
			toast.info(encryption_disabled());
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex h-full w-80 flex-col gap-3 xl:w-[600px]">
	<div class="flex flex-col gap-2">
		{#if $usePassword}
			<span class="flex gap-2 text-green-600">
				<Lock></Lock>
				<span>{wallet_is_protected_by_passphrase()}</span>
			</span>
			<div class="flex w-full gap-2">
				<Dialog.Root bind:open={isOpen}>
					<Dialog.Trigger><Button variant="destructive">{t_remove()}</Button></Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>{are_you_sure_remove_passphrase()}</Dialog.Title>
							<Dialog.Description>{this_will_leave_wallet_unencrypted()}</Dialog.Description>
						</Dialog.Header>
						<div class="flex flex-col gap-2">
							<span>{enter_current_pass_to_confirm()}</span>
							<Input type="password" placeholder="Current passphrase" bind:value={pass} />
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
							<Button variant="destructive" onclick={removeEncryption}>{remove_encryption()}</Button
							>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>

				<Button class="w-full" href="/#/wallet/settings/security/changepass">{t_change()}</Button>
			</div>
		{:else}
			<span class="flex gap-2 text-yellow-600">
				<LockOpen></LockOpen>
				<span> {wallet_is_not_encrypted()}! </span>
			</span>
			<Button href="/#/wallet/settings/security/changepass">{set_up_passphrase()}</Button>
		{/if}
	</div>
</div>
