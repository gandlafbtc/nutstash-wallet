<script>
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { ensureError } from '$lib/helpers/errors';
	import {
		error_updating_mint,
		make_default,
		mint_updated,
		remove_mint,
		t_update,
		updating_mint
	} from '$lib/paraglide/messages';
	import { mints } from '$lib/stores/persistent/mints';
	import { Landmark, Loader, Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	let { mint } = $props();

	let isLoading = $state(false);
	const fetchMint = async () => {
		try {
			isLoading = true;
			toast.promise(mints.fetchMint(mint.url), {
				loading: updating_mint(),
				success: mint_updated()
			});
		} catch (error) {
			console.error(error);
			const err = ensureError(error);
			console.error(err);
			toast.error(error_updating_mint(), { description: err.message });
		} finally {
			isLoading = false;
		}
	};
</script>

<DropdownMenu.Item class="" onclick={fetchMint}>
	<Loader></Loader>
	{t_update()}
</DropdownMenu.Item>
<DropdownMenu.Item class="" onclick={() => mints.makeDefaultMint(mint)}>
	<Landmark></Landmark>
	{make_default()}
</DropdownMenu.Item>
<DropdownMenu.Item class="text-destructive" onclick={() => mints.remove(mint.url, 'url')}>
	<Trash></Trash>
	{remove_mint()}
</DropdownMenu.Item>
