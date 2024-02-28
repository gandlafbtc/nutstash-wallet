<script lang="ts">
	import { theme } from '../stores/theme';
	import { isOnboarded } from '../stores/message';
	import Onboarding from '../comp/onboarding/Onboarding.svelte';
	import PasswordInput from '../comp/elements/PasswordInput.svelte';
	import Base from '../comp/base/Base.svelte';
	import { onMount } from 'svelte';
	import { showShortCuts } from '../stores/showShortCuts';
	onMount(() => {
		const keyDown = (e: KeyboardEvent) => {
	if (e.key==='Control') {
		showShortCuts.set(true)
	}
    }
	const keyUp = (e: KeyboardEvent) => {
	if (e.key==='Control') {
		showShortCuts.set(false)
	}
    }
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return ()=>{
      // this function is called when the component is destroyed
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    }
  });

</script>


<div
	class="w-full h-screen max-h-screen p-1 bg-gradient-to-br from-primary to-secondary overflow-auto flex justify-center"
	data-theme={$theme}
>
	<PasswordInput>
		<!-- && !$page.url.searchParams?.get('token') && !$page.url.searchParams?.get('mint') -->
		{#if !$isOnboarded}
			<Onboarding />
		{:else}
			<Base></Base>
		{/if}
	</PasswordInput>
</div>
