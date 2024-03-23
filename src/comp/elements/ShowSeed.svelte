<script lang="ts">
	import Mnemonic from './Mnemonic.svelte';

	let seedModal: HTMLDialogElement

</script>

<button class="btn btn-primary" on:click={() => seedModal.showModal()}>show</button>

<dialog class="modal" bind:this={seedModal}>
	<div class="modal-box">
		<Mnemonic />
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
