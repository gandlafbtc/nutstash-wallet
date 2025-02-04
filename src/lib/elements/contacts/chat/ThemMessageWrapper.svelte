<script lang="ts">
	const { children } = $props();
</script>

<div class="m-1 w-64 rounded-xl bg-purple-700 p-2">
	{@render children?.()}
</div>
