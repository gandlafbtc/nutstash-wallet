<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import { LoaderCircle, Scan, Zap } from "lucide-svelte";
	import SimpleScanner from "../scanner/simple_scanner/SimpleScanner.svelte";
	import * as Dialog from "$lib/components/ui/dialog";
	import Button from "$lib/components/ui/button/button.svelte";
	import {  t_cancel } from "$lib/paraglide/messages";
	import { push } from "svelte-spa-router";
	import NumericKeys from "$lib/elements/ui/NumericKeys.svelte";
	import AmountInput from "$lib/elements/ui/AmountInput.svelte";
	import { getInvoiceFromAddress, getInvoiceFromLNURL } from "@gandlaf21/cashu-wallet-engine/util";
	import { toast } from "svelte-sonner";
	import { ensureError } from "@gandlaf21/cashu-wallet-engine";
	import { onMount } from "svelte";
	import { scanresultStore } from "$lib/stores/session/transitionstores";

    let isLnurl = $state(false);
    //lnurl
    let entered = $state("")
    let amount: number| undefined = $state()
    
    let isScanning = $state(false);
    let invoiceOrLnurl = $state("");

    let isLoading = $state(false)

    onMount(()=> {
        if ($scanresultStore?.includes("@")) {
            invoiceOrLnurl=$scanresultStore
        }
        scanresultStore.set("")
    })

    $effect(() => {
        isLnurl = false;
        if (!invoiceOrLnurl) {
             return           
        }
        if (invoiceOrLnurl.toLowerCase().startsWith("lightning:")) {
            invoiceOrLnurl = invoiceOrLnurl.replace("lightning:", "");
        }
        if (invoiceOrLnurl.toLowerCase().startsWith("lnbc")) {
            push(`/wallet/send/ln/invoice/${invoiceOrLnurl}`)
            return
        }
        if (invoiceOrLnurl.toLowerCase().includes("@")) {
            isLnurl = true;
        }

    });
    const onKeypadPress = (value: string) => {
        if (value === 'delete') {
            entered = entered.slice(0, -1);
        } else if (value === 'clear') {
            entered = '';
        } else {
            entered = entered + value;
        }
        try {
            const newAmount = parseInt(entered)
            amount =Number.isNaN(newAmount)?0 :newAmount;
        } catch (error) {
            amount = 0
        }
    };

    const handleLNURL = async () => {
        if (!amount) {
            toast.warning('Please enter an amount.')
            return
        }
        try {
            isLoading=true
            const {pr}= await getInvoiceFromAddress(invoiceOrLnurl, amount)
            push(`/wallet/send/ln/invoice/${pr}`)
        } catch (error) {
            const err = ensureError(error)
            console.error(err)
            toast.error('Failed to get invoice from LNURL.', {
                description: err.message,
            })
        }
        finally {
            isLoading=false
        }
    }

</script>

<div class="w-80 xl:w-[600px flex flex-col gap-2">
    <p class="font-bold">
        Send via Lightning
    </p>
    <div class="w-full relative flex flex-col gap-2">
        <button class="absolute right-2 top-2" onclick={() => {
            isScanning = true;
        }}>
            <Scan>
                
            </Scan>
        </button>
        <Input placeholder="Invoice or LNURL address" bind:value={invoiceOrLnurl} />
        {#if isLnurl}
        <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2 mb-4">
                <div class="flex-grow relative">
                    <AmountInput bind:amount currentUnit="sat"></AmountInput>
                </div>
            </div>
            <Button disabled={!amount || isLoading} onclick={
                ()=> handleLNURL()
            }>
                {#if isLoading}
                <LoaderCircle class='animate-spin'></LoaderCircle>
                Creating invoice...
                {:else}
                <Zap></Zap>
                Pay
                {/if}
            </Button>
        </div>
        <div class="fixed w-80 bottom-10 h-64">
            <NumericKeys onkeypressed={onKeypadPress}></NumericKeys>
        </div>
        {/if}
    </div>
</div>

{#if isScanning}
<SimpleScanner bind:isScanning bind:scannedResult={invoiceOrLnurl}></SimpleScanner>
{/if}



