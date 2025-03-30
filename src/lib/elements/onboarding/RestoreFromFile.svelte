<script lang="ts">
	// @ts-ignore
	import Dropzone from 'svelte-file-dropzone';
	import { isOnboarded } from '$lib/stores/local/message';
	import Button from '$lib/components/ui/button/button.svelte';
	import { pop, push } from 'svelte-spa-router';
	import { toast } from 'svelte-sonner';
	import { reencrypt, setStoresFromBackupJSON } from '$lib/init/init';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import { decrypt, kdf } from '$lib/actions/encryption';
	import { hexToBytes } from '@noble/hashes/utils';
	import OnboardingHeader from './OnboardingHeader.svelte';
	import { ensureError } from '$lib/helpers/errors';
	import Page from '../../../routes/+page.svelte';
	import { mints } from '$lib/stores/persistent/mints';
	import { proofsStore } from '$lib/stores/persistent/proofs';
	import { mnemonic, seed } from '$lib/stores/persistent/mnemonic';
	import { generateMnemonic } from '@scure/bip39';
	import { wordlist } from '@scure/bip39/wordlists/english';
	import { LoaderCircle } from 'lucide-svelte';
	import {
		backup_file_legacy_wallet,
		drop_or_select_backup,
		enter_passphrase,
		enter_passphrase_to_decrypt_file,
		only_mints_will_be_imported,
		t_cancel,
		t_decrypt,
		t_import,
		wallet_backup_protected
	} from '$lib/paraglide/messages';

	let backupFileName = $state('');
	let isLoading = $state(true);
	let pass = $state('');
	let isOpen = $state(false);
	let isOpenLegacy = $state(false);
	let backupObject = $state();
	let decryptedObj = $state();

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
		} catch (error) {
			handleDropRejected();
		} finally {
			isLoading = false;
		}
	};

	const handleRestore = async () => {
		try {
			setStoresFromBackupJSON(backupObject);
			await reencrypt();
			isOnboarded.set(true);
			push('/wallet/');
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		}
	};

	const readBackupFileToObject = async (file) => {
		const backupFile: File = file.detail.acceptedFiles[0];
		const jsonString = await backupFile.text();

		backupObject = JSON.parse(jsonString);
		console.log(backupObject);
		if (!checkIsBackup(backupObject)) {
			throw new Error('Not a backup file');
		}
		if (
			backupObject?.backupVersion === 'nutstash-legacy' ||
			backupObject?.backupVersion === 'nutstash-2'
		) {
			isOpenLegacy = true;
			return;
		}
		if (backupObject?.isEncrypt && !decryptedObj) {
			isOpen = true;
			return;
		}
		await handleRestore();
	};

	const importLegacy = async () => {
		try {
			isLoading = true;
			await Promise.all(
				backupObject.mints?.map((m: { mintURL: string }) => mints.fetchMint(m.mintURL))
			);
			if (backupObject.proofs) {
				await proofsStore.addMany(backupObject.proofs);
			}
			if (backupObject.token) {
				await proofsStore.addMany(backupObject.token);
			}
			const m = generateMnemonic(wordlist, 128);
			await mnemonic.reset();
			await mnemonic.add({ mnemonic: m });
			await reencrypt();
			isOnboarded.set(true);
			toast.success('Wallet migrated');
			push('/onboarding/new/secure');
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};

	const decryptFile = async () => {
		console.log(backupObject);
		backupObject = await decrypt(hexToBytes(backupObject.blob), await kdf(pass), backupObject.iv);
		await handleRestore();
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

<OnboardingHeader></OnboardingHeader>
<div class="mx-2 flex h-screen items-center justify-center">
	<div class="flex h-full max-h-96 w-full flex-col justify-center gap-2 text-center">
		{#if backupFileName}
			<p class="text-success inline-flex items-center justify-center">
				{backupFileName}
			</p>
		{:else}
			<div class="text-center"></div>
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
					{drop_or_select_backup()}
				</p>
				<div class="flex w-full items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-20 w-20"
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
	<Dialog.Root bind:open={isOpenLegacy}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>{backup_file_legacy_wallet()}</Dialog.Title>
				<Dialog.Description>{only_mints_will_be_imported()}</Dialog.Description>
			</Dialog.Header>

			<Dialog.Footer>
				<Button
					variant="outline"
					onclick={() => {
						isOpen = false;
					}}
				>
					{t_cancel()}
				</Button>
				<Button disabled={isLoading} variant="destructive" onclick={importLegacy}>
					{#if isLoading}
						<LoaderCircle class="animate-spin"></LoaderCircle>
					{/if}
					{t_import()}
				</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
	<Dialog.Root bind:open={isOpen}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>{wallet_backup_protected()}</Dialog.Title>
				<Dialog.Description>
					{enter_passphrase_to_decrypt_file()}
				</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-2">
				<span>{enter_passphrase()}</span>
				<Input type="password" placeholder="Current passphrase" bind:value={pass} />
			</div>
			<Dialog.Footer>
				<Button
					variant="outline"
					onclick={() => {
						isOpen = false;
					}}
				>
					{t_cancel()}
				</Button>
				<Button variant="destructive" onclick={decryptFile}>{t_decrypt()}</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</div>
