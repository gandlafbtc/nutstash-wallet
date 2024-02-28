<script lang="ts">
	import { token } from '../../stores/tokens';
	import type { Mint } from '../../model/mint';
	import { mints } from '../../stores/mints';
	import { getAmountForTokenSet, getTokensForMint, getTokensToSend } from '../util/walletUtils';
	import { toast } from '../../stores/toasts';
	import { CashuMint, CashuWallet } from '@cashu/cashu-ts';
	import LoadingCenter from '../LoadingCenter.svelte';
	import * as walletActions from '../../actions/walletActions';
	import MintSelector from '../elements/MintSelector.svelte';
	import TokenIcon from '../tokens/TokenIcon.svelte';

	export let active;
	let swapOutMint: Mint = $mints[1];
	let swapInMint: Mint = $mints[0];
	let swapAmount: number;
	let fees: number;
	let paymentHash: string;
	let invoice: string;
	let isPrepare: boolean;
	let isPerform: boolean;
	let isComplete: boolean;

	const inverseMints = () => {
		const c = swapInMint;
		swapInMint = swapOutMint;
		swapOutMint = c;
	};

	const prepareSwap = async () => {
		if (swapAmount < 1) {
			toast('warning', 'Amount has to be a number larger than 0.', 'Cannot perform swap');
			return;
		}
		const availableTokens = getAmountForTokenSet(getTokensForMint(swapOutMint, $token));
		if (swapAmount > availableTokens) {
			toast('warning', 'Not enough funds to perform this swap', 'Cannot perform swap');
			return;
		}
		try {
			isPrepare = true;
			const cashuSwapInMint = new CashuMint(swapInMint.mintURL);
			const cashuSwapInWallet = new CashuWallet(cashuSwapInMint, swapInMint.keys);

			const { pr, hash } = await cashuSwapInWallet.requestMint(swapAmount);
			paymentHash = hash;
			invoice = pr;
			const cashuSwapOutMint = new CashuMint(swapOutMint.mintURL);
			const cashuSwapOutWallet = new CashuWallet(cashuSwapOutMint, swapInMint.keys);

			const loadedFees = await cashuSwapOutWallet.getFee(pr);
			if (loadedFees + swapAmount > availableTokens) {
				isPrepare = false;
				toast(
					'warning',
					'Swap amount including fee exceed available amount',
					'Cannot perform swap'
				);
				return;
			}
			fees = loadedFees;
			isPrepare = false;
		} catch (e) {
			console.error(e);
			toast('error', 'Swap could not be prepared', 'Error occured when preparing swap');
			isPrepare = false;
		}
	};

	const performSwap = async () => {
		try {
			isPerform = true;
			const cashuSwapInMint = new CashuMint(swapInMint.mintURL);
			const cashuSwapInWallet = new CashuWallet(cashuSwapInMint, swapInMint.keys);

			const proofsToSend = getTokensToSend(
				swapAmount + fees,
				getTokensForMint(swapOutMint, $token)
			);
			const isPaid = await walletActions.melt(swapOutMint, swapAmount, fees, proofsToSend, invoice);

			const { proofs } = await walletActions.mint(swapInMint, swapAmount, paymentHash, invoice);
			toast('success', 'The swap has successfully been completed', 'Swap complete');
			isPerform = false;
			isComplete = true;
		} catch (e) {
			isPerform = false;
			console.error(e);
			toast('error', 'Swap could not be performed', 'Error occured when performing swap');
		}
	};

	const resetState = () => {
		swapAmount = undefined;
		fees = undefined;
		paymentHash = undefined;
		invoice = undefined;
		isPrepare = false;
		isPerform = false;
		isComplete = false;
		active = 'base';
	};
</script>

{#if isComplete}
	<div class="flex w-full h-full flex-col items-center justify-center gap-5">
		<p class="text-lg font-bold text-success">Tokens have been swapped.</p>
		<button class="btn btn-success">
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
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</button>
	</div>
	<div class="modal-action">
		<button class="btn btn-outline" on:click={resetState}>ok</button>
	</div>
{:else}
	<!-- else content here -->
	<div class="flex flex-col gap-2 items-center">
		<p class="text-xl font-bold">Swap sats between mints.</p>
		<p class="text-warning">
			⚠️ For a brief moment, you will be trusting two mints at the same time. There is things that
			can go wrong. Use at own risk.
		</p>
		<div class="flex flex-col gap-2 self-center">
			<div class="lg:join flex flex-col gap-1 lg:gap-0 items-center lg:flex-row">
				<MintSelector bind:mint={swapOutMint} />
				<button
					on:click={inverseMints}
					class="col-span-5 btn btn-active join-item btn-square {fees !== undefined
						? 'btn-disabled'
						: ''}"
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
							d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
						/>
					</svg>
				</button>
				<MintSelector bind:mint={swapInMint} />
			</div>

			<div class="flex justify-between items-center z-0 lg:flex-row flex-col">
				<div class="flex gap-1 items-center">
					<TokenIcon />
					<p class="font-bold">
						{getAmountForTokenSet(getTokensForMint(swapOutMint, $token))}
						sats
					</p>

					<p class="">Available</p>
				</div>
				<div class="flex gap-2 items-start">
					<p class="col-span-2">Will receive:</p>
					<div class="join flex items-center">
						{#if fees !== undefined}
							<div class="flex flex-col gap-1 items-start justify-start">
								<p class="font-bold">{swapAmount} sats</p>
								<div class="flex gap-1 text-sm">
									<p class="font-bold">-{fees} sats</p>
									<p>fee</p>
								</div>
							</div>
						{:else}
							<input
								type="number"
								class="join-item w-32 input-sm col-span-3 input input-primary"
								bind:value={swapAmount}
								on:keydown={(e) => {
									if (e.key === 'Enter') {
										prepareSwap();
									}
								}}
							/>
							<button
								class="btn join-item btn-sm btn-primary {swapAmount
									? ''
									: 'btn-disabled'} {isPrepare ? 'btn-disabled ' : ''}"
								on:click={prepareSwap}
							>
								{#if !isPrepare}
									ok
								{:else}
									<p class="loading loading-spinner" />
								{/if}
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<div class="pt-5" />

		<div class="flex gap-2">
			<button class="btn" on:click={resetState}> cancel </button>

			<button
				class="btn {fees === undefined || isPerform ? 'btn-disabled' : 'btn-primary'} flex gap-2"
				on:click={performSwap}
			>
				{#if isPerform}
					<div class="loading" />
				{:else}
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
							d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
						/>
					</svg>
					<p>Swap</p>
				{/if}
			</button>
		</div>
	</div>
{/if}
