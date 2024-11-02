<script lang="ts">
	import { isOnboarded } from "$lib/stores/local/message";
	import { mints } from "$lib/stores/persistent/mints";
	import MintRowAdd from "./MintRowAdd.svelte";
	import Badge from "$lib/components/ui/badge/badge.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { pop, push } from "svelte-spa-router";
	import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";

	let someMints = $state([
		"https://8333.space:3338",
		"https://mint.minibits.cash/Bitcoin",
		"https://testnut.cashu.space",
	]);
	const { isSetupMints = false }: { isSetupMints?: boolean } = $props();

	//fetch from nostr?

	const persistMints = () => {
		isOnboarded.set(true);
		push("/wallet/");
	};

	const afterAdd = (url: string) => {
		someMints.push(url);
	};
</script>

<div class="flex h-full items-center justify-center">
	<div class="m-2 flex gap-2 max-w-4xl">
		<div class="flex flex-col gap-4 w-full items-center justify-start">
			<h1 class="text-xl font-bold text-center">Add some mints</h1>
			<p>
				Remember, the mint you select will have custody over your
				satoshis.
			</p>
			<p>
				You will also need to remember from which mints you hold ecash,
				in order to be able to restore them from your seed phrase.
			</p>

			<div class="flex flex-col gap-4 w-full">
				<ScrollArea
					class="h-80 flex flex-col justify-start border rounded p-1"
				>
					{#each someMints as url}
						<MintRowAdd
							{url}
							isPredefined={true}
							afterAdd={() => {}}
						>
							{#if url === "https://testnut.cashu.space"}
								<Badge>TEST</Badge>
							{/if}
						</MintRowAdd>
					{/each}
					<MintRowAdd url={""} isPredefined={false} {afterAdd} />
				</ScrollArea>
				<Button
					disabled={!$mints.length}
					onclick={persistMints}
				>
					confirm
				</Button>

				<div class="w-full flex justify-between">
					<div>
						<Button
							variant="link"
							onclick={() => {
								pop();
							}}
						>
							Back
						</Button>
					</div>
					<div>
						{#if !$mints.length}
							<Button variant="link" onclick={persistMints}>
								Skip
							</Button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
