import Loading from './elements/base/Loading.svelte';
import NotFound from './elements/base/NotFound.svelte';
import MintView from './elements/mint/MintView.svelte';
import Onboarding from './elements/onboarding/Onboarding.svelte';
import OnboardingSelect from './elements/onboarding/OnboardingSelect.svelte';
import RestoreFromFile from './elements/onboarding/RestoreFromFile.svelte';
import RestoreFromSeed from './elements/onboarding/RestoreFromSeed.svelte';
import Base from './elements/wallet/Base.svelte';
import ReceiveCashu from './elements/wallet/receive/ecash/ReceiveCashu.svelte';
import SendLn from './elements/wallet/send/ln/SendLN.svelte';
import WalletHome from './elements/wallet/WalletHome.svelte';
import MintListView from './elements/mint/MintListView.svelte';
import MintQuoteListView from './elements/wallet/receive/ln/MintQuoteListView.svelte';
import MintQuoteItem from './elements/wallet/receive/ln/MintQuoteItem.svelte';
import ContactsView from './elements/contacts/ContactsView.svelte';
import EcashView from './elements/data/ecash/EcashView.svelte';
import HistoryView from './elements/data/history/HistoryView.svelte';
import SettingsView from './elements/settings/SettingsView.svelte';
import BackupSettings from './elements/settings/BackupSettings.svelte';
import CurrencySettings from './elements/settings/CurrencySettings.svelte';
import EcashSettings from './elements/settings/EcashSettings.svelte';
import KeysSettings from './elements/settings/KeysSettings.svelte';
import MintsSettings from './elements/settings/MintsSettings.svelte';
import NostrSettings from './elements/settings/NostrSettings.svelte';
import SecuritySettings from './elements/settings/SecuritySettings.svelte';
import TransactionsView from './elements/data/transactions/TransactionsView.svelte';
import TransactionItem from './elements/data/transactions/TransactionItem.svelte';
import EcashDetailView from './elements/data/ecash/EcashDetailView.svelte';
import MeltQuoteItem from './elements/wallet/send/ln/MeltQuoteItem.svelte';
import ChangePassword from './elements/security/ChangePassword.svelte';
import RestoreSeedView from './elements/settings/backup/restore/RestoreSeedView.svelte';
import Scan from './elements/wallet/scanner/Scan.svelte';
import AddressesView from './elements/addresses/AddressesView.svelte';
import Chat from './elements/contacts/chat/Chat.svelte';
import ChatsView from './elements/contacts/chat/ChatsView.svelte';
import ImportContacts from './elements/contacts/ImportContacts.svelte';
import NwcSettings from './elements/settings/NWCSettings.svelte';
import OnboardingPass from './elements/onboarding/OnboardingPass.svelte';
import AddNewContact from './elements/contacts/AddNewContact.svelte';
import DonateView from './elements/Donate/DonateView.svelte';
import ManipulateCounters from './elements/dangerzone/ManipulateCounters.svelte';
import DeleteStuff from './elements/dangerzone/DeleteStuff.svelte';
import ReceiveCashuRequest from './elements/wallet/receive/cashurequest/ReceiveCashuRequest.svelte';
import CashuRequestListView from './elements/wallet/receive/cashurequest/CashuRequestListView.svelte';
import SendToCashuRequest from './elements/wallet/receive/cashurequest/SendToCashuRequest.svelte';
import CashuRequestInput from './elements/wallet/receive/cashurequest/CashuRequestInput.svelte';
import DataListView from './elements/data/DataListView.svelte';
import MintSwap from './elements/mint/MintSwap.svelte';
import ConfirmMintSwap from './elements/mint/ConfirmMintSwap.svelte';
import ProofChecker from './elements/settings/ProofChecker.svelte';
import ReceiveOfflineTokens from './elements/wallet/receive/ReceiveOfflineTokens.svelte';
import SendEcashView from './elements/wallet/send/SendEcashView.svelte';
import SendLnView from './elements/wallet/send/SendLNView.svelte';
import ReceiveLnView from './elements/wallet/receive/ReceiveLNView.svelte';
import ReceiveEcashView from './elements/wallet/receive/ReceiveEcashView.svelte';
import CreateCashuRequestView from './elements/wallet/receive/CreateCashuRequestView.svelte';
import SendLnIvoiceView from './elements/wallet/send/ln/SendLNIvoiceView.svelte';
import MultiNutView from './elements/wallet/send/ln/MultiNutView.svelte';
import OnboardingShowSeed from './elements/onboarding/OnboardingShowSeed.svelte';

export const routes = {
	'/': Loading,

	// Onboarding
	'/onboarding': Onboarding,
	'/onboarding/pass': OnboardingPass,
	'/onboarding/select': OnboardingSelect,
	'/onboarding/new/quick': OnboardingSelect,
	'/onboarding/new/secure': OnboardingShowSeed,
	'/onboarding/restore/seed': RestoreFromSeed,
	'/onboarding/restore/file': RestoreFromFile,

	// wallet routes
	'/wallet/*': Base,
	// Wrapping the Author component
	// '/restore': Onboarding,

	// Catch-all route last
	'*': NotFound
};

export const WALLET_ROUTE_PREFIX = '/wallet';

export const walletRoutes = {
	'/': WalletHome,

	'/donate': DonateView,

	'/mint/:url': MintView,
	'/mint/': MintListView,

	'/contacts': ContactsView,
	'/contacts/add': AddNewContact,
	'/contacts/import': ImportContacts,
	'/contacts/chat': ChatsView,
	'/contacts/chat/:npub': Chat,
	'/address': AddressesView,
	'/ecash': EcashView,
	'/ecash/:type/:secret': EcashDetailView,
	'/history': HistoryView,
	'/scan': Scan,
	"/receiveln": ReceiveLnView,
	"/receiveecash": ReceiveEcashView,
	'/receive-offline-tokens': ReceiveOfflineTokens,
	'/receive/ln': MintQuoteListView,
	'/receive/ln/:quote': MintQuoteItem,
	'/receive/cashu': ReceiveCashu,
	'/receive/cashureq/create': CreateCashuRequestView,
	'/receive/cashureq/': CashuRequestListView,
	'/receive/cashureq/:id': ReceiveCashuRequest,
	'/receive/cashu/:token': ReceiveCashu,

	'/send/requests': CashuRequestListView,
	'/send/cashureq': CashuRequestInput,
	'/send/cashureq/:creq': SendToCashuRequest,

	'/sendecash': SendEcashView,
	'/sendln': SendLnView,
	'/send/cashu': TransactionsView,
	'/send/cashu/:id': TransactionItem,
	'/send/ln': SendLn,
	'/send/ln/multi/:id': MultiNutView,
	'/send/ln/invoice/:invoice': SendLnIvoiceView,
	'/send/ln/:quote': MeltQuoteItem,

	'/data': DataListView,

	'/settings': SettingsView,
	'/settings/backup': BackupSettings,
	'/settings/checkproofs': ProofChecker,
	'/settings/nwc': NwcSettings,
	'/settings/backup/restore': RestoreSeedView,
	'/settings/currency': CurrencySettings,
	'/settings/ecash': EcashSettings,
	'/settings/keys': KeysSettings,
	'/settings/mints': MintsSettings,
	'/settings/mints/swap': MintSwap,
	'/settings/mints/swap/:mintquote': ConfirmMintSwap,
	'/settings/nostr': NostrSettings,
	'/settings/security': SecuritySettings,
	'/settings/security/changepass': ChangePassword,

	//dangerzone
	'/counters': ManipulateCounters,
	'/delete': DeleteStuff,

	'*': NotFound
};
