<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import AutoReceiveEcashSetting from '../settings/settingsElements/AutoReceiveEcashSetting.svelte';
	import UseWsSetting from '../settings/settingsElements/UseWSSetting.svelte';
	import UseCheckStateSetting from '../settings/settingsElements/UseCheckStateSetting.svelte';
	import ConversionUnitSetting from '../settings/settingsElements/ConversionUnitSetting.svelte';
	import { settingsStore } from '@gandlaf21/cashu-wallet-engine/stores';
	import UseConversionSetting from '../settings/settingsElements/UseConversionSetting.svelte';
	import { toast } from 'svelte-sonner';


	interface Props {settingsConfirmed: boolean}
	
	let {settingsConfirmed=$bindable(false)}: Props = $props();
</script>
	{#if !settingsConfirmed}
	
	<div class="flex w-80 flex-col items-center gap-2 p-2 xl:w-[600px]">
		<h2 class="text-xl font-bold">Almost there! Let's customize the wallet a bit...</h2>
		<h2 class="text-muted">You can change these later in the settings</h2>
		<!-- wallet optimization meter -->
		<div class="w-full mb-4 mt-2">
			<div class="flex justify-between text-sm mb-1">
				<span class="text-nutstash">Control & Privacy</span>
				<span class="text-nutstashsecondary">Convenience & Stability</span>
			</div>
			<div class="h-3 w-full bg-nutstash rounded-full overflow-hidden rotate-180">
				{#if $settingsStore[0]}
				{@const autoReceive = $settingsStore[0].tokens?.autoReceive ?? false}
				{@const useWS = $settingsStore[0].general?.useWS ?? false}
				{@const checkState = $settingsStore[0].general?.subscribeTokenState ?? false}
				{@const useConversion = $settingsStore[0].currency?.useConversion ?? false}
				
				{@const percentage = (autoReceive?10:0)+(useWS?30:0)+(checkState?50:0)+(useConversion?10:0)}
				
				<div class="h-full bg-nutstashsecondary transition-all duration-300" style="width: {percentage}%"></div>
				
				{/if}
			</div>
		</div>
		<!-- customize div -->
		<div class="flex flex-col gap-5 w-full">
			{#if $settingsStore[0]}
			<AutoReceiveEcashSetting></AutoReceiveEcashSetting>
			<UseWsSetting></UseWsSetting>
			<UseCheckStateSetting></UseCheckStateSetting>
			<UseConversionSetting></UseConversionSetting>
			{#if $settingsStore[0].currency.useConversion}
			<ConversionUnitSetting></ConversionUnitSetting>
			{/if}		
			{/if}		
		</div>
		<div class="card-actions flex w-full flex-col items-center justify-center gap-5 pt-3">
			<Button
			class="btn btn-primary w-full max-w-4xl"
			onclick={() => {
				settingsConfirmed=true
				toast.success('Settings saved!')
			}}
			>
			Confirm settings
		</Button>
	</div>
</div>

{/if}