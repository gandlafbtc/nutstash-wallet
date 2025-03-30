<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Form from '$lib/components/ui/form';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Lock } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { key } from '$lib/stores/session/key';
	import { checkIfKeysMatch, kdf } from '$lib/actions/encryption';
	import { usePassword } from '$lib/stores/local/usePassword';
	import { pop, push } from 'svelte-spa-router';
	import { toast } from 'svelte-sonner';
	import { reencrypt } from '$lib/init/init';
	import { ensureError } from '$lib/helpers/errors';
	import {
		encrypt_wallet_storage,
		incorrect_passphrase,
		keep_nuts_safe,
		passphrase_cannot_be_empty,
		passphrase_do_not_match,
		t_back,
		t_encrypt,
		wallet_encrypted_with_passphrase
	} from '$lib/paraglide/messages';

	let oldPass = $state('');
	let pass = $state('');
	let confPass = $state('');
	let inputFocus: HTMLInputElement | null = $state(null);
	let isLoading = $state(false);
	onMount(() => {
		setTimeout(() => {
			inputFocus?.focus();
		}, 0);
	});

	const changePass = async (e: Event) => {
		try {
			isLoading = true;

			e.preventDefault();
			if ($usePassword && $key) {
				if (!(await checkIfKeysMatch($key, await kdf(oldPass)))) {
					return toast.warning(incorrect_passphrase());
				}
			}

			if (!pass) {
				toast.warning(passphrase_cannot_be_empty());
				setTimeout(() => {
					inputFocus?.focus();
				}, 0);
				return;
			}
			if (pass !== confPass) {
				toast.warning(passphrase_do_not_match());
				setTimeout(() => {
					inputFocus?.focus();
				}, 0);
				return;
			}
			const k = await kdf(pass);
			if (k) {
				key.set(k);
				usePassword.set(true);
			}
			await reencrypt();
			toast.success(wallet_encrypted_with_passphrase());
			push('/wallet/settings/security');
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex h-full items-center justify-center">
	<div class="bg-base-100 flex w-full max-w-4xl flex-col gap-3 rounded-lg p-5 text-center lg:p-10">
		<div class="flex flex-col gap-5">
			<p class="text-lg font-bold">{encrypt_wallet_storage()}</p>
			<p>{keep_nuts_safe()}</p>
		</div>
		<form class="flex flex-col gap-2" onsubmit={changePass}>
			{#if $usePassword}
				<Input
					bind:ref={inputFocus}
					type="password"
					placeholder="Current passphrase"
					bind:value={oldPass}
				/>
			{/if}
			<Input type="password" placeholder="Passphrase" bind:value={pass} />
			<Input type="password" placeholder="Confirm passphrase" bind:value={confPass} />
			<Form.Button>
				<Lock></Lock>
				{t_encrypt()}</Form.Button
			>
		</form>
		<div class="mt-10">
			<Button
				variant="link"
				onclick={() => {
					pop();
				}}
			>
				{t_back()}
			</Button>
		</div>
	</div>
</div>
