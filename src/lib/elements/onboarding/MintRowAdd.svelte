<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import Input from '$lib/components/ui/input/input.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import { LoaderCircle } from 'lucide-svelte';
    import type { Snippet } from 'svelte';
    import { mints } from '$lib/stores/persistent/mints';
	import { toast } from "svelte-sonner";

	let {url, isPredefined, afterAdd, children}:{
	url: string,
	isPredefined: boolean,
	afterAdd: Function, children?: Snippet}  = $props()

	let isLoading = $state(false);

	const addMint = async () => {
		try {
			isLoading = true;
			await mints.fetchMint(url);
			afterAdd(url);
		} catch (error) {
			toast.error('Could not load mint');
		} finally {
			isLoading = false;
		}
	};
	const removeMint = async () => {
		await mints.remove(url, 'url')
	};
</script>
	<Card.Root class="flex-grow flex m-2">
		 <Card.Content class="p-3 flex flex-grow gap-2 w-full justify-center items-center">
			<div class=" overflow-clip w-full">
				{#if isPredefined}
					<div class="flex flex-col lg:flex-row lg:items-center gap-2">
						{url}
						<div>
							{@render children?.()}
						</div>
					</div>
				{:else}
					<Input
						type="text"
						class="w-48 lg:w-full"
						placeholder="your favorite mint"
						bind:value={url}
						onkeydown={(e) => {
							if (e.key === 'Enter') {
								addMint();
							}
						}}
					/>
				{/if}
			</div>
			<div class="flex items-center justify-center">
				{#if isLoading}
					<Button disabled>
						<LoaderCircle class="mr-2 size-4 animate-spin" />
						Add
					</Button>
				{:else if $mints.find((m) => m.url === url) && isPredefined}
					<Button variant="destructive" onclick={removeMint}>
						Remove
					</Button>
				{:else}
					<Button class="btn btn-primary flex gap-1" onclick={addMint}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
						Add
					</Button>
				{/if}
			</div>
		 
 </Card.Content>
</Card.Root>

