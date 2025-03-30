<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { t_back } from '$lib/paraglide/messages';
	import { ChevronsLeft } from 'lucide-svelte';
	import { pop } from 'svelte-spa-router';

	const { hasBack = true } = $props();
</script>

<div class="fixed flex w-full justify-between px-4 pt-4">
	<div class="w-20">
		{#if hasBack}
			<Button
				variant="link"
				onclick={() => {
					pop();
				}}
			>
				<ChevronsLeft></ChevronsLeft>
				{t_back()}
			</Button>
		{/if}
	</div>
	<div>
		<img src="/nutstash-written.svg" alt="logo text" class="h-10" />
	</div>
	<div class="w-20"></div>
</div>
