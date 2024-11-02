<script lang="ts">
	import PasswordSetup from './PasswordSetup.svelte';
	
	import { isRestoring } from '$lib/stores/persistent/settings';
	import { toast } from '$lib/stores/session/toasts';

	import { isOnboarded } from '$lib/stores/local/message';
    import Input from '$lib/components/ui/input/input.svelte';
	import * as Form from '$lib/components/ui/form';
    import { LockOpen, LoaderCircle } from 'lucide-svelte';
    import { onMount, type Snippet } from 'svelte';
    import { kdf } from '$lib/actions/encryption';
    import { key } from '$lib/stores/session/key';
    import { usePassword } from '$lib/stores/local/usePassword';
    import { mints } from '$lib/stores/persistent/mints';
    import { mintQuotesStore } from '$lib/stores/persistent/mintquotes';
	

	let {children}: {children?: Snippet} = $props()

	let pass = $state('');

	let isUnlocking: boolean = $state(false);

	let inputFocus: HTMLInputElement | null = $state(null)
    onMount(()=>{
		if ($usePassword === false) {
			unlock()
		}
        setTimeout(() => {
            console.log(inputFocus)
            inputFocus?.focus()
        }, 0);
    }) 
	
	const unlockWallet = async (e: Event) => {
		e.preventDefault()
		unlock()
	};

	const unlock = async () => {
		isUnlocking  = true;
		key.set(await kdf(pass));
		try {
			// init stores
			await mints.init()
			await mintQuotesStore.init()
			
			toast('Wallet unlocked', 'success');
		} catch (error) {
			key.set(undefined);
			toast('Wrong Password', 'warning');
			setTimeout(() => {
            console.log(inputFocus)
            inputFocus?.focus()
        }, 0);
		} finally {
			pass = '';
			isUnlocking = false;
		}
	}
</script>

{#if !$isRestoring && $isOnboarded && $usePassword === undefined}
	<PasswordSetup></PasswordSetup>
{:else if !$isRestoring && $usePassword && !$key || isUnlocking}
<div class="w-full h-full flex items-center justify-center">

	<div
	class="w-full h-full flex items-center justify-center max-w-4xl"
	>
	<div class="flex flex-col items-center border rounded p-6 gap-4">
		<div class="w-20 h-20">
			<img src="/nutstash_app.svg" alt="" />
		</div>
		<p class="text-lg font-bold">Wallet is locked.</p>
		<p>Enter your passphrase to unlock.</p>
		<form class="flex flex-col gap-2" onsubmit={unlockWallet}>
			<Input
			bind:ref={inputFocus}
			type="password"
			placeholder="Passphrase"
			bind:value={pass}
			/>
			<Form.Button disabled={isUnlocking}>
				{#if isUnlocking}
				<LoaderCircle class='animate-spin'></LoaderCircle>
				{:else}
				<LockOpen></LockOpen>
				{/if}
				Unlock
			</Form.Button>
		</form>
	</div>
</div>
</div>
{:else}
	{@render children?.()}
{/if}
