import { connectNostrRelays } from '$lib/actions/nostr';
import { contactsStore } from '$lib/stores/persistent/contacts';
import { messagesStore } from '$lib/stores/persistent/message';
import { countsStore } from '$lib/stores/persistent/counts';
import { keysStore } from '$lib/stores/persistent/keys';
import { meltQuotesStore } from '$lib/stores/persistent/meltquotes';
import { mintQuotesStore } from '$lib/stores/persistent/mintquotes';
import { mints } from '$lib/stores/persistent/mints';
import { mnemonic } from '$lib/stores/persistent/mnemonic';
import {
	offlineProofsStore,
	pendingProofsStore,
	proofsStore,
	spentProofsStore
} from '$lib/stores/persistent/proofs';
import { transactionsStore } from '$lib/stores/persistent/transactions';
import { relaysStore } from '$lib/stores/persistent/relays';
import { nwcKeysStore } from '$lib/stores/persistent/nwcConnections';
import { nwc } from '$lib/stores/session/nwc';
import { cashuRequestsStore } from '$lib/stores/persistent/requests';
import { settings } from '$lib/stores/persistent/settings';
import { swapsStore } from '$lib/stores/persistent/swap';
import { offlineTransactionsStore } from '$lib/stores/persistent/offlineTransactions';
import { setDefaultOptions } from 'date-fns';
import {
	es,
	fr,
	de,
	enUS,
	ko,
	ja,
	zhCN,
	ptBR,
	it,
	ru,
	nl,
	sv,
	tr,
	ar,
	th,
	vi
} from 'date-fns/locale';
import { getLocale } from '$lib/paraglide/runtime';

export const init = async () => {
	await initStores();
	await initNostrConnections();
	setLanguage();
	nwc.init();
};

const stores = {
	mnemonic,
	mints,
	transactionsStore,
	offlineTransactionsStore,
	mintQuotesStore,
	meltQuotesStore,
	proofsStore,
	offlineProofsStore,
	pendingProofsStore,
	spentProofsStore,
	keysStore,
	nwcKeysStore,
	countsStore,
	messagesStore,
	contactsStore,
	relaysStore,
	cashuRequestsStore,
	swapsStore,
	settings
} as const;

const setLanguage = () => {
	const locale = getLocale() as string;
	console.log(locale);
	switch (locale) {
		case 'es':
			setDefaultOptions({ locale: es });
			break;
		case 'fr':
			setDefaultOptions({ locale: fr });
			break;
		case 'de':
			setDefaultOptions({ locale: de });
			break;
		case 'en':
			setDefaultOptions({ locale: enUS });
			break;
		case 'kr':
			setDefaultOptions({ locale: ko });
			break;
		case 'cn':
			setDefaultOptions({ locale: zhCN });
			break;
		case 'br':
			setDefaultOptions({ locale: ptBR });
			break;
		case 'it':
			setDefaultOptions({ locale: it });
			break;
		case 'ru':
			setDefaultOptions({ locale: ru });
			break;
		case 'nl':
			setDefaultOptions({ locale: nl });
			break;
		case 'sv':
			setDefaultOptions({ locale: sv });
			break;
		case 'tr':
			setDefaultOptions({ locale: tr });
			break;
		case 'sa':
			setDefaultOptions({ locale: ar });
			break;
		case 'th': {
			setDefaultOptions({ locale: th });
		}
		case 'jp':
			setDefaultOptions({ locale: ja });
			break;
		default:
			setDefaultOptions({ locale: enUS });
	}
};
const initNostrConnections = async () => {
	await connectNostrRelays();
};

const initStores = async () => {
	await Promise.all(Object.values(stores).map(store => store.init()));
};

export const reencrypt = async () => {
	await Promise.all(Object.values(stores).map(store => store.reEncrypt()));
};

export const setStoresFromBackupJSON = async (obj: any) => {
	(Object.keys(stores)).forEach(key => {
		stores[key].set(obj[key]);
	});
};
