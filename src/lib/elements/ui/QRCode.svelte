<script lang="ts">
	import { encodeQR } from '@paulmillr/qr';

	interface Props {
		data: string;
	}

	let { data }: Props = $props();

	let qrSVG = $derived(encodeQR(data, 'svg'));
</script>

<div class="min-h-20 min-w-20 rounded-md bg-white p-1">
	{@html qrSVG}
</div>
