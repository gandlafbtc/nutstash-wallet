<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { mints } from '$lib/stores/persistent/mints';
	import { Ellipsis, Loader, Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import MintDropdownActions from './MintDropdownActions.svelte';

	let { mint } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Sidebar.MenuAction {...props}>
				<Ellipsis />
			</Sidebar.MenuAction>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content side="right" align="start">
		<MintDropdownActions {mint}></MintDropdownActions>
	</DropdownMenu.Content>
</DropdownMenu.Root>
