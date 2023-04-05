<script lang="ts">
	import { checkAutomatically, checkNonPending, checkPending } from '../stores/settings';
	import { THEMES } from '../stores/static/themes';

	import { theme } from '../stores/theme';
	import BackupButton from './elements/BackupButton.svelte';
	import NostrRelayModal from './elements/NostrRelayModal.svelte';
	import NostrSettings from './elements/NostrSettings.svelte';
	import ResetHistoryButton from './elements/ResetHistoryButton.svelte';

	let isShowDangerzone = false;

	const setTheme = (t: string) => {
		theme.set(t);
	};
</script>

<div class="flex flex-col justify-start gap-3 w-full">
	<div class="grid grid-cols-5 w-full items-center gap-2 overflow-y-scroll scrollbar-hide">
		<p class="text-xl font-bold col-span-5">Settings</p>
		<div class="-span-1">
			<label for="theme-dropdown">Theme:</label>
		</div>
		<div class="dropdown col-span-4" id="theme-dropdown">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn">{$theme}</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-56 overflow-scroll scrollbar-hide"
			>
				<!-- svelte-ignore a11y-missing-attribute -->
				{#each THEMES as theme}
					<!-- svelte-ignore a11y-missing-attribute -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li on:click={() => setTheme(theme)}><a>{theme}</a></li>
				{/each}
			</ul>
		</div>
		<div class="col-span-1">
			<label for="">Backup Tokens</label>
		</div>
		<div class="col-span-4">
			<BackupButton />
		</div>
		<div class="col-span-1">
			<label for="">Restore from Backup</label>
		</div>
		<div class="col-span-4">
			<a href="/restore" class="btn btn-primary">restore</a>
		</div>
		<div class="col-span-1">
			<label for="">History</label>
		</div>
		<div class="col-span-4">
			<a href="/history" class="btn btn-outline">History</a>
		</div>
		<div class="divider col-span-5">Cashu</div>

		<div class="col-span-2">
			<label for="">Check pending tokens</label>
		</div>
		<div class="col-span-3 flex gap-2">
			<input type="checkbox" class="toggle toggle-warning" bind:checked={$checkPending} />
			<div>
				<div
					class="tooltip"
					data-tip="Activating automatic token checking will send part of your all your tokens to the mint for verification if they have been spent already. This gives the mint additional information about a users balance, especially if the option is enabled for non-pending tokens. ⚠️ use at own risk"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
						/>
					</svg>
				</div>
			</div>
		</div>
		<div class="col-span-2">
			<label for="">Check non-pending tokens</label>
		</div>
		<div class="col-span-3">
			<input type="checkbox" class="toggle toggle-error" bind:checked={$checkNonPending} />
		</div>
		{#if $checkPending || $checkNonPending}
			<div class="col-span-2">
				<label for="">Check tokens automatically</label>
			</div>
			<div class="col-span-3 flex gap-2">
				<input type="checkbox" class="toggle toggle-info" bind:checked={$checkAutomatically} />
				<div>
					<div
						class="tooltip"
						data-tip="You can activate this option to check for invalid tokens in your wallet automatically. It is only advised to use this option if privacy is not a priority."
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
							/>
						</svg>
					</div>
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
			<div class="col-span-1">
				<label for="delete-history-button">Delete History</label>
			</div>
			<div class="col-span-4">
				<ResetHistoryButton />
			</div>
		{/if}
	</div>
</div>
<NostrRelayModal />
