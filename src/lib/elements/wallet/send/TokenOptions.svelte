<script lang="ts">
	import Toggle from '$lib/components/ui/toggle/toggle.svelte';
	import type { types } from '@gandlaf21/cashu-wallet-engine';
	import { t_lock } from '$lib/paraglide/messages';
	import { Label } from '$lib/components/ui/label';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { Lock } from 'lucide-svelte';
	
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
	<div class="flex justify-between items-center w-full">
		<Label for="p2pk" class="flex items-center gap-1">
			<Lock ></Lock>{t_lock()}
		</Label>
		<Switch bind:checked={tokenOptions.p2pk}  id="p2pk" />
	</div>		
	{/if}
</div>
