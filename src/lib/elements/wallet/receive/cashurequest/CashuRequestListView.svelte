<script>

    import { cashuRequestsStore } from "$lib/stores/persistent/requests";
    import CashuRequestCard from "./CashuRequestCard.svelte";

</script>
<div class="flex flex-col gap-2 w-80 justify-start">
    <p class="font-bold text-lg">
        Requests
    </p>
    {#each $cashuRequestsStore as request}
     <CashuRequestCard isListView={true} {request}></CashuRequestCard>
    {/each}
</div>