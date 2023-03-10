<script lang="ts">
	// @ts-ignore
	import Dropzone from 'svelte-file-dropzone';
	import { toast } from '../../stores/toasts';

	export let backupObject = {};

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

		const intermediateBackupObject = JSON.parse(jsonString);
		if (!checkIsBackup(intermediateBackupObject)) {
			throw new Error('Not a backup file');
		}

		if (!intermediateBackupObject.hasOwnProperty('proofs')) {
			backupObject = { proofs: intermediateBackupObject, mints: [] };
		} else {
			backupObject = intermediateBackupObject;
		}

		console.log(backupObject);
	};

	const checkIsBackup = (obj: any) => {
		let isBackup = true;
		if (obj.proofs) {
			return true;
		}
		if (!obj[0].hasOwnProperty('id')) {
			isBackup = false;
		}
		if (!obj[0].hasOwnProperty('secret')) {
			isBackup = false;
		}
		if (!obj[0].hasOwnProperty('amount')) {
			isBackup = false;
		}
		if (!obj[0].hasOwnProperty('C')) {
			isBackup = false;
		}
		return isBackup;
	};
</script>

<div class="flex w-full h-full cursor-pointer justify-center gap-2 flex-col text-center">
	{#if backupFileName}
		<p class="text-success inline-flex items-center justify-center">
			{backupFileName}
		</p>
	{:else}
		<p class="text-lg font-bold">Drop the nutstash_backup.json in the box below</p>
		<Dropzone
			accept={'application/json'}
			multiple={false}
			on:dragenter={handleDragEnter}
			on:dragleave={handleDragLeave}
			on:droprejected={handleDropRejected}
			on:dropaccepted={handleDropAccepted}
		/>
	{/if}
</div>
