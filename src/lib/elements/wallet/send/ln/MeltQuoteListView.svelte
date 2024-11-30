<script lang="ts">
    import { meltQuotesStore } from "$lib/stores/persistent/meltquotes";
    import {MediaQuery} from 'runed'
    import * as Pagination from "$lib/components/ui/pagination";
    import MeltQuoteListItem from "./MeltQuoteListItem.svelte";
    
    const isDesktop = new MediaQuery("(min-width: 768px)");
 
 const count = $derived($meltQuotesStore.length);

 const perPage = $derived(isDesktop.matches ? 10 : 10);
 const siblingCount = $derived(isDesktop.matches ? 3 : 3);
 let page = $state(1)
 let currentQuotes = $derived($meltQuotesStore.slice((page - 1) * perPage, page * perPage ))
    

</script>
{#if $meltQuotesStore.length}
<div class="h-full pt-16">
    	
   
    {#each  currentQuotes as quote}
           <MeltQuoteListItem {quote}></MeltQuoteListItem>
     {/each}

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
    <p>No payments created yet.</p>
</div>
{/if}
