<script>
	import { cashuRequestsStore } from '$lib/stores/persistent/requests';
	import CashuRequestCard from './CashuRequestCard.svelte';
</script>

<div class="flex w-80 flex-col justify-start gap-2">
	<p class="text-lg font-bold">Requests</p>
	{#each $cashuRequestsStore as request}
		<CashuRequestCard isListView={true} {request}></CashuRequestCard>
	{/each}
</div>
