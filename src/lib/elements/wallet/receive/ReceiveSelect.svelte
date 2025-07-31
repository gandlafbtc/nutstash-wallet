<script>
	import { create_lightning_invoice, receive_cashu_ecash, receive_cashu_token, receive_via_lightning } from "$lib/paraglide/messages";
	import { openReceiveDrawer } from "$lib/stores/session/drawer";
	import { Banknote, Zap } from "lucide-svelte";
	import { push } from "svelte-spa-router";

</script>
<div class="flex flex-col items-center justify-center gap-3">
    <div class="flex flex-col gap-3 items-center w-80 xl:w-[600px]">
        <button class="opacity-80 hover:opacity-100 transition-opacity text-start flex gap-3 border rounded-md p-3 w-full items-center" onmouseup={()=>{
            openReceiveDrawer.set(false)            
            push("/wallet/receiveln")}}>
            <Zap class="text-yellow-500 h-8 w-8"></Zap>
            <div class="flex flex-col">
                <div class="text-sm font-bold">{receive_via_lightning()}</div>
                <div class="text-xs text-muted-foreground">{create_lightning_invoice()}</div>
            </div>
        </button>
        <button class="opacity-80 hover:opacity-100 transition-opacity text-start flex gap-3 border rounded-md p-3 w-full items-center" onmouseup={()=>{
            openReceiveDrawer.set(false)
            push("/wallet/receiveecash")}}>
            <Banknote class="text-purple-500 h-8 w-8"></Banknote>
            <div class="flex flex-col">
                <div class="text-sm font-bold">{receive_cashu_token()}</div>
                <div class="text-xs text-muted-foreground">{receive_cashu_ecash()}</div>
            </div>
        </button>
    </div>
</div>