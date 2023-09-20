<script lang="ts">
	import { browser } from '$app/environment';
	import { nip19 } from 'nostr-tools';
	import { QRCodeImage } from 'svelte-qrcode-image';
	import { nostrPubKey, useExternalNostrKey, useNostr } from '../../stores/nostr';
	const getEncodedNpub = async () => {
		if (!$useNostr) {
			return '';
		}
		if ($useExternalNostrKey) {
			if (browser) {
				const pubK = await window.nostr?.getPublicKey();
				if (!pubK) {
					return '';
				}
				return nip19.npubEncode(pubK);
			}
			return '';
		} else {
			if (!$nostrPubKey) {
				return '';
			}
			return Promise.resolve(nip19.npubEncode($nostrPubKey));
		}
	};
</script>

{#await getEncodedNpub() then npub}
	{#if $useNostr && npub}
		<div class="divider">nostr</div>
		<!-- content here -->
		<div class="flex items-center justify-center w-full">
			<div class="flex flex-col gap-2 items-center">
				<div class="flex items-center justify-center flex-col">
					<div class="text-sm bg-info text-info-content rounded-t-lg p-1 px-2">
						Nostr - receive to npub
					</div>
					<div class="border-info border-2 rounded-md p-2">
						<QRCodeImage text={npub} displayHeight={250} displayWidth={250} margin={2} />
					</div>
				</div>
			</div>
		</div>
	{/if}
{/await}
