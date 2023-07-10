<script lang="ts">
	import Minting from "../mint/Minting.svelte";
import Receiving from "./Receiving.svelte";

    export let active: string;
    export let encodedToken: string = '';

    let isToken = false
    let isMinting = false

</script>

<div class="flex flex-col">

    <button class="flex gap-1 items-center" on:click={()=>active='base'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
    
    <p class="font-bold text-lg">
        back
    </p>
</button>

{#if !isToken}
<Minting bind:active bind:isMinting></Minting>
{/if}

{#if (!isMinting && !isToken)}
<div class="divider">
    or
</div>
{/if}
{#if !isMinting}
<Receiving bind:active bind:encodedToken bind:isToken></Receiving>
{/if}

</div>