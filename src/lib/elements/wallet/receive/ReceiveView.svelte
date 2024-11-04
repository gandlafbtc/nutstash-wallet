<script>
    import ScannerDrawer from "../scanner/ScannerDrawer.svelte";
import Receive from "./Receive.svelte";

    let openScannerDrawer = $state(false)

</script>
<div>
    <Receive bind:openScannerDrawer></Receive>
</div>

<ScannerDrawer bind:openScannerDrawer></ScannerDrawer>
