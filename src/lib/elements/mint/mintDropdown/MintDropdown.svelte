<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Ellipsis, Loader, Trash } from 'lucide-svelte';
	import MintDropdownActions from './MintDropdownActions.svelte';

	let { mint } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost">
			<Ellipsis></Ellipsis>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content side="right" align="start">
		<MintDropdownActions {mint}></MintDropdownActions>
	</DropdownMenu.Content>
</DropdownMenu.Root>
