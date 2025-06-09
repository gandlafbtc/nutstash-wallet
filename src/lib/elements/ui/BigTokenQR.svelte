<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Buffer } from 'buffer';
	import { UREncoder, UR } from '@gandlaf21/bc-ur';
	import QrCode from './QRCode.svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import { problems_scanning_qr, t_size, t_speed } from '$lib/paraglide/messages';
	import { Button, type Props } from '$lib/components/ui/button/index.js';
	import ggwave_factory from 'ggwave';

	let { token, speed, size }: { token: string; speed: number[]; size: number[] } = $props();

	let chunk = $state('');
	let maxFragmentLength = $derived(size[0] * 50);
	let intervalMS = $derived(1000 / speed[0]);
	const firstSeqNum = 0;
	let encoder: UREncoder;
	let isTransmitting = $state(false);
	let progress = $state("0%");
	let qrInterval: number | undefined;
	let audioContext: AudioContext;

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
		isTransmitting = false;
	};

	onMount(() => {
		doInterval();
	});
	onDestroy(() => {
		clearInterval(qrInterval);
	});
	const resetTransmission = () => {
		isTransmitting = false;
		progress = "0%";
		if (audioContext) {
			audioContext.close();
		}
	};

	const transmitAudio = async () => {
		if (isTransmitting)
			return;

		isTransmitting = true;

		function convertTypedArray(src, type) {
			var buffer = new ArrayBuffer(src.byteLength);
			var baseView = new src.constructor(buffer).set(src);
			return new type(buffer);
		}
            
		ggwave_factory().then(
			async function(ggwave) {
				audioContext = new (window.AudioContext || window.webkitAudioContext)({sampleRate: 48000});

				// Break down in chunks
				const chunks = [];
				for (let i = 0; i < token.length; i += 139) {
					chunks.push(token.slice(i, i + 139));
				}

				// Add a period `.` to the end
				chunks[chunks.length - 1] += ".";
				console.debug(`Have ${chunks.length} chunks to play`);

				const parameters = ggwave.getDefaultParameters();
				parameters.sampleRateInp = audioContext.sampleRate;
				parameters.sampleRateOut = audioContext.sampleRate;
				const instance = ggwave.init(parameters);

				for (let i = 0; i < chunks.length; ++i) {
					console.log(`Playing chunk ${i}`);
					const chunk = chunks[i];
					const waveform = ggwave.encode(instance, chunk, ggwave.ProtocolId.GGWAVE_PROTOCOL_ULTRASOUND_FASTEST, 10);
				
					const buf = convertTypedArray(waveform, Float32Array);
					const buffer = audioContext.createBuffer(1, buf.length, audioContext.sampleRate);
					buffer.getChannelData(0).set(buf);

					const source = audioContext.createBufferSource();
					source.buffer = buffer;
					source.connect(audioContext.destination);

					// Create a promise that resolves when the audio finishes
					const playPromise = new Promise(resolve => {
						source.onended = resolve;
					});

					source.start();
					await playPromise;

					progress = (Math.floor(((i+1) / chunks.length) * 100)).toString()+"%";
					console.log(`progress: ${progress}`);
				}
				
				await new Promise(resolve => setTimeout(resolve, 2000));
				isTransmitting = false;
				progress = "0%"
			}
		);
	};
</script>

{#if chunk && size && speed}
	<div class="flex flex-col gap-2">
		<QrCode data={chunk} />
		<div class="flex flex-row justify-center gap-4 my-4">
		<Button onclick={transmitAudio} class="audio-button small-icon-button" disabled={isTransmitting}>
			<i class="icon-audio"></i>Transmit via Audio
		</Button>
		{#if isTransmitting}
		<Button onclick={resetTransmission} class="reset-button small-icon-button">
			<i class="icon-reset"></i>Reset
		</Button>
		{/if}
		</div>
		{#if isTransmitting}
			<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
				<div class="bg-green-600 h-2.5 rounded-full" style:width = {progress}></div>
			</div>
		{/if}
		<Accordion.Root type="single">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>{problems_scanning_qr()}</Accordion.Trigger>
				<Accordion.Content>
					<div
						class="flex flex-col gap-4 py-2 pr-3
			"
					>
						<div class="flex gap-2">
							<span class="w-12">{t_size()}</span>
							<Slider bind:value={size} max={5} min={1} step={1} />
						</div>
						<div class="flex gap-2">
							<span>{t_speed()}</span>
							<Slider bind:value={speed} max={5} min={1} step={1} />
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>
{/if}
