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
					return toast.warning('The current password is incorrect');
				}
			}

			if (!pass) {
				toast.warning('Password cannot be empty');
				setTimeout(() => {
					inputFocus?.focus();
				}, 0);
				return;
			}
			if (pass !== confPass) {
				toast.warning('Passwords do not match');
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
			toast.success('Wallet encrypted with new passphrase');
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
			<p class="text-lg font-bold">Encrypt wallet storage</p>
			<p>Set up wallet encryption to keep your nuts safe.</p>
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
				Encrypt</Form.Button
			>
		</form>
		<div class="mt-10">
			<Button
				variant="link"
				onclick={() => {
					pop();
				}}
			>
				Back
			</Button>
		</div>
	</div>
</div>
