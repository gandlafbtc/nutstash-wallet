<script lang="ts">
    import { scannedTokenStore } from "$lib/stores/session/transitionstores";
    import { getDecodedToken, type Token } from "@cashu/cashu-ts";
    import { Button } from "$lib/components/ui/button/";
    import * as Card from "$lib/components/ui/card/";
    import {
        AlertCircle,
        BookCheck,
        Check,
        CircleCheck,
        Coins,
        Download,
        Landmark,
        LoaderCircle,
    } from "lucide-svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import { formatAmount } from "$lib/util/walletUtils";
    import * as Accordion from "$lib/components/ui/accordion";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { receiveEcash } from "$lib/actions/actions";
    import { params, push } from "svelte-spa-router";
    import Input from "$lib/components/ui/input/input.svelte";
    import { toast } from "svelte-sonner";


    let enteredToken: string = $state('');

    const getTokenFromUrlOrStore = () => {
        try {
            if ($params?.token) {
                return getDecodedToken($params.token);
            }
            else if (enteredToken) {
                return getDecodedToken(enteredToken);
            }
            else if ($scannedTokenStore) {
                return getDecodedToken($scannedTokenStore);
            } else return null;
        } catch (error) {
            return null;
        }
    };

    let token: Token | null = $derived.by(getTokenFromUrlOrStore);

    let isKnownMint = $derived(
        $mints.find((m) => m.url === token?.mint) ? true : false,
    );

    let isLoading = $state(false);

    const receive = async () => {
        if (!token) {
            return;
        }
        try {
            isLoading = true;
            const { proofs } = await receiveEcash(token);
            if (proofs) {
                toast.success(
                    `Received ${formatAmount(
                        token.proofs.reduce(
                            (acc, curr) => acc + curr.amount,
                            0,
                        ),
                        token.unit,
                    )}`
                );
                push('/wallet/');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            isLoading = false;
        }
    };

    const trustMint = async () => {
        try {
            isLoading = true;
            if (!token?.mint) {
                return
            }
            await mints.fetchMint(token?.mint)   
        } catch (error) {
            console.log(error)
        }
        finally {
            isLoading = false;
        }
    } 

    const discard = () => {
        scannedTokenStore.set(undefined)
        enteredToken = '';
        push("/wallet/")
    }
</script>

{#if token}
    <Card.Root class="w-80">
        <Card.Header>
            <Card.Title>Receive Cashu token</Card.Title>
            <Card.Description class="flex gap-3 items-center">
                <div class="relative">
                    <Landmark class="w-4 h-4"></Landmark>
                    {#if isKnownMint}
                        <!-- content here -->
                        <Check
                            class="text-green-600 w-3 h-3 absolute -bottom-2 -right-1"
                        ></Check>
                    {/if}
                </div>
                {token.mint}
            </Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-4">
            <Accordion.Root type="single">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>
                        <p class="w-full text-3xl">
                            {formatAmount(
                                token.proofs.reduce(
                                    (acc, curr) => acc + curr.amount,
                                    0,
                                ),
                                token.unit ?? "sat",
                            )}
                        </p>
                    </Accordion.Trigger>
                    <Accordion.Content>
                        <ScrollArea class="max-h-40 flex flex-col gap-2">
                            {#each token.proofs as proof}
                                <div class="w-full flex justify-between">
                                    <div class="flex items-center gap-2">
                                        <Coins class="text-yellow-300 w-5 h-5"
                                        ></Coins>
                                        {formatAmount(
                                            proof.amount,
                                            token.unit ?? "sat",
                                        )}
                                    </div>
                                    <p>
                                        {proof.id}
                                    </p>
                                </div>
                            {/each}
                        </ScrollArea>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>

            {#if !isKnownMint}
                <div class="text-sm text-yellow-500 flex gap-2 items-center">
                    <AlertCircle class="w-4 h-4"></AlertCircle>
                    <span>Token is from unknown mint</span>
                </div>
            {/if}
        </Card.Content>
        <Card.Footer class="flex gap-2">
            {#if isKnownMint}
                <Button class="w-full" onclick={receive} disabled={isLoading}>
                {#if isLoading}
                    <LoaderCircle class='animate-spin'></LoaderCircle>
                {:else}
                    <Download></Download>
                {/if}
                    Receive
                </Button>
            {:else}
                <Button class="w-full" variant="outline" onclick={discard}  disabled={isLoading}
                    >Discard</Button
                >
                <Button class="w-full" onclick={trustMint}  disabled={isLoading}>
                {#if isLoading}
                <LoaderCircle class='animate-spin'></LoaderCircle>
                {:else}
                <BookCheck></BookCheck>
                {/if}
                    Trust mint
                </Button>
            {/if}
        </Card.Footer>
    </Card.Root>
    {:else}
        <Input bind:value={enteredToken} placeholder="cashuA... / cashuB...">
        
        </Input>
{/if}
