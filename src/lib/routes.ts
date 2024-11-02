import Loading from "./elements/base/Loading.svelte";
import NotFound from "./elements/base/NotFound.svelte";
import MintView from "./elements/mint/MintView.svelte";
import Onboarding from "./elements/onboarding/Onboarding.svelte";
import OnboardingCreate from "./elements/onboarding/OnboardingCreate.svelte";
import OnboardingSelect from "./elements/onboarding/OnboardingSelect.svelte";
import RecommendedMints from "./elements/onboarding/RecommendedMints.svelte";
import RestoreFromFile from "./elements/onboarding/RestoreFromFile.svelte";
import RestoreFromSeed from "./elements/onboarding/RestoreFromSeed.svelte";
import Base from "./elements/wallet/Base.svelte";
import ReceiveCashu from "./elements/wallet/receive/ReceiveCashu.svelte";
import SendCashu from "./elements/wallet/send/SendCashu.svelte";
import SendLn from "./elements/wallet/send/SendLN.svelte";
import WalletHome from "./elements/wallet/WalletHome.svelte";
import MintListView from "./elements/mint/MintListView.svelte";
import MintQuoteListView from "./elements/wallet/receive/ln/MintQuoteListView.svelte";
import MintQuoteItem from "./elements/wallet/receive/ln/MintQuoteItem.svelte";
import Receive from "./elements/wallet/receive/Receive.svelte";
import ReceiveView from "./elements/wallet/receive/ReceiveView.svelte";

export const routes = {
    '/': Loading,

    // Onboarding
    '/onboarding': Onboarding,
    '/onboarding/select': OnboardingSelect,
    '/onboarding/new/quick': OnboardingSelect,
    '/onboarding/new/secure': OnboardingCreate,
    '/onboarding/restore/seed': RestoreFromSeed,
    '/onboarding/restore/file': RestoreFromFile,
    '/onboarding/addMints': RecommendedMints,
    
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
    "/mint/:url": MintView,
    "/mint/": MintListView,
    
    '/receive': ReceiveView,
    
    '/receive/ln': MintQuoteListView,
    '/receive/ln/:quote': MintQuoteItem,
    
    '/receive/cashu': ReceiveCashu,
    '/send/cashu': SendCashu,
    '/send/ln': SendLn,
    '*': NotFound
}