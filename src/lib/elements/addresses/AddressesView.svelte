<script>
    import * as Carousel from "$lib/components/ui/carousel";
    import { keysStore } from "$lib/stores/persistent/keys";
    import Address from "./Address.svelte";

</script>
<div class="h-full flex flex-col gap-2 w-80">
    <p class="font-bold text-lg">Addresses</p>
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