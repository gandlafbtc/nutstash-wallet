<script lang="ts">
	import { toast } from "../../stores/toasts";
    import { nostrRelays, useNostr } from "../../stores/nostr";
	import NostrRelayRow from "./NostrRelayRow.svelte";
    let relayUrl: string


    const addRelay = () => {
        if ($nostrRelays.map(r=>r.url).includes(relayUrl)) {
            toast('warning','this relay is already added', 'Relay not added.')
            return
        }
        nostrRelays.update(state=>[{url:relayUrl, isActive:true},...state])
		useNostr.update(state => !state)
		setTimeout(() => {
			useNostr.update(state => !state)
		}, 200);
    }
</script>

<input type="checkbox" id="nostr-relay-config" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-xl">Configure Nostr Relays</h3>

		<div class="flex flex-col gap-2">
			<div class="w-full max-h-44 overflow-y-scroll flex flex-col gap-2">
                {#each $nostrRelays as relay, i}
                     <NostrRelayRow {relay}></NostrRelayRow>
                {/each}
            </div>
			<div class="flex gap-2 items-end w-full">
				<div class="form-control">
					<label class="label">
						<span class="label-text">Add new Relay</span>
					</label>
					<label class="input-group">
						<span>URL</span>
						<input type="text" placeholder="wss://some-relay" class="input input-bordered" bind:value={relayUrl} />
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
		<div class="modal-action">
			<label for="nostr-relay-config" class="btn">Done</label>
		</div>
	</div>
</div>
