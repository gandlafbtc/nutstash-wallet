<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { KeysetCount } from '$lib/db/models/types';
	import { manipulating_counters_can_mess_up_restore_process, t_warning } from '$lib/paraglide/messages';
	import { countsStore } from '$lib/stores/persistent/counts';
	import NumberFlow from '@number-flow/svelte';

	const updateCount = async (count: KeysetCount, incr: number) => {
		await countsStore.addOrUpdate(
			count.keysetId,
			{ keysetId: count.keysetId, count: count.count + incr },
			'keysetId'
		);
	};
</script>

<div class="flex h-full w-80 flex-col gap-5 xl:w-[600px]">
	<p class="text-destructive">
		<span class="font-bold"> {t_warning()}! </span>
		{manipulating_counters_can_mess_up_restore_process()}
	</p>

	{#each $countsStore as count}
		<div class="mb-2 flex w-full items-center justify-between gap-2">
			<p class="w-32 overflow-clip text-ellipsis text-sm">
				{count.keysetId}
			</p>
			<p>
				<NumberFlow value={count.count}></NumberFlow>
			</p>
			<Button
				onclick={() => {
					updateCount(count, 5);
				}}
			>
				+5
			</Button>
			<Button
				variant="destructive"
				onclick={async () => {
					await updateCount(count, 20);
				}}
			>
				+20
			</Button>
		</div>
	{/each}
</div>
