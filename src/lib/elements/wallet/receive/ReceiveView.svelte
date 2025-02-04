<script>
	import ScannerDrawer from '../scanner/ScannerDrawer.svelte';
	import Receive from './Receive.svelte';

	let openScannerDrawer = $state(false);
</script>

<div>
	<Receive></Receive>
</div>

<ScannerDrawer></ScannerDrawer>
