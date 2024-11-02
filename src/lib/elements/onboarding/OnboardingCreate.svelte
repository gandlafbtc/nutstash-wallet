<script>
	import { mnemonic } from '$lib/stores/persistent/mnemonic';

	import Mnemonic from '$lib/elements/security/Mnemonic.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import { pop } from 'svelte-spa-router';

</script>

<div class="flex w-full h-full items-center justify-center">
	<div class="flex flex-col gap-2 items-center p-2 max-w-xl">
		<h2 class="text-xl font-bold pt-32">New Seed phrase created!</h2>
		<Mnemonic />
		<div class="card-actions gap-5 flex items-center justify-center w-full pt-3 flex-col">
			<Button href="/#/onboarding/addMints" class="btn btn-primary w-full max-w-4xl">
				I wrote it down
			</Button>
			<button
			class="font-bold hover:underline"
			on:click={() => {
				mnemonic.set([]);
				pop()
			}}
	>
	Abort
</button>
</div>

</div>
</div>