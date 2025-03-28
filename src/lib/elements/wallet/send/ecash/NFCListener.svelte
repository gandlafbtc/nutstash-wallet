<script lang="ts">
	import { isTauriMobile } from '$lib/tauri/deviceHelper';
	import { onDestroy, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { push } from 'svelte-spa-router';
	// import { isAvailable, record, textRecord, scan } from '@tauri-apps/plugin-nfc';
	import { ensureError } from '$lib/helpers/errors';
	import {
		cashu_token_scanned,
		error_reading_from_tag,
		scanned_non_cashu_token
	} from '$lib/paraglide/messages';
	let scanned = $state('');
	const abortController = new AbortController();
	abortController.signal.onabort = (event) => {
		// toast.info("Aborted nfc scan");
	};
	const colors = ['green', 'yellow', 'blue'];
	let colorI = 0;
	let nfcColor = $state('blue');
	let interval: number | undefined;

	onMount(async () => {
		try {
			interval = setInterval(() => {
				colorI = (colorI + 1) % 3;
				nfcColor = colors[colorI];
			}, 1000);
			if (isTauriMobile) {
				// if (!(await isAvailable())) {
				// 	throw new Error('NFC not available');
				// }
				// const tag = await scan({ type: 'tag' }, { keepSessionAlive: false });
				// const decoder = new TextDecoder();
				// const records = tag.records;
				// for (const record of records) {
				// 	scanned = scanned + decoder.decode(new Uint8Array(record.payload));
				// }
			} else {
				const ndef = new NDEFReader();
				await ndef.scan({ signal: abortController.signal });
				toast.info('Scanning for NFC tag');
				ndef.onreadingerror = () => {
					toast.error(error_reading_from_tag());
				};
				ndef.onreading = (event) => {
					scanned = '';
					const message = event.message;
					for (const record of message.records) {
						if (record.recordType !== 'text') {
							continue;
						}
						const textDecoder = new TextDecoder(record.encoding);
						const decoded = textDecoder.decode(record.data);
						scanned = scanned + decoded;
					}
					if (scanned.startsWith('cashu')) {
						toast.info(cashu_token_scanned());
						push('/wallet/receive/cashu/' + scanned);
					} else {
						toast.warning(scanned_non_cashu_token() + ': ' + scanned);
					}
				};
			}
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
			console.log(`Error! Scan failed to start: ${err.message}.`);
		}
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
		abortController.abort();
	});
</script>

<div
	class="flex items-center justify-center transition-colors duration-1000"
	class:text-blue-500={nfcColor === 'blue'}
	class:text-yellow-500={nfcColor === 'yellow'}
	class:text-green-500={nfcColor === 'green'}
>
	<svg class="h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
		><path d="M0 0h24v24H0z" fill="none" /><path d="M4 20h16V4H4v16z" fill="none" /><path
			d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM18 6h-5c-1.1 0-2 .9-2 2v2.28c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V8h3v8H8V8h2V6H6v12h12V6z"
		/></svg
	>
</div>
