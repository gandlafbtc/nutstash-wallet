<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Lock } from 'lucide-svelte';
	import { mintsStore as mints, key } from '@gandlaf21/cashu-wallet-engine/stores';

	const lock = () => {
		key.set(undefined);
		mints.clear();
	};
</script>

<Button onclick={lock} variant="ghost">
	<Lock></Lock>
	<!-- <kbd class="absolute kbd text-neutral-content">X</kbd> -->
</Button>
