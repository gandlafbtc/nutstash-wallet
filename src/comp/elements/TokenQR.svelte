<script lang="ts">
	import { QRCodeImage } from 'svelte-qrcode-image';
	import BigTokenQr from './BigTokenQR.svelte';

	export let token: string;
</script>

<div class="flex items-center justify-center flex-col">
   
	<div class="border-primary border  rounded-md p-2">
        {#if token.length < 400}
        <QRCodeImage text={token} displayHeight={275} displayWidth={275} />
        {:else}
        <BigTokenQr {token} />
        {/if}
	</div>
</div>
