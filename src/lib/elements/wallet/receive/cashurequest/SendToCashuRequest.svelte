<script lang="ts">
    import { sendNip17DirectMessageToNprofile } from "$lib/actions/nostr";
    import Button from "$lib/components/ui/button/button.svelte";
    import SendEcash from "$lib/elements/contacts/chat/SendEcash.svelte";
    import AddMint from "$lib/elements/mint/AddMint.svelte";
    import { ensureError } from "$lib/helpers/errors";
    import { mints } from "$lib/stores/persistent/mints";
    import { decodePaymentRequest, type Token } from "@cashu/cashu-ts";
    import { toast } from "svelte-sonner";
    import { params, pop, push } from "svelte-spa-router";
    let requestString = $derived($params?.creq ?? "");
    let request = $derived(
        requestString ? decodePaymentRequest(requestString) : undefined,
    );
    let nProfile = $derived(
        request?.transport.find((transport) =>
            transport.tags?.find((tag) => tag[0] === "n" && tag[1] === "17"),
        )?.target,
    );

    const sendCallback = (token: Token) => {
        try {
            if (!request) {
                throw new Error("No payment request to send to");
            }
            if (!nProfile) {
                throw new Error("No supported payment transport");
            }
            const paymentRequestResponse = {
                id: request.id,
                memo: token.memo,
                mint: token.mint,
                unit: token.unit,
                proofs: token.proofs,
            };
            const stringified = JSON.stringify(paymentRequestResponse);
            sendNip17DirectMessageToNprofile(nProfile, stringified);
            push('/wallet/')
        } catch (error) {
            const err = ensureError(error)
            toast.error('Error when sending', {description: err.message})
            console.error(err)
        } finally {
        }
    };
</script>

{#if request}
    {#if !nProfile}
        Unsupported transport methods:
        {JSON.stringify(request.transport)}
        <Button onclick={pop}>Go back</Button>
    {:else}
        {@const requestMintIndex = request.mints?.length
            ? $mints.findIndex((m) => request.mints?.includes(m.url))
            : 0}
        {#if requestMintIndex === undefined}
            No matching trusted mint for this request.
            <AddMint readOnly={true} mintUrlToAdd={request.mints?.[0]}
            ></AddMint>
        {:else}
            <SendEcash
                unitSelectDisabled={request.unit ? true : false}
                currentUnit={request.unit ?? "sat"}
                to={nProfile}
                amount={request.amount ?? 0}
                mintSelectDisabled={request.mints?.length === 1}
                {sendCallback}
                mint={$mints[requestMintIndex]}
            ></SendEcash>
        {/if}
    {/if}
{:else}
    Could not parse request
{/if}
