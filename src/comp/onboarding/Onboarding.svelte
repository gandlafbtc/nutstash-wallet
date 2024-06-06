<script>
	import OnboardingCreate from './OnboardingCreate.svelte';
	import OnboardingInfo from './OnboardingInfo.svelte';
	import OnboardingSelect from './OnboardingSelect.svelte';
	import RecommendedMints from './RecommendedMints.svelte';
	import RestoreFromFile from './RestoreFromFile.svelte';
	import RestoreFromSeed from './RestoreFromSeed.svelte';
	let step = 'info';
</script>

<div class="flex p-2 items-center flex-col gap-2 w-full h-full bg-base-100 rounded-lg max-w-5xl">
	{#if step === 'info'}
		<OnboardingInfo bind:step></OnboardingInfo>
	{/if}
	{#if step === 'select'}
		<OnboardingSelect bind:step></OnboardingSelect>
	{/if}
	{#if step === 'create'}
		<OnboardingCreate bind:step></OnboardingCreate>
	{/if}
	{#if step === 'mints'}
		<RecommendedMints></RecommendedMints>
	{/if}
	{#if step === 'restore'}
		<RestoreFromSeed bind:step></RestoreFromSeed>
	{/if}
	{#if step === 'import'}
		<RestoreFromFile bind:step></RestoreFromFile>
	{/if}
</div>
