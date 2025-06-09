<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import MintSelector from '$lib/elements/ui/MintSelector.svelte';
	import UnitSelector from '$lib/elements/ui/UnitSelector.svelte';
	import { mints } from '$lib/stores/persistent/mints';
	import { formatAmount, getUnitsForMints, isNumeric } from '$lib/util/walletUtils';
	import { QrCode, Zap, LoaderCircle, Banknote } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { push } from 'svelte-spa-router';
	import NumericKeys from '$lib/elements/ui/NumericKeys.svelte';
	import { unit } from '$lib/stores/persistent/settings';
	import { createCashuRequest, createMintQuote } from '$lib/actions/actions';
	import { openReceiveDrawer, openScannerDrawer } from '$lib/stores/session/drawer';
	import type { Mint } from '$lib/db/models/types';
	import AddMint from '$lib/elements/mint/AddMint.svelte';
	import { toast } from 'svelte-sonner';
	import { selectedMint } from '$lib/stores/local/selectedMints';
	import { ensureError } from '$lib/helpers/errors';
	import {
		enter_amount_to_create_invoice,
		no_mint_found,
		paste_token_to_receive_ecash,
		receive_via_cashu_request,
		receive_via_lightning
	} from '$lib/paraglide/messages';
	import ggwave_factory from 'ggwave';

	let entered: string = $state('');

	let mint: Mint | undefined = $state($selectedMint !== -1 ? $mints[$selectedMint] : $mints[0]);

	let token = $state('');
	let amount = $state('');
	const getCurrentUnit = () => {
		return getUnitsForMints([mint]).find((u) => u === $unit) ? $unit : 'sat';
	};
	let currentUnit: string = $state(getCurrentUnit());

	let inputFocus: HTMLTextAreaElement | null = $state(null);
	let thisDrawer: HTMLDivElement | null = $state(null);
	let isListening = $state(false);
	let isReceiving = $state(false);

	let isLoading = $state(false);

	let ggwave: any;
	let recorder: any;
	let context: AudioContext;
	let mediaStream: any;
	let receivedChunks: string;

	ggwave_factory().then(function(obj) {
		ggwave = obj;
	});

	onMount(() => {
		setTimeout(() => {
			thisDrawer?.addEventListener('keydown', (e: KeyboardEvent) => {
				if (!(e.ctrlKey && e.key === 'v')) {
					e.preventDefault();
				}
				if (e.key === 'Escape') {
					openReceiveDrawer.set(false);
				}
				if (e.key === 'Backspace') {
					entered = entered.slice(0, -1);
				} else if (e.key === 'Enter') {
					if (entered.length && isNumeric(entered)) {
						receiveLN();
					}
				} else if (isNumeric(e.key)) {
					entered = entered + e.key;
				} else {
				}
			});
		}, 0);
	});

	$effect(() => {
		if (entered === '') {
			token = '';
			amount = '';
		} else if (entered.startsWith('cashuA') || entered.startsWith('cashuB')) {
			token = entered;
			amount = '';
			receiveCashu();
		} else if (isNumeric(entered)) {
			amount = entered;
			token = '';
		} else {
			token = '';
			amount = '';
		}
	});

	const receiveLN = async () => {
		try {
			if (!mint) {
				toast.warning(no_mint_found());
				return;
			}
			isLoading = true;
			const amountInt = parseInt(amount);
			const q = await createMintQuote(mint.url, amountInt, {
				unit: currentUnit
			});
			openReceiveDrawer.set(false);
			// wallet.unit =

			//Show QR screen
			push('/wallet/receive/ln/' + q.quote);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
		//Create Invoice
	};

	const receiveCashu = () => {
		// scannedTokenStore.set(entered)
		openReceiveDrawer.set(false);
		push('/wallet/receive/cashu/' + entered);
	};

	const receiveCashuRequest = async () => {
		try {
			const amountInt = parseInt(amount);
			const req = await createCashuRequest(
				amountInt,
				mint ? [mint?.url] : undefined,
				currentUnit,
				undefined,
				false
			);
			openReceiveDrawer.set(false);
			push('/wallet/receive/cashureq/' + req.id);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
		}
	};

	const onKeypadPress = (value: string) => {
		if (value === 'delete') {
			entered = entered.slice(0, -1);
		} else if (value === 'clear') {
			entered = '';
		} else {
			entered = entered + value;
		}
	};

	function convertTypedArray(src, type) {
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
				recorder = context.createJavaScriptNode(
						bufferSize,
						numberOfInputChannels,
						numberOfOutputChannels);
			}

			recorder.onaudioprocess = function (e) {
				const source = e.inputBuffer;

				// Pull me out after 30 seconds
				let timeout = setTimeout(captureStop, 30000);
				const res = ggwave.decode(instance, convertTypedArray(new Float32Array(source.getChannelData(0)), Int8Array));
				clearTimeout(timeout);

				if (res && res.length > 0) {
					isReceiving = true;
					receivedChunks += new TextDecoder("utf-8").decode(res);
				}

				console.debug(`receivedChunks: ${receivedChunks}`);

				if (receivedChunks !== "" && receivedChunks.charAt(receivedChunks.length - 1) === '.') {
					if (receivedChunks.startsWith('cashuA') || receivedChunks.startsWith('cashuB')) {
						entered = receivedChunks.slice(0, -1);
					}
					captureStop();
				}
			}

			mediaStream.connect(recorder);
			recorder.connect(context.destination);
		}).catch(function (e) {
			console.error(e);
		});
	}

	const captureStop = () => {
		if (recorder) {
			recorder.disconnect(context.destination);
			mediaStream.disconnect(recorder);
			recorder = null;
			isListening = false;
			isReceiving = false;
		}
	}

	const toggleListening = () => {
		if (isListening) {
			captureStop();
		} else {
			captureStart();
		}
	};
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	class="flex h-full w-full flex-col items-center justify-between gap-3"
	bind:this={thisDrawer}
	tabindex="0"
