<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { LoaderCircle, Send } from 'lucide-svelte';
	import MintSelector from '$lib/elements/ui/MintSelector.svelte';
	import { mints } from '$lib/stores/persistent/mints';
	import UnitSelector from '$lib/elements/ui/UnitSelector.svelte';
	import { unit } from '$lib/stores/persistent/settings';
	import Input from '$lib/components/ui/input/input.svelte';
	import { formatAmount, getAmountForTokenSet, getProofsOfMintUnit } from '$lib/util/walletUtils';
	import { sendEcash } from '$lib/actions/actions';
	import { getEncodedTokenV4, type Token } from '@cashu/cashu-ts';
	import { proofsStore } from '$lib/stores/persistent/proofs';
	import { toast } from 'svelte-sonner';
	import AddMint from '$lib/elements/mint/AddMint.svelte';
	import { ensureError } from '$lib/helpers/errors';

	let {
		sendCallback,
		to,
		mint = $mints[0],
		currentUnit = $unit,
		amount = 0,
		mintSelectDisabled = false,
		unitSelectDisabled = false
	} = $props();
	let isLoading = $state(false);
	let balance = $derived(getProofsOfMintUnit(mint, $proofsStore, currentUnit));

	const send = async () => {
		try {
			isLoading = true;
			if (!mint) {
				toast.warning('Wallet has no mint');
				return;
			}
			if (amount > getAmountForTokenSet(balance)) {
				toast.warning('Insufficient balance');
				return;
			}
			if (amount < 1) {
				toast.warning('Amount must be greater than 0');
				return;
			}
			isLoading = true;
			console.log('mint', mint);
			const { send } = await sendEcash(mint.url, amount, { unit: currentUnit, includeFees: false });
			const token: Token = {
				proofs: send,
				unit: currentUnit,
				mint: mint.url
			};
			sendCallback(token);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex flex-col gap-4">
	{#if !mint}
		<p class="text-destructive">No mint added to wallet! add a mint first:</p>
		<AddMint></AddMint>
	{:else}
		<MintSelector bind:mint disabled={mintSelectDisabled}></MintSelector>
		<div class="flex items-center justify-between gap-2">
			{formatAmount(getAmountForTokenSet(balance), currentUnit)} available
			<UnitSelector bind:currentUnit selectedMints={[mint]} disabled={unitSelectDisabled}
			></UnitSelector>
		</div>
		<Input type="number" bind:value={amount}></Input>
		<div class="flex flex-col gap-2">
			<p>
				send {formatAmount(amount, currentUnit)} to
			</p>
			<p class="w-72 overflow-clip text-ellipsis">
				{to}
			</p>
		</div>
	{/if}
	<Button onclick={send} disabled={isLoading || getAmountForTokenSet(balance) < amount}>
		{#if isLoading}
			<LoaderCircle class="animate-spin"></LoaderCircle>
		{:else}
			<Send></Send>
		{/if}
		Send
	</Button>
</div>
