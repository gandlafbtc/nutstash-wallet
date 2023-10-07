<script lang="ts">
	import Mnemonic from './Mnemonic.svelte';
</script>

<button class="btn btn-primary" onclick="seed_modal.showModal()">show</button>

<dialog id="seed_modal" class="modal">
	<div class="modal-box">
		<Mnemonic />
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
