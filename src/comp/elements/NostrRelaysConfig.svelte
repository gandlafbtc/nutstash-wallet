<script lang="ts">
	import { toast } from '../../stores/toasts';
	import { nostrRelays, useNostr } from '../../stores/nostr';
	import NostrRelayRow from './NostrRelayRow.svelte';
	let relayUrl: string;

	const addRelay = () => {
		if (!relayUrl.includes('wss://')) {
			toast('warning', 'not a valid relay', 'Relay not added.');
			return;
		}
		if ($nostrRelays.map((r) => r.url).includes(relayUrl)) {
			toast('warning', 'this relay is already added', 'Relay not added.');
			return;
		}
		nostrRelays.update((state) => [{ url: relayUrl, isActive: true }, ...state]);
		useNostr.update((state) => !state);
		setTimeout(() => {
			useNostr.update((state) => !state);
		}, 200);
	};
</script>

<div class="flex justify-between items-center">
	<div class="col-span-1">
		<label for="nostr-relay-config">Relays</label>
	</div>
</div>

<div class="bg-base-200 p-2 rounded-md">
	<div class="flex flex-col lg:flex-row lg:justify-between gap-2 items-start">
		<div class="w-full max-h-44 overflow-y-scroll flex flex-col gap-2 scrollbar-hide">
			{#each $nostrRelays as relay, i}
				<NostrRelayRow {relay} />
			{/each}
		</div>
		<div class="flex gap-2 lg:justify-end items-start w-full">
			<form class="flex gap-2" on:submit|preventDefault={addRelay}>
				<div class="form-control">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="input-group">
						<input
							type="text"
							placeholder="wss://some-relay"
							class="input input-bordered"
							bind:value={relayUrl}
						/>
					</label>
				</div>
				<input type="submit" class="btn-square btn-primary btn" value="Add" />
			</form>
		</div>
	</div>
</div>
