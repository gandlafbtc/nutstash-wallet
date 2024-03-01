<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { QRCodeImage } from 'svelte-qrcode-image';
	import { Buffer } from 'buffer';
	import type { UREncoder } from '@gandlaf21/bc-ur';

	export let token: string;
	export let speed: number
	export let size: number
	

	let chunk = '';
	$: maxFragmentLength = size*50
	$: intervalMS = 1000/speed
	const firstSeqNum = 0;
	let encoder: UREncoder
	let qrInterval: number | undefined

	$: if (intervalMS || maxFragmentLength) {
		startLoop()
	}

	const getEncoder = async ()=>{
		const { UR, UREncoder } = await import('@gandlaf21/bc-ur');

		const ur = UR.fromBuffer(Buffer.from(token));
		encoder = new UREncoder(ur, maxFragmentLength, firstSeqNum);
	}

	const doInterval = () =>{
		clearInterval(qrInterval);
		qrInterval = setInterval(() => {
			chunk = encoder.nextPart();
		}, intervalMS);
	}
	
	$: startLoop = async () => {
		await getEncoder()
		doInterval()
	}

	onMount( () => {
		startLoop()
		// @ts-ignore
	});
	onDestroy(() => {
		clearInterval(qrInterval);
	});
</script>


{#if chunk && size && speed}
	<QRCodeImage bind:text={chunk}/>
{/if}
