<script>
	import { reconnect } from '$lib/actions/nostr';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { relaysStore } from '$lib/stores/persistent/relays';
	import { Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import NwcSettings from './NWCSettings.svelte';

	let relayUrl = $state('');

	let hasChanges = $state(false);

	const addRelay = async () => {
		if ($relaysStore.find((r) => r.url === relayUrl)) {
			toast.warning('Relay already exists');
			return;
		}
		await relaysStore.add({ url: relayUrl, isOn: true });
		hasChanges = true;
	};

	const applyChanges = async () => {
		if (!hasChanges) return;
		await reconnect();
		hasChanges = false;
	};
</script>

<div class="flex h-full w-80 flex-col items-start gap-3 xl:w-[600px]">
	<p class="text-lg font-bold">Nostr settings</p>
	<p class="font-bold">Nostr wallet connect</p>
	Experimental NWC integration. It only works if nutstash is running in the foreground.
	<NwcSettings></NwcSettings>
	<div class="flex items-center gap-2">
		<span class="font-bold"> Relays </span>
		{#if hasChanges}
			<Button onclick={applyChanges}>Apply Changes</Button>
		{/if}
	</div>
	<div class="flex w-full gap-2">
		<Input placeholder="wss://..." bind:value={relayUrl} />
		<Button onclick={addRelay}>Add Relay</Button>
	</div>

	{#each $relaysStore as relay}
		<div class="my-2 flex w-full items-center justify-between gap-2 rounded-lg border p-4">
			<button
				onclick={async () => {
					await relaysStore.remove(relay.url, 'url');
					hasChanges = true;
				}}
			>
				<Trash></Trash>
			</button>
			<p class="flex items-center gap-2">
				<span>
					{relay.url}
				</span>
				{#if relay.hasConnection}
					<div class="h-2 w-2 rounded-full bg-green-500"></div>
				{/if}
			</p>
			<Switch
				bind:checked={relay.isOn}
				onclick={async () => {
					await relaysStore.addOrUpdate(relay.url, relay, 'url');
					hasChanges = true;
				}}
			/>
		</div>
	{/each}
</div>
