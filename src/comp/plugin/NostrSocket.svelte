<script lang="ts">
	import { CashuMint, getDecodedProofs } from '@gandlaf21/cashu-js';
	import * as rp from 'nostr-relaypool';

	import * as nostrTools from 'nostr-tools';
	import type { NostrMessage } from 'src/model/nostrMessage';
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
	import { mints as mintsStore } from '../../stores/mints';
	import type { Mint } from 'src/model/mint';
	import { onMount } from 'svelte';

	const getPubKey = async (): Promise<string> => {
		return $useExternalNostrKey
			? // @ts-expect-error
			  await window.nostr.getPublicKey()
			: await Promise.resolve($nostrPubKey);
	};
	onMount(async () => {
		if ($useNostr) {
			console.log($relays)
			nostrPool.set(new rp.RelayPool($relays.filter((r) => r.isActive).map((r) => r.url)));
			const nostrPubK: string = await getPubKey();
			$nostrPool?.subscribe(
				[{ kinds: [nostrTools.Kind.EncryptedDirectMessage], limit: 10, '#p': [nostrPubK] }],
				$relays.filter((r) => r.isActive).map((r) => r.url),
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
						? // @ts-expect-error
						  await window.nostr.nip04.decrypt(event.pubkey, event.content)
						: await nostrTools.nip04.decrypt($nostrPrivKey, event.pubkey, event.content);
					const token = getDecodedProofs(decodedMessage);

					//todo if !token.proofs return

					if (!token?.proofs) {
						//if the event is not in a cashu token format, ignore it
						return
					}


					//add mints that are unknown
					token.mints.forEach(async (mint) => {
						if ($mintsStore.map((m) => m.mintURL).includes(mint.url)) {
							//if mint is already added, ignore
							return;
						}
						const cashuMint: CashuMint = new CashuMint(mint.url);
						const keys = await cashuMint.getKeys();
						if (!keys) {
							//if we can't get the keys, ignore
							return;
						}
						const mintToStore: Mint = {
							keys,
							keysets: mint.keysets,
							mintURL: mint.url,
							isAdded: false
						};
						mintsStore.update((state) => [mintToStore, ...state]);
					});

					if (!isValidToken(token.proofs)) {
						// ignore messages that are not tokens
						return;
					}

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
				console.log('RelayPool error', err);
			};
			$nostrPool.onnotice((notice) => {
				console.log('RelayPool notice', notice);
			});
		} else {
			console.log('nonostr..');
		}
	});
</script>
