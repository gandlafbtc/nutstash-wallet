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
			mnemonic.set($mnemonic);
			token.set($token);
		}
		pass = '';
		confPass = '';
	};
</script>

<div
	class="w-full h-full flex flex-col gap-3 bg-base-100 max-w-4xl text-center p-5 lg:p-10 rounded-lg"
>
	<div class="flex flex-col gap-5">
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
		<input type="password" class="input input-bordered" placeholder="password" bind:value={pass} />
		<input
			type="password"
			class="input input-bordered"
			placeholder="confirm password"
			bind:value={confPass}
		/>
		<div class="flex gap-2 justify-end">
			<input type="submit" class="btn btn-success w-full" value="encrypt" />
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
