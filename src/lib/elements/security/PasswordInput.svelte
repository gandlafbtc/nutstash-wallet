<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Form from '$lib/components/ui/form';
	import { LockOpen, LoaderCircle } from 'lucide-svelte';
	import { onMount, type Snippet } from 'svelte';
	import { kdf } from '$lib/actions/encryption';
	import { key } from '$lib/stores/session/key';
	import { usePassword } from '$lib/stores/local/usePassword';
	import { DEFAULT_PASS } from '$lib/stores/static/pass';
	import { init } from '$lib/init/init';
	import { toast } from 'svelte-sonner';
	import {
		enter_pass_to_unlock,
		incorrect_passphrase,
		t_unlock,
		t_unlocking,
		wallet_is_locked,
		wallet_unlocked
	} from '$lib/paraglide/messages';

	let { children }: { children?: Snippet } = $props();

	let pass = $state('');

	let isUnlocking: boolean = $state(false);

	let inputFocus: HTMLInputElement | null = $state(null);
	onMount(() => {
		if ($usePassword === false) {
			unlock();
		} else {
			setTimeout(() => {
				inputFocus?.focus();
			}, 0);
		}
	});

	const unlockWallet = async (e: Event) => {
		e.preventDefault();
		unlock();
	};

	const unlock = async () => {
		isUnlocking = true;

		try {
			if ($usePassword) {
				key.set(await kdf(pass));
			} else {
				key.set(await kdf(DEFAULT_PASS));
			}
			// init
			await init();
			toast.success(wallet_unlocked());
		} catch (error) {
			key.set(undefined);
			toast.warning(incorrect_passphrase());
			setTimeout(() => {
				console.error(error);
				inputFocus?.focus();
			}, 0);
		} finally {
			pass = '';
			isUnlocking = false;
		}
	};
</script>

{#if ($usePassword && !$key) || isUnlocking}
	<div class="flex h-screen w-screen items-center justify-center">
		<div class="flex h-full w-full max-w-4xl items-center justify-center">
			<div class="flex w-80 flex-col items-center gap-4 rounded border p-6 xl:w-[600px]">
				<div class="h-20 w-20">
					<img src="/nutstash_app.svg" alt="" />
				</div>
				<p class="text-lg font-bold">{wallet_is_locked()}</p>
				{#if isUnlocking}
					<p>{t_unlocking()}</p>
				{:else}
					<p>{enter_pass_to_unlock()}</p>
				{/if}
				<form class="flex flex-col gap-2" onsubmit={unlockWallet}>
					{#if !isUnlocking}
						<Input
							bind:ref={inputFocus}
							type="password"
							placeholder="Passphrase"
							bind:value={pass}
						/>
					{/if}
					<Form.Button disabled={isUnlocking}>
						{#if isUnlocking}
							<LoaderCircle class="animate-spin"></LoaderCircle>
						{:else}
							<LockOpen></LockOpen>
						{/if}
						{t_unlock()}
					</Form.Button>
				</form>
			</div>
		</div>
	</div>
{:else}
	{@render children?.()}
{/if}
