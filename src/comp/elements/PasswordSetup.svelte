<script>
	import { isEncrypted } from '../../stores/settings';
	import { key } from '../../stores/key';
	import { toast } from '../../stores/toasts';
	import { kdf } from '../../actions/walletActions';
	import { mnemonic } from '../../stores/mnemonic';
	import { token } from '../../stores/tokens';

	let pass = '';
	let confPass = '';

	const enableEncryption = async () => {
		if (!pass) {
			toast('warning', 'Invalid Password', 'Password cannot be empty');
			return;
		}
		if (pass !== confPass) {
			toast('warning', 'Invalid Password', 'Passwords do not match');
			return;
		}
		const k = await kdf(pass);
		if (k) {
			key.set(k);
			isEncrypted.set(true);
			const currentMnemonic = `${$mnemonic}`;
			const currentToken = [...$token];
			mnemonic.set(currentMnemonic);
			token.set(currentToken);
		}
		pass = '';
		confPass = '';
	};
</script>

<div class="flex flex-col justify-center items-center gap-5">
	<div class="text-base">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			class="w-20 h-20"
		>
			<path
				fill-rule="evenodd"
				d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
				clip-rule="evenodd"
			/>
		</svg>
	</div>
	<div class="flex flex-col gap-3 bg-base-100 h-min p-5 rounded-lg">
		<div class="flex flex-col gap-2">
			<p class="text-lg font-bold">Encrypt wallet storage</p>
			<p>Set up wallet encryption to keep your nuts safe.</p>
			<div class="rounded-lg bg-base-200 flex flex-col justify-start items-start p-3 text-start">
				<p class="font-bold">beware of these trade-offs</p>
				<p class="text-error">- no password reset function</p>
				<p class="text-error">- wallet might be slower</p>
				<p class="text-success">+ lock wallet automatically</p>
				<p class="text-success">+ ecash inaccessible outside wallet</p>
			</div>
		</div>
		<form class="flex flex-col gap-2" on:submit|preventDefault={enableEncryption}>
			<input
				type="password"
				class="input input-bordered"
				placeholder="password"
				bind:value={pass}
			/>
			<input
				type="password"
				class="input input-bordered"
				placeholder="confirm password"
				bind:value={confPass}
			/>
			<div class="flex gap-2 justify-end">
				<input type="submit" class="btn btn-success" value="encrypt" />
			</div>
		</form>
		<button
			class="link"
			on:click={() => {
				isEncrypted.set(false);
			}}
		>
			don't encrypt
		</button>
	</div>
</div>
