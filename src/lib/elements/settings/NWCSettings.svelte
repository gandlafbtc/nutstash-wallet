<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import { nwcKeysStore } from "$lib/stores/persistent/nwcConnections";
    import { nwc } from "$lib/stores/session/nwc";
    import { Copy } from "lucide-svelte";
    import QrCode from "../ui/QRCode.svelte";
    import { copyTextToClipboard } from "$lib/util/utils";
    import { formatAmount } from "$lib/util/walletUtils";
    let isShow = $state(false);
</script>

<div class="flex gap-2 w-80 h-full mt-32 flex-col">
    <Button
        onclick={nwc.generateNWCConnection}
        disabled={$nwcKeysStore.length ? true : false}
    >
        {#if $nwcKeysStore.length ? true : false}
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
                    <p>Remaining allowance: {formatAmount(conn.allowanceLeft)}</p>
                    <Switch
                        bind:checked={conn.isActive}
                        onclick={async () => {
                            await nwcKeysStore.addOrUpdate(
                                conn.walletPublicKey,
                                conn,
                                "walletPublicKey",
                            );
                            if (conn.isActive) {
                                await nwc.generateNWCConnection();
                                await nwc.listenToNWCCommands();
                            } else {
                                await nwc.unsubscribeNWC();
                            }
                        }}
                    ></Switch>
                </div>
            {/each}
        </div>
    {/if}
</div>
