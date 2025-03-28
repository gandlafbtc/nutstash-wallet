<script>
	import { reconnect } from '$lib/actions/nostr';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { relaysStore } from '$lib/stores/persistent/relays';
	import { Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import NwcSettings from './NWCSettings.svelte';
	import { add_relay, apply_changes, experimental_nwc_integrations, nostr_settings, nostr_wallet_connect, t_relays } from '$lib/paraglide/messages';

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
	<p class="text-lg font-bold">{nostr_settings()}</p>
	<p class="font-bold">{nostr_wallet_connect()}</p>
	{experimental_nwc_integrations()}
	<NwcSettings></NwcSettings>
	<div class="flex items-center gap-2">
		<span class="font-bold"> {t_relays()} </span>
		{#if hasChanges}
			<Button onclick={applyChanges}>{apply_changes()}</Button>
		{/if}
	</div>
	<div class="flex w-full gap-2">
		<Input placeholder="wss://..." bind:value={relayUrl} />
		<Button onclick={addRelay}>{add_relay()}</Button>
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
