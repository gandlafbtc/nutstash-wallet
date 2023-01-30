<script lang="ts">
	import { CashuWallet, getEncodedProofs } from '@gandlaf21/cashu-ts';
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
		token = getEncodedProofs(sendData.send??[]);
	} else if (historyItem.type === HistoryItemType.RECEIVE) {
		const recieveData: ReceiveData = historyItem.data;
		token = recieveData.encodedToken??''
	}else if (historyItem.type === HistoryItemType.RECEIVE_NOSTR) {
		const recieveData: ReceiveNostrData = historyItem.data;
		token = recieveData.encodedToken??''
	} else if (historyItem.type === HistoryItemType.MINT) {
		const mintData: MintData = historyItem.data;
		token = getEncodedProofs(mintData.tokens??[]);
	} else {
		const meltData: MeltData = historyItem.data;
		token = getEncodedProofs(meltData.change??[]);
	}
</script>

<tr>
	<td 
		><HistoryIcon type={historyItem.type} />
	</td>
	<td>{historyItem.amount}</td>
	<td>
		<p class="hidden lg:flex">
			{date.toLocaleString('en-us', {
				dateStyle: 'medium',
				timeStyle: 'medium'
			})}
		</p>
		<p class="flex lg:hidden">
			{date.toLocaleString('en-us', {
				dateStyle: 'short'
			})}
		</p>
	</td>
	<td class="max-w-0 overflow-clip">
		{token}
	</td>
</tr>
