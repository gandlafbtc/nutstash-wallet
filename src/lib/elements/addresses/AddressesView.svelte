<script>
	import * as Carousel from '$lib/components/ui/carousel';
	import { keysStore } from '$lib/stores/persistent/keys';
	import { CheckCircle } from 'lucide-svelte';
	import KeysList from '../wallet/keys/KeysList.svelte';
	import Address from './Address.svelte';
	import * as Accordion from '$lib/components/ui/accordion';

	const pub = $keysStore.map((ks) => ks.publicKey)[$keysStore.length - 1];
</script>

<div class="flex h-full w-80 flex-col gap-2 xl:w-[600px]">
	<p class="text-lg font-bold">Address</p>
	<p class="flex gap-1">
		<span> Your nostr address is used to send and receive messages over nostr. </span>
	</p>
	{#if $keysStore.length}
		<Address {pub}></Address>
	{/if}
	<Accordion.Root type="single">
		<Accordion.Item value="item-1">
			<Accordion.Trigger>
				<div>Keys</div>
			</Accordion.Trigger>
			<Accordion.Content>
				<KeysList></KeysList>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</div>
