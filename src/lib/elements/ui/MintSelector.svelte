<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { types } from '@gandlaf21/cashu-wallet-engine';
	import { mintsStore as mints } from '@gandlaf21/cashu-wallet-engine/stores';
	import { available_mints } from '$lib/paraglide/messages';
	import { Landmark } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	type Props = { mint: types.Mint; onchange?: (value: string) => void; disabled?: boolean };

	let { mint = $bindable(), onchange, disabled = false }: Props = $props();

	const onValueChange = (value: string) => {
		const mintToSet = $mints.find((mint) => mint.url === value);
		if (!mintToSet) {
			toast.error(`Mint ${value} not found`);
			return;
		}
		mint = mintToSet;
		if (onchange) {
			onchange(value);
		}
	};
</script>

<Select.Root type="single" name="mint-single" {onValueChange} allowDeselect={false} {disabled}>
	<Select.Trigger class="break-all">
		<Landmark class="h-5 w-5"></Landmark>
		{mint?.url}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.GroupHeading>{available_mints()}</Select.GroupHeading>
			{#each $mints as m}
				<Select.Item value={m.url} label={m.url}>{m.url}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
