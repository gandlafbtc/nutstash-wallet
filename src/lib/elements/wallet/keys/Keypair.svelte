<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import type { types } from '@gandlaf21/cashu-wallet-engine';
	import { Eye, EyeClosed, Link2 } from 'lucide-svelte';

	const { keypair }: { keypair: types.KeyPair } = $props();
	let showPW = $state(false);
	const inputType = $derived(!showPW ? 'password' : 'text');
</script>

<div class="my-2 flex items-center gap-3">
	<Input readonly value={"02"+keypair.publicKey}></Input>
	<div>
		<Link2 class="-mx-3 h-6 w-6"></Link2>
	</div>
	<Input type={inputType} readonly value={keypair.privateKey}></Input>
	<button onclick={() => (showPW = !showPW)}>
		{#if showPW}
			<EyeClosed></EyeClosed>
		{:else}
			<Eye></Eye>
		{/if}
	</button>
</div>
