<script lang="ts">
	import type { Message } from '$lib/db/models/types';
	import { nip19 } from 'nostr-tools';
	import * as Avatar from '$lib/components/ui/avatar';
	import { getBy } from '$lib/stores/persistent/helper/storeHelper';
	import { contactsStore } from '$lib/stores/persistent/contacts';
	import { formatDistance } from 'date-fns';
	import { now } from '$lib/stores/session/time';

	let { message }: { message: [key: string, value: Message] } = $props();

	let npub = $derived(nip19.npubEncode(message[0]));
	let alias = $derived(getBy($contactsStore, npub, 'npub')?.alias ?? '?');
</script>

<a href={`/#/wallet/contacts/chat/${npub}`} class="flex w-80 flex-col gap-3 rounded-xl border p-2">
	<div class="flex items-center gap-4">
		<Avatar.Root>
			<Avatar.Image src={$contactsStore.find((c) => c.npub === npub)?.picture ?? ''} alt={alias} />
			<Avatar.Fallback
				>{alias
					.split(' ')
					.reduce((acc, cur) => acc + '' + cur[0]?.toUpperCase(), '')}</Avatar.Fallback
			>
		</Avatar.Root>
		<div class="flex h-full w-60 flex-col justify-between gap-2 overflow-clip">
			<span class="flex gap-2 text-nowrap">
				<span class="font-bold">
					{alias}
				</span>
				<div class="w-32 overflow-clip text-ellipsis text-sm text-secondary">
					<span>
						{npub}
					</span>
				</div>
			</span>
		</div>
	</div>
	<div class="w-full overflow-clip text-ellipsis text-nowrap">
		{message[1].content}
	</div>
	<div class="text-xs opacity-35">
		{formatDistance($now, message[1].created_at * 1000)} ago
	</div>
</a>
