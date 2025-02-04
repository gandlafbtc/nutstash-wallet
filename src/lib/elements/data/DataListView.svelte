<script>
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
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

<div class="flex w-80 flex-col gap-2">
	<p class="flex gap-2 text-lg font-bold">
		<Database></Database>
		<span> Data </span>
	</p>
	<a href="/#/wallet/history">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<History></History>

					History
				</div>
			</CardContent>
		</Card>
	</a>
	<a href="/#/wallet/send/cashu">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<ArrowLeftRight></ArrowLeftRight>
					Transactions
				</div>
			</CardContent>
		</Card>
	</a>
	<a href="/#/wallet/ecash">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<Coins></Coins>
					Ecash
				</div>
			</CardContent>
		</Card>
	</a>
	<a href="/#/wallet/receive/ln">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<ReceiptText></ReceiptText>
					Invoices
				</div>
			</CardContent>
		</Card>
	</a>
	<a href="/#/wallet/send/ln">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<CreditCard></CreditCard>
					Payments
				</div>
			</CardContent>
		</Card>
	</a>
	<a href="/#/wallet/receive/cashureq">
		<Card>
			<CardContent>
				<div class="flex items-center gap-2 font-bold">
					<HandCoins></HandCoins>
					Requests
				</div>
			</CardContent>
		</Card>
	</a>
</div>
