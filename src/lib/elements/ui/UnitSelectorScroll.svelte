<script lang="ts">
	import type { Mint } from "$lib/db/models/types";
	import { unit } from "$lib/stores/persistent/settings";
	import { getUnitsForMints } from "$lib/util/walletUtils";
	import { ChevronDown, ChevronUp } from "lucide-svelte";
	import { onMount } from "svelte";

  	type Props = { selectedMints: Mint[]; currentUnit: string; disabled?: boolean };

    let { selectedMints, currentUnit = $bindable(), disabled = false }: Props = $props();


    onMount(() => {
		// currentUnit = getDefaultUnit();
	});

	const getDefaultUnit = () => {
		let u = 'sat';
		if ($unit && mintUnits.includes($unit)) {
			return $unit;
		}
		if (selectedMints.length) {
			u = getUnitsForMints(selectedMints)[0];
		}
		return u;
	};

	const getMintsUnits = () => {
		const units = selectedMints.length ? getUnitsForMints(selectedMints) : ['sat'];
		return units;
	};

	let mintUnits = $derived.by(() => getMintsUnits());

	$effect(() => {
		selectedMints = selectedMints;
		currentUnit = getDefaultUnit();
        unit.set(currentUnit)
        selectedIndex = mintUnits.indexOf(currentUnit)
	});

    $effect(() => {
		currentUnit = mintUnits[selectedIndex]
        unit.set(currentUnit)
	});


  
    // State variables
    let selectedIndex = $state(0);
    let containerRef: HTMLDivElement;
    let isDragging = $state(false);
    let startY = $state(0);
    let scrollDistance = $state(0);
  
    // Item height in pixels
    const itemHeight = 60;
  
    // Select item and scroll to it
    function selectItem(index) {
      // Ensure index is within bounds
      if (index < 0) index = 0;
      if (index >= mintUnits.length) index = mintUnits.length - 1;
  
      selectedIndex = index;
  
      // Scroll to the selected item
      if (containerRef) {
        containerRef.scrollTo({
          top: index * itemHeight,
          behavior: 'smooth'
        });
      }
    }
  
    // Handle scroll event
    function handleScroll(e) {
      if (isDragging) return;
  
      const scrollTop = e.target.scrollTop;
      const newIndex = Math.round(scrollTop / itemHeight);
  
      if (newIndex !== selectedIndex) {
        selectedIndex = newIndex;
      }
    }
  
    // Mouse/touch event handlers
    function handleMouseDown(e) {
      isDragging = true;
      startY = e.clientY || (e.touches && e.touches[0].clientY);
      e.preventDefault();
    }
  
    function handleMouseMove(e) {
      if (!isDragging) return;
  
      const currentY = e.clientY || (e.touches && e.touches[0].clientY);
      const delta = startY - currentY;
  
      scrollDistance += delta;
      startY = currentY;
  
      // Update selection based on drag distance
      const scrollIndex = Math.round(scrollDistance / itemHeight);
      selectItem(scrollIndex);
  
      e.preventDefault();
    }
  
    function handleMouseUp() {
      isDragging = false;
    }
  
    // Navigation functions
    function selectPrev() {
      selectItem(selectedIndex - 1);
    }
  
    function selectNext() {
      selectItem(selectedIndex + 1);
    }
  
    // Initialize scroll position
    $effect(() => {
      if (containerRef) {
        containerRef.scrollTop = selectedIndex * itemHeight;
      }
    });
  </script>
  
  <div class="relative h-[80px] w-full max-w-[60px] mx-auto overflow-hidden">
    <!-- Click area to scroll up -->


  
    <!-- Scrollable container -->
    <div 
      bind:this={containerRef}
      class="h-full overflow-auto scrollbar-hide snap-y snap-proximity"
      onscroll={handleScroll}
      ontouchstart={handleMouseDown}
      ontouchmove={handleMouseMove}
      ontouchend={handleMouseUp}
    >
      <!-- Add padding to allow centering -->
      <div class="pt-[10px] pb-[10px]">
        {#each mintUnits as unit, index}
          <div 
            class="flex items-center h-[60px] px-2 snap-center transition-all duration-200"
            class:opacity-100={index === selectedIndex}
            class:opacity-25={Math.abs(index - selectedIndex) === 2}
            class:opacity-50={Math.abs(index - selectedIndex) === 1} 
            class:opacity-0={Math.abs(index - selectedIndex) > 2}
            class:font-bold={index === selectedIndex}
            class:scale-125={index === selectedIndex}
          >
            
            <span class="text-muted-foreground select-none">{unit}</span>
          </div>
        {/each}
      </div>
    </div>
    <button disabled={selectedIndex===0}  class="absolute top-0" class:text-muted={selectedIndex===0} onclick={selectPrev}>
        <ChevronUp></ChevronUp>
    </button>
    <!-- Center selection indicator -->
    <button disabled={selectedIndex === mintUnits.length - 1}  class="absolute bottom-0" class:text-muted={selectedIndex===mintUnits.length-1} onclick={selectNext}>
        <ChevronDown></ChevronDown>
    </button>
  </div>
  
  <style>
    /* Hide scrollbar */
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  </style>
  