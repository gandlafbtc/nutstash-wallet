<script>
	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { hide_balance } from '$lib/paraglide/messages';
	import { settings } from '$lib/stores/persistent/settings';
	import { set } from 'date-fns';

	let value = $state($settings[0].general.hideBalance);

	const toggle = () => {
		setTimeout(() => {
			settings.setHideBalance(value);
		}, 50);
	};
</script>

<div class="flex w-full items-center justify-between gap-2">
	<div class="flex w-full items-center justify-between space-x-2">
		<Label for="hide-balance">{hide_balance()}</Label>
		<Switch id="hide-balance" bind:checked={value} onclick={toggle} />
	</div>
</div>
