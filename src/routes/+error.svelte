<script>
	import { page } from '$app/stores';
	import ResetHistoryButton from '../comp/elements/ResetHistoryButton.svelte';
	import BackupButton from '../comp/elements/BackupButton.svelte';
</script>

<div class="h-screen w-screen flex items-center justify-center">
	<h1>{$page.status} {$page.error?.message}</h1>

	{#if $page.status === 500}
		An error occured.
		<ResetHistoryButton />
		<BackupButton />
	{/if}
</div>
