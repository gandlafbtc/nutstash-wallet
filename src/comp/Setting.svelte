<script lang="ts">
	import { mnemonic } from '../stores/mnemonic';
	import {
		checkAutomatically,
		checkNonPending,
		checkPending,
		isEncrypted
	} from '../stores/settings';
	import { THEMES } from '../stores/static/themes';

	import { theme } from '../stores/theme';
	import BackupButton from './elements/BackupButton.svelte';
	import DonateButton from './elements/DonateButton.svelte';
	import IncreaseCounters from './elements/IncreaseCounters.svelte';
	import NostrSettings from './elements/NostrSettings.svelte';
	import ResetHistoryButton from './elements/ResetHistoryButton.svelte';
	import ResetPasswordButton from './elements/ResetPasswordButton.svelte';
	import ShowSeed from './elements/ShowSeed.svelte';
	import WipeWalletButton from './elements/WipeWalletButton.svelte';
	import HistoryTable from './history/HistoryTable.svelte';

	let isShowDangerzone = false;
	let showHistory = false;

	const setTheme = (t: string) => {
		theme.set(t);
	};
</script>

{#if showHistory}
	<div class="flex flex-col">
		<div>
			<button class="btn" on:click={() => (showHistory = false)}> back </button>
		</div>
		<HistoryTable></HistoryTable>
	</div>
{:else}
	<div class="flex flex-col justify-start gap-3">
		<p class="text-xl font-bold">Settings</p>
		<div class="w-full flex justify-end">
			<DonateButton></DonateButton>
		</div>
		<div class="flex justify-between items-center">
			<div>
				<label for="theme-dropdown">Theme:</label>
			</div>
			<div class="dropdown dropdown-bottom dropdown-end" id="theme-dropdown">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn">{$theme}</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60 overflow-scroll scrollbar-hide"
				>
					<!-- svelte-ignore a11y-missing-attribute -->
					{#each THEMES as theme}
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li on:click={() => setTheme(theme)}><a>{theme}</a></li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="flex justify-between items-center">
			<div class="col-span-1">
				<label for="">History</label>
			</div>

			<div class="flex justify-between items-center">
				<div class="col-span-4">
					<button
						class="btn btn-outline"
						on:click={() => {
							showHistory = true;
						}}>History</button
					>
				</div>
			</div>
		</div>
		{#if !$isEncrypted}
			<div class="flex justify-between items-center">
				<div class="text-success">
					<label>Encryption</label>
				</div>

				<div class="flex justify-between items-center">
					<div class="col-span-4">
						<button
							class="btn btn-success"
							on:click={() => {
								isEncrypted.set(undefined);
							}}>Encrypt wallet</button
						>
					</div>
				</div>
			</div>
		{/if}
		<div class="divider col-span-5">Backup</div>

		{#if $mnemonic.length}
			<div class="flex justify-between items-center">
				<div class="col-span-1">
					<label for="">Show seed</label>
				</div>
				<div class="col-span-4">
					<ShowSeed />
				</div>
			</div>
			<div class="flex justify-between items-center">
				<div class="col-span-1">
					<label for="">Keyset counters</label>
				</div>
				<div class="col-span-4">
					<IncreaseCounters></IncreaseCounters>
				</div>
			</div>
		{/if}
		<div class="flex justify-between items-center">
			<div>
				<label for="">Export wallet</label>
			</div>
			<div>
				<BackupButton />
			</div>
		</div>
		<div class="divider col-span-5">Cashu</div>
		<div class="flex justify-between items-center">
			<div class="col-span-2">
				<div class="inline-flex gap-1">
					<label for="">Check pending tokens</label>
				</div>
			</div>
			<div class="col-span-3 flex gap-2">
				<input type="checkbox" class="toggle toggle-warning" bind:checked={$checkPending} />
			</div>
		</div>
		<div class="flex justify-between items-center">
			<div class="col-span-2">
				<div class="inline-flex gap-1">
					<label for="">Check non-pending tokens</label>
				</div>
			</div>
			<div class="col-span-3 flex gap-2">
				<input type="checkbox" class="toggle toggle-error" bind:checked={$checkNonPending} />
			</div>
		</div>
		{#if $checkPending || $checkNonPending}
			<div class="flex justify-between items-center">
				<div class="col-span-2">
					<div class="inline-flex gap-1">
						<label for="">Check tokens automatically</label>
					</div>
				</div>
				<div class="col-span-3 flex gap-2">
					<input type="checkbox" class="toggle toggle-error" bind:checked={$checkAutomatically} />
				</div>
			</div>
		{/if}

		<div class="divider col-span-5">Nostr</div>

		<NostrSettings />
		<div class="divider col-span-5 flex">
			<div>
				<button on:click={() => (isShowDangerzone = !isShowDangerzone)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-4 h-4 transition-transform {isShowDangerzone ? 'rotate-90' : ''}"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</button>
			</div>
			<p>Dangerzone</p>
		</div>
		{#if isShowDangerzone}
			<div class="flex justify-between items-center">
				<div class="col-span-1">
					<p>Delete History</p>
				</div>
				<div class="col-span-4">
					<ResetHistoryButton />
				</div>
			</div>
			{#if $isEncrypted}
				<div class="flex justify-between items-center">
					<div class="col-span-1">
						<p class="font-bold text-error">Reset password</p>
					</div>
					<div class="col-span-4">
						<ResetPasswordButton />
					</div>
				</div>
			{/if}
			<div class="flex justify-between items-center">
				<div class="col-span-1">
					<p class="font-bold text-error">Wipe wallet</p>
				</div>
				<div class="col-span-4">
					<WipeWalletButton />
				</div>
			</div>
		{/if}
	</div>
	<div class="flex flex-col items-center justify-end">
		<div class="flex gap-2">
			{#if $isEncrypted}
				<div class="tooltip" data-tip="wallet uses encryption">
					<div class="bg-base-200 p-2 rounded-lg">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="text-success w-6 h-6"
						>
							<path
								fill-rule="evenodd"
								d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				</div>
			{/if}
			{#if $mnemonic.length}
				<div class="tooltip" data-tip="wallet uses mnemonic backup">
					<div class="bg-base-200 p-2 rounded-lg">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="text-info w-6 h-6"
						>
							<path
								fill-rule="evenodd"
								d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
