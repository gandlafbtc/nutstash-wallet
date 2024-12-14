<script>

    import Button from "$lib/components/ui/button/button.svelte";
    import { ChevronsLeft } from "lucide-svelte";
    import { pop } from "svelte-spa-router";

    const {hasBack=true} = $props()

</script>
<div class="fixed pt-4 px-4 flex w-full justify-between">
    <div class="w-20">
        {#if hasBack}
        <Button
        variant="link"
        onclick={() => {
            pop()
        }}
    >
    <ChevronsLeft></ChevronsLeft>
    Back
</Button>
{/if}
</div>
    <div>
        <img src="/nutstash-written.svg" alt="logo text" class="h-10">
    </div>
    <div class="w-20">

    </div>
</div>
