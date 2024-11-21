<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import { nwcKeysStore } from "$lib/stores/persistent/nwcConnections";
    import { nwc } from "$lib/stores/session/nwc";
    import { Copy, LoaderCircle, Trash } from "lucide-svelte";
    import QrCode from "../ui/QRCode.svelte";
    import { copyTextToClipboard } from "$lib/util/utils";
    import { formatAmount } from "$lib/util/walletUtils";
    import { toast } from "svelte-sonner";
    import type { NWCConnection } from "$lib/db/models/types";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import * as Dialog  from "$lib/components/ui/dialog";

    let isShow = $state(false);
    let isOpen = $state(false);
    let isSwitching = $state(false);

    const switchActive = async (conn: NWCConnection) => {
        try {
            isSwitching = true;
            await nwcKeysStore.addOrUpdate(
                conn.walletPublicKey,
                conn,
                "walletPublicKey",
            );
            if (conn.isActive) {
                await nwc.generateNWCConnection();
                await nwc.listenToNWCCommands();
                toast.success("NWC is ready");
            } else {
                await nwc.unsubscribeNWC();
                toast.info("NWC connection was turned off");
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message);
        } finally {
            isSwitching = false;
        }
    };
    const removeConnection = async (conn: NWCConnection) => {
        try {
            isSwitching = true;
            await nwc.unsubscribeNWC();
            await nwcKeysStore.remove(conn.walletPublicKey, 'walletPublicKey')
            toast.info('NWC connection removed')
            isOpen = false
        } catch (error) {
            console.error(error)
            toast.error(error.message);
        }
        finally {
            isSwitching = false;
        }
    }
</script>

<div class="flex gap-2 w-80 h-full mt-32 flex-col">
    <Button
        onclick={nwc.generateNWCConnection}
        disabled={$nwcKeysStore.length ? true : false}
    >
        {#if $nwcKeysStore.length}
            Max connections reached (1)
        {:else}
            Create NWC connection
        {/if}
    </Button>

    {#if $nwcKeysStore.length}
        <div class="flex flex-col mt-6">
            <p>Connections</p>
            {#each $nwcKeysStore as conn}
                {@const connectionString = nwc.getConnectionString(conn)}
                <div class="my-2 p-4 border gap-4 rounded-lg flex flex-col">
                    <button onclick={() => (isShow = !isShow)}>
                        <div class:blur-sm={!isShow}>
                            <QrCode data={connectionString} QRsize="medium"
                            ></QrCode>
                        </div>
                    </button>
                    <button
                        onclick={() => copyTextToClipboard(connectionString)}
                        class="items-center gap-1 flex opacity-50 text-nowrap overflow-clip text-ellipsis"
                    >
                        <div>
                            <Copy class="w-4 h-4"></Copy>
                        </div>
                        <div>
                            <p
                                class="text-sm text-nowrap overflow-clip text-ellipsis"
                            >
                                {connectionString}
                            </p>
                        </div>
                    </button>
                    <p class="flex gap-2 justify-center">
                        <span class=""> Allowance </span>
                        <Badge variant='outline'>
                            {formatAmount(conn.allowanceLeft)}
                        </Badge>
                    </p>
                    <div class="flex gap-2 justify-between">
                        <div class="flex gap-2">

                            <Switch
                            bind:checked={conn.isActive}
                            onclick={() => switchActive(conn)}
                            ></Switch>
                            {#if isSwitching}
                            <LoaderCircle class="animate-spin"></LoaderCircle>
                            {:else if conn.isActive}
                            <p class="text-green-500">Connected</p>
                            {:else}
                            <p class="text-destructive">Disconnected</p>
                            {/if}
                        </div>
                        <button onclick={()=> isOpen=!isOpen}>
                            <Trash class='text-destructive'></Trash>
                        </button>
                    </div>
                </div>
                <Dialog.Root bind:open={isOpen}>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title class='text-destructive'
                                >Are you sure you want to disconnect and remove this connection?</Dialog.Title
                            >
                            <Dialog.Description>
                                Services connected will no longer be able to access this wallet.
                            </Dialog.Description>
                        </Dialog.Header>
                        
                        <Dialog.Footer>
                            <Button
                                variant="outline"
                                onclick={() => {
                                    isOpen = false;
                                }}
                            >
                                Cancel
                            </Button>
                            <Button variant='destructive' onclick={()=> removeConnection(conn)}>
                                Remove
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Root>
            {/each}
        </div>
    {/if}
</div>


