<script lang="ts">
	import { meltQuotesStore, multiMeltQuotesStore, getBy, mintsStore } from "@gandlaf21/cashu-wallet-engine/stores";
	import { params } from "svelte-spa-router";
	import { Card } from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
    import { formatDistance } from "date-fns";
    import { types, checkMeltQuote, meltProofs, ensureError } from "@gandlaf21/cashu-wallet-engine";
    import { formatAmount, formatSecToMinStr, getHostFromUrl } from "@gandlaf21/cashu-wallet-engine/util";
    import { Zap, Clock, Check, AlertCircle, Landmark, RotateCcw, ArrowRight, Loader } from "lucide-svelte";
    import { MeltQuoteState } from "@cashu/cashu-ts";
    import Button from "$lib/components/ui/button/button.svelte";
    import { decode } from "@gandlaf21/bolt11-decode";
    import { now } from "$lib/stores/session/time";
    import { toast } from "svelte-sonner";

    const id = $derived($params?.id)
    const multiNut = $derived($multiMeltQuotesStore.find((m) => m.id === id));
    const meltQuotes: types.StoredMeltQuote[] = $derived($meltQuotesStore.filter(q => multiNut?.quoteIds.includes(q.quote)));
    
    let isProcessing = $state(false);

    // Function to execute all unpaid melt quotes
    async function executeAllPayments() {
        if (meltQuotes.length === 0) {
            toast.warning("No melt parts available");
            return;
        }

        const unpaidQuotes = meltQuotes.filter(q => q.state === 'UNPAID');
        if (unpaidQuotes.length === 0) {
            toast.info("No unpaid melt parts to process");
            return;
        }

        isProcessing = true;
        let successCount = 0;
        let errorCount = 0;

        try {
            // Process each unpaid quote
            for (const quote of unpaidQuotes) {
                try {
                    await meltProofs(quote);
                    successCount++;
                } catch (error) {
                    console.error(`Error processing quote ${quote.quote}:`, error);
                    errorCount++;
                }
            }

            // Show summary toast
            if (successCount > 0 && errorCount === 0) {
                toast.success(`Successfully processed ${successCount} melt parts`);
            } else if (successCount > 0 && errorCount > 0) {
                toast.warning(`Processed ${successCount} parts with ${errorCount} errors`);
            } else if (successCount === 0 && errorCount > 0) {
                toast.error(`Failed to process any parts (${errorCount} errors)`);
            }
        } catch (error) {
            const err = ensureError(error);
            console.error("Error in executeAllPayments:", err);
            toast.error(err.message);
        } finally {
            isProcessing = false;
        }
    }

    function getStateColor(state: string | undefined): string {
        if (state === MeltQuoteState.PAID) return "border-green-500/40 bg-green-500/5";
        if (state === MeltQuoteState.PENDING) return "border-yellow-500/40 bg-yellow-500/5";
        if (state === types.EXPIRED?.EXPIRED) return "border-destructive/40 bg-destructive/5";
        return "";
    }

    function getBannerColor(state: string | undefined): string {
        if (state === MeltQuoteState.PAID) return "bg-green-500";
        if (state === MeltQuoteState.PENDING) return "bg-yellow-500";
        if (state === types.EXPIRED?.EXPIRED) return "bg-destructive";
        return "";
    }

    function getStateText(state: string | undefined): string {
        if (state === MeltQuoteState.PAID) return "Confirmed";
        if (state === MeltQuoteState.PENDING) return "Pending";
        if (state === types.EXPIRED?.EXPIRED) return "Expired";
        return "Unpaid";
    }

    function getInvoiceAmount(request: string): number {
        try {
            return decode(request).sections[2].value / 1000;
        } catch (e) {
            return 0;
        }
    }
</script>

