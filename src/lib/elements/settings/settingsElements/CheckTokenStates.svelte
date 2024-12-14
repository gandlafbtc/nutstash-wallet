<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import { settings } from "$lib/stores/persistent/settings";

</script>
<div class="w-full flex items-center justify-between gap-2">
    <div class="flex items-center space-x-2 w-full justify-between">
        <Button href='/#/wallet/settings/checkproofs'>Open token checker</Button>
    </div>
</div>