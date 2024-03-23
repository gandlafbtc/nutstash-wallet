<script lang="ts">
	import { mints } from '../../stores/mints';
	import type { Mint } from '../../model/mint';
	import { token } from '../../stores/tokens';
	import { getAmountForTokenSet, getTokensForMint } from '../util/walletUtils';
	import TokenIcon from '../tokens/TokenIcon.svelte';
	import { toast } from '../../stores/toasts';
	import { CashuMint } from '@cashu/cashu-ts';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Pinger from '../elements/Pinger.svelte';

	export let mintIndex: number;
	export let mint: Mint;
	export let activeMint;
	export let active;
	const cashuMint = new CashuMint(mint.mintURL);

	let isShowDetails = false;

	// const mintInfo = Promise.resolve({
	// 	name: 'cashme',
	// 	version: 'LNbitsCashu/0.4.5',
	// 	description: 'The mint is shutting down on March 20th 2024. Please withdraw all sats.',
	// 	description_long: '',
	// 	nuts: {
	// 		'4': { methods: [['bolt11', 'sat']], disabled: true },
	// 		'5': {
	// 			methods: [
	// 				['bolt11', 'sat'],
	// 				['bolt11', 'usd']
	// 			],
	// 			disabled: false
	// 		},
	// 		'7': { supported: true },
	// 		'8': { supported: true },
	// 		'9': { supported: true },
	// 		'10': { supported: true },
	// 		'11': { supported: true },
	// 		'12': { supported: true }
	// 	},
	// 	motd: 'mint shutdown: 20. March 2024. WITHDRAW YOUR SATS!'
	// });
	const mintInfo = cashuMint.getInfo();

	mintInfo
		.then((v) => {
			mint.info = v;
			mint = mint;
		})
		.catch((e) => {
			mint.info.motd = 'offline';
		});

	let isReloadingKeys = false;
	let isEdit = false;

	onMount(async () => {});

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
			mintsClone[mintIndex].keys = keys.keysets;
			let keysets = await cashuMint.getKeySets();
			mintsClone[mintIndex].keysets = keysets.keysets;
			mints.set(mintsClone);
			toast('success', 'Mint keys have been updated', 'Done');
		} catch (error) {
			toast('error', 'Could not update mint keys', 'Error when loading keys');
		} finally {
			isReloadingKeys = false;
		}
	};

	const copyShareLink = () => {
		const text = encodeURI('https://wallet.nutstash.app' + '/?mint=' + mint.mintURL);
		if (browser) {
			if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
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

<div class="bg-base-300 rounded-md flex flex-col">
	<div class="flex w-full bg-base-200 p-2 justify-between rounded-md gap-2 items-center">
		<div class="flex gap-2 items-center">
			<div class="flex gap-2 items-center">
				<div class="relative">
					<button class="btn-outline btn-square btn btn-sm" on:click={() => (isEdit = true)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="w-6 h-6"
						>
							<path
								fill-rule="evenodd"
								d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
					{#if isEdit}
						<button
							class="z-10 absolute top-0 left-0 w-screen h-screen"
							on:click={() => (isEdit = false)}
						/>
						<div class="z-20 absolute bg-base-300 bg-opacity-100 w-44 rounded-md -top-0">
							<div class="flex flex-col">
								<div class="flex items-center justify-start border-b-[0.5px] border-base-100 p-2">
									<button
										on:click={() => (isEdit = false)}
										class="p-1 rounded-full hover:bg-base-100"
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
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
									<p class="font-bold text-sm">Mint actions</p>
								</div>
								<button
									class="gap-1 flex items-center justify-start border-b-[0.5px] border-base-100 p-2 hover:text-secondary"
									on:click={() => {
										makeDefaultMint();
										isEdit = false;
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
										/>
									</svg>
									<p class="font-bold">Make default</p>
								</button>
								<button
									class="gap-1 flex items-center justify-start border-b-[0.5px] border-base-100 p-2 hover:text-secondary"
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
										class="w-5 h-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
										/>
									</svg>
									<p class="font-bold">Mint ecash</p>
								</button>
								<button
									class="gap-1 flex items-center justify-start border-b-[0.5px] border-base-100 p-2 hover:text-secondary"
									on:click={reloadKeys}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5 {isReloadingKeys ? 'animate-spin' : ''}"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
										/>
									</svg>
									<p class="font-bold">Update keys</p>
								</button>

								<button
									class="gap-1 flex items-center justify-start border-b-[0.5px] border-base-100 p-2 hover:text-secondary"
									on:click={() => {
										copyShareLink();
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-5 h-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
										/>
									</svg>

									<p class="font-bold">Share link</p>
								</button>
								<button
									class="gap-1 text-error flex items-center justify-start border-b-[0.5px] border-base-100 p-2"
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
										class="w-5 h-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										/>
									</svg>
									<p class="font-bold">Delete</p>
								</button>
							</div>
						</div>
					{/if}
				</div>
			</div>
			<p class="font-bold max-w-40 overflow-clip text-ellipsis lg:max-w-full flex-grow">
				{mint.mintURL}
			</p>
			<div class="btn btn-disabled btn-square btn-xs flex-shrink">
				{#if mint.info?.motd !== 'offline'}
					{#if mint.info?.nuts[4].disabled || mint.info?.nuts[5].disabled}
						<span class="relative flex h-2 w-2">
							<span
								class="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"
							></span>
							<span class="relative inline-flex rounded-full h-2 w-2 bg-warning"></span>
						</span>
					{:else}
						<span class="relative flex h-2 w-2">
							<span
								class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"
							></span>
							<span class="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
						</span>
					{/if}
				{:else}
					<span class="relative flex h-2 w-2">
						<span
							class="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"
						></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
					</span>
				{/if}
			</div>
		</div>
		<div class="flex items-center justify-end flex-shrink">
			<button
				class="btn btn-square btn-sm btn-ghost"
				on:click={() => (isShowDetails = !isShowDetails)}
			>
				{#if isShowDetails}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-6 h-6"
					>
						<path
							fill-rule="evenodd"
							d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
							clip-rule="evenodd"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-6 h-6"
					>
						<path
							fill-rule="evenodd"
							d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>
	<div class="flex justify-between items-start">
		{#if mint.info?.motd}
			<button
				class="gap-2 items-center px-3 {mint.info?.motd === 'offline'
					? 'bg-error text-error-content'
					: 'bg-info text-info-content'} h-6 w-full opacity-65 rounded-b-lg overflow-clip break-keep text-ellipsis"
			>
				{mint.info?.motd}
			</button>
		{:else}
			<div></div>
		{/if}
		<div class="flex gap-2 items-center w-min px-3 bg-neutral rounded-b-lg">
			<div>
				<TokenIcon />
			</div>
			<p class="flex-grow">
				<span class="font-bold">
					{getAmountForTokenSet(getTokensForMint(mint, $token))}
				</span>
			</p>
		</div>
	</div>
	<div class="px-2 pb-4 flex flex-col items-center gap-2" class:hidden={!isShowDetails}>
		<div class="flex items-center justify-center flex-shrink">
			<div class="flex flex-col w-full items-center">
				<p
					class="text-2xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
				>
					{mint.info?.name}
				</p>
				<p class="text-neutral">
					{mint.info?.version}
				</p>
				{#if mintIndex === 0}
					<div class="text-sm rounded-full px-2 py-1 bg-gradient-to-r from-primary to-secondary">
						Default mint
					</div>
				{/if}
			</div>
		</div>
		<div class="divider text-neutral">Services</div>
		<div class="w-full flex items-start justify-center gap-2">
			<div class="flex gap-2 justify-center py-2 px-3 bg-base-200 rounded-lg flex-col items-start">
				<div class="flex items-center gap-2 justify-center">
					<p class="font-bold">Peg-in</p>
					{#if !mint.info?.nuts[4].disabled}
						<Pinger colorClass="success"></Pinger>
					{:else}
						<Pinger colorClass="error"></Pinger>
					{/if}
				</div>
				{#if !mint.info?.nuts[4].disabled}
					{#each mint.info?.nuts[4].methods ?? [] as method}
						<div class="text-xs flex gap-1 join">
							<p class="flex items-center gap-1 join-item bg-primary p-1 bg-opacity-35">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-5 h-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m9 7.5 3 4.5m0 0 3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								{method[1]}
							</p>
							<p class="flex items-center gap-1 join-item bg-secondary p-1 bg-opacity-35">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-5 h-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
									/>
								</svg>
								{method[0]}
							</p>
						</div>
					{/each}
				{/if}
			</div>
			<div class="flex flex-col gap-2 justify-center items-start py-2 px-3 bg-base-200 rounded-lg">
				<div class="flex items-center gap-2 justify-center">
					<p class="font-bold">Peg-out</p>
					{#if !mint.info?.nuts[5].disabled}
						<Pinger colorClass="success"></Pinger>
					{:else}
						<Pinger colorClass="error"></Pinger>
					{/if}
				</div>
				{#if !mint.info?.nuts[5].disabled}
					{#each mint.info?.nuts[5].methods ?? [] as method}
						<div class="text-xs flex gap-1 join">
							<p class="flex items-center gap-1 join-item bg-primary p-1 bg-opacity-35">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-5 h-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m9 7.5 3 4.5m0 0 3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>

								{method[1]}
							</p>
							<p class="flex items-center gap-1 join-item bg-secondary p-1 bg-opacity-35">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-5 h-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
									/>
								</svg>

								{method[0]}
							</p>
						</div>
					{/each}
				{/if}
			</div>
		</div>
		<div class="w-full flex items-center justify-center gap-2">
			<div class="text-xs flex flex-col gap-1"></div>
		</div>
		<div class="divider text-neutral">Features</div>

		<div class="w-full flex gap-2 items-center justify-center flex-wrap">
			<div
				class="flex gap-2 justify-center items-center text-sm py-1 px-2 rounded-full bg-base-200"
			>
				<p>Check-state</p>
				{#if mint.info?.nuts[7].supported}
					<Pinger colorClass="success"></Pinger>
				{:else}
					<Pinger colorClass="error"></Pinger>
				{/if}
			</div>
			<div
				class="flex gap-2 justify-center items-center text-sm py-1 px-2 rounded-full bg-base-200"
			>
				<p>Fee-return</p>
				{#if mint.info?.nuts[8].supported}
					<Pinger colorClass="success"></Pinger>
				{:else}
					<Pinger colorClass="error"></Pinger>
				{/if}
			</div>
			<div
				class="flex gap-2 justify-center items-center text-sm py-1 px-2 rounded-full bg-base-200"
			>
				<p>Restore</p>
				{#if mint.info?.nuts[9].supported}
					<Pinger colorClass="success"></Pinger>
				{:else}
					<Pinger colorClass="error"></Pinger>
				{/if}
			</div>
			<div
				class="flex gap-2 justify-center items-center text-sm py-1 px-2 rounded-full bg-base-200"
			>
				<p>Script</p>
				{#if mint.info?.nuts[10].supported}
					<Pinger colorClass="success"></Pinger>
				{:else}
					<Pinger colorClass="error"></Pinger>
				{/if}
			</div>
			<div
				class="flex gap-2 justify-center items-center text-sm py-1 px-2 rounded-full bg-base-200"
			>
				<p>P2PK</p>
				{#if mint.info?.nuts[11].supported}
					<Pinger colorClass="success"></Pinger>
				{:else}
					<Pinger colorClass="error"></Pinger>
				{/if}
			</div>
			<div
				class="flex gap-2 justify-center items-center text-sm py-1 px-2 rounded-full bg-base-200"
			>
				<p>DLEQ</p>
				{#if mint.info?.nuts[12].supported}
					<Pinger colorClass="success"></Pinger>
				{:else}
					<Pinger colorClass="error"></Pinger>
				{/if}
			</div>
		</div>
		<div class="divider text-neutral">Description</div>
		<div>
			<p class="pt-2">
				{mint.info?.description}
			</p>
		</div>
	</div>
</div>

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
			<label for="remove-mint-modal-{mintIndex}" class="btn btn-outline">Cancel</label>
			<button on:click={removeMint} class="btn btn-error">Delete</button>
		</div>
	</div>
</div>
