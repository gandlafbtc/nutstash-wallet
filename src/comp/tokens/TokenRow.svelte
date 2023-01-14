<script lang="ts">
	import { CashuWallet } from '@gandlaf21/cashu-js';
	import type { Token } from '../../model/token';
	import TokenIcon from './TokenIcon.svelte';

	export let token: Token
</script>

<tr>
	<td><TokenIcon></TokenIcon></td>
	<td>{token.amount}</td>
	<td>
		{token.id}
	</td>
	<td class="max-w-0 overflow-clip">
		{CashuWallet.getEncodedProofs([token])}
	</td>
</tr>
