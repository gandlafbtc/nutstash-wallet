<script>
	import { t_requests } from '$lib/paraglide/messages';
	import { cashuRequestsStore } from '@gandlaf21/cashu-wallet-engine/stores';
	import CashuRequestCard from './CashuRequestCard.svelte';
</script>

<div class="flex w-80 flex-col justify-start gap-2 xl:w-[600px]">
	<p class="text-lg font-bold">{t_requests()}</p>
	{#each $cashuRequestsStore as request}
		<CashuRequestCard isListView={true} {request}></CashuRequestCard>
	{/each}
</div>
