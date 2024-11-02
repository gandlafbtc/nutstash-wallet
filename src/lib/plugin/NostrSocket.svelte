<script lang="ts">
	import { getDecodedToken } from '@cashu/cashu-ts';

	import * as nostrTools from 'nostr-tools';
	import type { NostrMessage } from '$lib/model/nostrMessage';
	import {
		nostrPool,
		useNostr,
		nostrRelays as relays,
		nostrMessages,
		useExternalNostrKey,
		nostrKeys,
        nostrRelays
	} from '$lib/stores/persistent/nostr';
	import { isValidToken } from '$lib/util/walletUtils';
	import { onMount, onDestroy } from 'svelte';
	import { toast } from '$lib/stores/session/toasts';
	import { browser } from '$app/environment';

	const getPubKey = async (): Promise<string[]> => {
		return $useExternalNostrKey
			? await [window.nostr.getPublicKey()]
			: await Promise.resolve($nostrKeys.map((k) => k.pub));
	};

	onDestroy(() => {
		if ($nostrPool) {
			$nostrPool.destroy()
		}
	});

	onMount(async () => {
		if (!$useNostr) {
			return;
		}

		const activeRelays: Array<string> = [];

		if ($useExternalNostrKey && browser) {
			const nip07relays = await window.nostr?.getRelays();
			activeRelays.push(...Object.keys(nip07relays));
		}
		activeRelays.push(
			...$relays.filter((r) => r.isActive && !activeRelays.includes(r.url)).map((r) => r.url)
		);

		if (activeRelays.length < 1) {
			toast('warning', 'Add at least one relay', 'No relay configured');
			return;
		}

		if ($useExternalNostrKey && !window.nostr) {
			toast('warning', 'Install extension or use local keys', 'No nostr Keys present');
			return;
		}
		if ($useExternalNostrKey && (await !window.nostr.getPublicKey())) {
			toast('warning', 'Add a key to nostr extension.', 'No key in nostr extension');
			return;
		}
		if (!$useExternalNostrKey && !$nostrKeys.length) {
			// toast('warning', 'Generate a new key pair.', 'No nostr Keys found');
			return;
		}

		console.log('connecting to nostr relays...', activeRelays);
		nostrPool.set(
			new nostrTools.SimplePool()
		);
		const nostrPubK: string[] = await getPubKey();

		const filter: { kinds: number[]; limit: number; '#p': string[]; since?: number } = {
			kinds: [nostrTools.kinds.EncryptedDirectMessage],
			limit: 10,
			'#p': nostrPubK
		};

		if ($nostrMessages.length) {
			filter.since = $nostrMessages
				.map((m) => m.event.created_at)
				.reduce((prev, curr) => {
					return prev >= curr ? prev : curr;
				});
		}

		$nostrPool?.subscribeMany(
			activeRelays,
			[filter],
			{
				onevent: async (event) => {
				console.log(event);
				if ($nostrMessages.map((message) => message.event.id).includes(event.id)) {
					//if token is already stored, do nothing
					return;
				}
				if (!nostrTools.validateEvent(event)) {
					//if an event is invalid, ignore it
					return;
				}
				const privForEvent = $nostrKeys.find((key) => key.pub === event.pubkey)?.priv;
				if (!privForEvent) {
					return;
				}
				const decodedMessage = $useExternalNostrKey
				? await window.nostr.nip04.decrypt(event.pubkey, event.content)
				: await nostrTools.nip04.decrypt(privForEvent, event.pubkey, event.content);
				
				let token;
				try {
					token = getDecodedToken(decodedMessage);
				} catch (e) {
					console.error(e, 'could not decode nip-04 message as token. Ignoring this message');
					return;
				}
				
				if (!token?.token) {
					//if the event is not in a cashu token format, ignore it
					return;
				}

				if (!isValidToken(token.token)) {
					// ignore messages that are not tokens
					return;
				}
				
				//todo check if token is spent already
				
				const nostrMessage: NostrMessage = {
					event,
					token,
					isAccepted: false
				};
				nostrMessages.update((state) => [nostrMessage, ...state]);
				
			}
			
	});
	});
</script>
