<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';

	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { no_known_action_for_pasted, paste_from_clipboard } from '$lib/paraglide/messages';
	import { openReceiveDrawer, openScannerDrawer, openSendDrawer } from '$lib/stores/session/drawer';
	import { sendInput } from '$lib/stores/session/sendInput';
	import { scanresultStore } from '$lib/stores/session/transitionstores';
	import { checkValidPubkey } from '$lib/util/walletUtils';
	import { ClipboardPaste } from 'lucide-svelte';
	import { nip19 } from 'nostr-tools';
	import { toast } from 'svelte-sonner';
	import { push } from 'svelte-spa-router';

	let pasted = $state('');

	const onPaste = () => {
		setTimeout(() => {
			if (
				pasted.toLowerCase().startsWith('lightning:') ||
				pasted.toLowerCase().startsWith('lnbc')
			) {
				if (pasted.toLowerCase().startsWith('lightning:')) {
					pasted = pasted.split(':')[1];
				}
				lnInvoiceScanned(pasted);
			} else if (pasted.toLowerCase().startsWith('cashu')) {
				if (pasted.toLowerCase().startsWith('cashu:')) {
					pasted = pasted.split(':')[1];
				}
				if (pasted.startsWith('//')) {
					pasted = pasted.slice(2);
				}
				if (pasted.toLowerCase().startsWith('creq')) {
					cashuRequestScanned(pasted);
					return;
				}
				const scannedToken = pasted;
				cashuTokenScanned(scannedToken);
			} else if (pasted.toLowerCase().startsWith('creq')) {
				cashuRequestScanned(pasted);
				return;
			} else if (pasted.toLowerCase().startsWith('npub')) {
				npubScanned(pasted);
			} else if (pasted.toLowerCase().startsWith('lnurl')) {
				lnurlScanned(pasted);
			} else if (pasted.includes('@') && pasted.includes('.')) {
				lnAddressScanned(pasted);
			} else if (checkValidPubkey(pasted)) {
				pubkeyScanned(pasted);
			} else {
				toast.warning(no_known_action_for_pasted());
			}
			pasted = '';
		}, 100);
	};

	const npubScanned = (npub: string) => {
		closeDrawers();
		$openSendDrawer = true;
		sendInput.set(npub);
	};

	const pubkeyScanned = (pubkey: string) => {
		closeDrawers();
		openSendDrawer.set(true);
		sendInput.set(pubkey);
	};

	const lnAddressScanned = (lnAddress: string) => {
		closeDrawers();
		scanresultStore.set(lnAddress);
		push('/wallet/send/lnurl');
	};

	const lnurlScanned = (lnurl: string) => {
		closeDrawers();
		scanresultStore.set(lnurl);
		push('/wallet/send/lnurl');
	};

	const lnInvoiceScanned = (invoice: string) => {
		closeDrawers();
		scanresultStore.set(invoice);
		push('/wallet/send');
	};

	const cashuTokenScanned = (token: string) => {
		closeDrawers();
		scanresultStore.set(token);
		push('/wallet/receive/cashu');
	};
	const cashuRequestScanned = (request: string) => {
		closeDrawers();
		scanresultStore.set(request);
		push('/wallet/send/cashureq/' + request);
	};

	const closeDrawers = () => {
		openScannerDrawer.set(false);
		openReceiveDrawer.set(false);
		openSendDrawer.set(false);
	};
</script>

<div class="relative h-10">
	<div class="absolute left-2 top-2 text-muted-foreground">
		<ClipboardPaste></ClipboardPaste>
	</div>
	<div class="absolute">
		<Input
			bind:value={pasted}
			onpaste={(e) => onPaste()}
			class="w-80 resize-none rounded-sm border-dashed bg-opacity-5 focus:outline-transparent focus-visible:outline-transparent xl:w-[600px] "
			inputmode="none"
			placeholder={`        ${paste_from_clipboard()}`}
		></Input>
	</div>
</div>
