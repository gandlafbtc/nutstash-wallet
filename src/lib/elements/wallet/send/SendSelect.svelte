<script>
	import { openSendDrawer } from "$lib/stores/session/drawer";
	import { Banknote, Zap } from "lucide-svelte";
	import { push } from "svelte-spa-router";

</script>
<div class="flex flex-col items-center justify-center gap-3">
    <div class="flex flex-col gap-3 items-center w-80 xl:w-[600px]">
        <button class="opacity-80 hover:opacity-100 transition-opacity text-start flex gap-3 border rounded-md p-3 w-full items-center"  onclick={()=>{
            openSendDrawer.set(false)
            push('/wallet/sendln')}
            }>
            <Zap class="text-yellow-500 h-8 w-8"></Zap>
            <div class="flex flex-col">
                <div class="text-sm font-bold">Send via Lightning</div>
                <div class="text-xs text-muted-foreground">Pay a lightning invoice or send to a Lightning address</div>
            </div>
        </button>
        <button class="opacity-80 hover:opacity-100 transition-opacity text-start flex gap-3 border rounded-md p-3 w-full items-center" onclick={()=>{
            openSendDrawer.set(false)
            push('/wallet/sendecash')}}>
            <Banknote class="text-purple-500 h-8 w-8"></Banknote>
            <div class="flex flex-col">
                <div class="text-sm font-bold">Send via Ecash</div>
                <div class="text-xs text-muted-foreground">Create a Cashu ecash token</div>
            </div>
        </button>
    </div>
</div>