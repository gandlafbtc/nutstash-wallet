<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { pop } from 'svelte-spa-router';
	import PasswordSetup from '../security/PasswordSetup.svelte';
	import OnboardingHeader from './OnboardingHeader.svelte';
</script>

<OnboardingHeader></OnboardingHeader>
<div class="flex h-screen w-full items-center justify-center">
	<div class="flex w-80 xl:w-[600px]">
		<PasswordSetup></PasswordSetup>
	</div>
</div>
