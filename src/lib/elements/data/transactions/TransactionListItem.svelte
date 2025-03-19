<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { formatAmount, formatSecToMinStr, getAmountForTokenSet } from '$lib/util/walletUtils';
	import * as Card from '$lib/components/ui/card';
	import { Copy, Banknote, CircleCheck, RefreshCcw } from 'lucide-svelte';
	import { copyTextToClipboard, getHostFromUrl } from '$lib/util/utils';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { TransactionType, type StoredTransaction } from '$lib/db/models/types';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import QrCode from '$lib/elements/ui/QRCode.svelte';
	import { getEncodedTokenV4, type Token } from '@cashu/cashu-ts';
	import Button from '$lib/components/ui/button/button.svelte';
	import BigTokenQr from '$lib/elements/ui/BigTokenQR.svelte';
	import SendViaNfcButton from '$lib/elements/wallet/send/ecash/SendViaNFCButton.svelte';
	import isTauri from '$lib/tauri/deviceHelper';
	import CopiableToken from '$lib/elements/ui/CopiableToken.svelte';

	let {
		tx,
		isListView = true
	}: {
		tx: StoredTransaction;
		isListView?: boolean;
	} = $props();

	let token: Token = $derived({
		mint: tx.mintUrl,
		proofs: tx.out,
		unit: tx.unit,
		memo: tx.memo
	});
	let encodedToken = $derived(getEncodedTokenV4(token));
</script>

<Card.Root class="m-3">
	<Card.Header>
		<Card.Title class="relative flex flex-col justify-start text-nowrap">
			<div
				class="h-10 max-w-48
            flex-shrink overflow-clip text-ellipsis"
			>
				<a href={`/#/wallet/send/cashu/${tx.id}`} class="underline">
					{tx.type} #{tx.id}
				</a>
			</div>
		</Card.Title>
		<Card.Description>
			<div class="max-w-48 overflow-clip text-ellipsis">
				<a class="underline" href={`/#/wallet/mint/${getHostFromUrl(tx.mintUrl ?? '')}`}>
					{tx.mintUrl}
				</a>
			</div>
		</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-3">
			{#if !isListView}
				<!-- content here -->
				{#if encodedToken && tx.type === TransactionType.SEND}
					{#if encodedToken.length > 300}
						<BigTokenQr size={[3]} speed={[3]} token={encodedToken}></BigTokenQr>
					{:else}
						<QrCode data={encodedToken}></QrCode>
					{/if}
				{/if}
			{/if}
		<div class="w-64">
			<CopiableToken token={encodedToken}></CopiableToken>
		</div>
		<div class="flex flex-col items-center justify-center gap-2">
			<Badge variant="outline" class="text-2xl w-full items-center flex justify-center">
				{formatAmount(tx.amount, 'sat')}
			</Badge>
			<Badge variant="outline" class="">
				{formatAmount(tx.fees ?? 0, 'sat')} fee
			</Badge>
		</div>

	</Card.Content>
	<Card.Footer class="flex h-12 justify-between">
		{#if isListView}
			<Button href={`/#/wallet/send/cashu/${tx.id}`}>Show</Button>
		{:else}
			<Button href="/#/wallet/">Close</Button>
		{/if}
		{#if !isListView && !isTauri}
			<SendViaNfcButton token={encodedToken}></SendViaNfcButton>
		{/if}
	</Card.Footer>
</Card.Root>
