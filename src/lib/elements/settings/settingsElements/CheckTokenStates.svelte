<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { check_tokens } from '$lib/paraglide/messages';
	import { settings } from '$lib/stores/persistent/settings';
</script>

<div class="flex w-full items-center justify-between gap-2">
	<div class="flex w-full items-center justify-between space-x-2">
		<Button href="/#/wallet/settings/checkproofs">{check_tokens()}</Button>
	</div>
</div>
