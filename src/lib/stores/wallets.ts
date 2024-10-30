import { get, writable } from 'svelte/store';
import { CashuMint, CashuWallet } from '@cashu/cashu-ts';
import { mints } from './mints';



const createCashuWalletsStore = () => {
    const store = writable<Array<CashuWallet>>([])
    const { subscribe, set, update } = store;

    const initWallets = async (mintUrls: string[]) => {
        const wallets: CashuWallet[] = []
        for (const mintUrl of mintUrls) {
            const wallet = new CashuWallet(new CashuMint(mintUrl));
            await wallet.loadMint()
            mints.updateOne({
                info: wallet.mintInfo,
                keys: wallet.keys,
                keysets: wallet.keysets,
                mintURL: wallet.mint.mintUrl,
            })
            wallets.push(wallet)
        };
        set(wallets);
    }

    const createWallet = async (mintUrl: string) => {
        const wallet = new CashuWallet(new CashuMint(mintUrl));
        await wallet.loadMint()
        mints.add({
            info: wallet.mintInfo,
            keys: wallet.keys,
            keysets: wallet.keysets,
            mintURL: wallet.mint.mintUrl,
        })
        update(context => [wallet, ...context]);
        return wallet
    };

    const remove = (mintUrl: string) => {
        update(context => {
            const wallet = context.filter(w => w.mint.mintUrl !== mintUrl);
            if (wallet) {
                mints.remove(mintUrl);
            }
            return context
        });
    }

    const getByUrl = (mintUrl: string) => {
        return get(store).find(w => w.mint.mintUrl === mintUrl);
    }

    return { subscribe, set, update, initWallets, createWallet, remove, getByUrl }
}

export const cashuWallets = createCashuWalletsStore();
