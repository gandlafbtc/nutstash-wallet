import Loading from "./elements/base/Loading.svelte";
import NotFound from "./elements/base/NotFound.svelte";
import MintView from "./elements/mint/MintView.svelte";
import Onboarding from "./elements/onboarding/Onboarding.svelte";
import OnboardingCreate from "./elements/onboarding/OnboardingCreate.svelte";
import OnboardingSelect from "./elements/onboarding/OnboardingSelect.svelte";
import RestoreFromFile from "./elements/onboarding/RestoreFromFile.svelte";
import RestoreFromSeed from "./elements/onboarding/RestoreFromSeed.svelte";
import Base from "./elements/wallet/Base.svelte";
import ReceiveCashu from "./elements/wallet/receive/ecash/ReceiveCashu.svelte";
import SendLn from "./elements/wallet/send/ln/SendLN.svelte";
import WalletHome from "./elements/wallet/WalletHome.svelte";
import MintListView from "./elements/mint/MintListView.svelte";
import MintQuoteListView from "./elements/wallet/receive/ln/MintQuoteListView.svelte";
import MintQuoteItem from "./elements/wallet/receive/ln/MintQuoteItem.svelte";
import ReceiveView from "./elements/wallet/receive/ReceiveView.svelte";
import ContactsView from "./elements/contacts/ContactsView.svelte";
import EcashView from "./elements/data/ecash/EcashView.svelte";
import HistoryView from "./elements/data/history/HistoryView.svelte";
import SettingsView from "./elements/settings/SettingsView.svelte";
import BackupSettings from "./elements/settings/BackupSettings.svelte";
import CurrencySettings from "./elements/settings/CurrencySettings.svelte";
import EcashSettings from "./elements/settings/EcashSettings.svelte";
import KeysSettings from "./elements/settings/KeysSettings.svelte";
import MintsSettings from "./elements/settings/MintsSettings.svelte";
import NostrSettings from "./elements/settings/NostrSettings.svelte";
import SecuritySettings from "./elements/settings/SecuritySettings.svelte";
import TransactionsView from "./elements/data/transactions/TransactionsView.svelte";
import TransactionItem from "./elements/data/transactions/TransactionItem.svelte";
import EcashDetailView from "./elements/data/ecash/EcashDetailView.svelte";
import MeltQuoteItem from "./elements/wallet/send/ln/MeltQuoteItem.svelte";
import Send from "./elements/wallet/send/Send.svelte";
import ChangePassword from "./elements/security/ChangePassword.svelte";
import RestoreSeedView from "./elements/settings/backup/restore/RestoreSeedView.svelte";
import Scan from "./elements/wallet/scanner/Scan.svelte";
import AddressesView from "./elements/addresses/AddressesView.svelte";
import Chat from "./elements/contacts/chat/Chat.svelte";
import ChatsView from "./elements/contacts/chat/ChatsView.svelte";
import ImportContacts from "./elements/contacts/ImportContacts.svelte";
import NwcSettings from "./elements/settings/NWCSettings.svelte";
import OnboardingPass from "./elements/onboarding/OnboardingPass.svelte";
import SendLnurl from "./elements/wallet/send/ln/SendLNURL.svelte";
import AddNewContact from "./elements/contacts/AddNewContact.svelte";
import DonateView from "./elements/Donate/DonateView.svelte";
import DonatePublic from "./elements/Donate/DonatePublic.svelte";
import DonateAnon from "./elements/Donate/DonateAnon.svelte";
import ManipulateCounters from "./elements/dangerzone/ManipulateCounters.svelte";
import DeleteStuff from "./elements/dangerzone/DeleteStuff.svelte";

export const routes = {
    '/': Loading,

    // Onboarding
    '/onboarding': Onboarding,
    '/onboarding/pass': OnboardingPass,
    '/onboarding/select': OnboardingSelect,
    '/onboarding/new/quick': OnboardingSelect,
    '/onboarding/new/secure': OnboardingCreate,
    '/onboarding/restore/seed': RestoreFromSeed,
    '/onboarding/restore/file': RestoreFromFile,
    
    // wallet routes
    '/wallet/*': Base,
    // Wrapping the Author component
    // '/restore': Onboarding,

    // Catch-all route last
    '*': NotFound,

}

export const WALLET_ROUTE_PREFIX = '/wallet'

export const walletRoutes = {
    '/': WalletHome,

    '/donate':DonateView,
    '/donate/public':DonatePublic,
    '/donate/anon':DonateAnon,

    "/mint/:url": MintView,
    "/mint/": MintListView,
    
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

    '/receive': ReceiveView,
    '/receive/ln': MintQuoteListView,
    '/receive/ln/:quote': MintQuoteItem,
    '/receive/cashu': ReceiveCashu,
    '/receive/cashu/:token': ReceiveCashu,
    
    '/send': Send,
    '/send/cashu': TransactionsView,
    '/send/cashu/:id': TransactionItem,
    '/send/ln': SendLn,
    '/send/lnurl': SendLnurl,
    '/send/ln/:quote': MeltQuoteItem,

    '/settings': SettingsView,
    '/settings/backup': BackupSettings,
    '/settings/nwc': NwcSettings,
    '/settings/backup/restore': RestoreSeedView,
    '/settings/currency': CurrencySettings,
    '/settings/ecash': EcashSettings,
    '/settings/keys': KeysSettings,
    '/settings/mints': MintsSettings,
    '/settings/nostr': NostrSettings,
    '/settings/security': SecuritySettings,
    '/settings/security/changepass': ChangePassword,


    //dangerzone
    '/counters': ManipulateCounters,
    '/delete': DeleteStuff,

    '*': NotFound
}