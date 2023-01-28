<script lang="ts">
	import NostrSocket from '../comp/plugin/NostrSocket.svelte';
	import { useNostr } from '../stores/nostr';
	import '../app.css';

</script>

{#if $useNostr }
     <NostrSocket></NostrSocket>
{/if}
<slot />
