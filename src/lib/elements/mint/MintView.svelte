<script lang="ts">
	import { getByHost, mintsStore as mints } from '@gandlaf21/cashu-wallet-engine/stores';
	import { onMount } from 'svelte';
	import { params } from 'svelte-spa-router';
	import MintDetail from './MintDetail.svelte';

	const mint = $derived(getByHost($mints, $params?.url ?? ''));
	onMount(() => {});
</script>

{#if mint}
	<div class="flex h-full items-start">
		<MintDetail {mint}></MintDetail>
	</div>
{/if}
