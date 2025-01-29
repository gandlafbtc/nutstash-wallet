	
<script lang="ts">
    import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import { mints } from "$lib/stores/persistent/mints";
    import { onMount } from "svelte";
    import AllMintsCompact from "../AllMintsCompact.svelte";
    import MintCompact from "../MintCompact.svelte";
    import { selectedMint } from "$lib/stores/local/selectedMints";
   
    let api = $state<CarouselAPI>();
    
    $effect(() => {
      if (api) {
        api.on("settle", () => {
        if (!api) {
            return
        }
            selectedMint.set(api?.internalEngine().index.get()-1)
        });
      }
    });
  </script>
   
   <div class="w-80 ">
       <Carousel.Root opts={{startIndex: $selectedMint+1, duration:10,}} setApi={(emblaApi) => (api = emblaApi)}>
           <Carousel.Previous class='hidden sm:flex' />
           <div class="from-background flex
  after:bg-gradient-to-r after:z-10 after:absolute after:w-5 after:h-full after:left-0 after:pointer-events-none
  before:bg-gradient-to-l before:z-10 before:absolute before:w-5 before:h-full before:right-0 before:pointer-events-none">

               <Carousel.Content class='ml-4  mr-4'>
                   <Carousel.Item class='-pl-4'>
                       <div class="p-1">
                           <AllMintsCompact> </AllMintsCompact>
                        </div>
                    </Carousel.Item>
                    
                    {#each $mints as mint}
                    <Carousel.Item class='-pl-4'>
                        <div class="p-1">
                            <MintCompact {mint}> </MintCompact>
                        </div>
                    </Carousel.Item>
                    {/each}
                </Carousel.Content>
            </div>
            <Carousel.Next class='hidden sm:flex'/>
        </Carousel.Root>
    </div>