<script>
	import { t_history } from '$lib/paraglide/messages';
	import CompactHistory from './CompactHistory.svelte';
</script>

<div class="flex flex-col gap-2">
	<p class="text-lg font-bold">{t_history()}</p>
	<CompactHistory></CompactHistory>
</div>
