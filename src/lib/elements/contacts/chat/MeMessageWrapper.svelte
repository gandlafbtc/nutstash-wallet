<script lang="ts">
	const { children } = $props();
</script>

<div class="flex w-full justify-end">
	<div class="m-1 w-64 rounded-xl bg-secondary p-2">
		{@render children?.()}
	</div>
</div>
