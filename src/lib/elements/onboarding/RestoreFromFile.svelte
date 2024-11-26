<script lang="ts">
	// @ts-ignore
	import Dropzone from "svelte-file-dropzone";
	import { isOnboarded } from "$lib/stores/local/message";
	import Button from "$lib/components/ui/button/button.svelte";
	import { pop, push } from "svelte-spa-router";
	import { toast } from "svelte-sonner";
	import { reencrypt, setStoresFromBackupJSON } from "$lib/init/init";
	import * as Dialog from "$lib/components/ui/dialog";
	import Input from "$lib/components/ui/input/input.svelte";
	import { decrypt, kdf } from "$lib/actions/encryption";
    import { hexToBytes } from "@noble/hashes/utils";
    import OnboardingHeader from "./OnboardingHeader.svelte";

	let backupFileName = $state("");
	let isLoading = $state(true);
	let pass = $state("");
	let isOpen = $state(false);
	let backupObject = $state();
	let decryptedObj = $state();

	const handleDragEnter = () => {
		console.log("enter");
	};
	const handleDragLeave = () => {
		console.log("leave");
	};

	const handleDropRejected = () => {
		toast.warning("File is no a valid nutstash_backup.json");
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
			push("/wallet/");
		} catch (error) {
			toast.error(error);
		}
	};

	const readBackupFileToObject = async (file) => {
		const backupFile: File = file.detail.acceptedFiles[0];
		const jsonString = await backupFile.text();

		backupObject = JSON.parse(jsonString);
		console.log(backupObject);
		if (!checkIsBackup(backupObject)) {
			throw new Error("Not a backup file");
		}
		if (backupObject?.isEncrypt && !decryptedObj) {
			isOpen = true;
			return;
		}
		await handleRestore()
	};

	const decryptFile = async () => {
		console.log(backupObject)
		backupObject = await decrypt(
			hexToBytes(backupObject.blob),
			await kdf(pass),
			backupObject.iv,
		);
		await handleRestore()
	};

	const checkIsBackup = (obj: any) => {
		if (!obj.backupVersion) {
			return false;
		}
		if (typeof obj.backupVersion !== "string") {
			return false;
		}
		if (!obj.backupVersion.startsWith("nutstash")) {
			return false;
		}
		return true;
	};
</script>
<OnboardingHeader></OnboardingHeader>
<div class="h-screen flex mx-2 items-center justify-center">
	<div
		class="flex w-full h-full max-h-96 justify-center gap-2 flex-col text-center"
	>
		{#if backupFileName}
			<p class="text-success inline-flex items-center justify-center">
				{backupFileName}
			</p>
		{:else}
			<div class="text-center"></div>
			<Dropzone
				containerClasses="bg-base-200 h-full w-full rounded-lg border border-dashed flex items-center justify-center flex-col gap-10"
				disableDefaultStyles={true}
				accept={"application/json"}
				multiple={false}
				on:dragenter={handleDragEnter}
				on:dragleave={handleDragLeave}
				on:droprejected={handleDropRejected}
				on:dropaccepted={handleDropAccepted}
			>
				<p class="text-lg font-bold">
					Drop the <code class="text-warning"
						>nutstash_backup.json</code
					> file here, or click to select a file
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
	<Dialog.Root bind:open={isOpen}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title
					>This wallet backup has been protected with a passphrase.</Dialog.Title
				>
				<Dialog.Description>
					Enter the passphrase to decrypt and restore from this wallet
					file.
				</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-2">
				<span>Enter passphrase</span>
				<Input
					type="password"
					placeholder="Current passphrase"
					bind:value={pass}
				/>
			</div>
			<Dialog.Footer>
				<Button
					variant="outline"
					onclick={() => {
						isOpen = false;
					}}
				>
					Cancel
				</Button>
				<Button variant="destructive" onclick={decryptFile}>
					Decrypt
				</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</div>
