<script lang="ts">
	import type { HistoryData } from 'src/model/data/HistoryData';
	import type { HistoryItem } from 'src/model/historyItem';
	import HistoryIcon from './HistoryIcon.svelte';

	export let historyItem: HistoryItem<HistoryData>;
	export let i: number;

	const date = new Date(historyItem.date);
</script>

<tr>
	<td><HistoryIcon type={historyItem.type} /></td>
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
	<td>
		<label for="history-item-{i}" class="hover:text-primary cursor-pointer">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-4 h-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
				/>
			</svg>
		</label>
	</td>
</tr>

<input type="checkbox" id="history-item-{i}" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<div class="mockup-code">
			<pre><code>{JSON.stringify(historyItem.data, undefined, 4)}</code></pre>
		</div>
		<div class="modal-action">
			<label for="history-item-{i}" class="btn">close</label>
		</div>
	</div>
</div>
