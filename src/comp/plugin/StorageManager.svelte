<script>
	let isOpen = false;
	import { browser } from '$app/environment';
	if (browser) {
		localStorage.openpages = Date.now();
		let onLocalStorageEvent = function (e) {
			if (e.key == 'openpages') {
				localStorage.page_available = Date.now();
			}
			if (e.key == 'page_available') {
				isOpen = true;
			}
		};
		window.addEventListener('storage', onLocalStorageEvent, false);
	}

	const reload = () => {
		if (browser) {
			location.reload();
		}
	};
</script>

{#if isOpen}
	<div class="fixed w-screen h-screen bg-black bg-opacity-90 z-50 flex items-center justify-center">
		<div class="bg-base-100 p-2 rounded-md flex flex-col gap-2 w-80 h-40">
			<p class="font-bold">Nutstash is already open in another tab</p>
			<p class="pt-3 text-center h-full">please close this window</p>
			<button class="pt-3 text-center h-full link link-primary" on:click={reload}> reload </button>
		</div>
	</div>
{:else}
	<slot />
{/if}
