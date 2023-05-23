<script lang="ts">
	import { getDecodedToken } from '@cashu/cashu-ts';

	import * as rp from 'nostr-relaypool';

	import * as nostrTools from 'nostr-tools';
	import type { NostrMessage } from '../../model/nostrMessage';
	import {
		nostrPool,
		useNostr,
		nostrRelays as relays,
		nostrPubKey,
		nostrPrivKey,
		nostrMessages,
		useExternalNostrKey
	} from '../../stores/nostr';
	import { isValidToken } from '../util/walletUtils';
	import { onMount, onDestroy } from 'svelte';
	import { toast } from '../../stores/toasts';
	import { browser } from '$app/environment';

	const getPubKey = async (): Promise<string> => {
		return $useExternalNostrKey
			? await window.nostr.getPublicKey()
			: await Promise.resolve($nostrPubKey);
	};

	onDestroy(() => {
		if ($nostrPool) {
			$nostrPool.close();
			console.log('close connections');
		}
	});

	onMount(async () => {
		if (!$useNostr) {
			console.log('nostr is disabled');
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
			toast('warning', 'You have to add at least one relay to use Nostr.', 'No relay configured');
			return;
		}

		if ($useExternalNostrKey && !window.nostr) {
			toast(
				'info',
				'install a nostr signing extension or switch to local keys.',
				'No nostr Keys present'
			);
			return;
		}
		if ($useExternalNostrKey && (await !window.nostr.getPublicKey())) {
			toast(
				'info',
				'Add a key pair to the nostr extension or switch to local keys.',
				'no key in nostr extension'
			);
			return;
		}
		if (!$useExternalNostrKey && (!$nostrPubKey || !$nostrPrivKey)) {
			toast('info', 'Use a signing extension or generate a key pair.', 'No nostr Keys found');
			return;
		}

		console.log('connecting to nostr relays...', activeRelays);
		nostrPool.set(new rp.RelayPool(activeRelays));
		const nostrPubK: string = await getPubKey();
		$nostrPool?.subscribe(
			[{ kinds: [nostrTools.Kind.EncryptedDirectMessage], limit: 10, '#p': [nostrPubK] }],
			activeRelays,
			async (event, isAfterEose, relayURL) => {
				console.log(event);
				if ($nostrMessages.map((message) => message.event.id).includes(event.id)) {
					//if token is already stored, do nothing
					return;
				}
				if (!nostrTools.validateEvent(event)) {
					//if an event is invalid, ignore it
					return;
				}
				const decodedMessage = $useExternalNostrKey
					? await window.nostr.nip04.decrypt(event.pubkey, event.content)
					: await nostrTools.nip04.decrypt($nostrPrivKey, event.pubkey, event.content);

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
			},
			undefined,
			(events, relayURL) => {
				console.log(events, relayURL);
			}
		);

		$nostrPool.onerror = (err) => {
			console.error('RelayPool error', err);
		};
		$nostrPool.onnotice((notice) => {
			console.log('RelayPool notice', notice);
		});
	});
</script>
