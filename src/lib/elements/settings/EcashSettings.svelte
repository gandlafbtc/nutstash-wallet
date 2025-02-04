<script>
	import AutoReceiveEcashSetting from './settingsElements/AutoReceiveEcashSetting.svelte';
	import CheckTokenStates from './settingsElements/CheckTokenStates.svelte';
</script>

<div class="flex flex-col gap-2">
	<p class="font-bold">Receiving tokens</p>
	<AutoReceiveEcashSetting></AutoReceiveEcashSetting>
	<p class="font-bold">Check token states</p>
	<CheckTokenStates></CheckTokenStates>
</div>
