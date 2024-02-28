<script>
	import { isEncrypted } from '../../stores/settings';
	import { key } from '../../stores/key';
	import { toast } from '../../stores/toasts';
	import { browser } from '$app/environment';
	import { decrypt, decryptSeed, encrypt, kdf } from '../../actions/walletActions';
	import { token } from '../../stores/tokens';
	import { encryptedStorage, encryptedStorageSeed } from '../../stores/encrypted';
	import { mnemonic } from '../../stores/mnemonic';

	let pass = '';

	const unlockWallet = async () => {
		key.set(await kdf(pass));
		try {
			if ($encryptedStorage) {
				const decrypted = await decrypt($encryptedStorage);
				token.set(decrypted);
			} else {
				token.set([]);
			}
			if (encryptedStorageSeed) {
				const decryptedSeed = await decryptSeed($encryptedStorageSeed);
				mnemonic.set(decryptedSeed);
			}
		} catch (error) {
			key.set(undefined);
			toast('error', 'can not unlock', 'wrong password');
			console.log(error);
		} finally {
			pass = '';
		}
	};
</script>

{#if $isEncrypted && !$key}
	<div
		class="w-screen h-screen bg-black bg-opacity-80 z-50 fixed top-0 left-0 flex items-center justify-center"
	>
		<div class="bg-base-100 max-w-2xl rounded-2xl p-10 flex flex-col gap-3">
			<div class="flex flex-col gap-2">
				<p class="text-lg font-bold">Wallet is locked.</p>
				<p>Enter your password to unlock.</p>
			</div>
			<form class="flex flex-col gap-2" on:submit|preventDefault={unlockWallet}>

				<input
				type="password"
				class="input input-bordered"
				placeholder="password"
				bind:value={pass}
				/>
				<div class="flex gap-2 justify-end">
					<input type="submit" class="btn btn-success" value="unlock">
				</div>
			</form>
		</div>
	</div>
{:else}
	<slot />
{/if}
