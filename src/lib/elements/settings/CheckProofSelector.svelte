<script lang="ts">
    import { checkProofs } from "$lib/actions/actions";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { ensureError } from "$lib/helpers/errors";
    import { mints } from "$lib/stores/persistent/mints";
    import { getMintForKeysetId } from "$lib/util/walletUtils";
    import type { Proof } from "@cashu/cashu-ts";
    import { LoaderCircle } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import { push } from "svelte-spa-router";

    interface Props {
        proofs: Proof[];
        type: 'pending'|'active'
    }

    let { proofs, type }: Props = $props();

    let isChecking = $state(false)

    let selectedProofs = $state(
        proofs.map((p) => {
            return { ...p, isSelected: true };
        }),
    );

    const check =async () => {
        try {
            const proofsToCheck = selectedProofs.filter(p=>p.isSelected)
            isChecking = true
            const {pending,spent,unspent} = await checkProofs(proofsToCheck, type)
            toast.success(`Checked ${proofsToCheck.length}`, {description:`${pending.length} pending, ${spent.length} spent and ${unspent.length} unspent`})
            push('/wallet/settings')
        } catch (error) {
            const err = ensureError(error)
            console.error(err);
            toast.error(err.message);
        }
        finally {
            isChecking = false
        }
    }
</script>

<Button class="w-full my-3" onclick={check} disabled={isChecking} >
    {#if isChecking}
    <LoaderCircle class='animate-spin'></LoaderCircle>
    {/if}
    Check ({selectedProofs.filter((p) => p.isSelected).length})
</Button>
<div class="flex flex-col gap-2">
    {#each selectedProofs as proof}
        <div class="flex p-1 px-3 gap-2 items-center justify-between border">
            <div class="flex flex-col gap-1">
                <p>
                    {getMintForKeysetId($mints, proof.id)?.url}
                </p>
                <p>
                    {proof.amount}
                </p>
            </div>
            <Checkbox
                disabled={isChecking}
                id="terms"
                bind:checked={proof.isSelected}
                aria-labelledby="terms-label"
            />
        </div>
    {/each}
</div>

<style>
</style>
