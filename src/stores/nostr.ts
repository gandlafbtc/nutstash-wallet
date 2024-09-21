import { browser } from '$app/environment';
import type { RelayPool } from 'nostr-relaypool';
import { HDKey } from '@scure/bip32';

import type { NostrMessage } from '../model/nostrMessage';

import { get, writable } from 'svelte/store';
import type { NostrRelay } from '../model/relay';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { schnorr, secp256k1 } from '@noble/curves/secp256k1';
import { toast } from './toasts';
import { isEncrypted } from './settings';
import { encryptedNostrKeysStore } from './encrypted';
import { encryptNostrKeys } from '../actions/walletActions';
import { mnemonic, seed } from './mnemonic';
import { deriveBlindingFactor } from '@gandlaf21/cashu-crypto/modules/client/NUT09';

const initialValueSting: string = browser
	? window.localStorage.getItem('use-nostr') ?? 'true'
	: 'true';

const initialValue: boolean = JSON.parse(initialValueSting);

const useNostr = writable<boolean>(initialValue);

useNostr.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('use-nostr', JSON.stringify(value));
	}
});

const initialValueExternalKeySting: string = browser
	? window.localStorage.getItem('use-external-nostr') ?? 'false'
	: 'false';

const initialValueExternalKey: boolean = JSON.parse(initialValueExternalKeySting);

const useExternalNostrKey = writable<boolean>(initialValueExternalKey);

useExternalNostrKey.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('use-external-nostr', JSON.stringify(value));
	}
});

// const initialValuePrivKeySting: string = browser
// 	? window.localStorage.getItem('nostr-privkey') ?? ''
// 	: '';

// const nostrPrivKey = writable<string>(initialValuePrivKeySting);

// nostrPrivKey.subscribe((value) => {
// 	if (browser) {
// 		window.localStorage.setItem('nostr-privkey', value);
// 	}
// });

// const initialValuePubKeySting: string = browser
// 	? window.localStorage.getItem('nostr-pubkey') ?? ''
// 	: '';

// const nostrPubKey = writable<string>(initialValuePubKeySting);

// nostrPubKey.subscribe((value) => {
// 	if (browser) {
// 		window.localStorage.setItem('nostr-pubkey', value);
// 	}
// });


const initialValueNostrKeysString: string = browser
	? window.localStorage.getItem('nostr-keys') ?? '[]'
	: '[]';

export type NostrKeys = {
	pub: string
	priv: string
}

const initialValueNostrKeys: NostrKeys[] = JSON.parse(initialValueNostrKeysString);

const nostrKeys = writable<NostrKeys[]>(initialValueNostrKeys);

nostrKeys.subscribe(async (value) => {
	if (browser) {
		let stringValue = JSON.stringify(value);
		if (get(isEncrypted)) {
			if (!stringValue) {
				stringValue = '[]';
			}
			encryptedNostrKeysStore.set(await encryptNostrKeys(stringValue));
			window.localStorage.setItem('nostr-keys', '[]');
		} else {
			window.localStorage.setItem('nostr-keys', stringValue);
			window.localStorage.setItem('encrypted-nostr-keys', '');
		}
	}
});

const initialValueStingNostrMessages: string = browser
	? window.localStorage.getItem('nostr-messages') ?? '[]'
	: '[]';

const initialValueNostrMessage: Array<NostrMessage> = JSON.parse(initialValueStingNostrMessages);

const nostrMessages = writable<Array<NostrMessage>>(initialValueNostrMessage);

nostrMessages.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('nostr-messages', JSON.stringify(value));
	}
});

const initialValueStingNostrRelays: string = browser
	? window.localStorage.getItem('nostr-relays') ??
		'[{"url": "wss://relay.damus.io","isActive":"true"}, {"url": "wss://nostr.einundzwanzig.space/","isActive":"true"}, {"url": "wss://relay.primal.net","isActive":"true"}]'
	: '[{"url": "wss://relay.damus.io","isActive":"true"}, {"url": "wss://nostr.einundzwanzig.space/","isActive":"true"}, {"url": "wss://relay.primal.net","isActive":"true"}]';

const initialValueNostrRelays: Array<NostrRelay> = JSON.parse(initialValueStingNostrRelays);

const nostrRelays = writable<Array<NostrRelay>>(initialValueNostrRelays);

nostrRelays.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('nostr-relays', JSON.stringify(value));
	}
});

const nostrPool = writable<RelayPool>();

const createNewNostrKeys = (privateKey?: string) => {
	let priv
	if (get(seed)) {
		priv = deriveBlindingFactor
		const hdkey = HDKey.fromMasterSeed(get(seed));
		const derivationPath = `m/129372'/0'/0'/${get(nostrKeys).length}/2`;
		const derived = hdkey.derive(derivationPath);
	if (derived.privateKey === null) {
		throw new Error('Could not derive private key');
	}
		priv = derived.privateKey;
	}
	else {
		priv = privateKey ? hexToBytes(privateKey) : schnorr.utils.randomPrivateKey();

	}
	nostrKeys.update((keys) => [ {priv:bytesToHex(priv),  pub: bytesToHex(schnorr.getPublicKey(priv))}, ...keys]);
	restartNostr();
};

const restartNostr = () => {
	if (!get(useNostr)) {
		return;
	}
	if (!get(useExternalNostrKey) && !get(nostrKeys).length) {
		return;
	}
	toast('info', 'Restarting nostr...', 'Setting new nostr keys');
	setTimeout(() => {
		useNostr.update((state) => !state);
		setTimeout(() => {
			useNostr.update((state) => !state);
			toast('success', 'Nostr has restarted', 'Done!');
		}, 500);
	}, 2000);
};

export {
	useNostr,
	nostrMessages,
	nostrPool,
	nostrRelays,
	useExternalNostrKey,
	nostrKeys,
	createNewNostrKeys,
	restartNostr
};
