<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import * as Dialog from '$lib/components/ui/dialog';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Eye, Sprout } from 'lucide-svelte';
	import Mnemonic from '../security/Mnemonic.svelte';
	import Divider from '../ui/Divider.svelte';
	import FileBackupButton from './backup/FileBackupButton.svelte';

	let isOpen = $state(false);
</script>

<div class="flex h-full flex-col items-start gap-3 pt-2">
	<div class="flex w-full flex-col items-start gap-10">
		<div class="flex w-full items-center justify-between gap-1">
			<Label>Export</Label>
			<FileBackupButton></FileBackupButton>
		</div>
		<div class="flex w-full items-center justify-between gap-2">
			<Label>Seed phrase</Label>
			<div class="flex flex-col items-end gap-2">
				<Dialog.Root bind:open={isOpen}>
					<Dialog.Trigger
						><Button variant="default">
							<Eye></Eye>
							Show mnemonic
						</Button></Dialog.Trigger
					>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title></Dialog.Title>
							<Dialog.Description></Dialog.Description>
						</Dialog.Header>
						<Mnemonic></Mnemonic>
						<Dialog.Footer>
							<Button
								variant="outline"
								onclick={() => {
									isOpen = false;
								}}
							>
								Close
							</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
				<Button href="/#/wallet/settings/backup/restore">
					<Sprout></Sprout>
					Restore from seed</Button
				>
			</div>
		</div>
	</div>
</div>
