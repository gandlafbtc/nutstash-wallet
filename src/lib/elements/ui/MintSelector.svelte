<script lang="ts">
	import * as Select from "$lib/components/ui/select";
  import type { Mint } from "$lib/db/models/types";
	import { mints } from "$lib/stores/persistent/mints";
    import { Landmark } from "lucide-svelte";
    import { toast } from "svelte-sonner";


	let { mint = $bindable()}: {mint: Mint} = $props()

	const onValueChange = (value: string) => {
		const mintToSet = $mints.find(mint => mint.url === value)
		if (!mintToSet) {
			toast.error(`Mint ${value} not found`)
			return
		}
		mint = mintToSet
	}

</script>

<Select.Root type="single" name="mint-single" {onValueChange} allowDeselect={false}>
	<Select.Trigger class="">
		<Landmark class='h-5 w-5'></Landmark>
		{mint?.url}
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
