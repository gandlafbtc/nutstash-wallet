<script>
	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { settingsStore } from '@gandlaf21/cashu-wallet-engine/stores';

	let value = $state($settingsStore[0].general.useWS??false);

	const toggle = () => {
		setTimeout(() => {
			settingsStore.setUseWS(value);
		}, 50);
	};
</script>

<div class="flex w-full items-center justify-between gap-2">
	<div class="flex w-full items-center justify-between space-x-2">
		<Label for="use-ws-label">Use Websocket updates for mint quotes</Label>
		<Switch id="use-ws-label" bind:checked={value} onclick={toggle} />
	</div>
</div>
