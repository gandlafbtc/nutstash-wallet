import { writable } from 'svelte/store';

export type DiscoveredMint = {
	url: string;
	reviews: number;
};

const createDiscoveredMintsStore = () => {
	const store = writable<DiscoveredMint[]>([]);

	const add = (url: string) => {
		store.update((mints) => {
			const existingMint = mints.find((m) => m.url === url);
			if (!existingMint) {
				mints = [...mints, { url, reviews: 1 }];
			} else {
				existingMint.reviews++;
			}
			mints.sort((a, b) => b.reviews - a.reviews);
			return mints;
		});
	};

	return { ...store, add };
};

export const discoveredMints = createDiscoveredMintsStore();
