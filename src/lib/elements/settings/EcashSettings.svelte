<script>
    import AutoReceiveEcashSetting from "./settingsElements/AutoReceiveEcashSetting.svelte";
    import CheckTokenStates from "./settingsElements/CheckTokenStates.svelte";

</script>
<div class="flex gap-2 flex-col">
    <p class="font-bold">
        Receiving tokens
    </p>
    <AutoReceiveEcashSetting></AutoReceiveEcashSetting>
    <p class="font-bold">
        Check token states
    </p>
    <CheckTokenStates></CheckTokenStates>
    
    
</div>