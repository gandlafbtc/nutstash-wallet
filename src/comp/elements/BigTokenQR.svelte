<script lang="ts">
	import { onDestroy } from 'svelte';
	import { QRCodeImage } from 'svelte-qrcode-image';

	export let token: string;

	const CHUNK_SIZE = 200;
	const chunks = token.match(new RegExp('.{1,' + CHUNK_SIZE + '}', 'g')) ?? [];
	const constructedChunks = chunks.map((c, i) => `chunk:${i}:${chunks.length}:${c}`);
	constructedChunks[constructedChunks.length - 1] = constructedChunks[
		constructedChunks.length - 1
	].padEnd(CHUNK_SIZE + 12, '=');

	let activeChunk = 0;

	const qrInterval = setInterval(() => {
		activeChunk = (activeChunk + 1) % constructedChunks.length;
	}, 200);
	onDestroy(() => {
		clearInterval(qrInterval);
	});
</script>

{#each constructedChunks as chunk, i}
	<div class={activeChunk === i ? '' : 'hidden'}>
		<QRCodeImage text={chunk} displayHeight={250} displayWidth={250} />
	</div>
{/each}
