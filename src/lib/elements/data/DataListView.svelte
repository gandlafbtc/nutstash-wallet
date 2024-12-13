<script>
    import CardContent from "$lib/components/ui/card/card-content.svelte";
    import Card from "$lib/components/ui/card/card.svelte";
    import { ArrowLeftRight, Coins, CreditCard, Database, HandCoins, History, ReceiptText } from "lucide-svelte";
    
</script>
<div class="flex w-80 flex-col gap-2">
    <p class="font-bold text-lg flex gap-2">
        <Database></Database>
        <span>

            Data
        </span>
    </p>
    <a href="/#/wallet/history">
        <Card>
            <CardContent >
                <div class="flex gap-2 items-center font-bold">
                    <History></History>
    
                    History
                </div>
            </CardContent>
        </Card>
    </a>
    <a href="/#/wallet/send/cashu">
        <Card>
            <CardContent >
                <div class="flex gap-2 items-center font-bold">
                    <ArrowLeftRight></ArrowLeftRight>
                    Transactions
                </div>
            </CardContent>
        </Card>
    </a>
    <a href="/#/wallet/ecash">
        <Card>
            <CardContent >
                <div class="flex gap-2 items-center font-bold">
                    <Coins></Coins>
                    Ecash
                </div>
            </CardContent>
        </Card>
    </a>
    <a href="/#/wallet/receive/ln">
        <Card>
            <CardContent >
                <div class="flex gap-2 items-center font-bold">
                    <ReceiptText></ReceiptText>
                    Invoices
                </div>
            </CardContent>
        </Card>
    </a>
    <a href="/#/wallet/send/ln">
        <Card>
            <CardContent >
                <div class="flex gap-2 items-center font-bold">
                    <CreditCard></CreditCard>
                    Payments
                </div>
            </CardContent>
        </Card>
    </a>    
    <a href="/#/wallet/receive/cashureq">
        <Card>
            <CardContent >
                <div class="flex gap-2 items-center font-bold">
                    <HandCoins></HandCoins>
                    Requests
                </div>
            </CardContent>
        </Card>
    </a>
</div>


    

