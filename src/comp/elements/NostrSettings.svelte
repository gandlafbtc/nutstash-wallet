<script lang="ts">
	import { nostrPrivKey, useNostr, nostrPubKey } from '../../stores/nostr';
	import { generatePrivateKey, getPublicKey } from 'nostr-tools';
	import { browser } from '$app/environment';
	import { toast } from '../../stores/toasts';

	let isEditNostr = false;
	const generateNostrPrivKey = () => {
		if (!isEditNostr) {
			return false;
		}
		nostrPrivKey.set(generatePrivateKey());
		nostrPubKey.set(getPublicKey($nostrPrivKey));
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

<div class="col-span-1">
	<label for="delete-history-button">Nostr</label>
</div>

<div class="col-span-4">
	<input type="checkbox" class="toggle toggle-success" bind:checked={$useNostr} />
</div>
{#if $useNostr}
	<div class="col-span-1">
		<label for="delete-history-button">Edit Nostr Keys</label>
	</div>

	<div class="col-span-4">
		<input type="checkbox" class="toggle toggle-info" bind:checked={isEditNostr} />
	</div>
	<div class="col-span-1">
		<label for="delete-history-button">Nostr Private Key</label>
	</div>

	<div class="col-span-4 flex gap-2">
        {#if isEditNostr}
		<input type="text" class="input input-primary" bind:value={$nostrPrivKey} />
        {:else}
		<input type="text" class="input input-primary" disabled bind:value={$nostrPrivKey} />
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
    <div class="col-span-1">
		<label for="delete-history-button">Nostr Public Key</label>
	</div>

	<div class="col-span-4 flex gap-2">
        {#if isEditNostr}
		<input id='nostr-pubkey-input' type="text" class="input input-primary" bind:value={$nostrPubKey} />
        {:else}
		<input id='nostr-pubkey-input' readonly type="text" class="input input-primary" bind:value={$nostrPubKey} />
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
{/if}