<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Ear, Info, LoaderCircle } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	
	//@ts-ignore
	import ggwave_factory from 'ggwave';
	import { goto } from '$app/navigation';
	import { push } from 'svelte-spa-router';
	import { openListenSoundDrawer } from '$lib/stores/session/drawer';

	let isListening = $state(false);
    let isReceiving = $state(false);
    let entered = $state('');
    

    let ggwave: any;
	let recorder: any;
	let context: AudioContext;
	let mediaStream: any;
	let receivedChunks: string;
	
    ggwave_factory().then(function(obj: any) {
		ggwave = obj;
	});

    function convertTypedArray(src: any, type: any) {
		var buffer = new ArrayBuffer(src.byteLength);
		var baseView = new src.constructor(buffer).set(src);
		return new type(buffer);
	}

    const captureStart = () => {

		if (isListening) 
			return;

		isListening = true;

		if (!context) {
			context = new AudioContext({sampleRate: 48000});
		}

		receivedChunks = "";
		const parameters = ggwave.getDefaultParameters();
		parameters.sampleRateInp = context.sampleRate;
		parameters.sampleRateOut = context.sampleRate;
		const instance = ggwave.init(parameters);
		let timeout: number | null;

		let constraints = {
			audio: {
				// not sure if these are necessary to have
				echoCancellation: false,
				autoGainControl: false,
				noiseSuppression: false
			}
		};

		navigator.mediaDevices.getUserMedia(constraints).then(function (e) {
			mediaStream = context.createMediaStreamSource(e);

			var bufferSize = 1024;
			var numberOfInputChannels = 1;
			var numberOfOutputChannels = 1;

			if (context.createScriptProcessor) {
				recorder = context.createScriptProcessor(
						bufferSize,
						numberOfInputChannels,
						numberOfOutputChannels);
			} else {
				//@ts-ignore
				recorder = context.createJavaScriptNode(
						bufferSize,
						numberOfInputChannels,
						numberOfOutputChannels);
			}

			recorder.onaudioprocess = function (e: any) {
				const source = e.inputBuffer;

				// Pull me out after 30 seconds
				timeout = timeout ? timeout : setTimeout(captureStop, 30000);
				const res = ggwave.decode(instance, convertTypedArray(new Float32Array(source.getChannelData(0)), Int8Array));

				if (res && res.length > 0) {
					isReceiving = true;
					receivedChunks += new TextDecoder("utf-8").decode(res);
					clearTimeout(timeout);
					timeout = null;
				}

				console.debug(`receivedChunks: ${receivedChunks}`);

				if (receivedChunks !== "" && receivedChunks.charAt(receivedChunks.length - 1) === '.') {
					if (receivedChunks.startsWith('cashuA') || receivedChunks.startsWith('cashuB')) {
						entered = receivedChunks.slice(0, -1);
						push(`/wallet/receive/cashu/${entered}`)
						openListenSoundDrawer.set(false)
					}
					else {
						toast.error("Invalid message received. Please try again.")
					}
					captureStop();
				}
			}

			mediaStream.connect(recorder);
			recorder.connect(context.destination);
		}).catch(function (e) {
			captureStop()
			toast.error("Error accessing media devices.")
			console.error(e)
		});
	}
	const captureStop = () => {
		if (recorder) {
			recorder.disconnect(context.destination);
			mediaStream.disconnect(recorder);
			
			// Get the original MediaStream and stop all tracks
			if (mediaStream && mediaStream.mediaStream && mediaStream.mediaStream.getTracks) {
				mediaStream.mediaStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
			}
		}
		
		// Suspend the audio context when not in use
		if (context) {
			context.suspend().catch(e => console.error("Error suspending audio context:", e));
		}
		
		recorder = null;
		mediaStream = null;
		isListening = false;
		isReceiving = false;
	}

	const toggleListening = () => {
		if (isListening) {
			captureStop();
		} else {
			captureStart();
		}
	};
</script>

<style>
    .sound-wave {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 100%;
    }
    
    .bar {
        width: 3px;
        background-color: #3b82f6; /* blue-500 to match app color scheme */
        border-radius: 1px;
    }
    
    .bar-1 {
        animation: sound-wave-animation 0.8s infinite ease-in-out;
        height: 60%;
    }
    
    .bar-2 {
        animation: sound-wave-animation 0.8s infinite ease-in-out 0.2s;
        height: 100%;
    }
    
    .bar-3 {
        animation: sound-wave-animation 0.8s infinite ease-in-out 0.4s;
        height: 75%;
    }
    
    @keyframes sound-wave-animation {
        0%, 100% {
            transform: scaleY(0.5);
        }
        50% {
            transform: scaleY(1);
        }
    }
</style>
<div class="flex flex-col gap-3 w-80 xl:w-[600px]">
	<div class="h-32 flex w-full items-center justify-center">
		{#if !isListening}
		<div class="flex gap-1 items-center">
			<div>
				<Info class='w-5 h-5'></Info>
			</div>
			<p class="text-sm text-muted-foreground">Before starting the transmission on the sending device, start listening on this device. Make sure that the sending device is close and the volume is turned up.</p>
		</div>
		{:else if isListening && !isReceiving}
		  <p>Waiting for sound...</p>
		{:else if isListening && isReceiving}
		  
		<div class="h-5 w-5">
			<!-- waves -->
            <div class="sound-wave">
				<div class="bar bar-1"></div>
                <div class="bar bar-2"></div>
                <div class="bar bar-3"></div>
            </div>
        </div>
		{/if}
	</div>
	<Button class="w-full" onclick={toggleListening}>
		{#if isListening}
		
        <LoaderCircle class='animate-spin'></LoaderCircle>
        
		{:else}
        <Ear></Ear>
		{/if}
		{isListening ? 'Stop Listening' : 'Start Listening'}
	</Button>
	
</div>
