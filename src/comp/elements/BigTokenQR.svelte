<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { QRCodeImage } from 'svelte-qrcode-image';
	import { Buffer } from "buffer";

	export let token: string;
	
	let chunk = ''
	const maxFragmentLength = 200
	const firstSeqNum = 0


	onMount(async () => {
		const {UR, UREncoder} = await import('@gandlaf21/bc-ur');

		const ur = UR.fromBuffer(Buffer.from(JSON.stringify({token})))
		const encoder = new UREncoder(ur, maxFragmentLength, firstSeqNum)
		const qrInterval = setInterval(() => {
		chunk = encoder.nextPart()
	}, 200);
	onDestroy(() => {
		clearInterval(qrInterval);
	});
	});


	
</script>

{#if chunk}
	 <QRCodeImage bind:text={chunk} displayHeight={250} displayWidth={250} />
{/if}
