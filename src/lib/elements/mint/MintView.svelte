<script lang="ts">
    import { getBy, getByHost } from "$lib/stores/persistent/helper/storeHelper";
    import { mints } from "$lib/stores/persistent/mints";
    import { onMount } from "svelte";
    import { params } from "svelte-spa-router";
    
    const mint = $derived(getByHost($mints, $params?.url??''))
    onMount(()=> {
        
    })

</script>

{mint?.info?.name}