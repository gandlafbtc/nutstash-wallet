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
import { init as initWallet, connectNostrRelays } from "@gandlaf21/cashu-wallet-engine";
import { nwc } from '$lib/stores/session/nwc';


export const init = async (pass: string) => {
	await initWallet(pass);
	await initNostrConnections();
	setLanguage();
	nwc.init();
};



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