<div class="p-4 space-y-4">
    <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Melt Parts</h2>
        
        <!-- Pay All Button -->
        {#if meltQuotes.filter(q => q.state === 'UNPAID').length > 0}
            <Button 
                variant="default" 
                disabled={isProcessing}
                onclick={executeAllPayments}
                class="flex items-center gap-2"
            >
                {#if isProcessing}
                    <Loader class="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                {:else}
                    <span>Pay All</span>
                    <ArrowRight class="h-4 w-4" />
                {/if}
            </Button>
        {/if}
    </div>
    <Separator />
    
    {#if meltQuotes.length === 0}
        <p class="text-center text-gray-500 py-4">No melt parts available</p>
    {:else}
        <div class="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {#each meltQuotes as q, i}
                <Card class="overflow-hidden border shadow-sm {getStateColor(q.state)}">
                    <!-- Payment Status Banner -->
                    {#if q.state === MeltQuoteState.PAID || q.state === MeltQuoteState.PENDING || q.state === types.EXPIRED?.EXPIRED}
                        <div class="flex items-center gap-2 px-4 py-1 text-sm font-medium text-white {getBannerColor(q.state)}">
                            {#if q.state === MeltQuoteState.PAID}
                                <Check size={16} />
                            {:else if q.state === MeltQuoteState.PENDING}
                                <Clock size={16} />
                            {:else}
                                <AlertCircle size={16} />
                            {/if}
                            {getStateText(q.state)}
                        </div>
                    {/if}
                    
                    <div class="p-4">
                        <div class="mb-3 flex items-start justify-between">
                            <div>
                                <h3 class="flex items-center gap-2 text-lg font-medium">
                                    <Zap size={18} class="text-yellow-500" />
                                    Part #{i + 1}
                                </h3>
                                {#if q.mintUrl}
                                    <div class="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <Landmark size={14} />
                                        <span title={q.mintUrl}>{getHostFromUrl(q.mintUrl)}</span>
                                    </div>
                                {/if}
                            </div>
                            
                            {#if q.state === 'UNPAID' && q.expiry}
                                <div class="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium">
                                    <Clock size={14} />
                                    {formatSecToMinStr(q.expiry - Math.floor($now / 1000))}
                                </div>
                            {/if}
                        </div>
                        
                        <div class="space-y-3">
                            <!-- Amount Section -->
                            {#if q.amount !== undefined}
                                <div class="flex items-center justify-between rounded-md bg-muted/50 p-3">
                                    <span class="text-sm font-medium text-muted-foreground">Payment Amount</span>
                                    <div class="flex flex-col items-end">
                                        <span class="text-lg font-bold text-primary">{formatAmount(q.amount, q.unit || 'sat')}</span>
                                        {#if q.fees}
                                            <div class="flex items-center gap-1 text-xs text-muted-foreground">
                                                <span>+</span>
                                                <span>{formatAmount(q.fees, q.unit || 'sat')}</span>
                                                <span class="text-xs">fee</span>
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            {/if}
                            
                            <!-- Invoice Section -->
                            {#if q.request}
                                <div class="flex items-center justify-between rounded-md bg-secondary/10 p-3">
                                    <div class="flex items-center gap-2">
                                        <Zap size={16} class="text-yellow-500" />
                                        <span class="text-sm font-medium">Invoice</span>
                                    </div>
                                    <span class="font-bold">{formatAmount(getInvoiceAmount(q.request), 'sat')}</span>
                                </div>
                            {/if}
                            
                            <!-- Quote ID -->
                            <div class="rounded-md border p-3">
                                <div class="text-xs font-medium text-muted-foreground mb-1">Quote ID</div>
                                <div class="text-sm break-all font-mono">
                                    {q.quote.substring(0, 20)}...
                                </div>
                            </div>
                        </div>
                        
                        <!-- Status/Actions Footer -->
                        {#if q.state !== 'UNPAID' && q.state !== MeltQuoteState.PAID}
                            <div class="mt-4 flex items-center justify-end gap-2">
                                <div class="flex items-center gap-1.5 {q.state === MeltQuoteState.PENDING ? 'text-yellow-600' : 'text-destructive'}">
                                    {#if q.state === MeltQuoteState.PENDING}
                                        <Clock size={16} />
                                    {:else}
                                        <AlertCircle size={16} />
                                    {/if}
                                    <span class="font-medium">{getStateText(q.state)}</span>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onclick={() => checkMeltQuote(q)}
                                    class="h-8 w-8 rounded-full"
                                >
                                    <RotateCcw size={14} />
                                </Button>
                            </div>
                        {/if}
                    </div>
                </Card>
            {/each}
        </div>
    {/if}
</div>
