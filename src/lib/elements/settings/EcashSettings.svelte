<script>
	import { check_token_states, receiving_tokens } from '$lib/paraglide/messages';
	import AutoReceiveEcashSetting from './settingsElements/AutoReceiveEcashSetting.svelte';
	import CheckTokenStates from './settingsElements/CheckTokenStates.svelte';
</script>

<div class="flex flex-col gap-2">
	<p class="font-bold">{receiving_tokens()}</p>
	<AutoReceiveEcashSetting></AutoReceiveEcashSetting>
	<p class="font-bold">{check_token_states()}</p>
	<CheckTokenStates></CheckTokenStates>
</div>
