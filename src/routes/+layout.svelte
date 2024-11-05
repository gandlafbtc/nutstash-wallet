<script lang="ts">
	import NostrSocket from "$lib/plugin/NostrSocket.svelte";
	import StorageManager from "$lib/plugin/StorageManager.svelte";
	import Toasts from "$lib/plugin/Toasts.svelte";
	import { useNostr } from "$lib/stores/persistent/nostr";
	import { ModeWatcher } from "mode-watcher";
	import "../app.css";
	import { onMount } from "svelte";
	import { init } from "$lib/init/init";
	import Loading from "$lib/elements/base/Loading.svelte";
	import { key } from "$lib/stores/session/key";

	let isInit = $state(false);

	onMount(async () => {
		// navigator.storage.persist()
		isInit = true;
		await key.init();
	});
</script>

{#if isInit}
	<ModeWatcher></ModeWatcher>
	<StorageManager>
		{#if $useNostr}
			<!-- <NostrSocket /> -->
		{/if}
		<div class="w-full h-full fixed">
			<slot />
		</div>
		<div class="relative bottom-0 right-0 z-50">
			<Toasts />
		</div>
	</StorageManager>
{:else}
	<Loading></Loading>
{/if}
