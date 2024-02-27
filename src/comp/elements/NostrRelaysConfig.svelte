<script lang="ts">
	import { toast } from '../../stores/toasts';
	import { nostrRelays, useNostr } from '../../stores/nostr';
	import NostrRelayRow from './NostrRelayRow.svelte';
	let relayUrl: string;

	const addRelay = () => {
		if (!relayUrl.includes('wss://')) {
			toast('warning', 'not a valid relay', 'Relay not added.');
			return
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
<div class="flex flex-col gap-2">
	<div class="w-full max-h-44 overflow-y-scroll flex flex-col gap-2 scrollbar-hide">
		{#each $nostrRelays as relay, i}
			<NostrRelayRow {relay} />
		{/each}
	</div>
	<div class="flex gap-2 items-end w-full">
		<div class="form-control">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">Add new Relay</span>
			</label>
			<label class="input-group">
				<input
					type="text"
					placeholder="wss://some-relay"
					class="input input-bordered"
					bind:value={relayUrl}
				/>
			</label>
		</div>
		<button class="btn-square btn-primary btn" on:click={addRelay}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
	</div>
</div>

				</div>