<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import { Lock } from 'lucide-svelte';
    import { key } from '$lib/stores/session/key';
    import { mints } from '$lib/stores/persistent/mints';

	const lock = () => {
		key.set(undefined);
		mints.clear()
	};
</script>
<Button 
onclick={lock}
variant="ghost">
	<Lock></Lock>
	<!-- <kbd class="absolute kbd text-neutral-content">X</kbd> -->
</Button>


