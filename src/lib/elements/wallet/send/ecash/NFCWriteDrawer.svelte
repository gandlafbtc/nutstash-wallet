<script lang="ts">
    import { buttonVariants } from "$lib/components/ui/button";

    import * as Drawer from "$lib/components/ui/drawer/";
    import NfcWriter from "./NFCWriter.svelte";

    let { token, isOpen = $bindable() }: { token: string; isOpen: boolean } =
        $props();

    
</script>

<Drawer.Root bind:open={isOpen} nested={true}>
    <Drawer.Content>
        <Drawer.Header
            class="flex flex-col justify-center items-center gap-3 text-center"
        >
            <Drawer.Title>Write token to NFC tag</Drawer.Title>
            <Drawer.Description
                >Approach NFC tag to write the token to it</Drawer.Description
            >
        </Drawer.Header>
        {#if isOpen}
             <!-- content here -->
             <NfcWriter {token} bind:isOpen></NfcWriter>
        {/if}
        <Drawer.Footer
            class="flex flex-col justify-center items-center gap-3 text-center"
        >
            <Drawer.Close
                class={buttonVariants({ variant: "outline" }) + " w-80"}
                >Close</Drawer.Close
            >
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>
