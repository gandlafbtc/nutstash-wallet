<script>
	import { key } from '../../stores/key';
	import { isEncrypted } from '../../stores/settings';
	import { token } from '../../stores/tokens';
	import { mnemonic } from '../../stores/mnemonic';

	let currentPass = '';
	const removeEncryption = async () => {
		key.set(undefined);
		isEncrypted.set(false);
		token.set($token);
		mnemonic.set($mnemonic);
	};
	const setNewPassword = async () => {
		key.set(undefined);
		isEncrypted.set(undefined);
		token.set($token);
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
			<button on:click={removeEncryption} class="btn btn-error">remove encryption</button>
			<button on:click={setNewPassword} class="btn btn-success">set new password</button>
		</div>
	</div>
</div>
