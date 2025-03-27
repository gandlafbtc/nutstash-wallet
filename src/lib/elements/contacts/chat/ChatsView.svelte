<script lang="ts">
	import type { Message } from '$lib/db/models/types';

	import { messagesStore } from '$lib/stores/persistent/message';
	import { keysStore } from '$lib/stores/persistent/keys';
	import RecentChat from './RecentChat.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { t_chats, t_new_chat } from '$lib/paraglide/messages';

	const getLatestMessages = () => {
		const latestMap: Map<string, Message> = new Map();
		for (const message of $messagesStore) {
			if (latestMap.has(message.tags[0][1])) {
				if (message.created_at > (latestMap.get(message.tags[0][1])?.created_at ?? 0)) {
					latestMap.set(message.tags[0][1], message);
				}
			} else {
				latestMap.set(message.tags[0][1], message);
			}

			if (latestMap.has(message.pubkey)) {
				if (message.created_at > (latestMap.get(message.pubkey)?.created_at ?? 0)) {
					latestMap.set(message.pubkey, message);
				}
			} else {
				latestMap.set(message.pubkey, message);
			}
		}
		latestMap.delete($keysStore[$keysStore.length - 1].publicKey.slice(2));
		return latestMap;
	};

	let latestMessageForPubKey = $derived.by(getLatestMessages);
</script>

<div class="flex h-full w-80 flex-col justify-start gap-2 xl:w-[600px]">
	<p class="text-lg font-bold">{t_chats()}</p>
	<div>
		<Button href="/#/wallet/contacts">{t_new_chat()}</Button>
	</div>

	{#each latestMessageForPubKey.entries() as message}
		<div class="my-2">
			<RecentChat {message}></RecentChat>
		</div>
	{/each}
</div>
