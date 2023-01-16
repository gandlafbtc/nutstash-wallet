<script lang="ts">
	import AvailableTokensTable from './AvailableTokensTable.svelte';

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
