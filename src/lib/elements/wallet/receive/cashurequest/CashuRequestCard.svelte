<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { StoredPaymentRequest } from '$lib/db/models/types';
	import CopiableToken from '$lib/elements/ui/CopiableToken.svelte';
	import QrCode from '$lib/elements/ui/QRCode.svelte';
	import { cashu_request, t_close } from '$lib/paraglide/messages';
	import { copyTextToClipboard } from '$lib/util/utils';
	import { formatAmount } from '$lib/util/walletUtils';
	import { PaymentRequest } from '@cashu/cashu-ts';
	import { Copy } from 'lucide-svelte';
	interface Props {
		request: StoredPaymentRequest;
		isListView?: boolean;
	}

	let { request, isListView = false }: Props = $props();

	let encodedRequest = $derived(
		new PaymentRequest(
			request.transport,
			request.id,
			request.amount,
			request.unit,
			request.mints,
			request.description,
			request.singleUse
		).toEncodedRequest()
	);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>
			<a href={`/#/wallet/receive/cashureq/${request.id}`}>
				{cashu_request()} #{request.id}
			</a>
		</Card.Title>
		<Card.Description>{request.mints?.join(', ')}</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col items-center gap-2">
			<div class="w-64">
				<QrCode data={encodedRequest}></QrCode>
			</div>
			<div class="w-64">
				<CopiableToken token={encodedRequest}></CopiableToken>
			</div>
			<Badge variant="outline" class="text-xl">
				{formatAmount(request.amount ?? 0, request.unit)}
			</Badge>
		</div>
	</Card.Content>
	<Card.Footer>
		{#if !isListView}
			<Button href="/#/wallet/">{t_close()}</Button>
		{/if}
	</Card.Footer>
</Card.Root>
