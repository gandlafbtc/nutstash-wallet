<script>
    import Label from "$lib/components/ui/label/label.svelte";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import { settings } from "$lib/stores/persistent/settings";
    import { set } from "date-fns";
    
    let value = $state($settings[0].general.hideBalance)

    const toggle = () => {
        setTimeout(() => {
            settings.setHideBalance(value)
        }, 50);
    }

</script>
<div class="w-full flex items-center justify-between gap-2">
    <div class="flex items-center space-x-2 w-full justify-between">
        <Label for="hide-balance">Hide balance</Label>
        <Switch id="hide-balance" bind:checked={value} onclick={toggle}/>
      </div>
</div>