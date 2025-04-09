<script lang="ts">
	import Switch from "$lib/components/ui/switch/switch.svelte";

    import { useSingleAmount } from "$lib/stores/session/useKvac";
    
</script>

<div class="flex gap-2 items-center justify-center">

   <Switch value={$useSingleAmount} onclick={() => useSingleAmount.set(!$useSingleAmount)}></Switch>
</div>