<script lang="ts">
	import { mints } from '../../stores/mints';
	import type { Mint } from '../../model/mint';
	import { token } from '../../stores/tokens';
	import { getAmountForTokenSet, getTokensForMint } from '../util/walletUtils';
	import TokenIcon from '../tokens/TokenIcon.svelte';
	import { toast } from '../../stores/toasts';
	import { CashuMint } from '@cashu/cashu-ts';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	export let mintIndex: number;
	export let mint: Mint;
	export let activeMint;
	export let active;

	let isReloadingKeys = false;

	const removeMint = () => {
		if (browser) {
			// @ts-expect-error
			document.getElementById('remove-mint-modal-' + mintIndex).checked = false;
		}
		const allMints = $mints;
		allMints.splice(mintIndex, 1);
		mints.set(allMints);
	};

	const makeDefaultMint = () => {
		if (mintIndex === 0) {
			return;
		}
		const allMints = $mints;
		allMints.splice(mintIndex, 1);
		mints.set([mint, ...allMints]);
		toast('info', mint.mintURL + ' is now the default mint', 'Default mint updated');
	};

	const reloadKeys = async () => {
		const cashuMint = new CashuMint(mint.mintURL);
		try {
			isReloadingKeys = true;

			const mintsClone = [...$mints];
			let keys = await cashuMint.getKeys();
			mintsClone[mintIndex].keys = keys;
			let keysets = await cashuMint.getKeySets();
			mintsClone[mintIndex].keysets = keysets.keysets;
			mints.set(mintsClone);
			toast('success', 'Mint keys have been updated', 'Done');
		} catch (error) {
			console.log(error);
			toast('error', 'Could not update mint keys', 'Error when loading keys');
		} finally {
			isReloadingKeys = false;
		}
	};

	const copyShareLink = () => {
		const text = encodeURI($page.url.host + '/?mint=' + mint.mintURL);
		if (browser) {
			if (window.clipboardData && window.clipboardData.setData) {
				return window.clipboardData.setData('Text', text);
			} else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
				var textarea = document.createElement('textarea');
				textarea.textContent = text;
				textarea.style.position = 'fixed';
				document.body.appendChild(textarea);
				textarea.select();
				try {
					return document.execCommand('copy');
				} catch (ex) {
					console.warn('Copy to clipboard failed.', ex);
					return prompt('Copy to clipboard: Ctrl+C, Enter', text);
				} finally {
					document.body.removeChild(textarea);
					toast(
						'info',
						`Sharable link for ...${mint.mintURL.substring(
							mint.mintURL.length - 10,
							mint.mintURL.length
						)} has been copied to clipboard`,
						'Copied!'
					);
				}
			}
		}
	};
</script>

<tr class="hover">
	<td class="overflow-clip xl:max-w-xs max-w-0">
		<div class="flex gap-1 items-center">
			<button class="cursor-pointer" on:click={makeDefaultMint}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4 {mintIndex === 0 ? 'text-info' : 'text-gray-300'}"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
					/>
				</svg>
			</button>
			<p class="overflow-scroll scrollbar-hide">
				{mint.mintURL}
			</p>
		</div>
	</td>
	<td class="flex flex-col gap-2">
		<button
			class="btn btn-success w-16 btn-sm"
			on:click={() => {
				activeMint = mint;
				active = 'minting';
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-4 h-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
				/>
			</svg>
			mint</button
		>
		<div class="flex justify-around">
			<button class="btn btn-xs btn-square" on:click={reloadKeys}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4 {isReloadingKeys ? 'animate-spin' : ''}"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
					/>
				</svg>
			</button>
			<button class="btn btn-xs btn-square" on:click={copyShareLink}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
					/>
				</svg>
			</button>
		</div>
	</td>

	<td>
		<div class="overflow-clip lg:max-w-xs max-w-[2em] flex flex-col lg:flex-row items-center">
			<div class="flex gap-2 items-center overflow-scroll scrollbar-hide">
				{getAmountForTokenSet(getTokensForMint(mint, $token))}
			</div>
			<TokenIcon />
		</div>
	</td>
	<td>
		<button
			class="btn btn-square btn-sm btn-error"
			on:click={() => {
				if (browser) {
					// @ts-expect-error
					document.getElementById('remove-mint-modal-' + mintIndex).checked = true;
				}
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-4 h-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
				/>
			</svg>
		</button>
	</td>
</tr>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="remove-mint-modal-{mintIndex}" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Remove Mint</h3>
		<p class="overflow-clip text-ellipsis">
			{mint.mintURL}
		</p>
		<p class="py-4">
			Are you sure you want to remove this mint? You will keep the tokens associated with the mint,
			but you will not be able to redeem them until you re-add the mint.
		</p>
		<div class="modal-action">
			<label for="remove-mint-modal-{mintIndex}" class="btn btn-outline">cancel</label>
			<button on:click={removeMint} class="btn btn-error">Delete</button>
		</div>
	</div>
</div>
