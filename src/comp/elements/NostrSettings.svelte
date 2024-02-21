<script lang="ts">
	import { nostrPrivKey, useNostr, nostrPubKey, useExternalNostrKey } from '../../stores/nostr';
	import { generateSecretKey, getPublicKey } from 'nostr-tools';
	import { browser } from '$app/environment';
	import { toast } from '../../stores/toasts';
	import NostrRelaysConfig from './NostrRelaysConfig.svelte';
	import { bytesToHex } from '@noble/hashes/utils';

	let newKeysModal: HTMLDialogElement;
	let isShowNsec = false;

	const generateNostrPrivKey = () => {
		const priv = generateSecretKey();
		nostrPrivKey.set(bytesToHex(priv));
		nostrPubKey.set(getPublicKey(priv));
		restartNostr();
	};

	const restartNostr = () => {
		if (!$useExternalNostrKey && !$nostrPubKey) {
			return;
		}
		toast('info', 'restarting nostr shortly...', 'nostr keys changed');
		setTimeout(() => {
			useNostr.update((state) => !state);
			setTimeout(() => {
				useNostr.update((state) => !state);
				toast('success', 'nostr has restarted', 'Done!');
			}, 500);
		}, 2000);
	};

	const copyToken = () => {
		if (browser) {
			let input = document.getElementById('nostr-pubkey-input');
			// @ts-expect-error
			input.select();
			document.execCommand('copy');
			toast('info', 'Public Key has been copied to clipboard.', 'Copied!');
		}
	};
</script>

<div class="flex justify-between items-center">
	<div class="col-span-1">
		<label for="use-nostr">Nostr</label>
	</div>

	<div class="col-span-4">
		<input type="checkbox" class="toggle toggle-success" bind:checked={$useNostr} />
	</div>
</div>
{#if $useNostr}
	<div class="flex justify-between items-center">
		<div class="col-span-1">
			<label for="use-external-nostr">Use nostr extension</label>
		</div>
		<div class="col-span-4 flex gap-2">
			<input
				type="checkbox"
				class="toggle toggle-success"
				bind:checked={$useExternalNostrKey}
				on:change={restartNostr}
			/>
			{#if $useExternalNostrKey && !window?.nostr}
				<div class="flex gap-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
						/>
					</svg>
					<p>no extension found</p>
				</div>
			{/if}
		</div>
	</div>

	{#if !$useExternalNostrKey}
		<div>keys</div>
		<div class="bg-base-200 p-2 gap-2 rounded-md flex flex-col">
			<div class="flex justify-between items-center">
				<div class="">
					<label for="npub">npub</label>
				</div>

				<div class="flex gap-2">
					<input
						id="nostr-pubkey-input"
						readonly
						type="text"
						class="input input-bordered w-24 lg:w-56"
						bind:value={$nostrPubKey}
					/>
					<button class="btn btn-square btn-primary" on:click={copyToken}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div class="flex justify-between items-center">
				<div class="flex flex-grow">
					<label> show nsec </label>
				</div>
				<div class="flex gap-2" >
					<input
						id="nostr-pubkey-input"
						readonly
						type="text"
						class="input input-bordered w-24 lg:w-56"
						value="{isShowNsec? $nostrPrivKey: ''}"
					/>
					{#if isShowNsec === false}
						<button class="btn btn-outline btn-square" on:click={() => (isShowNsec = true)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						</button>
					{:else}
						<button class="btn btn-outline btn-square" on:click={() => (isShowNsec = false)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
								/>
							</svg>
						</button>
					{/if}
				</div>
				<div></div>
			</div>
			<div class="flex justify-between items-center">
				<div class="">
					<label>generate new keys</label>
				</div>
				<div class="tooltip" data-tip="Generate new Nostr Keypair">
					<button
						class="btn btn-square btn-outline"
						on:click={() => {
							newKeysModal.showModal();
						}}
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
					</button>
				</div>
				<dialog bind:this={newKeysModal} class="modal">
					<div class="modal-box">
						<h3 class="font-bold text-lg">This will remove the current nostr keys!</h3>
						<p class="py-4">
							Are you sure you want to delete your current nostr keys and create new ones?
						</p>
						<div class="modal-action">
							<form method="dialog">
								<button class="btn">abort</button>
								<button class="btn btn-primary" on:click={generateNostrPrivKey}
									>create new keys</button
								>
							</form>
						</div>
					</div>
				</dialog>
			</div>
		</div>
	{/if}
	<NostrRelaysConfig />
{/if}
