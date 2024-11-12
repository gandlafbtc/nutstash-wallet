<script lang="ts">
    import { encrypt, kdf } from "$lib/actions/encryption";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog  from "$lib/components/ui/dialog";
    import Input from "$lib/components/ui/input/input.svelte";
    import Toggle from "$lib/components/ui/toggle/toggle.svelte";
    import { countsStore } from "$lib/stores/persistent/counts";
    import { meltQuotesStore } from "$lib/stores/persistent/meltquotes";
    import { mintQuotesStore } from "$lib/stores/persistent/mintquotes";
    import { mints } from "$lib/stores/persistent/mints";
    import { mnemonic } from "$lib/stores/persistent/mnemonic";
    import {
        offlineProofsStore,
        pendingProofsStore,
        proofsStore,
        spentProofsStore,
    } from "$lib/stores/persistent/proofs";
    import { transactionsStore } from "$lib/stores/persistent/transactions";
    import { key } from "$lib/stores/session/key";
    import { bytesToHex } from "@noble/hashes/utils";
    import { Lock } from "lucide-svelte";
    import { toast } from "svelte-sonner";

    let isEncrypt = $state(false);

    let pass = $state('')
    let passConf = $state('')
    let isOpen = $state(false);

    const restoreObj = {
        proofsStore: $proofsStore,
        pendingProofsStore: $pendingProofsStore,
        spentProofsStore: $spentProofsStore,
        offlineProofsStore: $offlineProofsStore,
        mints: $mints,
        transactionsStore: $transactionsStore,
        mintQuotesStore: $mintQuotesStore,
        meltQuotesStore: $meltQuotesStore,
        countsStore: $countsStore,
        mnemonic: $mnemonic,
    };


    const exportEncryptedFile = async () => {
        if (!pass) {
            toast.warning('Please enter a password')
            return
        }
        if (pass !== passConf) {
            toast.warning('Passwords do not match')
            return
        }
        const {cypher,iv} = await encrypt(restoreObj, await kdf(pass))
        const  backupObj = {
                backupVersion: "nutstash-2.0",
                isEncrypt: true,
                blob: bytesToHex(cypher),
                iv
            }
        
        doExport(backupObj)
        isOpen = false
    }

    const exportFile = async () => {

        const backupObj = {
                backupVersion: "nutstash-2.0",
                ...restoreObj,
            };
        

        doExport(backupObj)
    }

    const doExport = async (backupObj: any) =>  {
        let dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(backupObj));
        let downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "nutstash_backup.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        toast.success("Wallet file exported");
    }
</script>

<div class="flex flex-col gap-2">
    <div class="flex gap-2">
        {#if isEncrypt}
        <Button class="btn btn-primary" onclick={()=> isOpen = true}>
            Export encrypted Wallet
        </Button>
        {:else}
        <Button class="btn btn-primary" onclick={exportFile}>
            Export Wallet
        </Button>
        {/if}
        <Toggle bind:pressed={isEncrypt}>
            <Lock></Lock>
        </Toggle>
    </div>
    <span class="text-xs text-secondary">
        {#if isEncrypt}
            Export encrypted wallet file. Will require password to import.
        {:else}
            Export unencrypted wallet file.
        {/if}
    </span>
</div>

<Dialog.Root bind:open={isOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title
                >Choose a passphrase to encrypt the export file with.</Dialog.Title
            >
            <Dialog.Description>
                
            </Dialog.Description>
        </Dialog.Header>
        <div class="flex flex-col gap-2">
            <span>Enter passphrase</span>
            <Input
                type="password"
                placeholder="Passphrase"
                bind:value={pass}
            />
            <Input
                type="password"
                placeholder="Repeat passphrase"
                bind:value={passConf}
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
            <Button onclick={exportEncryptedFile}>
                Encrypt
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>