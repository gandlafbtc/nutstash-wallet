<script lang="ts">
    import NostrSocket from "$lib/plugin/NostrSocket.svelte";
    import StorageManager from "$lib/plugin/StorageManager.svelte";
    import Toasts from "$lib/plugin/Toasts.svelte";
    import { useNostr } from "$lib/stores/nostr";
    import { ModeWatcher } from "mode-watcher";
	import "../app.css";

</script>

<ModeWatcher></ModeWatcher>
<StorageManager>
	{#if $useNostr}
		<NostrSocket />
	{/if}
	<div class="w-full h-full fixed">
		<slot />
	</div>
	<div class="relative bottom-0 right-0 z-50">
		<Toasts />
	</div>
</StorageManager>
