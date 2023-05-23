<script lang="ts">
	import { QRCodeImage } from 'svelte-qrcode-image';
	import BigTokenQr from './BigTokenQR.svelte';

	export let token: string;
</script>

<div class="flex items-center justify-center flex-col">
    <div class="text-sm bg-primary text-primary-content rounded-t-lg p-1 px-2">
        Token - scan to receive
    </div>
	<div class="border-primary border-2 rounded-md p-2">
        {#if token.length < 400}
        <QRCodeImage text={token} displayHeight={250} displayWidth={250} />
        {:else}
        <BigTokenQr {token} />
        {/if}
	</div>
</div>
