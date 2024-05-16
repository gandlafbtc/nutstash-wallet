<script>
	import Toast from './Toast.svelte';
	import { notifications } from '../stores/toasts';
</script>

{#if $notifications}
	<div class="mb-5 toast toast-center">
		{#each $notifications as toast}
			<Toast
				level={toast.toast.level}
				message={toast.toast.message}
				messageTitle={toast.toast.messageTitle}
				timer={toast.timer}
			/>
		{/each}
	</div>
{/if}
