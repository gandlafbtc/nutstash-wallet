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
	<div class="fixed z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-90">
		<div class="bg-base-100 flex h-40 w-80 flex-col gap-2 rounded-md p-2">
			<p class="font-bold">Nutstash is already open in another tab</p>
			<p class="h-full pt-3 text-center">please close this window</p>
			<button class="link link-primary h-full pt-3 text-center" on:click={reload}> reload </button>
		</div>
	</div>
{:else}
	<slot />
{/if}
