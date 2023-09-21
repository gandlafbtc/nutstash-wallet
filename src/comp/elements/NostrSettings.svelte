<script lang="ts">
	import { nostrPrivKey, useNostr, nostrPubKey, useExternalNostrKey } from '../../stores/nostr';
	import { generatePrivateKey, getPublicKey } from 'nostr-tools';
	import { browser } from '$app/environment';
	import { toast } from '../../stores/toasts';
	import NostrRelaysConfig from './NostrRelaysConfig.svelte';

	let isEditNostr = false;
	const generateNostrPrivKey = () => {
		if (!isEditNostr) {
			return false;
		}
		nostrPrivKey.set(generatePrivateKey());
		nostrPubKey.set(getPublicKey($nostrPrivKey));
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
	<NostrRelaysConfig />
	<div class="flex justify-between items-center">
	
	<div class="col-span-1">
		<label for="use-external-nostr">Use external Key (nos2x, etc...)</label>
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
	<div class="col-span-5 inline-flex items-center gap-2">
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
			<p>
				Please don't paste your nostr keys here. Use your keys with an extension like nos2x or
				generate throwaway keys.
			</p>
		</div>
	<div class="flex justify-between items-center">

		<div class="col-span-1">
			<label for="edit-nkeys">Edit Nostr Keys</label>
		</div>

		<div class="col-span-4">
			<input type="checkbox" class="toggle toggle-info" bind:checked={isEditNostr} />
		</div>
	</div>
	<div class="flex justify-between items-center">

		<div class="col-span-1">
			<label for="nsec">nsec</label>
		</div>

		<div class="col-span-4 flex gap-2">
			{#if isEditNostr}
				<input type="text" class="input input-primary w-24 lg:w-56" bind:value={$nostrPrivKey} />
			{:else}
				<input
					type="text"
					class="input input-primary w-24 lg:w-56"
					disabled
					bind:value={$nostrPrivKey}
				/>
			{/if}
			<div class="tooltip" data-tip="Generate new Nostr Keypair">
				<button class="btn btn-square" on:click={generateNostrPrivKey}
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
		</div>
	</div>
	<div class="flex justify-between items-center">

		<div class="col-span-1">
			<label for="npub">npub</label>
		</div>

		<div class="col-span-4 flex gap-2">
			{#if isEditNostr}
				<input
					id="nostr-pubkey-input"
					type="text"
					class="input input-primary w-24 lg:w-56"
					bind:value={$nostrPubKey}
				/>
			{:else}
				<input
					id="nostr-pubkey-input"
					readonly
					type="text"
					class="input input-primary w-24 lg:w-56"
					bind:value={$nostrPubKey}
				/>
			{/if}
			<button class="btn btn-square" on:click={copyToken}>
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
	{/if}
{/if}
