<script lang="ts">
	import { browser } from '$app/environment';
	import { nip19 } from 'nostr-tools';
	import { QRCodeImage } from 'svelte-qrcode-image';
	import { nostrKeys, useExternalNostrKey, useNostr } from '../../stores/nostr';

	export let isOffline: boolean = false;

	const getEncodedNpub = async () => {
		if ($useExternalNostrKey) {
			if (browser) {
				const pubK = await window.nostr?.getPublicKey();
				if (!pubK) {
					return '';
				}
				return pubK;
			}
			return '';
		} else {
			if (!$nostrKeys.length) {
				return '';
			}
			return Promise.resolve($nostrKeys[0].pub);
		}
	};
</script>

{#await getEncodedNpub() then npub}
	{#if npub}
		<div class="flex items-center justify-center w-full">
			<div class="flex flex-col gap-2 items-center">
				<div class="flex items-center justify-center flex-col">
					<div
						class="text-sm {isOffline
							? 'bg-accent text-accent-content'
							: 'bg-secondary text-secondary-content'} rounded-t-lg p-1 px-2"
					>
						PubKey
					</div>
					<div class="{isOffline ? 'border-accent' : 'border-secondary'} border-2 rounded-md p-2">
						<QRCodeImage text={npub} displayHeight={250} displayWidth={250} margin={2} />
					</div>
				</div>
			</div>
		</div>
	{/if}
{/await}
