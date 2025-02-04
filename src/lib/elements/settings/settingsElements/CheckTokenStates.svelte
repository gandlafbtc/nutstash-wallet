<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { settings } from '$lib/stores/persistent/settings';
</script>

<div class="flex w-full items-center justify-between gap-2">
	<div class="flex w-full items-center justify-between space-x-2">
		<Button href="/#/wallet/settings/checkproofs">Open token checker</Button>
	</div>
</div>
