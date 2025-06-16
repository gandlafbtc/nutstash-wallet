<script>
	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { hide_balance } from '$lib/paraglide/messages';
	import { settingsStore } from '@gandlaf21/cashu-wallet-engine';
	import { set } from 'date-fns';

	let value = $state($settingsStore[0].general.hideBalance);

	const toggle = () => {
		setTimeout(() => {
			settingsStore.setHideBalance(value);
		}, 50);
	};
</script>

<div class="flex w-full items-center justify-between gap-2">
	<div class="flex w-full items-center justify-between space-x-2">
		<Label for="hide-balance">{hide_balance()}</Label>
		<Switch id="hide-balance" bind:checked={value} onclick={toggle} />
	</div>
</div>
