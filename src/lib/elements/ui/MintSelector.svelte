<script lang="ts">
	import * as Select from "$lib/components/ui/select";
    import type { Mint } from "$lib/model/mint";
	import { mints, selectedMints } from "$lib/stores/mints";
    import { toast } from "$lib/stores/toasts";
    import { Landmark } from "lucide-svelte";

	let { mint = $bindable()}: {mint: Mint} = $props()

	const onValueChange = (value: string) => {
		const mintToSet = $mints.find(mint => mint.mintURL === value)
		if (!mintToSet) {
			toast(`Mint ${value} not found`, 'error')
			return
		}
		mint = mintToSet
	}

</script>

<Select.Root type="single" name="mint-single" {onValueChange} allowDeselect={false}>
	<Select.Trigger class="">
		<Landmark class='h-5 w-5'></Landmark>
		{mint?.mintURL}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.GroupHeading>Available Mints</Select.GroupHeading>
			{#each $mints as m}
				<Select.Item value={m.mintURL} label={m.mintURL}
					>{m.mintURL}</Select.Item
				>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
