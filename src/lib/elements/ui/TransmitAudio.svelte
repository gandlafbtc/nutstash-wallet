<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import ggwave_factory from 'ggwave';

    interface Props {data:string}
    
    let {data}: Props = $props();

	let isTransmitting = $state(false);
	let progress = $state("0%");
    let audioContext: AudioContext;

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
				for (let i = 0; i < data.length; i += 139) {
					chunks.push(data.slice(i, i + 139));
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

<div class="flex flex-row justify-center gap-4 my-4">
    <Button onclick={transmitAudio} class="audio-button small-icon-button" disabled={isTransmitting}>
        <i class="icon-audio"></i>Start Transmission
    </Button>
    {#if isTransmitting}
    <Button onclick={resetTransmission} class="reset-button small-icon-button">
        <i class="icon-reset"></i>Reset
    </Button>
    {/if}
    </div>
    {#if isTransmitting}
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div class="bg-green-600 h-2.5 rounded-full transition-all duration-500" style:width = {progress}></div>
        </div>
    {/if}