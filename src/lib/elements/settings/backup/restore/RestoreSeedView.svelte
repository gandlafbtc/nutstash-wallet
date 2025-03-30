<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { mints } from '$lib/stores/persistent/mints';

	import { mnemonic } from '$lib/stores/persistent/mnemonic';
	import { LoaderCircle, Plus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import RestoreInProgress from './RestoreInProgress.svelte';
	import AddMint from '$lib/elements/mint/AddMint.svelte';
	import DiscoverMints from '$lib/elements/mint/DiscoverMints.svelte';
	import Divider from '$lib/elements/ui/Divider.svelte';
	import {
		add_more_mints,
		restore_ecash_from_seed_phrase,
		t_restore
	} from '$lib/paraglide/messages';

	let isInProgress = $state(false);

	let isHide = $state(true);
</script>

{#if isInProgress}
	<RestoreInProgress></RestoreInProgress>
{:else}
	<div class="flex h-full flex-col gap-3">
		<span class="text-lg font-bold"> {restore_ecash_from_seed_phrase()} </span>
		<button
			class=" grid w-80 grid-cols-3 rounded-lg border border-dashed p-2 text-start transition-colors duration-200 hover:bg-secondary xl:w-[600px]"
			onclick={() => (isHide = !isHide)}
		>
			{#each $mnemonic[0]?.mnemonic.split(' ') as word, i}
				<span class="text-xs">
					{i + 1}. {isHide ? '******' : word}
				</span>
			{/each}
		</button>
		<div class="mt-5 flex flex-col gap-2">
			<Button class="mt-3" disabled={!$mints.length} onclick={() => (isInProgress = true)}
				>{t_restore()}</Button
			>
			<Divider text="or"></Divider>
			<span> {add_more_mints()} </span>
			<AddMint></AddMint>
			<DiscoverMints></DiscoverMints>
		</div>
	</div>
{/if}
