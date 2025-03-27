<script lang="ts">
	import type { Message } from '$lib/db/models/types';
	import ReceiveCard from '$lib/elements/wallet/receive/ecash/ReceiveCard.svelte';
	import { t_ago, t_me } from '$lib/paraglide/messages';
	import { keysStore } from '$lib/stores/persistent/keys';
	import { messagesStore } from '$lib/stores/persistent/message';
	import { now } from '$lib/stores/session/time';
	import { getDecodedToken, type Proof } from '@cashu/cashu-ts';
	import { formatDistance } from 'date-fns';
	import { nip19 } from 'nostr-tools';
	import { onMount } from 'svelte';

	let { message, alias }: { message: Message; alias?: string } = $props();

	let decoded:
		| {
				id?: string;
				memo?: string;
				mint: string;
				unit: string;
				proofs: Proof[];
		  }
		| undefined = $state();

	onMount(() => {
		//todo maybe a bit better json catcher?
		if (message.content.startsWith('{')) {
			try {
				decoded = JSON.parse(message.content) as {
					id?: string;
					memo?: string;
					mint: string;
					unit: string;
					proofs: Proof[];
				};
			} catch (error) {}
		}
		if (!message.isRead) {
			messagesStore.setRead([message]);
		}
	});
</script>

<div class="flex gap-1">
	<span class="flex w-60 items-baseline gap-3 overflow-clip text-ellipsis text-nowrap">
		{#if message.pubkey === $keysStore[$keysStore.length - 1].publicKey.slice(2)}
			<span class="font-bold"> {t_me()} </span>
		{:else}
			<span class="font-bold">{alias}</span>
			<div class="w-32 overflow-clip text-ellipsis text-sm opacity-35">
				{nip19.npubEncode(message.pubkey)}
			</div>
		{/if}
	</span>
</div>
<div class="break-words break-all">
	{#if message.content.startsWith('cashuB')}
		<ReceiveCard token={getDecodedToken(message.content)}></ReceiveCard>
	{:else if decoded}
		<ReceiveCard token={{ mint: decoded.mint, proofs: decoded.proofs, unit: decoded.unit }}
		></ReceiveCard>
	{:else}
		{message.content}
	{/if}
</div>
<div class="text-xs opacity-35">
	{formatDistance($now, message.created_at * 1000)} {t_ago()}
</div>
