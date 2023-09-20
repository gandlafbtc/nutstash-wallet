<script lang="ts">
	import NostrSocket from '../comp/plugin/NostrSocket.svelte';
	import { useNostr } from '../stores/nostr';
	import '../app.css';
	import StorageManager from '../comp/plugin/StorageManager.svelte';
	import Toasts from '../comp/Toasts.svelte';
</script>

{#if $useNostr}
	<NostrSocket />
{/if}
<StorageManager />
<slot />

<Toasts />
