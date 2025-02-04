<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { toast } from 'svelte-sonner';
	import { push } from 'svelte-spa-router';
	let inputValue = $state('');
	const onpaste = (e: ClipboardEvent) => {
		setTimeout(() => {
			try {
				if (!inputValue.startsWith('creq')) {
					toast.warning('Not a cashu request');
					return;
				}
				push('/wallet/send/cashureq');
			} catch (error) {
			} finally {
				inputValue = '';
			}
		}, 50);
	};
</script>

<div class="flex gap-2">
	<Input placeholder="creqA..." bind:value={inputValue} onpaste={(e) => onpaste(e)} />
</div>
