<script>
	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { auto_receive_from_trusted_mints } from '$lib/paraglide/messages';
	import { settings } from '$lib/stores/persistent/settings';

	let value = $state($settings[0].tokens.autoReceive);

	const toggle = () => {
		setTimeout(() => {
			settings.setAutoReceive(value);
		}, 50);
	};
</script>

<div class="flex w-full items-center justify-between gap-2">
	<div class="flex w-full items-center justify-between space-x-2">
		<Label for="hide-balance">{auto_receive_from_trusted_mints()}</Label>
		<Switch id="hide-balance" bind:checked={value} onclick={toggle} />
	</div>
</div>
