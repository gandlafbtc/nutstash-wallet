<script lang="ts">
	// @ts-ignore
	import Dropzone from 'svelte-file-dropzone';
	import { isOnboarded } from '$lib/stores/local/message';
    import Button from '$lib/components/ui/button/button.svelte';
    import { pop } from 'svelte-spa-router';
    import { toast } from 'svelte-sonner';

	let backupFileName = $state('');
	let isLoading = $state(true);

	const handleDragEnter = () => {
		console.log('enter');
	};
	const handleDragLeave = () => {
		console.log('leave');
	};

	const handleDropRejected = () => {
		toast.warning('File is no a valid nutstash_backup.json');
	};

	const handleDropAccepted = async (file) => {
		try {
			isLoading = true;
			await readBackupFileToObject(file);
			backupFileName = file.detail.acceptedFiles[0].path;
			toast.success( 'Wallet restored!');
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

		// TODO restore from file once persistence is implemented
		// contacts.set(backupObject.contacts);
		// countsStore.set(backupObject.counts);
		// history.set(backupObject.history);
		// mintQuotesStore.set(backupObject.mintQuotesStore);
		// mints.set(backupObject.mints);
		// mnemonic.set(backupObject.mnemonic);
		// useNostr.set(backupObject.useNostr);
		// useExternalNostrKey.set(backupObject.useExternalNostrKey);
		// nostrKeys.set(backupObject.nostrKeys);
		// nostrMessages.set(backupObject.nostrMessages);
		// nostrRelays.set(backupObject.nostrRelays);
		// pendingProofs.set(backupObject.pendingProofs);
		// spentProofs.set(backupObject.spentProofs);
		// offlineProofs.set(backupObject.offlineProofs);
		// proofs.set(backupObject.proofs);

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

<div class="h-full flex mx-2 items-center justify-center">
	<div class="flex w-full h-full max-h-96 justify-center gap-2 flex-col text-center">
		{#if backupFileName}
		<p class="text-success inline-flex items-center justify-center">
			{backupFileName}
		</p>
		{:else}
		<div class="text-center">
			
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
		<div>
			<Button variant='link' onclick={()=> pop()}>
				Back
			</Button>
		</div>
		{/if}
	</div>
	
</div>