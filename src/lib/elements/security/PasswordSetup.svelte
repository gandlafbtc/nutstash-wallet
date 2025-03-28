<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Form from '$lib/components/ui/form';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Lock } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { key } from '$lib/stores/session/key';
	import { kdf } from '$lib/actions/encryption';
	import { usePassword } from '$lib/stores/local/usePassword';
	import { pop, push } from 'svelte-spa-router';
	import { toast } from 'svelte-sonner';
	import { encrypt_wallet_storage, keep_nuts_safe, passphrase_cannot_be_empty, passphrase_do_not_match, t_encrypt, t_skip } from '$lib/paraglide/messages';

	let pass = $state('');
	let confPass = $state('');
	let inputFocus: HTMLInputElement | null = $state(null);
	onMount(() => {
		setTimeout(() => {
			inputFocus?.focus();
		}, 0);
	});

	const enableEncryption = async (e: Event) => {
		e.preventDefault();
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
		pass = '';
		confPass = '';
		push('/onboarding/select');
	};
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="bg-base-100 flex w-full max-w-4xl flex-col gap-3 rounded-lg p-5 text-center lg:p-10">
		<div class="flex flex-col gap-5">
			<p class="text-lg font-bold">{encrypt_wallet_storage()}</p>
			<p>{keep_nuts_safe()}</p>
		</div>
		<form class="flex flex-col gap-2" onsubmit={enableEncryption}>
			<Input bind:ref={inputFocus} type="password" placeholder="Passphrase" bind:value={pass} />
			<Input type="password" placeholder="Confirm passphrase" bind:value={confPass} />
			<Form.Button>
				<Lock></Lock>
				{t_encrypt()}</Form.Button
			>
			<div class="mt-10">
				<Button
					variant="link"
					onclick={() => {
						usePassword.set(false);
						push('/onboarding/select');
					}}
				>
				 {t_skip()}
				</Button>
			</div>
		</form>
	</div>
</div>
