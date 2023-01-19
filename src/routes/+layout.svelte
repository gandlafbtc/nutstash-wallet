<script lang="ts">
	import NostrSocket from '../comp/plugin/NostrSocket.svelte';
	import { useNostr, nostrPubKey, nostrRelays, nostrPrivKey } from '../stores/nostr';
	import '../app.css';

</script>

<!-- only create socket if everything needed is present -->
{#if $useNostr && $nostrPubKey && $nostrRelays && $nostrPrivKey  }
     <NostrSocket></NostrSocket>
{/if}
<slot />
