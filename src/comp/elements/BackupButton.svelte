<script lang="ts">
	import { mints } from '../../stores/mints';
	import { token } from '../../stores/tokens';
	import { contacts } from '../../stores/contacts';
	import { counts } from '../../stores/counts';
	import { history } from '../../stores/history';
	import { mintRequests } from '../../stores/mintReqs';
	import { mnemonic } from '../../stores/mnemonic';
	import { nostrMessages, nostrPrivKey, nostrPubKey, nostrRelays, useExternalNostrKey, useNostr } from '../../stores/nostr';
	import { pendingTokens } from '../../stores/pendingtokens';
	import { spentTokens } from '../../stores/spenttokens';
	import { theme } from '../../stores/theme';


	function backupTokens() {
		var dataStr =
			'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(
				{
					backupVersion: 'nutstash-2',
					contacts: $contacts,
					counts: $counts,
					history: $history,
					mintRequests: $mintRequests,
					mints: $mints,
					mnemonic: $mnemonic,
					useNostr: $useNostr,
					useExternalNostrKey: $useExternalNostrKey,
					nostrPrivKey: $nostrPrivKey,
					nostrPubKey: $nostrPubKey,
					nostrMessages: $nostrMessages,
					nostrRelays: $nostrRelays,
					pendingTokens: $pendingTokens,
					spentTokens, $spentTokens,
					theme: $theme,
					token: $token,
				}
			));
		var downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute('href', dataStr);
		downloadAnchorNode.setAttribute('download', 'nutstash_backup.json');
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}
</script>

<button class="btn btn-primary" on:click={backupTokens}> Export File </button>
