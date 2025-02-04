<script lang="ts">
	import Toggle from '$lib/components/ui/toggle/toggle.svelte';
	import { Lock, FileInput, FileOutput, HandCoins } from 'lucide-svelte';

	const {
		tokenOptions = $bindable()
	}: {
		tokenOptions: {
			p2pk: boolean;
			customIn: boolean;
			customOut: boolean;
			includeReceiverFees: boolean;
		};
	} = $props();
</script>

<div class="flex gap-2">
	<Toggle aria-label="toggle bold" bind:pressed={tokenOptions.p2pk}>
		<Lock class="h-4 w-4"></Lock>
	</Toggle>

	<Toggle aria-label="toggle bold" bind:pressed={tokenOptions.includeReceiverFees}>
		<HandCoins class="h-4 w-4"></HandCoins>
	</Toggle>

	<!-- <Toggle aria-label="toggle bold" bind:pressed={tokenOptions.customIn}>
        <FileInput class='w-4 h-4'>
            
        </FileInput>
    </Toggle>
    <Toggle aria-label="toggle bold" bind:pressed={tokenOptions.customOut}>
        <div class="img-hor-vert">
            <FileOutput class='w-4 h-4 '>
                
            </FileOutput>
        </div>
    </Toggle> -->
</div>

<style>
	.img-hor-vert {
		-moz-transform: scale(-1, 1);
		-o-transform: scale(-1, 1);
		-webkit-transform: scale(-1, 1);
		transform: scale(-1, 1);
	}
</style>
