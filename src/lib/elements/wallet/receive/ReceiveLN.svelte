<script>
    import { mintQuotesStore } from "$lib/stores/mintquotes";
    import LightningInvoice from "./ln/LightningInvoice.svelte";
    import * as Card from "$lib/components/ui/card";
    import * as Carousel from "$lib/components/ui/carousel";
    
</script>
{#if $mintQuotesStore.length}

<Carousel.Root class='w-72'>
    <Carousel.Content>
        {#each $mintQuotesStore as quote}
        <Carousel.Item>
            <div class="h-20">
                {quote.state}
            </div>
            <div class="p-1">
                <Card.Root >
                    <Card.Content
                    class="flex items-center justify-center p-4"
                    >
                    <LightningInvoice invoice={quote.request}>
                        
                    </LightningInvoice>
                    
                </Card.Content>
            </Card.Root>
        </div>
        <div class="h-20">
            
        </div>
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
