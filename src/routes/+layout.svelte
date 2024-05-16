<script lang="ts">
	import NostrSocket from '../comp/plugin/NostrSocket.svelte';
	import { useNostr } from '../stores/nostr';
	import '../app.css';
	import StorageManager from '../comp/plugin/StorageManager.svelte';
	import Toasts from '../comp/Toasts.svelte';
</script>

<StorageManager>
	{#if $useNostr}
		<NostrSocket />
	{/if}
	<slot />
	<Toasts />
</StorageManager>
