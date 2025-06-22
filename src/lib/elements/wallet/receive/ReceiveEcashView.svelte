<script lang="ts">
	import { ensureError, createCashuRequest, types } from '@gandlaf21/cashu-wallet-engine';
	import { getUnitsForMints } from '@gandlaf21/cashu-wallet-engine/util';
	import { selectedMint, mintsStore as mints, unit } from '@gandlaf21/cashu-wallet-engine/stores';

	import { push } from 'svelte-spa-router';

	import { openListenSoundDrawer, openNpubDrawer, openReceiveDrawer, openScannerDrawer, openScanNFCDrawer } from '$lib/stores/session/drawer';

	import { toast } from 'svelte-sonner';
	import { 
		invalid_token, 
		receive_cashu_ecash, 
		receive_via_cashu_request,
		paste_token_placeholder,
		scan_qr,
		scan_qr_description,
		listen_ultrasound,
		listen_ultrasound_description,
		read_nfc_tag,
		read_nfc_tag_description,
		create_cashu_invoice_description
	} from '$lib/paraglide/messages';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { getDecodedToken, getEncodedToken } from '@cashu/cashu-ts';
	import Button from '$lib/components/ui/button/button.svelte';
	import { HandCoins, Nfc, ScanQrCode, Send, SmartphoneNfc, Volume2 } from 'lucide-svelte';
	import { set } from 'date-fns';
	import { isNfcSupported } from '$lib/stores/session/isNfc';

	let entered: string = $state('');

	let mint: types.Mint | undefined = $state(
		$selectedMint !== -1 ? $mints[$selectedMint] : $mints[0]
	);

	let token = $state('');
	const getCurrentUnit = () => {
		if (!mint) return 'sat';
		return getUnitsForMints([mint]).find((u) => u === $unit) ? $unit : 'sat';
	};

	$effect(() => {
		if (entered === '') {
			token = '';
		} else if (entered.startsWith('cashuA') || entered.startsWith('cashuB')) {
			try {
                getDecodedToken(entered)
            } catch (error) {
				toast.warning(invalid_token());
                token = '';
                entered = '';
				return
			}
			token = entered;
			receiveCashu();
		}
	});

	const receiveCashu = () => {
		// scannedTokenStore.set(entered)
		openReceiveDrawer.set(false);
		push('/wallet/receive/cashu/' + entered);
	};
</script>

<div class="flex flex-col gap-5">
	<p class="font-bold">
		{receive_cashu_ecash()}
	</p>
	<Textarea
		class="w-80 resize-none rounded-md border-dashed xl:w-[600px]"
		inputmode="none"
		bind:value={entered}
		placeholder={paste_token_placeholder()}
	></Textarea>
    <div class="flex flex-col gap-3 items-center w-80 xl:w-[600px]">
        <button class="opacity-80 hover:opacity-100 transition-opacity text-start flex gap-3 border rounded-md p-3 w-full items-center" onclick={() => {
			openScannerDrawer.set(true);
        }}>
            <ScanQrCode class="text-nutstash h-8 w-8"></ScanQrCode>
            <div class="flex flex-col">
                <div class="text-sm font-bold">{scan_qr()}</div>
                <div class="text-xs text-muted-foreground">{scan_qr_description()}</div>
            </div>
        </button>
        <button class="opacity-80 hover:opacity-100 transition-opacity text-start flex gap-3 border rounded-md p-3 w-full items-center" onclick={() => {
			openListenSoundDrawer.set(true);
        }}>
            <Volume2 class="text-green-500 h-8 w-8"></Volume2>
            <div class="flex flex-col">
                <div class="text-sm font-bold">{listen_ultrasound()}</div>
                <div class="text-xs text-muted-foreground">{listen_ultrasound_description()}</div>
            </div>
        </button>
		{#if $isNfcSupported}
		
        <button class="opacity-80 hover:opacity-100 transition-opacity text-start flex gap-3 border rounded-md p-3 w-full items-center" onclick={() => {
			openScanNFCDrawer.set(true);
		}}>
            <Nfc class="text-orange-500 h-8 w-8"></Nfc>
            <div class="flex flex-col">
				<div class="text-sm font-bold">{read_nfc_tag()}</div>
                <div class="text-xs text-muted-foreground">{read_nfc_tag_description()}</div>
            </div>
        </button>
		{/if}

		<button class="opacity-80 hover:opacity-100 transition-opacity text-start flex gap-3 border rounded-md p-3 w-full items-center" onclick={
			()=> {
				openNpubDrawer.set(true)
			}
		}>
            <Send class="text-blue-500 h-8 w-8 rotate-180"></Send>
            <div class="flex flex-col">
                <div class="text-sm font-bold">Receive via nostr</div>
                <div class="text-xs text-muted-foreground">Show nostr npub and QR</div>
            </div>
        </button>
		<button class="opacity-80 hover:opacity-100 transition-opacity text-start flex gap-3 border rounded-md p-3 w-full items-center" onclick={() => {
			push('/wallet/receive/cashureq/create')
        }}>
            <HandCoins class="text-nutstashsecondary h-8 w-8"></HandCoins>
            <div class="flex flex-col">
                <div class="text-sm font-bold">{receive_via_cashu_request()}</div>
                <div class="text-xs text-muted-foreground">{create_cashu_invoice_description()}</div>
            </div>
        </button>
    </div>
</div>
