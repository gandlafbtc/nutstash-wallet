<script lang="ts">
	export let colorClass: 'error' | 'warning' | 'success' | 'info';
</script>

<div class="p-1">
	<span class="relative flex h-2 w-2">
		<span
			class:bg-error={colorClass === 'error'}
			class:bg-warning={colorClass === 'warning'}
			class:bg-success={colorClass === 'success'}
			class:bg-info={colorClass === 'info'}
			class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
		></span>
		<span
			class:bg-error={colorClass === 'error'}
			class:bg-warning={colorClass === 'warning'}
			class:bg-success={colorClass === 'success'}
			class:bg-info={colorClass === 'info'}
			class="relative inline-flex rounded-full h-2 w-2"
		></span>
	</span>
</div>
