<script lang="ts">
	import * as Select from "$lib/components/ui/select";
	import { mints } from "$lib/stores/persistent/mints";
  import { selectedMints } from "$lib/stores/local/selectedMints";
    import { Landmark } from "lucide-svelte";

</script>

<Select.Root type="multiple" name="mints" bind:value={$selectedMints}>
	<Select.Trigger class="">
		<Landmark class='h-5 w-5'></Landmark>
		{#if $selectedMints.length === 0}
			No Mints selected
		{:else if $selectedMints.length === 1}
			{$selectedMints.join(", ")}
		{:else if $selectedMints.length === $mints.length}
			All mints
		{:else if $selectedMints.length > 1}
			{$selectedMints.length} Mints selected
		{:else}
			Unknown
		{/if}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.GroupHeading>Available Mints</Select.GroupHeading>
			{#each $mints as m}
				<Select.Item value={m.url} label={m.url}
					>{m.url}</Select.Item
				>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
