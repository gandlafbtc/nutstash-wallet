<script>
    import * as Carousel from "$lib/components/ui/carousel";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { keysStore } from "$lib/stores/persistent/keys";
    import Address from "./Address.svelte";

</script>
<div class="h-full mt-32 flex flex-col gap-4">
    <p class="font-bold">My Addresses</p>
    <Carousel.Root class="w-full max-w-xs">
        <Carousel.Content>
            {#each $keysStore.map(ks=> ks.publicKey) as pub}
            <Carousel.Item>
                <Address {pub}></Address>
            </Carousel.Item>
            {/each}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>
</div>