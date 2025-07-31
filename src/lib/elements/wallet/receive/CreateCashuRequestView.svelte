<script lang="ts">
	import { createCashuRequest, ensureError, types } from "@gandlaf21/cashu-wallet-engine";
	import { mintsStore as mints, selectedMint, unit } from "@gandlaf21/cashu-wallet-engine/stores";
	import { getUnitsForMints, formatAmount, isNumeric } from "@gandlaf21/cashu-wallet-engine/util";
	import { toast } from "svelte-sonner";
	import { push } from "svelte-spa-router";
	import { t_create, cashu_request, t_mints, no_mint_found } from '$lib/paraglide/messages';
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { Landmark, Edit } from 'lucide-svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import UnitSelector from '$lib/elements/ui/UnitSelector.svelte';
	import NumericKeys from '$lib/elements/ui/NumericKeys.svelte';

    let amount: number | undefined = $state();
    let mintsList: types.Mint[] = $state([]);
    let currentUnit: string = $state('sat');
    let entered: string = $state('');
    let isLoading: boolean = $state(false);


    // Get mint URLs from the mint objects
    const getMintUrls = () => {
        return mintsList.map(mint => mint.url);
    };

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
    
    const handleAmountInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;
        
        // Remove any non-numeric characters
        const numericValue = inputValue.replace(/[^0-9]/g, '');
        
        entered = numericValue;
        amount = parseInt(entered);
    };

    const receiveCashuRequest = async () => {
		try {
            if (!amount) {
                throw new Error('Amount is required');
            }
            

            isLoading = true;
			const req = await createCashuRequest(
				amount,
                getMintUrls(),
				currentUnit,
				undefined,
				false
			);
			push('/wallet/receive/cashureq/' + req.id);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};

    const toggleMint = (mint: types.Mint) => {
        const isSelected = mintsList.some(m => m.url === mint.url);
        
        if (isSelected) {
            // Remove mint if already selected
            mintsList = mintsList.filter(m => m.url !== mint.url);
        } else {
            // Add mint if not selected
            mintsList = [...mintsList, mint];
        }
    };
    
    const isMintSelected = (mint: types.Mint) => {
        return mintsList.some(m => m.url === mint.url);
    };
</script>

<div class="flex flex-col items-center justify-center gap-5 w-full">
    <div class="w-80 xl:w-[600px]">
        <p class="font-bold text-lg mb-3">{cashu_request()}</p>
        
        <!-- Amount display -->
        <div class="flex items-center justify-between gap-2 mb-4">
            <div class="flex-grow relative">
                <Input
                    disabled
                    type="text"
                    value={formatAmount(amount??0, currentUnit)}
                    oninput={handleAmountInput}
                    placeholder="Enter amount"
                />
            </div>
            <UnitSelector bind:currentUnit selectedMints={mintsList}></UnitSelector>
        </div>
        
        <!-- Mint selector section -->
        <div class="mb-4">
            <p class="text-sm font-medium mb-2">{t_mints()}</p>
            
            <!-- List of mints with checkboxes -->
            <div class="flex flex-col gap-2 max-h-40 overflow-y-auto border rounded-md p-2">
                {#if $mints.length === 0}
                    <p class="text-sm text-muted-foreground">{no_mint_found()}</p>
                {:else}
                    {#each $mints as mint}
                        <div class="flex items-center gap-2 p-1 hover:bg-muted/20 rounded">
                            <Checkbox 
                                checked={isMintSelected(mint)} 
                                onCheckedChange={() => toggleMint(mint)}
                                id={`mint-${mint.url}`}
                            />
                            <label 
                                for={`mint-${mint.url}`} 
                                class="flex items-center gap-2 text-sm cursor-pointer truncate"
                            >
                                <Landmark class="h-4 w-4" />
                                <span class="truncate">{mint.url}</span>
                            </label>
                        </div>
                    {/each}
                {/if}
            </div>
            
            <!-- Selected mints count -->
            <div class="text-xs text-muted-foreground mt-1">
                {#if mintsList.length === 0}
                Receive from any mint                  
                {:else}
                {mintsList.length} mint{mintsList.length !== 1 ? 's' : ''} selected
                {/if}
            </div>
            <Button 
            class="my-2 w-full" 
            disabled={!amount || isLoading}
            onclick={receiveCashuRequest}
        >
            {t_create()} {cashu_request()}
        </Button>
        </div>
        
        <!-- Numeric keypad -->
        <div class="fixed w-80 bottom-10 h-64">
            <NumericKeys onkeypressed={onKeypadPress}></NumericKeys>
        </div>
        
        <!-- Create button -->

    </div>
</div>
