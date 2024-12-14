<script lang="ts">
    import { getBy, getByHost } from "$lib/stores/persistent/helper/storeHelper";
    import { mints } from "$lib/stores/persistent/mints";
    import { onMount } from "svelte";
    import { params } from "svelte-spa-router";
    import MintDetail from "./MintDetail.svelte";
    
    const mint = $derived(getByHost($mints, $params?.url??''))
    onMount(()=> {
        
    })

</script>
{#if mint}
<div class="h-full flex items-start">

    <MintDetail {mint}></MintDetail>
</div>
{/if}