<script lang="ts">
	import { QRCodeImage } from 'svelte-qrcode-image';
	import BigTokenQr from './BigTokenQR.svelte';

	export let token: string = '';
	let speed = 5;
	let size = 4;
	let showControls = false;
</script>

<div class="flex items-center justify-center flex-col gap-2">
	<div
		class="flex items-center justify-center border-primary border rounded-md p-2 h-72 w-72 lg:w-96 lg:h-96"
	>
		{#if token.length < 400}
			<QRCodeImage text={token} />
		{:else if size || speed}
			<BigTokenQr {token} {size} {speed} />
		{/if}
	</div>
	{#if token.length >= 400}
		<div class="p-4 flex gap-5 flex-col">
			<div class="flex gap-2 items-start text-start text-primary">
				<p class="w-12">speed</p>
				<input
					type="range"
					min="1"
					max="7"
					bind:value={speed}
					class="range w-56 range-primary"
					step="1"
				/>
			</div>
			{#if showControls}
				<div class="flex gap-1 items-center">
					<div>
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
								d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
							/>
						</svg>
					</div>
					<p>After changing the size, the scanning device has to restart the scanning process.</p>
				</div>
				<div class="flex gap-2 items-start text-start text-secondary">
					<p class="w-12">size</p>
					<input
						type="range"
						min="1"
						max="4"
						bind:value={size}
						class="range range-secondary w-56"
						step="1"
					/>
				</div>
			{:else}
				<button class="btn btn-sm" on:click={() => (showControls = true)}>
					I can't scan this QR code
				</button>
			{/if}
		</div>
	{/if}
</div>
