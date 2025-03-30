<script lang="ts">
	import { all_mints } from '$lib/paraglide/messages';
	import { mints } from '$lib/stores/persistent/mints';
	import { proofsStore } from '$lib/stores/persistent/proofs';
	import {
		formatAmount,
		getAmountForTokenSet,
		getProofsOfMintsUnit,
		getUnitsForMints
	} from '$lib/util/walletUtils';
	import { Landmark } from 'lucide-svelte';
</script>

<div
	class="flex h-48 flex-col rounded-lg border bg-gradient-to-tr from-nutstash to-nutstashsecondary p-4 text-white shadow-md"
>
	<div class="flex gap-2">
		<div class="flex h-12 w-12 items-center justify-center rounded-full bg-background pb-1">
			<Landmark class="text-secondary-foreground"></Landmark>
		</div>
		<div class="flex flex-col gap-1">
			<p class="w-52 overflow-clip text-ellipsis font-bold">{all_mints()}</p>
			<p>
				{$mints.length}
			</p>
		</div>
	</div>

	<div class="fixed bottom-3 flex gap-1 text-lg">
		{#each getUnitsForMints($mints) as unit}
			<p class="text-nowrap text-sm">
				{formatAmount(getAmountForTokenSet(getProofsOfMintsUnit($mints, $proofsStore, unit)), unit)}
			</p>
		{/each}
	</div>
</div>
