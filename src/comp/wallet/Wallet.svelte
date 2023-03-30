<script lang="ts">
	import { page } from '$app/stores';
	import { token } from '../../stores/tokens';
	import { mints } from '../../stores/mints';
	import Sending from './Sending.svelte';
	import Receiving from './Receiving.svelte';
	import Tokens from '../tokens/Tokens.svelte';
	import Melting from './Melting.svelte';
	import { onMount } from 'svelte';
	import { getTokensForMint } from '../util/walletUtils';
	import { CashuMint, CashuWallet } from '@cashu/cashu-ts';
	import { toast } from '../../stores/toasts';
	import { pendingTokens } from '../../stores/pendingtokens';
	import ScanLn from '../elements/ScanLN.svelte';
	import { goto } from '$app/navigation';

	let active = 'base';
	let scannedlnInvoice = '';
	let encodedToken = '';

	onMount(async () => {
		if ($page.url.hash) {
			active = 'receive';
			const originalUrl = $page.url.toString();
			const newUrl = originalUrl.split('#')[0];
			encodedToken = $page.url.hash.replace(/^#/, '');
			await goto(newUrl, {
				replaceState: true,
				keepFocus: true,
				noScroll: true
			});
		}

		let isFirst = true;
		let isFirstPending = true;
		$mints.forEach(async (mint) => {
			try {
				const mintTokens = getTokensForMint(mint, $token);
				const mintPendingTokens = getTokensForMint(mint, $pendingTokens);
				if (mintTokens?.length < 1) {
					return;
				}
				const cahsuMint = new CashuMint(mint.mintURL);
				const cashuWallet = new CashuWallet(mint.keys, cahsuMint);
				const spentProofs = await cashuWallet.checkProofsSpent(mintTokens);
				token.update((state) =>
					state.filter((p) => {
						if (!spentProofs.includes(p)) {
							return true;
						}
						if (isFirst) {
							isFirst = false;
							toast(
								'warning',
								'The spent token has been removed from the wallet',
								'Some token in your wallet was already spent.'
							);
						}
						return false;
					})
				);
				const spentPendingProofs = await cashuWallet.checkProofsSpent(mintPendingTokens);
				pendingTokens.update((state) =>
					state.filter((p) => {
						if (!spentPendingProofs.includes(p)) {
							return true;
						}
						if (isFirstPending) {
							isFirstPending = false;
							toast(
								'info',
								'The tokens you have sent are no longer pending',
								'Tokens you have sent have been received.'
							);
						}
						return false;
					})
				);
			} catch (e) {
				console.log(e);
				toast('error', 'Mint: ' + mint.mintURL, 'There was a problem when syncing with a mint.');
			}
		});
	});

	const scanPay = () => {
		active = 'scan';
	};
</script>

{#if active === 'base'}
	<div class="flex flex-col w-full h-full items-center justify-center gap-5">
		<div class="flex items-center justify-center flex-col gap-5 w-full">
			<div class="flex flex-col justify-center items-center">
				<p class="text-8xl">
					{$token.reduce((count, t) => {
						return count + t.amount;
					}, 0) ?? 0}
				</p>
				<p class="text-md">
					(pending
					{$pendingTokens.reduce((count, t) => {
						return count + t.amount;
					}, 0) ?? 0})
				</p>

				<p class="text-4xl">satoshi</p>
			</div>
			{#if $mints.filter((m) => m.isAdded).length === 0}
				<button class="btn btn-warning btn-disabled"
					>You have to be connected to a mint to send and receive Tokens.</button
				>
			{:else}
				<div class="flex flex-col gap-4">
					<div class="flex gap-2">
						<button
							class="btn btn-primary btn-outline flex gap-1 items-center"
							on:click={() => {
								active = 'receive';
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
								/>
							</svg>
							<p>receive</p>
						</button>
						<button
							class="btn btn-primary flex gap-1 items-center"
							on:click={() => {
								active = 'send';
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
								/>
							</svg>
							<p>send</p>
						</button>
					</div>
					<div class="flex gap-1 w-full">
						<button
							class="btn btn-warning flex-grow font-bold text-xl flex gap-1"
							on:click={() => (active = 'melt')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
								/>
							</svg>
							pay</button
						>
						<button class=" btn  btn-square btn-warning" on:click={scanPay}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
								/>
							</svg>
						</button>
					</div>
				</div>
			{/if}
		</div>
		<Tokens />
	</div>
{:else if active === 'receive'}
	<Receiving bind:active {encodedToken} />
{:else if active === 'send'}
	<Sending bind:active />
{:else if active === 'melt'}
	<Melting bind:active bind:invoice={scannedlnInvoice} />
{:else if active === 'scan'}
	<ScanLn bind:active bind:scannedlnInvoice />
{/if}
