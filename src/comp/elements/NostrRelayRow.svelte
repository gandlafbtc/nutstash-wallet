<script lang="ts">
	import { nostrRelays } from '../../stores/nostr';
	import type { NostrRelay } from '../../model/relay';
	import { toast } from '../../stores/toasts';

	export let relay: NostrRelay;
	export let i: number;


    const setRelayActive = () => {

        // todo do this in one update
        nostrRelays.update(state=>state.filter((r)=>r !== relay))

        relay.isActive = !relay.isActive
        nostrRelays.update(state=>[relay,...state])
    }
    const removeRelay = () => {
        nostrRelays.update(state=>state.filter((r)=>r !== relay))
    }
</script>

<div class="flex gap-2 items-center">
	<div class="flex gap-2 items-center">
		{#if relay.isActive}
			<div class="w-4 h-4 flex">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4 text-info animate-ping absolute inline-flex"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
					/>
				</svg>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4 text-info relative inline-flex rounded-full "
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
					/>
				</svg>
			</div>
		{/if}
		<p>{relay.url}</p>
	</div>
	<div class="flex">
		<button class="btn-square btn btn-warning" on:click={setRelayActive}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
				/>
			</svg>
		</button>
	</div>
	<div class="flex">
		<button class="btn-square btn btn-error" on:click={removeRelay}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
				/>
			</svg>
		</button>
	</div>
</div>
