<script lang="ts">
	import { formatAmount } from '@gandlaf21/cashu-wallet-engine/util';
	import { types } from '@gandlaf21/cashu-wallet-engine';
	import * as Card from '$lib/components/ui/card';
	import { getHostFromUrl } from '$lib/utils';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import QrCode from '$lib/elements/ui/QRCode.svelte';
	import { getDecodedToken, getEncodedToken, getEncodedTokenV4, type Token } from '@cashu/cashu-ts';
	import Button from '$lib/components/ui/button/button.svelte';
	import BigTokenQr from '$lib/elements/ui/BigTokenQR.svelte';
	import SendViaNfcButton from '$lib/elements/wallet/send/ecash/SendViaNFCButton.svelte';
	import isTauri from '$lib/tauri/deviceHelper';
	import CopiableToken from '$lib/elements/ui/CopiableToken.svelte';
	import { t_close, t_fee, t_show } from '$lib/paraglide/messages';
	import TransmitAudio from '$lib/elements/ui/TransmitAudio.svelte';
	import NfcWriteDrawer from '$lib/elements/wallet/send/ecash/NFCWriteDrawer.svelte';
	import { Nfc, Volume2, Send, Share2 } from 'lucide-svelte';
	import { openEmitSoundDrawer, openNpubDrawer, openSendNostrDrawer, openWriteNFCDrawer } from '$lib/stores/session/drawer';
	import { copyTextToClipboard } from '$lib/utils';
	import { isNfcSupported } from '$lib/stores/session/isNfc';
	import EmitSoundDrawer from '$lib/elements/wallet/send/ecash/EmitSoundDrawer.svelte';
	import SendNostrDrawer from '$lib/elements/wallet/send/ecash/SendNostrDrawer.svelte';


	let {
		tx,
		isListView = true
	}: {
		tx: types.StoredTransaction;
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
	{#if isListView}
	
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
{/if}
<Card.Content class="flex flex-col gap-3">
		{#if !isListView}
			<!-- content here -->
			{#if encodedToken && tx.type === types.TransactionType.SEND}
				{#if encodedToken.length > 300}
					<BigTokenQr size={[3]} speed={[3]} token={encodedToken}></BigTokenQr>
				{:else}
					<QrCode data={encodedToken}></QrCode>
				{/if}

				<div class="">
					<div class="flex flex-wrap gap-2 justify-center">
						<!-- Sound Button -->
						<button class="opacity-80 hover:opacity-100 transition-opacity flex flex-col items-center border rounded-md p-1.5 w-[70px] h-[70px] justify-center" onclick={() => {
							openEmitSoundDrawer.set(true);
						}}>
							<Volume2 class="text-green-500 h-5 w-5 mb-0.5"></Volume2>
							<div class="text-[10px] font-medium">Sound</div>
						</button>
						{#if openEmitSoundDrawer}
							<EmitSoundDrawer token={encodedToken}></EmitSoundDrawer>
						{/if}
						{#if $isNfcSupported && !isTauri}
						
						<!-- NFC Button -->
						<button class="opacity-80 hover:opacity-100 transition-opacity flex flex-col items-center border rounded-md p-1.5 w-[70px] h-[70px] justify-center" onclick={() => {
							openWriteNFCDrawer.set(true);
						}}>
							<Nfc class="text-orange-500 h-5 w-5 mb-0.5"></Nfc>
							<div class="text-[10px] font-medium">NFC</div>
						</button>
						<NfcWriteDrawer token={encodedToken}></NfcWriteDrawer>
						{/if}

						<!-- Nostr Button -->
						<button class="opacity-80 hover:opacity-100 transition-opacity flex flex-col items-center border rounded-md p-1.5 w-[70px] h-[70px] justify-center" onclick={() => {
							openSendNostrDrawer.set(true);
						}}>
							<Send class="text-blue-500 h-5 w-5 mb-0.5"></Send>
							<div class="text-[10px] font-medium">Nostr</div>
						</button>
						{#if $openSendNostrDrawer}
							<SendNostrDrawer data={encodedToken} >
								
							</SendNostrDrawer>
						{/if}
						
						<!-- Share Button -->
						<button class="opacity-80 hover:opacity-100 transition-opacity flex flex-col items-center border rounded-md p-1.5 w-[70px] h-[70px] justify-center" onclick={() => {
							// copyTextToClipboard(encodedToken);
							// Check if Web Share API is available
							if (navigator.share) {
								navigator.share({
									title: 'Cashu Token',
									text: encodedToken
								}).catch(err => {
									console.error('Error sharing:', err);
								});
							}
						}}>
							<Share2 class="text-gray-500 h-5 w-5 mb-0.5"></Share2>
							<div class="text-[10px] font-medium">Share</div>
						</button>
					</div>
				</div>

			{/if}
							
			<div>
				<CopiableToken token={encodedToken}></CopiableToken>
			</div>
			<div class="flex flex-col items-center justify-center gap-2">
				<Badge variant="outline" class="flex w-full items-center justify-center text-2xl">
					{formatAmount(tx.amount, 'sat')}
				</Badge>
				<!-- <Badge variant="outline" class="">
					{formatAmount(tx.fees ?? 0, 'sat')}
					{t_fee()}
				</Badge> -->
			</div>
		{/if}


	</Card.Content>
	<Card.Footer class="flex h-12 justify-between">
		{#if isListView}
			<Button href={`/#/wallet/send/cashu/${tx.id}`}>{t_show()}</Button>
		{:else}
			<Button href="/#/wallet/">{t_close()}</Button>
		{/if}
	</Card.Footer>
</Card.Root>
