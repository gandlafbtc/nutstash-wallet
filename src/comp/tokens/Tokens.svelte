<script lang="ts">
	import { useNostr, nostrMessages } from '../../stores/nostr';
	import AvailableTokensTable from './AvailableTokensTable.svelte';
	import InboxTable from './InboxTable.svelte';

	import TokenTable from './TokenTable.svelte';

	let activeTab = 'history';

	const changeTab = (tabName: string) => {
		activeTab = tabName;
	};
</script>

<div class="tabs">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="tab tab-bordered {activeTab === 'history' ? 'tab-active' : ''}"
		on:click={() => changeTab('history')}
	>
		History
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="tab tab-bordered {activeTab === 'tokens' ? 'tab-active' : ''}"
		on:click={() => changeTab('tokens')}
	>
		Tokens
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#if $useNostr}
		<div
			class="flex gap-2 tab tab-bordered {activeTab === 'inbox' ? 'tab-active' : ''}"
			on:click={() => changeTab('inbox')}
		>
			Inbox
			{#if $nostrMessages.filter((nM) => {
				return !nM.isAccepted;
			}).length > 0}
				<span class="flex h-3 w-3">
					<div class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-info opacity-75" />
					<div class="relative inline-flex rounded-full h-2 w-2 bg-info" />
				</span>
			{/if}
		</div>
	{/if}
</div>
{#if activeTab === 'history'}
	<div class="flex flex-col w-full h-full justify-start">
		<TokenTable />
	</div>
{/if}
{#if activeTab === 'tokens'}
	<div class="flex flex-col w-full h-full justify-start">
		<AvailableTokensTable />
	</div>
{/if}
{#if $useNostr}
	{#if activeTab === 'inbox'}
		<div class="flex flex-col w-full h-full justify-start">
			<InboxTable />
		</div>
	{/if}
{/if}
