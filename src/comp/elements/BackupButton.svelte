<script lang="ts">
	import { mints } from '../../stores/mints';
	import { token } from '../../stores/tokens';
	import { type Token } from '@cashu/cashu-ts';
	import { getMintForToken, getTokensForMint } from '../util/walletUtils';

	const createToken = () => {
		const exportableToken: Token = { token: [] };
		$mints.forEach((m) => {
			exportableToken.token.push({ mint: m.mintURL, proofs: getTokensForMint(m, $token) });
		});
		return exportableToken;
	};

	function backupTokens() {
		var dataStr =
			'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(createToken()));
		var downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute('href', dataStr);
		downloadAnchorNode.setAttribute('download', 'nutstash_backup.json');
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}
</script>

<button class="btn btn-primary" on:click={backupTokens}> Export File </button>
