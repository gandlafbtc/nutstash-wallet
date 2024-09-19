<script lang="ts">
	import { BleClient } from '@capacitor-community/bluetooth-le';
	import { Capacitor } from '@capacitor/core';

	export let data = '';

	const scanBT = async () => {
		const devices = [];
		if (!BleClient.isEnabled()) {
			await BleClient.requestEnable();
		}
		await BleClient.requestLEScan({}, (d) => {
			console.log(d);
		});
	};
</script>

{Capacitor.getPlatform()}
{navigator.bluetooth}
{#if (Capacitor.getPlatform() === 'web' && navigator.bluetooth) || Capacitor.getPlatform() !== 'web'}
	<button class="btn btn-info btn-square" on:click={scanBT}>
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currenColor"
			xmlns="http://www.w3.org/2000/svg"
			class="w-6 h-6"
		>
			<path
				d="M7 17L17 7L12 2V22L17 17L7 7"
				stroke="#000000"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
{/if}
