<script>
	import { page } from '$app/stores';
	import { history } from '../stores/history';

	const resetHistory = () => {
		history.set([]);
	};
</script>

<div class="h-screen w-screen flex items-center justify-center">
<h1>{$page.status} {$page.error.message}</h1>
	{#if $page.status === 500}
		An error occured. Maybe your history is corrupted.
		<button on:click={resetHistory}> Reset History </button>
	{/if}
</div>
