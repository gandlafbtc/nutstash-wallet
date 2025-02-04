<script>
	import { mnemonic } from '$lib/stores/persistent/mnemonic';

	import Mnemonic from '$lib/elements/security/Mnemonic.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { pop } from 'svelte-spa-router';
	import { isOnboarded } from '$lib/stores/local/message';
	import OnboardingHeader from './OnboardingHeader.svelte';
</script>

<OnboardingHeader hasBack={false}></OnboardingHeader>
<div class="flex h-screen w-full items-center justify-center">
	<div class="flex w-80 flex-col items-center gap-2 p-2">
		<h2 class="text-xl font-bold">New Seed phrase created!</h2>
		<Mnemonic />
		<div class="card-actions flex w-full flex-col items-center justify-center gap-5 pt-3">
			<Button
				href="/#/wallet/"
				class="btn btn-primary w-full max-w-4xl"
				onclick={() => isOnboarded.set(true)}
			>
				I wrote it down
			</Button>
		</div>
	</div>
</div>
