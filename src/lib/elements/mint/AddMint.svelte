<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { ensureError } from '$lib/helpers/errors';
	import {
		add_mint,
		add_mint_successfully,
		mint_already_added,
		no_url_entered
	} from '$lib/paraglide/messages';
	import { mints } from '$lib/stores/persistent/mints';
	import { LoaderCircle, Plus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	let {
		mintUrlToAdd = $bindable(''),
		readOnly = false,
		showAddText = true
	}: { mintUrlToAdd?: string; readOnly?: boolean; showAddText?: boolean } = $props();

	let isAddingMint = $state(false);
	const addMint = async () => {
		try {
			if (!mintUrlToAdd) {
				toast.warning(no_url_entered());
				return;
			}
			if ($mints.find((mint) => mint.url === mintUrlToAdd)) {
				toast.warning(mint_already_added());
				return;
			}
			isAddingMint = true;
			await mints.fetchMint(mintUrlToAdd);
			mintUrlToAdd = '';
			toast.success(add_mint_successfully());
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isAddingMint = false;
		}
	};
</script>

<div class="flex w-80 gap-2 xl:w-[600px]">
	<Input
		readonly={readOnly}
		bind:value={mintUrlToAdd}
		onkeypress={(e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				addMint();
			}
		}}
	/>
	<Button disabled={isAddingMint} onclick={addMint}>
		{#if isAddingMint}
			<LoaderCircle class="animate-spin"></LoaderCircle>
		{:else}
			<Plus></Plus>
		{/if}
		{#if showAddText}
			{add_mint()}
		{/if}
	</Button>
</div>
