<script lang="ts">

	import * as Avatar from '$lib/components/ui/avatar';
	import type { types } from '@gandlaf21/cashu-wallet-engine';

	let { contact }: { contact: types.Contact } = $props();
</script>

<div class="flex items-center gap-4 rounded-xl border p-2">
	<Avatar.Root>
		<Avatar.Image src={contact.picture ?? ''} alt={contact.alias} />
		<Avatar.Fallback
			>{contact.alias
				.split(' ')
				.reduce((acc, cur) => acc + '' + cur[0]?.toUpperCase(), '')}</Avatar.Fallback
		>
	</Avatar.Root>
	<div class="flex h-full w-60 flex-col justify-between gap-2">
		<span class="font-bold">
			{contact.alias}
		</span>
		<span class="overflow-clip overflow-ellipsis text-sm text-secondary">
			<span>
				{contact.npub}
			</span>
		</span>
	</div>
</div>
