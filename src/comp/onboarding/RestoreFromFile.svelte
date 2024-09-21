<script lang="ts">
	// @ts-ignore
	import Dropzone from 'svelte-file-dropzone';
	import { toast } from '../../stores/toasts';
	import { contacts } from '../../stores/contacts';
	import { counts } from '../../stores/counts';
	import { mintRequests } from '../../stores/mintReqs';
	import { mints } from '../../stores/mints';
	import { mnemonic } from '../../stores/mnemonic';
	import {
		nostrKeys,
		nostrMessages,
		nostrRelays,
		useExternalNostrKey,
		useNostr
	} from '../../stores/nostr';
	import { pendingTokens } from '../../stores/pendingtokens';
	import { spentTokens } from '../../stores/spenttokens';
	import { theme } from '../../stores/theme';
	import { token } from '../../stores/tokens';
	import { history } from '../../stores/history';
	import { isOnboarded } from '../../stores/message';
	import { offlineTokens } from '../../stores/offlinetokens';

	export let step;

	let backupFileName = '';
	let isLoading = true;

	const handleDragEnter = () => {
		console.log('enter');
	};
	const handleDragLeave = () => {
		console.log('leave');
	};

	const handleDropRejected = () => {
		toast('warning', 'Make sure to use a nutstash_backup.json file', 'Could not load backup!');
	};

	const handleDropAccepted = async (file) => {
		try {
			isLoading = true;
			await readBackupFileToObject(file);
			backupFileName = file.detail.acceptedFiles[0].path;
			toast('success', 'Backup file has ben successfully loaded into nutstash', 'Success!');
		} catch (error) {
			handleDropRejected();
		} finally {
			isLoading = false;
		}
	};

	const readBackupFileToObject = async (file) => {
		const backupFile: File = file.detail.acceptedFiles[0];
		const jsonString = await backupFile.text();

		const backupObject = JSON.parse(jsonString);
		console.log(backupObject);
		if (!checkIsBackup(backupObject)) {
			throw new Error('Not a backup file');
		}
		contacts.set(backupObject.contacts);
		counts.set(backupObject.counts);
		history.set(backupObject.history);
		mintRequests.set(backupObject.mintRequests);
		mints.set(backupObject.mints);
		mnemonic.set(backupObject.mnemonic);
		useNostr.set(backupObject.useNostr);
		useExternalNostrKey.set(backupObject.useExternalNostrKey);
		nostrKeys.set(backupObject.nostrKeys);
		nostrMessages.set(backupObject.nostrMessages);
		nostrRelays.set(backupObject.nostrRelays);
		pendingTokens.set(backupObject.pendingTokens);
		spentTokens.set(backupObject.spentTokens);
		offlineTokens.set(backupObject.offlineTokens);
		theme.set(backupObject.theme);
		token.set(backupObject.token);

		isOnboarded.set(true);
	};

	const checkIsBackup = (obj: any) => {
		if (!obj.backupVersion) {
			return false;
		}
		if (typeof obj.backupVersion !== 'string') {
			return false;
		}
		if (!obj.backupVersion.startsWith('nutstash')) {
			return false;
		}
		return true;
	};
</script>

<div class="flex w-full h-full justify-center gap-2 flex-col text-center">
	{#if backupFileName}
		<p class="text-success inline-flex items-center justify-center">
			{backupFileName}
		</p>
	{:else}
		<div>
			<button class="link mt-5" on:click={() => (step = 'select')}> Go back </button>
		</div>
		<Dropzone
			containerClasses="bg-base-200 h-full w-full rounded-lg border border-dashed flex items-center justify-center flex-col gap-10"
			disableDefaultStyles={true}
			accept={'application/json'}
			multiple={false}
			on:dragenter={handleDragEnter}
			on:dragleave={handleDragLeave}
			on:droprejected={handleDropRejected}
			on:dropaccepted={handleDropAccepted}
		>
			<p class="text-lg font-bold">
				Drop the <code class="text-warning">nutstash_backup.json</code> file here, or click to select
				a file
			</p>
			<div class="flex w-full items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-20 h-20"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
					/>
				</svg>
			</div>
		</Dropzone>
	{/if}
</div>
