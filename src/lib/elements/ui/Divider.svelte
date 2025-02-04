<script lang="ts">
	let { text }: { text?: string } = $props();
</script>

<div class="relative flex w-full items-center justify-center py-1 opacity-40">
	<div class="flex-grow border-t border-primary {text ? '' : 'my-2'}"></div>
	{#if text}
		<span class="mx-4 flex-shrink text-primary">{text}</span>
		<div class="flex-grow border-t border-primary"></div>
	{/if}
</div>
