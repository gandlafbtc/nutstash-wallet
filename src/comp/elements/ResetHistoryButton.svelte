<script>
	import { browser } from '$app/environment';
	import { toast } from '../../stores/toasts';
	import { history } from '../../stores/history';

	const resetHistory = () => {
		history.set([]);
		toast('info', 'history has been reset', 'Done!');
		if (browser) {
			// @ts-expect-error
			document.getElementById('reset-history-modal').checked = false;
		}
	};
</script>

<label for="reset-history-modal" class="btn btn-error">Reset History</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="reset-history-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<p class="py-4">
			Are you sure you want to delete your history? You will keep your Tokens and Mints.
		</p>
		<div class="modal-action">
			<label for="reset-history-modal" class="btn btn-outline">Cancel</label>
			<button on:click={resetHistory} class="btn btn-error">Delete</button>
		</div>
	</div>
</div>
