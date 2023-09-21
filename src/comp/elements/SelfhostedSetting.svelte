<script lang="ts">
	import { mints } from '../../stores/mints';
	import { selfhostedSyncTokens } from '../../stores/selfhosted';
	import { toast } from '../../stores/toasts';
	import { token } from '../../stores/tokens';
	let modalOpen = false;
	let isMintsChecked = false;
	let isTokensChecked = false;

	let isLoading = false;
	const handleToggleSync = () => {
		if (!$selfhostedSyncTokens) {
			toast('info', 'Reload app to activate', 'Sync tokens to server');
		}
	};
	const restoreFromServer = async () => {
		isLoading = true;
		try {
			if (isMintsChecked) {
				await restoreMints();
			}
			if (isTokensChecked) {
				await restoreTokens();
			}
			toast('success', 'Successfully restored from server', 'Done!');
		} catch (error) {
			console.log(error);
			toast('error', 'Error while restoring from server', 'Could not restore');
		} finally {
			isLoading = false;
		}
		modalOpen = false;
	};

	const restoreMints = async () => {
		try {
			const data = await fetch('/api/backup/mints');
			const mintsFromServer = await data.json();
			if (!mintsFromServer) {
				toast('warning', 'no mints found on server', 'Mints not restored');
				return;
			}
			mints.set(mintsFromServer);
		} catch (error) {
			console.error(error);
			toast('error', 'error while mints restoring from server', 'Server error');
		}
	};

	const restoreTokens = async () => {
		try {
			const data = await fetch('/api/backup/tokens');
			const tokensFromServer = await data.json();
			if (!tokensFromServer) {
				toast('warning', 'no tokens found on server', 'Tokens not restored');
				return;
			}
			token.set(tokensFromServer);
		} catch (error) {
			console.error(error);
			toast('error', 'error while tokens restoring from server', 'Server error');
		}
	};
</script>

<div class="divider font-bold">Selfhosted</div>
<div class="flex justify-between items-center">
	<label for="">Sync tokens to server</label>

	<input
		type="checkbox"
		class="toggle toggle-success"
		bind:checked={$selfhostedSyncTokens}
		on:click={handleToggleSync}
	/>
</div>
<div class="divider col-span-5" />

<div class="flex justify-between items-center">
	<label for="">Restore from server</label>

	<div class="form-control">
		<label class="label cursor-pointer">
			<input type="checkbox" bind:checked={isMintsChecked} class="checkbox checkbox-primary" />
			<span class="label-text">Mints</span>
		</label>
		<label class="label cursor-pointer flex gap-3 text-left">
			<input type="checkbox" bind:checked={isTokensChecked} class="checkbox checkbox-primary" />
			<span class="label-text">Tokens</span>
		</label>
		<label
			for="restore-from-server-modal"
			class="btn {isTokensChecked || isMintsChecked ? '' : 'btn-disabled'}">Restore</label
		>
	</div>
</div>

<input
	type="checkbox"
	id="restore-from-server-modal"
	class="modal-toggle"
	bind:checked={modalOpen}
/>
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Restore from server</h3>
		<p class="py-4">this will wipe your following current wallet data and restore from server:</p>
		<ul>
			{#if isMintsChecked}
				<li>Mints</li>
			{/if}
			{#if isTokensChecked}
				<li>Tokens</li>
			{/if}
		</ul>
		<div class="modal-action">
			<label for="restore-from-server-modal" class="btn btn-outline">close</label>
			<button class="btn" on:click={restoreFromServer}> restore </button>
		</div>
	</div>
</div>
