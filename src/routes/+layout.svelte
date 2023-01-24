<script lang="ts">
	import NostrSocket from '../comp/plugin/NostrSocket.svelte';
	import { useNostr, nostrPubKey, nostrRelays, nostrPrivKey, useExternalNostrKey } from '../stores/nostr';
	import '../app.css';
	import { browser } from '$app/environment';
	
	$: hasExternalSigner = $useExternalNostrKey? browser? window?.nostr?.getPublicKey() ?true :false :false: false


</script>

<!-- only create socket if everything needed is present -->
{#if $useNostr  && $nostrRelays && ((!$useExternalNostrKey && $nostrPrivKey && $nostrPubKey)|| ($useExternalNostrKey &&  hasExternalSigner)) }
     <NostrSocket></NostrSocket>
{/if}
<slot />
