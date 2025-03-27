<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Ellipsis, } from 'lucide-svelte';
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
