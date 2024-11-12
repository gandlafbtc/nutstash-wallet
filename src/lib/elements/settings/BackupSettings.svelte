<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";

    import * as Dialog from "$lib/components/ui/dialog";
    import Mnemonic from "../security/Mnemonic.svelte";
    import Divider from "../ui/Divider.svelte";
    import FileBackupButton from "./backup/FileBackupButton.svelte";

    let isOpen = $state(false);
</script>

<div class="h-full items-start gap-3 flex flex-col mt-32 w-80">
    <div>
        <span class="font-bold text-lg"> Backup settings </span>
    </div>
    <Divider text='Seed phrase'></Divider>

    <div class="flex flex-col gap-2">
        <Dialog.Root bind:open={isOpen}>
            <Dialog.Trigger
                ><Button variant="default">
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
    </div>
    <Divider text='Backup file'></Divider>
    <Button href='/#/wallet/settings/backup/restore'>Restore from seed phrase</Button>
    <Divider text='Backup file'></Divider>
    <FileBackupButton></FileBackupButton>
</div>
