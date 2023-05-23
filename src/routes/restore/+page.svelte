<script lang="ts">
	import type { Proof } from '@cashu/cashu-ts';
	import Step1 from '../../comp/restore/Step1.svelte';
	import Step2 from '../../comp/restore/Step2.svelte';
	import Step3 from '../../comp/restore/Step3.svelte';
	import Step4 from '../../comp/restore/Step4.svelte';
	import type { Mint } from '../../model/mint';

	import { mints } from '../../stores/mints';
	import { toast } from '../../stores/toasts';
	import { token } from '../../stores/tokens';
	let step = 1;
	let backupObject: { proofs: Array<Proof>; mints: Array<Mint> };

	const nextStep = () => {
		if (step > 3) {
			return;
		}
		if (step === 2 && Object.keys(backupObject).length === 0) {
			toast('info', 'Select a backup file to continue', 'no backup found');
			return;
		}
		if (step === 3) {
			mints.set(backupObject.mints);
			token.set(backupObject.proofs);
		}
		step++;
	};
	const previousStep = () => {
		if (step < 2) {
			return;
		}
		step--;
	};
</script>

<div class="flex flex-col m-2 gap-2">
	<div class="w-full flex">
		<a class="btn" href="/"> Abort </a>
		<ul class="steps w-full">
			<li class="step {step > 0 ? 'step-primary' : ''}">Start</li>
			<li class="step {step > 1 ? 'step-primary' : ''}">File</li>
			<li class="step {step > 2 ? 'step-primary' : ''}">Restore</li>
			<li class="step {step > 3 ? 'step-primary' : ''}">Done</li>
		</ul>
	</div>
	<div class="w-full h-[30em] flex items-center justify-center gap-2">
		{#if step === 1}
			<Step1 />
		{:else if step === 2}
			<Step2 bind:backupObject />
		{:else if step === 3}
			<Step3 bind:backupObject />
		{:else}
			<Step4 />
		{/if}
	</div>
	{#if step <= 3}
		<div class="flex justify-center w-full gap-2">
			<button class="btn {step === 1 ? 'btn-disabled' : ''}" on:click={previousStep}> back </button>
			<button class="btn btn-primary" on:click={nextStep}> continue </button>
		</div>
	{/if}
</div>
