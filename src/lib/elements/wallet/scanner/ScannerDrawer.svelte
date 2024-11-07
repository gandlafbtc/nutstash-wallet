<script lang="ts">
    import { buttonVariants } from "$lib/components/ui/button";


    import * as Drawer from "$lib/components/ui/drawer/";
    import { openScannerDrawer } from "$lib/stores/session/drawer";
    import Scanner from "./Scanner.svelte";


</script>
<Drawer.Root bind:open={$openScannerDrawer} nested={true}>
    <Drawer.Content>
      <Drawer.Header
        class="flex flex-col justify-center items-center gap-3 text-center"
      >
        <Drawer.Title>Scan a QR code</Drawer.Title>
        <Drawer.Description
          >You can scan a cashu token, a lightning address or invoice, a pubkey
          and more!</Drawer.Description
        >
      </Drawer.Header>
      <Scanner></Scanner>
      <Drawer.Footer
        class="flex flex-col justify-center items-center gap-3 text-center"
      >
        <Drawer.Close class={buttonVariants({ variant: "outline" }) + " w-80"}
          >Cancel</Drawer.Close
        >
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>