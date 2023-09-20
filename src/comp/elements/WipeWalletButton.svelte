<script>
	import { browser } from '$app/environment';
	import { toast } from '../../stores/toasts';
	import { history } from '../../stores/history';

	const wipeWallet = () => {
		if (browser) {
			localStorage.clear();
			toast('info', 'The site will reload shortly', 'The wallet has been wiped');
			setTimeout(() => {
				window.location.reload();
			}, 1000);
			// @ts-expect-error
			document.getElementById('wipe-wallet-modal').checked = false;
		}
	};
</script>

<label for="wipe-wallet-modal" class="btn btn-error">Wipe everything</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="wipe-wallet-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<p class="py-4 font-bold text-error">Warning!!!</p>
		<p class="py-4">
			You will delete all data from this browser-wallet, including tokens and mints. If you don't
			have a backup, you will lose access to your funds
		</p>
		<div class="modal-action">
			<label for="wipe-wallet-modal" class="btn btn-outline">cancel</label>
			<button on:click={wipeWallet} class="btn btn-error">Delete all data</button>
		</div>
	</div>
</div>