>
	<div class="{entered.length && isNumeric(entered) ? 'h-0' : 'h-20'} relative overflow-hidden">
		<div
			class="pointer-events-none absolute flex h-20 w-full flex-col items-center justify-center text-muted"
		>
			<p>{enter_amount_to_create_invoice()}</p>
			<p>{paste_token_to_receive_ecash()}</p>
		</div>
		<Textarea
			class="w-80 resize-none rounded-md border-dashed xl:w-[600px]"
			inputmode="none"
			bind:value={entered}
			bind:ref={inputFocus}
			oninput={(e) => {
				e.preventDefault();
			}}
			placeholder=""
		></Textarea>
	</div>
	<Button onclick={toggleListening}>
		{#if isReceiving}
			<svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
			<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
			</svg>
		{/if}
		{isListening ? 'Listening Ultrasound' : 'Listen Ultrasound'}
	</Button>
	<div>
		<div
			class="flex items-start justify-center {entered.length && isNumeric(entered)
				? 'h-60'
				: 'h-40'}"
		>
			{#if token.length}
				<!--  -->
			{:else if amount.length}
				<div class="flex flex-col items-center justify-center gap-2">
					{#if !mint}
						<p class="text-destructive">{no_mint_found()}</p>

						<AddMint></AddMint>
					{:else}
						<div class="w-80 xl:w-[600px]">
							<MintSelector bind:mint></MintSelector>
						</div>
						<div class="flex w-80 items-center justify-between gap-2 xl:w-[600px]">
							<button
								class="w-full cursor-text break-all text-start text-2xl"
								onclick={() => inputFocus?.focus()}
							>
								{formatAmount(amount, currentUnit)}
							</button>
							<UnitSelector bind:currentUnit selectedMints={[mint]}></UnitSelector>
						</div>
					{/if}
					<div class="flex w-80 flex-col gap-5 py-5 xl:w-[600px]">
						<Button
							disabled={isLoading}
							class="w-full border-2 border-nutstash"
							onclick={receiveLN}
						>
							{#if isLoading}
								<LoaderCircle class="animate-spin"></LoaderCircle>
							{:else}
								<Zap></Zap>
							{/if}
							{receive_via_lightning()}
						</Button>
						<Button variant="outline" onclick={receiveCashuRequest} class="w-full border-2">
							<Banknote></Banknote>
							{receive_via_cashu_request()}
						</Button>
					</div>
				</div>
			{:else}
				<!-- <div>
					<button class="" onclick={() => openScannerDrawer.update((ctx) => !ctx)}>
						<QrCode></QrCode>
					</button>
				</div> -->
			{/if}
		</div>
	</div>
	<div class="h-64 w-80 xl:w-[600px]">
		<NumericKeys onkeypressed={onKeypadPress}></NumericKeys>
	</div>
</div>
