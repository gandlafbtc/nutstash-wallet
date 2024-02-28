<script lang="ts">
	import { CashuMint, CashuWallet } from '@cashu/cashu-ts';
	import { mints } from '../../stores/mints';
	import { pendingTokens } from '../../stores/pendingtokens';
	import { token } from '../../stores/tokens';
	import { getTokensForMint } from '../util/walletUtils';
	import { checkAutomatically, checkNonPending, checkPending } from '../../stores/settings';
	import { toast } from '../../stores/toasts';
	import { onMount } from 'svelte';
	import { spentTokens } from '../../stores/spenttokens';

	onMount(() => {
		if ($checkAutomatically && ($checkPending || $checkNonPending)) {
			checkTokens();
		}
	});

	let isChecking = false;
	const checkTokens = async () => {
		let isFirst = true;
		let isFirstPending = true;
		$mints.forEach(async (mint) => {
			try {
				isChecking = true;
				const mintTokens = getTokensForMint(mint, $token);
				const mintPendingTokens = getTokensForMint(mint, $pendingTokens);
				if (mintTokens?.length < 1) {
					return;
				}
				const cahsuMint = new CashuMint(mint.mintURL);
				const cashuWallet = new CashuWallet(cahsuMint, mint.keys);

				if ($checkNonPending) {
					const spentProofs = await cashuWallet.checkProofsSpent(mintTokens);
					const beforeChecking = [...$token];
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
					const diff = beforeChecking.filter((p) => !$token.includes(p));
					spentTokens.update((state) => [...diff, ...state]);
				}
				if ($checkPending) {
					const spentPendingProofs = await cashuWallet.checkProofsSpent(mintPendingTokens);
					const beforeChecking = [...$pendingTokens];
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
					const diff = beforeChecking.filter((p) => !$pendingTokens.includes(p));
					spentTokens.update((state) => [...diff, ...state]);
				}
				if (!$checkAutomatically && isFirst && isFirstPending) {
					toast(
						'info',
						` ${$checkNonPending ? 'checked non-pending,' : ''} ${
							$checkPending ? 'checked pending' : ''
						} tokens`,
						'checked Tokens'
					);
				}
			} catch (e) {
				console.log(e);
				toast('error', 'Mint: ' + mint.mintURL, 'There was a problem when syncing with a mint.');
			} finally {
				isChecking = false;
			}
		});
	};
</script>

<button class="btn btn-sm btn-secondary btn-circle" on:click={checkTokens}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-6 h-6 {isChecking ? 'animate-spin' : ''}"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
		/>
	</svg>
</button>
