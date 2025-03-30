<script>
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import {
		ecash_transactions,
		t_data,
		t_ecash,
		t_history,
		t_invoices,
		t_payments,
		t_requests
	} from '$lib/paraglide/messages';
	import {
		ArrowLeftRight,
		Coins,
		CreditCard,
		Database,
		HandCoins,
		History,
		ReceiptText
	} from 'lucide-svelte';
</script>

<div class="flex w-80 flex-col gap-2 xl:w-[600px]">
	<p class="flex gap-2 text-lg font-bold">
		<Database></Database>
		<span> {t_data()} </span>
	</p>
	<a href="/#/wallet/history">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<History></History>

					{t_history()}
				</div>
			</CardContent>
		</Card>
	</a>
	<a href="/#/wallet/send/cashu">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<ArrowLeftRight></ArrowLeftRight>
					{ecash_transactions()}
				</div>
			</CardContent>
		</Card>
	</a>
	<a href="/#/wallet/ecash">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<Coins></Coins>
					{t_ecash()}
				</div>
			</CardContent>
		</Card>
	</a>
	<a href="/#/wallet/receive/ln">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<ReceiptText></ReceiptText>
					{t_invoices()}
				</div>
			</CardContent>
		</Card>
	</a>
	<a href="/#/wallet/send/ln">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<CreditCard></CreditCard>
					{t_payments()}
				</div>
			</CardContent>
		</Card>
	</a>
	<a href="/#/wallet/receive/cashureq">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<HandCoins></HandCoins>
					{t_requests()}
				</div>
			</CardContent>
		</Card>
	</a>
</div>
