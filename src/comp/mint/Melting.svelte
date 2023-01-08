<script lang="ts">
	import { CashuMint, CashuWallet } from '@gandlaf21/cashu-js';
	import type { Mint } from '../../model/mint';
	import LoadingCenter from '../LoadingCenter.svelte';
	import { QRCodeImage } from 'svelte-qrcode-image';
	import { decode } from '@gandlaf21/bolt11-decode';
	import { browser } from '$app/environment';
	import { toast } from '../../stores/toasts';
	import { token } from '../../stores/tokens';
	import type { Token } from '../../model/token';

	export let mint: Mint;

	let invoice = '';
	let amount: number;

	const decodeInvoice = () => {
        console.log("hello")
		try {
			amount = decode(invoice).sections[2].value/1000;
		} catch {
            toast("warning","The invoice could not be decoded", "Malformed Invoice")
        }
	};

	const payInvoice = () => {};

	const storeNewTokens = () => {};

	const resetState = () => {};
</script>

<input type="checkbox" id="melt-modal-{mint.keysets[0]}" class="modal-toggle" />
<div class="modal">
	<div class="modal-box flex flex-col gap-3 h-80">
		<label for="melt-invoice-input" class="label-text label font-bold">Invoice:</label>
		<input
			id="melt-invoice-input"
			type="text"
			class="input input-primary"
			bind:value={invoice}
			on:input={decodeInvoice}
		/>
        <div>
            <p>Amount:</p>
            <p>{amount}</p>
        </div>
		<div class="modal-action">
			<label for="melt-modal-{mint.keysets[0]}" class="btn btn-outline" on:click={resetState}
				>cancel</label
			>
			<button class="btn btn-warning" on:click={() => payInvoice()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
					/>
				</svg>Pay</button
			>
		</div>
	</div>
</div>
