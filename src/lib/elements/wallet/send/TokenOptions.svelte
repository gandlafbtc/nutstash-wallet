<script lang="ts">
	import Toggle from '$lib/components/ui/toggle/toggle.svelte';
	import type { types } from '@gandlaf21/cashu-wallet-engine';
	import { t_lock } from '$lib/paraglide/messages';
	
	const {
		tokenOptions = $bindable(),
		mint
	}: {
		mint: types.Mint;
		tokenOptions: {
			p2pk: boolean;
			customIn: boolean;
			customOut: boolean;
			includeReceiverFees: boolean;
		};
	} = $props();
</script>

<div class="flex gap-2">
	{#if mint.info.nuts[10]?.supported}
		<Toggle aria-label="toggle bold" bind:pressed={tokenOptions.p2pk}>{t_lock()}</Toggle>
	{/if}
</div>
