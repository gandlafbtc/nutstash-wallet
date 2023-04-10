<script lang="ts">
	import type { Mint } from '../../model/mint';
	import type { Token } from '../../model/token';

	export let backupObject: { proofs: Array<Token>; mints: Array<Mint> };
</script>

<div>
	<h2>You are about to import the following into your wallet:</h2>
	<div class="w-full h-full flex flex-col gap-2">
		<div class="card w-96 bg-base-100 shadow-xl max-h-96 overflow-scroll scrollbar-hide">
			<div class="card-body">
				{#each backupObject.mints as mint}
					<div class="flex gap-3 rounded-full bg-accent px-2">
						<p class="trunctate overflow-scroll scrollbar-hide max-w-[8em]">
							{mint.mintURL}
						</p>
						<p class="trunctate overflow-scroll scrollbar-hide max-w-[8em]">
							{mint.keysets.join(',')}
						</p>
					</div>
				{/each}
				{#each backupObject.proofs as proof}
					<div class="grid grid-cols-2 gap-1 rounded-full bg-primary px-2">
						<p>
							{proof.amount} sats
						</p>
						<p>
							from {proof.id}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
