<script>
    import { mintQuotesStore } from "$lib/stores/persistent/mintquotes";
    import * as Carousel from "$lib/components/ui/carousel";
    import { onMount } from "svelte";
    import MintQuoteItem from "./ln/MintQuoteItem.svelte";
    

    
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
{#if $mintQuotesStore.length}

<Carousel.Root class='max-w-72 lg:max-w-xl'>
    <Carousel.Content class='max-w-72'>
        {#each $mintQuotesStore as quote}
        <Carousel.Item >
            <MintQuoteItem {quote} {millisNow}></MintQuoteItem>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
</Carousel.Root>

{:else}
<div class="h-20">
    <p>No invoices created yet.</p>
</div>
{/if}
