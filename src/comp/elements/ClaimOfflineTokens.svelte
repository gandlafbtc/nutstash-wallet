<script lang="ts">
	import { getEncodedToken, type Token } from '@cashu/cashu-ts';
	import { mints } from '../../stores/mints';
	import { unit } from '../../stores/settings';
	import { token } from '../../stores/tokens';
	import {
		formatAmount,
		getAmountForTokenSet,
		getLockedTokens,
		getMintForToken
	} from '../util/walletUtils';
	import { receive } from '../../actions/walletActions';

	let isClaiming = false;
	const claimOffline = async () => {
		try {
			isClaiming = true;
			const lockedProofs = getLockedTokens($token);
			const lockedTokens = lockedProofs.reduce((prev, curr) => {
				const minturl = getMintForToken(curr, $mints)?.mintURL;
				if (!minturl) {
					return [...prev];
				}
				const currentProofsToken = prev.find((t) => t.token[0].mint === minturl);
                if (!currentProofsToken) {
                    const newToken: Token = { token: [{ mint: minturl, proofs: [curr] }] };
                    return [newToken, ...prev];
                }
                else currentProofsToken.token[0].proofs.push(curr)
				return [...prev];
			}, [] as Token[]);
            const receiveToken = async (t:Token) => {
                const mint = getMintForToken(t.token[0].proofs[0], $mints)
                if (!mint) {
                    return
                }
                await receive(mint, getEncodedToken(t))
            }
            await Promise.all(lockedTokens.map(t=>receiveToken(t)))
            console.log(lockedTokens)
		} catch (error) {
		} finally {
			isClaiming = false;
		}
	};
</script>

{#if isClaiming}
	<button class="btn btn-disabled w-full"> </button>
{:else}
	<span class="relative inline-flex">
		<button type="button" class="btn w-full btn-sm" on:click={claimOffline}>
			Claim offline tokens ({formatAmount(getAmountForTokenSet(getLockedTokens($token)), $unit)})
		</button>
		<span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
			<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-error"></span>
			<span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
		</span>
	</span>
{/if}
