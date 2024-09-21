<script>
	import { key } from '../../stores/key';
	import { isEncrypted } from '../../stores/settings';
	import { token } from '../../stores/tokens';
	import { mnemonic } from '../../stores/mnemonic';
	import { offlineTokens } from '../../stores/offlinetokens';
	import { pendingTokens } from '../../stores/pendingtokens';
	import { spentTokens } from '../../stores/spenttokens';
	import { nostrKeys } from '../../stores/nostr';

	let currentPass = '';
	const removeEncryption = async () => {
		key.set(undefined);
		isEncrypted.set(false);
		token.set($token);
		offlineTokens.set($offlineTokens);
		pendingTokens.set($pendingTokens);
		spentTokens.set($spentTokens);
		nostrKeys.set($nostrKeys);
		mnemonic.set($mnemonic);
	};
	const setNewPassword = async () => {
		key.set(undefined);
		isEncrypted.set(undefined);
		token.set($token);
		offlineTokens.set($offlineTokens);
		pendingTokens.set($pendingTokens);
		spentTokens.set($spentTokens);
		nostrKeys.set($nostrKeys);
		mnemonic.set($mnemonic);
	};
</script>

<label for="reset-password-modal" class="btn btn-error">reset password</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="reset-password-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<p class="py-4 font-bold text-error">Reset password</p>
		<p class="py-4">Would you like to remove encryption, or set a new password?</p>

		<div class="modal-action">
			<label for="reset-password-modal" class="btn btn-outline">cancel</label>
			<button on:click={removeEncryption} class="btn btn-error">Decrypt</button>
			<button on:click={setNewPassword} class="btn btn-success">New password</button>
		</div>
	</div>
</div>
