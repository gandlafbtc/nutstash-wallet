<script lang="ts">
	import { token } from '../../stores/tokens';
	import { mints } from '../../stores/mints';
	import Tokens from '../tokens/Tokens.svelte';
	import { onMount } from 'svelte';
	import { formatAmount, getAmountForTokenSet, getLockedTokens } from '../util/walletUtils';
	import { pendingTokens } from '../../stores/pendingtokens';
	import {
		checkAutomatically,
		checkNonPending,
		checkPending,
		isEncrypted,
		unit
	} from '../../stores/settings';
	import Minting from '../mint/Minting.svelte';
	import Receive from './Receive.svelte';
	import Send from './Send.svelte';
	import CheckTokens from './CheckTokens.svelte';
	import { showShortCuts } from '../../stores/showShortCuts';
	import WalletLock from '../elements/WalletLock.svelte';
	import ClaimOfflineTokens from '../elements/ClaimOfflineTokens.svelte';

	let active = 'base';
	let encodedToken = '';
	let selectedMint = $mints[0];

	onMount(() => {
		const keyDown = (e: KeyboardEvent) => {
			if (e.key === 'R') {
				active = 'receive';
			} else if (e.key === 'S') {
				if ($mints.length) {
					active = 'send';
				}
			} else if (e.key === 'B') {
				active = 'base';
			}
		};
		window.addEventListener('keydown', keyDown);

		return () => {
			// this function is called when the component is destroyed
			window.removeEventListener('keydown', keyDown);
		};
	});

	onMount(async () => {
		// const searchParams = $page.url.searchParams;
		// if (searchParams) {
		// 	isOnboarded.set(true);
		// 	const mintUrl = searchParams.get('mint');
		// 	if (mintUrl) {
		// 		$activeTab = 'mint';
		// 	} else if (searchParams.get('token')) {
		// 		isOnboarded.set(true);
		// 		isEncrypted.set(false);
		// 		active = 'receive';
		// 		const originalUrl = $page.url.toString();
		// 		const newUrl = originalUrl.split('?')[0];
		// 		encodedToken = searchParams.get('token') ?? '';
		// 		await goto(newUrl, {
		// 			replaceState: true,
		// 			keepFocus: true,
		// 			noScroll: true
		// 		});
		// 	}
		// }
	});
</script>

{#if active === 'base'}
	<div class="flex flex-col w-full h-full items-center justify-start gap-5">
		<div class="flex items-center justify-center flex-col gap-5 w-full">
			<div class="flex flex-col justify-center items-center">
				<p class="text-8xl">
					{formatAmount(getAmountForTokenSet($token), $unit, false)}
				</p>
				<div class="flex gap-2 items-center justify-center">
					<p class="text-4xl">sats</p>
				</div>
				<p class="text-md pb-2">
					(Pending
					{formatAmount(getAmountForTokenSet($pendingTokens), $unit, false)})
				</p>
				{#if !$checkAutomatically && ($checkNonPending || $checkPending)}
					<CheckTokens></CheckTokens>
				{/if}
			</div>

			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-5 w-64 py-5">
					<button
						class="btn btn-secondary flex gap-1 items-center"
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
						<div class="relative">
							{#if $showShortCuts}
								<kbd class="absolute kbd text-neutral-content">R</kbd>
							{/if}
						</div>
					</button>
					{#if getAmountForTokenSet($token) && $mints.length}
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
							<div class="relative">
								{#if $showShortCuts}
									<kbd class="absolute kbd text-neutral-content">S</kbd>
								{/if}
							</div>
						</button>
					{/if}

					{#if getLockedTokens($token).length}
						<ClaimOfflineTokens></ClaimOfflineTokens>
					{/if}
				</div>
			</div>
		</div>
		<Tokens />
		{#if $isEncrypted}
			<WalletLock></WalletLock>
		{/if}
		<p class="scale-75 hidden lg:block">
			Press <kbd class="kbd kbd-sm">shift</kbd> to show shortcuts.
		</p>
	</div>
{:else if active === 'receive'}
	<Receive bind:active {encodedToken} />
{:else if active === 'send'}
	<Send bind:active />
{:else if active === 'minting'}
	<Minting bind:active bind:mint={selectedMint} isMinting={false} doMint={false} />
{/if}
