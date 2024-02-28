<script lang="ts">
	import { onMount } from "svelte";


	import { key } from "../../stores/key";
	import { showShortCuts } from "../../stores/showShortCuts";

    onMount(() => {
    const keyDown = (e: KeyboardEvent) => {
	if (e.key==='x') {
        key.set(undefined)
    }
    }
    window.addEventListener("keydown", keyDown);

    return ()=>{
      // this function is called when the component is destroyed
      window.removeEventListener("keydown", keyDown);
    }
  });

</script>
<div class=" h-full flex flex-col justify-end cursor-pointer">
    <div class="tooltip" data-tip="lock wallet">
        <button
            class="btn btn-square hover:text-info"
            on:click={() => {
                key.set(undefined);
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
            >
                <path
                    d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z"
                />
            </svg>
            <div class="relative">
                {#if $showShortCuts}
                    <kbd class="absolute kbd text-neutral-content">x</kbd>
                    {/if}
                </div>
        </button>
    </div>
</div>