<script lang="ts">
    import { mintQuotesStore } from "$lib/stores/mintquotes";
    import { onMount } from "svelte";
import { QRCodeImage } from "svelte-qrcode-image";

const {invoice }: {invoice: string } = $props()
 
</script>
<QRCodeImage text={invoice}>

</QRCodeImage>