<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Delete } from 'lucide-svelte';

	const {

		onkeypressed
	}: {  onkeypressed: (value: string) => void } = $props();
</script>

<div class="grid h-full w-full grid-cols-3 grid-rows-4 gap-2">
	{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as n}
		<Button class="h-full w-full" onclick={() => onkeypressed(n.toString())}>{n}</Button>
	{/each}
	<Button variant="secondary" class="h-full w-full" onclick={() => onkeypressed('clear')}>C</Button>
	<Button class="h-full w-full" onclick={() => onkeypressed('0')}>0</Button>
	<Button
		class="h-full w-full"
		onclick={() => onkeypressed("delete")}
		variant="destructive"
	>
		<Delete></Delete>
	</Button>
</div>
