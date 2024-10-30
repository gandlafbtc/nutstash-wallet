<script lang="ts">
	import PasswordSetup from './PasswordSetup.svelte';
	import {
		decrypt,
		decryptNostrKeys,
		decryptOfflineTokens,
		decryptPendingTokens,
		decryptSeed,
		decryptSpentTokens,
		kdf
	} from '$lib/actions/walletActions';
	
	import { isEncrypted, isRestoring } from '$lib/stores/settings';
	import { key } from '$lib/stores/key';
	import { toast } from '$lib/stores/toasts';
	import { token } from '$lib/stores/tokens';
	import {
		encryptedTokensStore,
		encryptedSeedStore,
		encryptedOfflineTokensStore,
		encryptedPendingTokensStore,
		encryptedSpentTokensStore,
		encryptedNostrKeysStore
	} from '$lib/stores/encrypted';
	import { mnemonic } from '$lib/stores/mnemonic';
	import { isOnboarded } from '$lib/stores/message';
	import { offlineTokens } from '$lib/stores/offlinetokens';
	import { pendingTokens } from '$lib/stores/pendingtokens';
	import { spentTokens } from '$lib/stores/spenttokens';
	import { nostrKeys } from '$lib/stores/nostr';
    import Input from '$lib/components/ui/input/input.svelte';
	import * as Form from '$lib/components/ui/form';
    import { LockOpen } from 'lucide-svelte';
    import { onMount, type Snippet } from 'svelte';
	

	let {children}: {children?: Snippet} = $props()

	let pass = $state('');

	let inputFocus: HTMLInputElement | null = $state(null)
    onMount(()=>{
        setTimeout(() => {
            console.log(inputFocus)
            inputFocus?.focus()
        }, 0);
    }) 
	
	const unlockWallet = async (e: Event) => {
		e.preventDefault()
		key.set(await kdf(pass));
		try {
			if ($encryptedTokensStore) {
				const decrypted = await decrypt($encryptedTokensStore);
				token.set(decrypted);
			} else {
				token.set([]);
			}

			if ($encryptedSeedStore) {
				const decryptedSeed = await decryptSeed($encryptedSeedStore);
				mnemonic.set(decryptedSeed);
			}
			if ($encryptedOfflineTokensStore) {
				const decryptedOfflineTokens = await decryptOfflineTokens($encryptedOfflineTokensStore);
				offlineTokens.set(decryptedOfflineTokens);
			} else {
				offlineTokens.set([]);
			}
			if ($encryptedPendingTokensStore) {
				const decryptedPendingTokens = await decryptPendingTokens($encryptedPendingTokensStore);
				pendingTokens.set(decryptedPendingTokens);
			} else {
				pendingTokens.set([]);
			}
			if ($encryptedSpentTokensStore) {
				const decryptedSpentTokens = await decryptSpentTokens($encryptedSpentTokensStore);
				spentTokens.set(decryptedSpentTokens);
			} else {
				spentTokens.set([]);
			}
			if ($nostrKeys) {
				const decryptedNostrKeys = await decryptNostrKeys($encryptedNostrKeysStore);
				nostrKeys.set(decryptedNostrKeys);
			} else {
				nostrKeys.set([]);
			}
		} catch (error) {
			key.set(undefined);
			toast('Wrong Password', 'warning');
			setTimeout(() => {
            console.log(inputFocus)
            inputFocus?.focus()
        }, 0);
		} finally {
			pass = '';
		}
	};
</script>

{#if !$isRestoring && $isOnboarded && $isEncrypted === undefined}
	<PasswordSetup></PasswordSetup>
{:else if !$isRestoring && $isEncrypted && !$key}
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
			<Form.Button>
				<LockOpen></LockOpen>
				Unlock
			</Form.Button>
		</form>
	</div>
</div>
</div>
{:else}
	{@render children?.()}
{/if}
