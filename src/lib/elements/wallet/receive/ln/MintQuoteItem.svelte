<script lang="ts">
    import { params } from "svelte-spa-router";
    import { mintQuotesStore } from "$lib/stores/persistent/mintquotes";
    import { onMount } from "svelte";
    import MintQuoteListItem from "./MintQuoteListItem.svelte";
    
    let quoteId = $derived($params?.quote);

    let quote = $derived($mintQuotesStore.find((q) => q.quote === quoteId))

    $effect(() => {
        $mintQuotesStore
    });

    let time = $state(new Date());

    let millisNow = $derived(time.getTime())

    onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});

    
</script>
{#if quote}
    <MintQuoteListItem isListView={false} {quote} {millisNow}></MintQuoteListItem>
{:else}
    Quote not found
{/if}
