<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { isTauriMobile } from '$lib/tauri/deviceHelper';
	// import { isAvailable, record, textRecord, write } from '@tauri-apps/plugin-nfc';
	import { ensureError } from '$lib/helpers/errors';
	import { error_writing_to_tag, token_has_been_written_to_nfc_tag } from '$lib/paraglide/messages';

	let { token, isOpen = $bindable() }: { token: string; isOpen: boolean } = $props();

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
				// await write([textRecord(token)]);
			} else {
				const record = {
					recordType: 'text',
					data: token
				};
				const ndef = new NDEFReader();
				await ndef.write({ records: [record] });
			}
			toast.info(token_has_been_written_to_nfc_tag()
			);
			isOpen = false;
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(error_writing_to_tag(), {
				description: err.message
			});
			console.log(error);
			isOpen = false;
		}
	});
	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
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
