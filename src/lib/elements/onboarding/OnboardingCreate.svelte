<script>
	import { mnemonic } from '$lib/stores/persistent/mnemonic';

	import Mnemonic from '$lib/elements/security/Mnemonic.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import { pop } from 'svelte-spa-router';
    import { isOnboarded } from '$lib/stores/local/message';
    import OnboardingHeader from './OnboardingHeader.svelte';

</script>
<OnboardingHeader hasBack={false}></OnboardingHeader>
<div class="flex w-full h-full items-center justify-center">
	<div class="flex flex-col gap-2 items-center p-2 w-80">
		<h2 class="text-xl font-bold ">New Seed phrase created!</h2>
		<Mnemonic />
		<div class="card-actions gap-5 flex items-center justify-center w-full pt-3 flex-col">
			<Button href="/#/wallet/" class="btn btn-primary w-full max-w-4xl" onclick={()=> isOnboarded.set(true)}>
				I wrote it down
			</Button>
</div>

</div>
</div>