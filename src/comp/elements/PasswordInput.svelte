<script>
	import { isEncrypted, isRestoring } from '../../stores/settings';
	import { key } from '../../stores/key';
	import { toast } from '../../stores/toasts';
	import {
		decrypt,
		decryptNostrKeys,
		decryptOfflineTokens,
		decryptPendingTokens,
		decryptSeed,
		decryptSpentTokens,
		kdf
	} from '../../actions/walletActions';
	import { token } from '../../stores/tokens';
	import {
		encryptedTokensStore,
		encryptedSeedStore,
		encryptedOfflineTokensStore,
		encryptedPendingTokensStore,
		encryptedSpentTokensStore,
		encryptedNostrKeysStore
	} from '../../stores/encrypted';
	import { mnemonic } from '../../stores/mnemonic';
	import PasswordSetup from './PasswordSetup.svelte';
	import { isOnboarded } from '../../stores/message';
	import { offlineTokens } from '../../stores/offlinetokens';
	import { pendingTokens } from '../../stores/pendingtokens';
	import { spentTokens } from '../../stores/spenttokens';
	import { nostrKeys } from '../../stores/nostr';

	let pass = '';

	const unlockWallet = async () => {
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
			toast('error', 'Try again', 'Wrong password');
		} finally {
			pass = '';
		}
	};
</script>

{#if !$isRestoring && $isOnboarded && $isEncrypted === undefined}
	<PasswordSetup></PasswordSetup>
{:else if !$isRestoring && $isEncrypted && !$key}
	<div
		class="w-screen h-screen bg-black bg-opacity-40 z-50 fixed top-0 left-0 flex items-center justify-center"
	>
		<div class="bg-base-100 max-w-2xl rounded-2xl p-10 flex flex-col gap-4 items-center">
			<div class="w-20 h-20">
				<img src="/nutstash_app.svg" alt="" />
			</div>
			<p class="text-lg font-bold">Wallet is locked.</p>
			<p>Enter your password to unlock.</p>
			<form class="flex flex-col gap-2" on:submit|preventDefault={unlockWallet}>
				<input
					type="password"
					class="input input-bordered"
					placeholder="password"
					bind:value={pass}
					autofocus
				/>
				<div class="flex gap-2 justify-end">
					<input type="submit" class="btn btn-success w-full" value="unlock" />
				</div>
			</form>
		</div>
	</div>
{:else}
	<slot />
{/if}
