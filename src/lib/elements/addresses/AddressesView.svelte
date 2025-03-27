<script>
	import { keysStore } from '$lib/stores/persistent/keys';
	import KeysList from '../wallet/keys/KeysList.svelte';
	import Address from './Address.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import { nostr_address_description, t_address, t_keys } from '$lib/paraglide/messages';

	const pub = $keysStore.map((ks) => ks.publicKey)[$keysStore.length - 1];
</script>

<div class="flex h-full w-80 flex-col gap-2 xl:w-[600px]">
	<p class="text-lg font-bold">{t_address()}</p>
	<p class="flex gap-1">
		<span>{nostr_address_description()}</span>
	</p>
	{#if $keysStore.length}
		<Address {pub}></Address>
	{/if}
	<Accordion.Root type="single">
		<Accordion.Item value="item-1">
			<Accordion.Trigger>
				<div>{t_keys}</div>
			</Accordion.Trigger>
			<Accordion.Content>
				<KeysList></KeysList>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</div>
