<script lang="ts">
	import { getUnitSymbol } from '$lib/util/walletUtils';
	import { Download, QrCode, Upload } from 'lucide-svelte';
	import UnitSelector from '$lib/elements/ui/UnitSelector.svelte';
	import { selectedMint } from '$lib/stores/local/selectedMints';
	import { proofsStore } from '$lib/stores/persistent/proofs';
	import { mints } from '$lib/stores/persistent/mints';
	import { getByMany } from '$lib/stores/persistent/helper/storeHelper';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { openReceiveDrawer, openScannerDrawer, openSendDrawer } from '$lib/stores/session/drawer';
	import CompactHistory from '../data/history/CompactHistory.svelte';
	import NumberFlow, { type Format } from '@number-flow/svelte';
	import { css, getDivider } from '$lib/util/utils';
	import QuickPaste from './QuickPaste.svelte';
	import NfcListenerButton from './send/ecash/NFCListenerButton.svelte';
	import isTauri from '$lib/tauri/deviceHelper';
	import { untrack } from 'svelte';
	import MintCarousel from '../mint/mintDropdown/MintCarousel.svelte';
	import { settings } from '$lib/stores/persistent/settings';

	let currentUnit = $state('sat');

	let { divider, fraction } = $derived(getDivider(currentUnit));
	let isShowBalance = $state(false);

	const toggleShowBalance = () => {
		isShowBalance = !isShowBalance;
	};

	$effect(() => {
		const numberFlowElement = untrack(() => document.getElementById('number-flow'));
		if (
			amount !== undefined &&
			currentUnit &&
			$selectedMint !== undefined &&
			isShowBalance !== undefined
		) {
			//hack: set timeout to wait for elements to show up
			setTimeout(() => {
				const elements = numberFlowElement?.shadowRoot?.querySelectorAll(
					'.number .number__inner .section .digit .is-current'
				);
				if (!elements || elements.length === 0) {
					return;
				}

				let hasNonZeroDigit = false;
				for (const [i, element] of elements.entries()) {
					if (hasNonZeroDigit) {
						css(element, {
							opacity: '1'
						});
						continue;
					}
					const elementsBefore = [...elements].slice(0, i + 1).map((e) => e.textContent);
					if (elementsBefore.find((e) => e !== '0')) {
						hasNonZeroDigit = true;
						css(element, {
							opacity: '1'
						});
					} else {
						css(element, {
							opacity: '0.1'
						});
					}
				}
			}, 1);
		}
	});

	let activeMints = $derived.by(() => {
		if ($selectedMint === -1) {
			return $mints;
		}
		return [$mints[$selectedMint]];
	});
	let keysetIds = $derived(
		activeMints
			.map((m) => m.keysets.keysets)
			.flat()
			.filter((k) => k.unit === currentUnit)
			.map((k) => k.id)
	);
	let amount = $derived(getByMany($proofsStore, keysetIds, 'id').reduce((a, b) => a + b.amount, 0));
</script>

<div class="flex h-full w-full flex-col items-center justify-start gap-5">
	<div class="w-80">
		<QuickPaste></QuickPaste>
	</div>
	<div>
		<MintCarousel></MintCarousel>
	</div>
	<div>
		<!-- todo fix this later -->
		{#if !isTauri}
			<NfcListenerButton></NfcListenerButton>
		{/if}
	</div>
	<div class="flex w-full items-center justify-between gap-2">
		<p class="text-4xl">
			{getUnitSymbol(currentUnit, false)}
			<button class="h-12" onclick={toggleShowBalance}>
				{#if $settings[0].general.hideBalance && !isShowBalance}
					<span class="opacity-35"> ********** </span>
				{:else}
					<NumberFlow
						id="number-flow"
						value={amount / divider}
						format={{
							minimumFractionDigits: fraction,
							maximumFractionDigits: fraction
						}}
					></NumberFlow>
				{/if}
			</button>
		</p>
		<UnitSelector bind:currentUnit selectedMints={activeMints}></UnitSelector>
	</div>

	<ScrollArea
		class="relative mb-20 flex h-full w-80 flex-col gap-5 overflow-y-hidden from-background p-2
  before:pointer-events-none before:absolute before:bottom-0 before:top-0 before:z-10  before:h-10 before:w-full
  before:bg-gradient-to-b after:pointer-events-none after:absolute after:bottom-0 after:z-10 after:h-10 after:w-full after:bg-gradient-to-t"
	>
		<CompactHistory></CompactHistory>
	</ScrollArea>
</div>
<div
	class="bottom-bar fixed bottom-0 z-10 flex w-full items-center justify-center bg-primary-foreground shadow-lg"
>
	<button
		onclick={() => openReceiveDrawer.set(true)}
		class="z-0 flex h-full flex-grow items-center justify-center gap-2 pb-3 pt-4 opacity-70 transition-all duration-300 hover:opacity-100 active:bg-secondary"
	>
		<Download></Download>
		&nbsp; Receive
	</button>
	<button
		class="z-10 -m-6 flex-shrink rounded-full bg-nutstash p-8 transition-all duration-300 hover:bg-nutstashsecondary hover:p-9 active:bg-nutstashsecondary"
		onclick={() => openScannerDrawer.set(true)}
	>
		<QrCode></QrCode>
	</button>
	<button
		onclick={() => openSendDrawer.set(true)}
		class="z-0 flex flex-grow items-center justify-center gap-2 pb-3 pl-4 pt-4 opacity-70 transition-all duration-300 hover:opacity-100 active:bg-secondary"
	>
		<Upload></Upload>
		&nbsp; Send &nbsp;&nbsp;
	</button>
</div>

<style>
	.bottom-bar {
		box-shadow: 0px 10px 30px rgba(0, 0, 0, 1);
	}
</style>
