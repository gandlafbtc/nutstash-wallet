<script>
	import Toast from './Toast.svelte';
	import { notifications } from '../stores/toasts';
</script>

{#if $notifications}
	<div class="mb-5 toast toast-center">
		{#each $notifications as toast}
			<Toast level={toast.level} message={toast.message} messageTitle={toast.messageTitle} />
		{/each}
	</div>
{/if}
