<script lang="ts">
    import { mintQuotesStore } from "$lib/stores/persistent/mintquotes";
    import * as Carousel from "$lib/components/ui/carousel";
    import { onMount } from "svelte";
    import {MediaQuery} from 'runed'
    import MintQuoteItem from "./MintQuoteItem.svelte";
    import MintQuoteListItem from "./MintQuoteListItem.svelte";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import * as Pagination from "$lib/components/ui/pagination";
    
    const isDesktop = new MediaQuery("(min-width: 768px)");
 
 const count = $derived($mintQuotesStore.length);

 const perPage = $derived(isDesktop.matches ? 10 : 10);
 const siblingCount = $derived(isDesktop.matches ? 3 : 3);
 let page = $state(1)
 let currentQuotes = $derived($mintQuotesStore.slice((page - 1) * perPage, page * perPage ))
    
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
    console.log($mintQuotesStore)
</script>
{#if $mintQuotesStore.length}
<div class="h-full pt-16">
    	
   
   <ScrollArea class='h-[90%]'>
    {#each  currentQuotes as quote}
           <MintQuoteListItem {quote} {millisNow}></MintQuoteListItem>
     {/each}
     </ScrollArea>

  <Pagination.Root {count} {perPage} {siblingCount} bind:page>
    {#snippet children({ pages, currentPage })}
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.PrevButton />
        </Pagination.Item>
        {#each pages as page (page.key)}
          {#if page.type === "ellipsis"}
            <Pagination.Item>
              <Pagination.Ellipsis />
            </Pagination.Item>
          {:else}
            <Pagination.Item isVisible={currentPage === page.value}>
              <Pagination.Link {page} isActive={currentPage === page.value}>
                {page.value}
              </Pagination.Link>
            </Pagination.Item>
          {/if}
        {/each}
        <Pagination.Item>
          <Pagination.NextButton />
        </Pagination.Item>
      </Pagination.Content>
    {/snippet}
  </Pagination.Root>
  
  
    

</div>
{:else}
<div class="h-20">
    <p>No invoices created yet.</p>
</div>
{/if}
