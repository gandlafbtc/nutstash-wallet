<script lang="ts">
	import { onMount } from 'svelte';

	import { key } from '../../stores/key';
	import { showShortCuts } from '../../stores/showShortCuts';
    import Button from '$lib/components/ui/button/button.svelte';
    import { Lock } from 'lucide-svelte';

	onMount(() => {
		const keyDown = (e: KeyboardEvent) => {
			if (e.key === 'X') {
				lock()
			}
		};
		window.addEventListener('keydown', keyDown);

		return () => {
			// this function is called when the component is destroyed
			window.removeEventListener('keydown', keyDown);
		};
	});

	const lock = () => {
		key.set(undefined);
		console.log('lock');
	};
</script>
<Button 
onclick={lock}
variant="ghost">
	<Lock></Lock>
	<!-- <kbd class="absolute kbd text-neutral-content">X</kbd> -->
</Button>


