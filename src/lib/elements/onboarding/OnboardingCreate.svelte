<script>
	import { mnemonic } from '$lib/stores/persistent/mnemonic';

	import Mnemonic from '$lib/elements/security/Mnemonic.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { pop } from 'svelte-spa-router';
	import { isOnboarded } from '$lib/stores/local/message';
	import OnboardingHeader from './OnboardingHeader.svelte';
	import { i_wrote_it_down, new_seed_phrase_created } from '$lib/paraglide/messages';
</script>

<OnboardingHeader hasBack={false}></OnboardingHeader>
<div class="flex h-screen w-full items-center justify-center">
	<div class="flex w-80 flex-col items-center gap-2 p-2 xl:w-[600px]">
		<h2 class="text-xl font-bold">{new_seed_phrase_created()}!</h2>
		<Mnemonic />
		<div class="card-actions flex w-full flex-col items-center justify-center gap-5 pt-3">
			<Button
				href="/#/wallet/"
				class="btn btn-primary w-full max-w-4xl"
				onclick={() => isOnboarded.set(true)}
			>
				{i_wrote_it_down()}
			</Button>
		</div>
	</div>
</div>
