<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Banknote, LoaderCircle, Send } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
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
	import type { Mint } from '$lib/db/models/types';
	import AddMint from '$lib/elements/mint/AddMint.svelte';
	import { ensureError } from '$lib/helpers/errors';
	import { no_mint_found, t_available, t_cancel, t_send, t_to } from '$lib/paraglide/messages';

	let sendEcashOpen = $state(false);

	let { sendCallback, to } = $props();
	let isLoading = $state(false);
	let mint: Mint | undefined = $state($mints[0]);
	let currentUnit = $state($unit);
	let balance = $derived(getProofsOfMintUnit(mint, $proofsStore, currentUnit));
	let amount = $state(0);

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
			sendCallback(getEncodedTokenV4(token));
			sendEcashOpen = false;
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};
</script>

<Dialog.Root bind:open={sendEcashOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{t_send()} {t_to()} {to.alias}</Dialog.Title>
			<Dialog.Description></Dialog.Description>
		</Dialog.Header>
		<div class="flex flex-col gap-4">
			{#if !mint}
				<p class="text-destructive">{no_mint_found()}</p>
				<AddMint></AddMint>
			{:else}
				<MintSelector bind:mint></MintSelector>
				<div class="flex items-center justify-between gap-2">
					{formatAmount(getAmountForTokenSet(balance), currentUnit)}
					{t_available}
					<UnitSelector bind:currentUnit selectedMints={[mint]}></UnitSelector>
				</div>
				<Input type="number" bind:value={amount}></Input>
				{t_send()}
				{formatAmount(amount, currentUnit)}
				{t_to()}
				{to.alias}
			{/if}
			<Button onclick={send} disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="animate-spin"></LoaderCircle>
				{:else}
					<Send></Send>
				{/if}
				{t_send()}
			</Button>
		</div>
		<Dialog.Footer class="flex gap-2">
			<Button
				variant="outline"
				onclick={() => {
					sendEcashOpen = false;
				}}
			>
				{t_cancel()}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Button
	onclick={() => {
		sendEcashOpen = true;
	}}
>
	<Banknote></Banknote>
</Button>
