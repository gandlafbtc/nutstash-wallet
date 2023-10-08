<script lang="ts">
	import { getEncodedToken } from '@cashu/cashu-ts';
	import type { MeltData } from '../../model/data/MeltData';
	import type { ReceiveNostrData } from '../../model/data/ReceiveNostrData';
	import type { MintData } from '../../model/data/MintData';
	import type { ReceiveData } from '../../model/data/ReceiveData';
	import type { SendData } from '../../model/data/SendData';
	import { HistoryItemType, type HistoryItem } from '../../model/historyItem';
	import HistoryIcon from '../history/HistoryIcon.svelte';

	export let historyItem: HistoryItem<any>;

	const date = new Date(historyItem.date);
	let token: string;

	if (historyItem.type === HistoryItemType.SEND) {
		const sendData: SendData = historyItem.data;
		token = getEncodedToken({
			token: [{ proofs: sendData.send ?? [], mint: sendData.mint ?? '' }]
		});
	} else if (historyItem.type === HistoryItemType.RECEIVE) {
		const recieveData: ReceiveData = historyItem.data;
		token = recieveData.encodedToken ?? '';
	} else if (historyItem.type === HistoryItemType.RECEIVE_NOSTR) {
		const recieveData: ReceiveNostrData = historyItem.data;
		token = recieveData.encodedToken ?? '';
	} else if (historyItem.type === HistoryItemType.MINT) {
		const mintData: MintData = historyItem.data;
		token = getEncodedToken({
			token: [{ proofs: mintData.tokens ?? [], mint: mintData.mint ?? '' }]
		});
	} else {
		const meltData: MeltData = historyItem.data;
		token = getEncodedToken({
			token: [{ proofs: meltData.change ?? [], mint: meltData.mint ?? '' }]
		});
	}


</script>

<tr>
	<td><HistoryIcon type={historyItem.type} /> </td>
	<td>{historyItem.amount}</td>
	<td>
		<p class="hidden lg:flex">
			{date.toLocaleString('en-uk', {
				dateStyle: 'short',
				timeStyle: 'short',
			})}
		</p>
		<p class="flex lg:hidden">
			{date.toLocaleString('en-uk', {
				dateStyle: 'short'
			})}
		</p>
	</td>
	<td class="max-w-0 overflow-clip">
		{token}
	</td>
</tr>
