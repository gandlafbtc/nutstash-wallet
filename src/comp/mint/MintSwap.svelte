<script lang="ts">
	import { token } from '../../stores/tokens';
	import type { Mint } from '../../model/mint';
	import { mints } from '../../stores/mints';
	import { getAmountForTokenSet, getTokensForMint, getTokensToSend } from '../util/walletUtils';
	import { toast } from '../../stores/toasts';
	import { CashuMint, CashuWallet } from '@cashu/cashu-ts';
	import LoadingCenter from '../LoadingCenter.svelte';

	export let active;
	let swapOutMint: Mint;
	let swapInMint: Mint;
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
			const cashuSwapInWallet = new CashuWallet(swapInMint.keys, cashuSwapInMint);

			const { pr, hash } = await cashuSwapInWallet.requestMint(swapAmount);
			paymentHash = hash;
			invoice = pr;
			const cashuSwapOutMint = new CashuMint(swapOutMint.mintURL);
			const cashuSwapOutWallet = new CashuWallet(swapOutMint.keys, cashuSwapOutMint);

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
			const cashuSwapInWallet = new CashuWallet(swapInMint.keys, cashuSwapInMint);

			const cashuSwapOutMint = new CashuMint(swapOutMint.mintURL);
			const cashuSwapOutWallet = new CashuWallet(swapOutMint.keys, cashuSwapOutMint);

			const proofsToSend = getTokensToSend(
				swapAmount + fees,
				getTokensForMint(swapOutMint, $token)
			);

			const { returnChange, send } = await cashuSwapOutWallet.send(swapAmount + fees, proofsToSend);

			console.log(send);
			// remove sent tokens from storage
			token.update((state) => {
				return state.filter((token) => !proofsToSend.includes(token));
			});
			if (returnChange) {
				token.update((state) => [...returnChange, ...state]);
			}
			const { isPaid, preimage } = await cashuSwapOutWallet.payLnInvoice(invoice, send);

			if (!isPaid) {
				token.update((state) => [...send, ...state]);
				isPerform = false;

				toast(
					'error',
					'Something went wrong. Please try again',
					'Error occured when performing swap'
				);
				return;
			}

			const newProofs = await cashuSwapInWallet.requestTokens(swapAmount, paymentHash);
			token.update((state) => [...newProofs, ...state]);
			toast('success', 'The swap has successfully been completed', 'Swap complete');
			isPerform = false;
			isComplete = true;
			//todo history
		} catch (e) {
			isPerform = false;
			console.error(e);
			toast('error', 'Swap could not be performed', 'Error occured when performing swap');
		}
	};

	const resetState = () => {
		swapOutMint = undefined;
		swapInMint = undefined;
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
	<!-- content here -->

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
	<div class="flex flex-col gap-2">
		<p class="text-xl font-bold">Inter-Mint Swap</p>
		<p class="">Swap tokens from one mint for tokens from another mint.</p>
		<p class="">
			⚠️ For a brief moment, you will be trusting two mints at the same time. There is things that
			can go wrong. Use at own risk.
		</p>
		<div class="grid grid-cols-5 items-center gap-4">
			<div class="col-span-2">
				<label for="mint-send-dropdown">
					<p class="font-bold">Swap-Out Mint:</p>
				</label>
			</div>
			<div class="dropdown col-span-3" id="mint-swapOut-dropdown">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label
					tabindex="0"
					class="btn {fees !== undefined
						? 'btn-disabled'
						: ''} max-w-[12em] md:max-w-[20em] lg:max-w-[14em] xl:max-w-[20em]"
				>
					<p class="truncate max-w-xs text-xs">
						{swapOutMint?.mintURL ?? 'choose a mint'}
					</p>
				</label>

				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48 md:w-72 max-h-56 overflow-scroll flex-row scrollbar-hide"
				>
					{#each $mints.filter((m) => m.isAdded && m != swapInMint) as m}
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li on:click={() => (swapOutMint = m)}><a>{m.mintURL}</a></li>
					{/each}
				</ul>
			</div>
			<button
				on:click={inverseMints}
				class="col-span-5 btn btn-circle {fees !== undefined ? 'btn-disabled' : ''}"
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
						d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
					/>
				</svg>
			</button>
			<div class="col-span-2">
				<label for="mint-send-dropdown">
					<p class="font-bold">Swap-In Mint:</p>
				</label>
			</div>
			<div class="dropdown" id="mint-swapIn-dropdown">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label
					tabindex="0"
					class="btn {fees !== undefined
						? 'btn-disabled'
						: ''} max-w-[12em] md:max-w-[20em] lg:max-w-[14em] xl:max-w-[20em]"
				>
					<p class="truncate max-w-xs text-xs">
						{swapInMint?.mintURL ?? 'choose a mint'}
					</p>
				</label>

				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48 md:w-72 max-h-56 overflow-scroll flex-row scrollbar-hide"
				>
					{#each $mints.filter((m) => m.isAdded && m != swapOutMint) as m}
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li on:click={() => (swapInMint = m)}><a>{m.mintURL}</a></li>
					{/each}
				</ul>
			</div>
		</div>
		{#if swapInMint && swapOutMint}
			<div class="grid grid-cols-5 gap-2 items-center pt-5">
				<p class="col-span-2">Available:</p>
				<p class="col-span-3">
					{getAmountForTokenSet(getTokensForMint(swapOutMint, $token))}
				</p>
				<p class="col-span-2">Amount to swap:</p>
				<input
					type="number"
					class="col-span-3 input {fees !== undefined ? 'btn-disabled' : 'input-primary'}"
					bind:value={swapAmount}
				/>

				<p class="col-span-2">{fees !== undefined ? 'Fees:' : 'Prepare Swap:'}</p>
				<div class="col-span-3">
					{#if isPrepare}
						<div class="flex justify-start w-min">
							<LoadingCenter />
						</div>
					{:else}
						<!-- else content here -->
						{#if fees !== undefined}
							<p>{fees}</p>
						{:else}
							<button
								class="btn btn-primary {swapAmount ? '' : 'btn-disabled'}"
								on:click={prepareSwap}
							>
								Confirm Amount
							</button>
						{/if}
					{/if}
				</div>
				{#if fees !== undefined}
					<div class="col-span-5 divider m-1" />
					<p class="col-span-2 font-bold">Total:</p>
					<p class="col-span-3 font-bold">{swapAmount + fees}</p>
				{/if}
			</div>
		{/if}

		<div class="pt-5" />

		<div class="flex gap-2">
			<button class="btn" on:click={resetState}> cancel </button>
			{#if isPerform}
				<div>
					<LoadingCenter />
				</div>
			{:else}
				<button
					class="btn {fees !== undefined ? 'btn-primary' : 'btn-disabled'} flex gap-2"
					on:click={performSwap}
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
					<p>Swap</p>
				</button>
			{/if}
		</div>
	</div>
{/if}
