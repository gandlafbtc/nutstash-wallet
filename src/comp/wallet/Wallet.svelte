<script lang="ts">
	import { page } from '$app/stores';
	import { token } from '../../stores/tokens';
	import { mints } from '../../stores/mints';
	import Tokens from '../tokens/Tokens.svelte';
	import { onMount } from 'svelte';
	import { getAmountForTokenSet } from '../util/walletUtils';
	import { pendingTokens } from '../../stores/pendingtokens';
	import { goto } from '$app/navigation';
	import { checkAutomatically, checkNonPending, checkPending, isEncrypted } from '../../stores/settings';
	import { activeTab } from '../../stores/activeTab';
	import Minting from '../mint/Minting.svelte';
	import { isOnboarded } from '../../stores/message';
	import Receive from './Receive.svelte';
	import Send from './Send.svelte';
	import CheckTokens from './CheckTokens.svelte';
	import { key } from '../../stores/key';

	let active = 'base';
	let encodedToken = '';
	let selectedMint = $mints[0];

	onMount(async () => {
		const searchParams = $page.url.searchParams;
		if (searchParams) {
			isOnboarded.set(true);
			const mintUrl = searchParams.get('mint');
			if (mintUrl) {
				$activeTab = 'mint';
			} else if (searchParams.get('token')) {
				isOnboarded.set(true);
				isEncrypted.set(false);
				active = 'receive';
				const originalUrl = $page.url.toString();
				const newUrl = originalUrl.split('?')[0];
				encodedToken = searchParams.get('token') ?? '';
				await goto(newUrl, {
					replaceState: true,
					keepFocus: true,
					noScroll: true
				});
			}
		}
	});

	

	const scanPay = () => {
		active = 'scan';
	};
</script>

{#if active === 'base'}
	<div class="flex flex-col w-full h-full items-center justify-start gap-5">
		<div class="flex items-center justify-center flex-col gap-5 w-full">
			<div class="flex flex-col justify-center items-center">
				<p class="text-8xl">
					{$token.reduce((count, t) => {
						return count + t.amount;
					}, 0) ?? 0}
				</p>
				<div class="flex gap-2 items-center justify-center">
					{#if !$checkAutomatically && ($checkNonPending || $checkPending)}
						<CheckTokens></CheckTokens>
					{/if}
					<p class="text-4xl">sats</p>
				</div>
				<p class="text-md">
					(pending
					{$pendingTokens.reduce((count, t) => {
						return count + t.amount;
					}, 0) ?? 0})
				</p>
			</div>

			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
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
					</button>
					{#if getAmountForTokenSet($token)}
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
					{/if}
				</div>
			</div>
		</div>
		<Tokens />
		{#if $isEncrypted}
		
			 <div class=" h-full flex flex-col justify-end cursor-pointer">
				<div class="tooltip" data-tip="lock wallet">

					<button class="btn btn-square hover:text-info" on:click={()=> {key.set(undefined)}}>
						
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
						<path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z" />
					</svg>
				</button>
			</div>
				  
			 </div>
		{/if}
	</div>
{:else if active === 'receive'}
	<Receive bind:active {encodedToken} />
{:else if active === 'send'}
	<Send bind:active />
{:else if active === 'minting'}
	<Minting bind:active bind:mint={selectedMint} isMinting={false} doMint={false} />
{/if}
