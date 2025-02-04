<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { nip19 } from 'nostr-tools';
	import QrCode from '../ui/QRCode.svelte';
	import { Copy } from 'lucide-svelte';
	import { copyTextToClipboard } from '$lib/util/utils';

	const { pub }: { pub: string } = $props();

	let npub = nip19.npubEncode(pub.slice(2));
</script>

<div class="my-2 flex flex-col gap-2 rounded-lg border p-4">
	<QrCode data={npub}></QrCode>
	<div class="flex items-center gap-2">
		<Input readonly value={npub}></Input>
		<button class="" onclick={() => copyTextToClipboard(npub)}>
			<Copy></Copy>
		</button>
	</div>
</div>
