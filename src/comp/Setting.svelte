<script lang="ts">
	import { mnemonic } from '../stores/mnemonic';
	import { checkAutomatically, checkNonPending, checkPending, isEncrypted } from '../stores/settings';
	import { THEMES } from '../stores/static/themes';

	import { theme } from '../stores/theme';
	import BackupButton from './elements/BackupButton.svelte';
	import NostrRelayModal from './elements/NostrRelayModal.svelte';
	import NostrSettings from './elements/NostrSettings.svelte';
	import ResetHistoryButton from './elements/ResetHistoryButton.svelte';
	import ShowSeed from './elements/ShowSeed.svelte';
	import WipeWalletButton from './elements/WipeWalletButton.svelte';

	let isShowDangerzone = false;
	let showLegacy = false

	const setTheme = (t: string) => {
		theme.set(t);
	};
</script>

<div class="flex flex-col justify-start gap-3">
	<p class="text-xl font-bold">Settings</p>
	<div class="flex justify-between items-center">
		<div>
			<label for="theme-dropdown">Theme:</label>
		</div>
		<div class="dropdown" id="theme-dropdown">
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
	</div>


		
	<div class="flex justify-between items-center">
		<div class="col-span-1">
			<label for="">History</label>
		</div>

		<div class="flex justify-between items-center">
			<div class="col-span-4">
				<a href="/history" class="btn btn-outline">History</a>
			</div>
		</div>
	</div>
	<div class="divider col-span-5">Backup</div>

	{#if $mnemonic}
		<div class="flex justify-between items-center">
			<div class="col-span-1">
				<label for="">show seed</label>
			</div>
			<div class="col-span-4">
				<ShowSeed />
			</div>
		</div>
	{/if}
		<div class="flex justify-between items-center">
			<div>
				<label for="">Export ecash</label>
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
				<a
					href="https://nutstash.app/faq/#pending-tokens"
					class="lg:tooltip link-primary"
					data-tip="Will send the secret of all your unspent tokens to the mint. The mint will verify if any of them have already been spent"
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
				</a>
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
				<a
					href="https://nutstash.app/faq/#pending-tokens"
					class="lg:tooltip link-primary"
					data-tip="Will send the secret of all your unspent tokens to the mint. The mint will verify if any of them have already been spent. It is only advised to use this option if privacy is not a priority and you have a strong trust relationship with the mints you're connected to."
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
				</a>
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
					<a
						href="https://nutstash.app/faq/#pending-tokens"
						class="lg:tooltip link-primary"
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
					</a>
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
				<label for="delete-history-button">Delete History</label>
			</div>
			<div class="col-span-4">
				<ResetHistoryButton />
			</div>
		</div>
		<div class="flex justify-between items-center">
			<div class="col-span-1">
				<label for="delete-history-button" class="font-bold text-error">Wipe wallet</label>
			</div>
			<div class="col-span-4">
				<WipeWalletButton />
			</div>
		</div>
	{/if}
</div>
<NostrRelayModal />
<div class="flex flex-col items-center justify-end">
	<div class="flex gap-2">

		{#if $isEncrypted}
		<div class="tooltip" data-tip="wallet uses encryption">
			
		<div class="bg-base-200 p-2 rounded-lg">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-success w-6 h-6">
				<path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" />
			</svg>
		</div>
	</div>
	{/if}
	{#if $mnemonic}
	<div class="tooltip" data-tip="wallet uses mnemonic backup">

		<div class="bg-base-200 p-2 rounded-lg">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-info w-6 h-6">
				<path fill-rule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
			  </svg>
			  
			</div>
		</div>
		{/if}
	</div>

</div>

