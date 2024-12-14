<script lang="ts">
    import { cashuRequestsStore } from "$lib/stores/persistent/requests";
    import { params } from "svelte-spa-router";
    import CashuRequestCard from "./CashuRequestCard.svelte";

    const request = $derived( cashuRequestsStore.getBy($params?.id??'', 'id'))
</script>

{#if request}
<div>
    <CashuRequestCard {request}>

    </CashuRequestCard>
</div>
{/if}
