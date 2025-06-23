<script lang="ts">
	import Toggle from "$lib/components/ui/toggle/toggle.svelte";
	import type { types } from "@gandlaf21/cashu-wallet-engine";
	import { proofsStore } from "@gandlaf21/cashu-wallet-engine/stores";
	import { getProofsOfMintUnit } from "@gandlaf21/cashu-wallet-engine/util";
	import { untrack } from "svelte";

    interface Props {mint: types.Mint, unit: string, selectedProofs: types.Proof[]}
    
    let {mint, unit, selectedProofs = $bindable()}: Props = $props();

    let availableProofs = $derived(getProofsOfMintUnit(mint, $proofsStore, unit))
    
    // Track the pressed state of each toggle
    let togglesPressed: boolean[] = $state(Array(availableProofs.length).fill(false));

    const handlePressed = (proof: types.Proof, isPressed: boolean, index: number) => {
        togglesPressed[index] = isPressed;
        
        if(isPressed){
            selectedProofs.push(proof)
        } else {
            selectedProofs = selectedProofs.filter(p => p.secret !== proof.secret)
        }
    }
    
    $effect(()=> {
        if (mint||unit) {
            untrack(()=> {
                selectedProofs = []
                // set toggles to pressed false
                togglesPressed = Array(availableProofs.length).fill(false);
            })
        }
    })
    
    // When availableProofs changes, reset togglesPressed to match the new length
    $effect(() => {
        togglesPressed = Array(availableProofs.length).fill(false);
    });
</script>

<div class="h-full w-full overflow-hidden p-4 bg-card rounded-lg">
    <div class="max-h-full overflow-y-auto pr-1">
        <div class="grid grid-cols-3 gap-2 pb-1">
            {#each availableProofs as proof, i}
                <Toggle 
                variant="outline"
                    class="h-12 w-full" 
                    pressed={togglesPressed[i]} 
                    onPressedChange={(isPressed) => handlePressed(proof, isPressed, i)}
                >
                    {proof.amount}
                </Toggle>
            {/each}
        </div>
    </div>
</div>
