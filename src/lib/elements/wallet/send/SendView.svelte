<script>
    import { scanresultStore } from "$lib/stores/session/transitionstores";
    import { onMount } from "svelte";
    import Send from "./Send.svelte";
    
</script>

<Send input={$scanresultStore}></Send>