<script>

    import { cashuRequestsStore } from "$lib/stores/persistent/requests";
    import CashuRequestCard from "./CashuRequestCard.svelte";

</script>
<div>
    {#each $cashuRequestsStore as request}
     <CashuRequestCard {request}></CashuRequestCard>
    {/each}
</div>