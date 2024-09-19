<script lang="ts">
	import { counts } from '../../stores/counts';
	import Mnemonic from './Mnemonic.svelte';

	let cModal: HTMLDialogElement;
</script>

<button class="btn btn-primary" on:click={() => cModal.showModal()}>Increase Counters</button>

<dialog class="modal" bind:this={cModal}>
	<div class="modal-box">
		<div class="grid grid-cols-3 gap-2">
			<div class="font-bold">Keyset ID</div>
			<div class="font-bold">Count</div>
			<div class="font-bold">Increment</div>

			{#each $counts as count}
				<div>
					{count.keysetId}
				</div>
				<div>
					{count.count}
				</div>
				<div>
					<button
						class="btn btn-primary btn-sm btn-square"
						on:click={() => {
							count.count = count.count + 25;
							$counts = $counts;
						}}
					>
						+
					</button>
				</div>
			{/each}
		</div>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
