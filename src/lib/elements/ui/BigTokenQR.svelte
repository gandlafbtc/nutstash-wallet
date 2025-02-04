<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Buffer } from 'buffer';
	import { UREncoder, UR } from '@gandlaf21/bc-ur';
	import QrCode from './QRCode.svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import * as Accordion from '$lib/components/ui/accordion';

	let { token, speed, size }: { token: string; speed: number[]; size: number[] } = $props();

	let chunk = $state('');
	let maxFragmentLength = $derived(size[0] * 50);
	let intervalMS = $derived(1000 / speed[0]);
	const firstSeqNum = 0;
	let encoder: UREncoder;
	let qrInterval: number | undefined;

	$effect(() => {
		if (intervalMS || maxFragmentLength) {
			doInterval();
		}
	});

	const doInterval = () => {
		const ur = UR.fromBuffer(Buffer.from(token));
		encoder = new UREncoder(ur, maxFragmentLength, firstSeqNum);
		clearInterval(qrInterval);
		qrInterval = setInterval(() => {
			chunk = encoder.nextPart();
		}, intervalMS);
	};

	onMount(() => {
		doInterval();
	});
	onDestroy(() => {
		clearInterval(qrInterval);
	});
</script>

{#if chunk && size && speed}
	<div class="flex flex-col gap-2">
		<QrCode data={chunk} />
		<Accordion.Root type="single">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Problems scanning QR?</Accordion.Trigger>
				<Accordion.Content>
					<div
						class="flex flex-col gap-4 py-2 pr-3
			"
					>
						<div class="flex gap-2">
							<span class="w-12">Size</span>
							<Slider bind:value={size} max={5} min={1} step={1} />
						</div>
						<div class="flex gap-2">
							<span>Speed</span>
							<Slider bind:value={speed} max={5} min={1} step={1} />
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>
{/if}
