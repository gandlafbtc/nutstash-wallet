<script>
	import { isEncrypted } from '../../stores/settings';
	import { key } from '../../stores/key';
	import { toast } from '../../stores/toasts';
	import { kdf } from '../../actions/walletActions';

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
		key.set(await kdf(pass));
		$isEncrypted = true;
		pass = '';
		confPass = '';
	};
</script>

{#if $isEncrypted === undefined}
	<div class="p-2 flex flex-col gap-3">
		<div class="flex flex-col gap-2">
			<p class="text-lg font-bold">Encrypt wallet storage</p>
			<p>Set up wallet encryption to keep your nuts safe. This cannot be changed later</p>
			<div class="rounded-lg bg-opacity-70 bg-base-100 flex flex-col justify-start items-start p-3 text-start">
                <p class="font-bold">beware of these trade-offs</p>
				<p class="text-error">- no password reset function</p>
				<p class="text-error">- wallet might be slower</p>
				<p class="text-success">+ lock wallet automatically</p>
				<p class="text-success">+ ecash inaccessible outside wallet</p>
			</div>
		</div>
		<input type="password" class="input input-bordered" placeholder="password" bind:value={pass} />
		<input
			type="password"
			class="input input-bordered"
			placeholder="confirm password"
			bind:value={confPass}
		/>
		<div class="flex gap-2 justify-end">
			<button class="btn btn-success" on:click={enableEncryption}> encrypt </button>
		</div>
		<button
			class="link"
			on:click={() => {
				isEncrypted.set(false);
			}}
		>
			don't encrypt
		</button>
	</div>
{/if}
