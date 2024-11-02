<script>
    import { useSidebar } from '$lib/components/ui/sidebar';
    import { notifications } from '$lib/stores/session/toasts';
	import Toast from './Toast.svelte';
</script>

{#if $notifications}
	<div class="fixed bottom-20 z-50 inset-x-0 max-w-max mx-auto lg:right-5 lg:mx-0 lg:inset-x-auto">
		<div class="flex gap-2 flex-col">

			{#each $notifications as toast}
			<Toast
			level={toast.toast.level}
			message={toast.toast.message}
			messageTitle={toast.toast.messageTitle}
			timer={toast.timer}
			/>
			{/each}
		</div>
	</div>
{/if}
