<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import * as Dialog from '$lib/components/ui/dialog';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Eye, Sprout } from 'lucide-svelte';
	import Mnemonic from '../security/Mnemonic.svelte';
	import Divider from '../ui/Divider.svelte';
	import FileBackupButton from './backup/FileBackupButton.svelte';
	import { restore_from_seed, seed_phrase, show_mnemonic, t_close, t_export } from '$lib/paraglide/messages';

	let isOpen = $state(false);
</script>

<div class="flex h-full flex-col items-start gap-3 pt-2">
	<div class="flex w-full flex-col items-start gap-10">
		<div class="flex w-full items-center justify-between gap-1">
			<Label>{t_export()}</Label>
			<FileBackupButton></FileBackupButton>
		</div>
		<div class="flex w-full items-center justify-between gap-2">
			<Label>{seed_phrase()}</Label>
			<div class="flex flex-col items-end gap-2">
				<Dialog.Root bind:open={isOpen}>
					<Dialog.Trigger
						><Button variant="default">
							<Eye></Eye>
							{show_mnemonic()}
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
								{t_close()}
							</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
				<Button href="/#/wallet/settings/backup/restore">
					<Sprout></Sprout>
					{restore_from_seed()}</Button
				>
			</div>
		</div>
	</div>
</div>
