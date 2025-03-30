<script lang="ts">
	import Toggle from '$lib/components/ui/toggle/toggle.svelte';
	import type { Mint } from '$lib/db/models/types';
	import { t_lock } from '$lib/paraglide/messages';
	import { selectedMint } from '$lib/stores/local/selectedMints';
	import { Lock, FileInput, FileOutput, HandCoins } from 'lucide-svelte';

	const {
		tokenOptions = $bindable(),
		mint
	}: {
		mint: Mint;
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

