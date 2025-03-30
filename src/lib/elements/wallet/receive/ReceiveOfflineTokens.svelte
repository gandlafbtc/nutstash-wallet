<script lang="ts">
	import { receiveEcash } from '$lib/actions/actions';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { StoredTransaction } from '$lib/db/models/types';
	import { ensureError } from '$lib/helpers/errors';
	import { offlineTransactionsStore } from '$lib/stores/persistent/offlineTransactions';
	import { formatAmount, parseSecrets } from '$lib/util/walletUtils';
	import { Copy, Download, LoaderCircle, QrCodeIcon, Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	import { getEncodedToken } from '@cashu/cashu-ts';
	import CopiableToken from '$lib/elements/ui/CopiableToken.svelte';
	import { get } from 'svelte/store';
	import { keysStore } from '$lib/stores/persistent/keys';
	import QrCode from '$lib/elements/ui/QRCode.svelte';
	import {
		cannot_be_undone_delete_token,
		no_key_found_in_wallet_for_lock,
		sure_delete_token,
		t_cancel,
		t_claim,
		t_remove,
		t_show
	} from '$lib/paraglide/messages';

	let isLoading = $state(false);
	let showQR = $state(false);
	let isOpen = $state(false);
	let idToDelete = $state('');

	const claimAllOfflineTokens = async () => {
		isLoading = true;
		try {
			for (const tx of $offlineTransactionsStore) {
				await claimOfflineToken(tx);
			}
		} catch (error) {
			const err = ensureError(error);
			toast.error(err.message);
			console.error(error);
		} finally {
			isLoading = false;
		}
	};

	const claimOneOfflineToken = async (tx: StoredTransaction) => {
		isLoading = true;
		try {
			await claimOfflineToken(tx);
		} catch (error) {
			const err = ensureError(error);
			toast.error(err.message);
			console.error(error);
		} finally {
			isLoading = false;
		}
	};

	const claimOfflineToken = async (tx: StoredTransaction) => {
		const token = { proofs: tx.in, mint: tx.mintUrl, unit: tx.unit };
		const { lockPubs } = parseSecrets(token);
		console.log(lockPubs);
		let privkey = undefined;
		let storedKeyPair = undefined;
		if (lockPubs.length > 0) {
			storedKeyPair = keysStore.getBy(lockPubs[0], 'publicKey');
			if (!storedKeyPair) {
				throw new Error(no_key_found_in_wallet_for_lock() + ': ' + lockPubs[0]);
			}
			privkey = storedKeyPair.privateKey;
		}
		await receiveEcash(token, { privkey });
		await offlineTransactionsStore.remove(tx.id, 'id');
	};

	const removeOfflineToken = async () => {
		try {
			await offlineTransactionsStore.remove(idToDelete, 'id');
		} catch (error) {
			const err = ensureError(error);
			toast.error(err.message);
			console.error(error);
		}
	};
</script>

<div class="flex w-full flex-col gap-2">
	<p class="text-lg font-bold">Redeem offline tokens</p>

	<div class="w-full">
		<Button class="w-full" disabled={isLoading} onclick={claimAllOfflineTokens}>
			{#if isLoading}
				<LoaderCircle class="animate-spin"></LoaderCircle>
			{:else}
				<Download></Download>
			{/if}
			Receive all ({$offlineTransactionsStore.length})
		</Button>
	</div>

	{#each $offlineTransactionsStore as tx}
		{@const tkn = getEncodedToken({ proofs: tx.in, mint: tx.mintUrl, unit: tx.unit })}
		<div class="relative flex w-80 flex-col gap-4 rounded-xl border p-4 xl:w-[600px]">
			<div class="absolute right-2 top-2">
				<Button
					variant="ghost"
					size="sm"
					disabled={isLoading}
					onclick={() => {
						idToDelete = tx.id;
						isOpen = true;
					}}
				>
					<Trash class="text-red-500"></Trash>
				</Button>
			</div>
			<div>
				{formatAmount(tx.amount)}
			</div>
			<div class="w-52 overflow-hidden text-ellipsis break-keep text-sm text-muted">
				{tx.mintUrl}
			</div>
			{#if !showQR}
				<div class="flex w-full items-center justify-center">
					<Button variant="ghost" onclick={() => (showQR = true)}>
						<QrCodeIcon></QrCodeIcon>
						{t_show()} QR
					</Button>
				</div>
			{:else}
				<button class="" onclick={() => (showQR = false)}>
					<QrCode data={tkn}></QrCode>
				</button>
			{/if}
			<div class="">
				<CopiableToken token={tkn}></CopiableToken>
			</div>
			<div class="flex flex-col gap-2">
				<Button disabled={isLoading} onclick={() => claimOneOfflineToken(tx)}>{t_claim()}</Button>
			</div>
		</div>
	{/each}
</div>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-destructive">{sure_delete_token()}</Dialog.Title>
			<Dialog.Description>
				{cannot_be_undone_delete_token()}
			</Dialog.Description>
		</Dialog.Header>

		<Dialog.Footer>
			<Button
				variant="outline"
				onclick={() => {
					isOpen = false;
				}}
			>
				{t_cancel()}
			</Button>
			<Button
				variant="destructive"
				onclick={() => {
					removeOfflineToken();
					isOpen = false;
				}}>{t_remove()}</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
