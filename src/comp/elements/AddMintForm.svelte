<script lang="ts">
	import { CashuMint } from "@cashu/cashu-ts";
	import { mints } from "../../stores/mints";
	import { toast } from "../../stores/toasts";
	import { validateMintKeys } from "../util/walletUtils";
	import type { Mint } from "../../model/mint";

    let mintURL = '';
	let isLoading = false;

	const addMint = async () => {
		const mint = new CashuMint(mintURL);
		try {
			if ($mints.filter((m) => m.mintURL === mint.mintUrl).length > 0) {
				toast('warning', 'This mint has already been added', "Didn't add mint");
				return;
			}
			isLoading = true;
			const keysets = await mint.getKeySets();
			const keys = await mint.getKeys();

			if (!validateMintKeys(keys)) {
				toast('error', 'The keys from that mint are invalid', 'Mint could not be added');
				return;
			}

			const storeMint: Mint = {
				mintURL: mint.mintUrl,
				keys: keys.keysets,
				keysets: keysets.keysets
			};

			mints.update((state) => [...state, storeMint]);
			toast('success', mint.mintUrl , 'Mint added');
		} catch (e) {
			console.error(e)
			toast(
				'error',
				'Could not load keys from:' + mint.mintUrl + '/keys',
				'Mint not added.'
			);
			throw new Error('Could not add Mint.');
		} finally {
			isLoading = false;
		}
	};
</script>

<form on:submit|preventDefault={addMint}>
    <div class="flex join">
        <input
            autofocus
            id="mint-url-input"
            type="text"
            placeholder="mint URL..."
            bind:value={mintURL}
            class=" join-item input w-full input-primary col-span-4"
        />

        {#if isLoading}
            <button
                class="w-32 btn join-item btn-disabled h-full z-20 flex gap-2 items-center"
            >
            <div class="loading"></div>
            </button>
        {:else}
            <input
                type="submit"
                class="w-32 z-0 btn join-item {mintURL
                    ? 'btn-primary'
                    : 'btn-disabled'} h-full z-20 flex gap-2 items-center"
                value="Add mint"
            />
        {/if}
    </div>
</form>