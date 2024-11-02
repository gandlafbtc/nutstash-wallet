<script lang="ts">
    import { mints } from "$lib/stores/persistent/mints";
    import { onMount } from "svelte";
    import { params } from "svelte-spa-router";
    const mint = $derived(mints.getByHost($params?.url??''))
    onMount(()=> {
        
    })

</script>

{mint?.info?.name}