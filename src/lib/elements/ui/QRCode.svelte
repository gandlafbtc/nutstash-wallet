<script lang="ts">
	import { encodeQR } from "@paulmillr/qr";

	interface Props {
		data: string
	}
	
	let { data }: Props = $props();

	let qrSVG = $derived(encodeQR(data, 'svg'))
	
</script>

<div class="min-h-20 min-w-20 bg-white p-1 rounded-md">
	{@html qrSVG}
</div>
