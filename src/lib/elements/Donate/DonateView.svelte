<script lang="ts">
    import { Heart, LoaderCircle, Plus, X } from "lucide-svelte";
    import MintSelector from "../ui/MintSelector.svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import { unit } from "$lib/stores/persistent/settings";
    import UnitSelector from "../ui/UnitSelector.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import {
        formatAmount,
        getAmountForTokenSet,
        getProofsOfMintUnit,
    } from "$lib/util/walletUtils";
    import { proofsStore } from "$lib/stores/persistent/proofs";
    import { Button } from "$lib/components/ui/button";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import DonatePublic from "./DonatePublic.svelte";
    import { toast } from "svelte-sonner";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { sendEcash } from "$lib/actions/actions";
    import { NUTSTASH_PUBKEY } from "$lib/stores/static/const";
    import {
        publishEvent,
        sendNip17DirectMessageToNpub,
    } from "$lib/actions/nostr";
    import { npubEncode } from "nostr-tools/nip19";
    import { getEncodedTokenV4 } from "@cashu/cashu-ts";

    let mint = $state($mints[0]);
    let currentUnit = $state($unit);

    let isLoading = $state(false);

    let nameToAdd = $state("");
    let namesAdded: string[] = $state([]);

    let isPublicOpen = $state(false);
    let isAnonOpen = $state(false);

    //@ts-ignore
    let donationAmount: number = $state();

    let amountAvailable = $derived(
        getAmountForTokenSet(
            getProofsOfMintUnit(mint, $proofsStore, currentUnit),
        ),
    );

    const openPublicDono = () => {
        if (donationAmount > amountAvailable) {
            toast.warning("Not enough funds available");
            return;
        }
        isPublicOpen = true;
    };

    const openAnonDono = () => {
        if (donationAmount > amountAvailable) {
            toast.warning("Not enough funds available");
            return;
        }
        isAnonOpen = true;
    };

    const addName = () => {
        console.log(nameToAdd);
        if (!nameToAdd || namesAdded.includes(nameToAdd)) {
            return;
        }
        namesAdded.push(nameToAdd);
        nameToAdd = "";
    };

    const donatePublic = async () => {
        try {
            isLoading = true;
            const { send } = await sendEcash(mint.url, donationAmount, {
                unit: currentUnit,
                pubkey: "02" + NUTSTASH_PUBKEY,
            });
            const token = getEncodedTokenV4({
                mint: mint.url,
                proofs: send,
                unit: currentUnit,
                memo: "Donated by " + namesAdded.join(", "),
            });

            const donationString = `New #[0] donation 🔥 🔥 🔥! ${namesAdded.join(", ")} ${"`"}${token}${"`"}`

            publishEvent(
                donationString,
                [["p", NUTSTASH_PUBKEY]],
            );
            namesAdded = [];
            isPublicOpen = false;
            toast.success(
                `Thank you for your donation of ${formatAmount(getAmountForTokenSet(send), currentUnit)}!`,
            );
        } catch (error) {
            console.error(error);
        } finally {
            isLoading = false;
        }
    };

    const donateAnon = async () => {
        try {
            isLoading = true;
            const { send } = await sendEcash(mint.url, donationAmount, {
                unit: currentUnit,
                pubkey: "02" + NUTSTASH_PUBKEY,
            });
            sendNip17DirectMessageToNpub(
                npubEncode(NUTSTASH_PUBKEY),
                getEncodedTokenV4({
                    mint: mint.url,
                    proofs: send,
                    unit: currentUnit,
                    memo: "Donated by anon",
                }),
            );
            isAnonOpen = false;
            toast.success(
                `Thank you for your donation of ${formatAmount(getAmountForTokenSet(send), currentUnit)}!`,
            );
        } catch (error) {
            console.error(error);
        } finally {
            isLoading = false;
        }
    };

    const emojiForAmount = (amount: number) => {
        if (amount > 1000000) {
            return "🧡";
        } else if (amount <= 50) {
            return "🥜";
        } else if (amount <= 100) {
            return "🌰";
        } else if (amount <= 250) {
            return "🔩";
        } else if (amount <= 1000) {
            return "🥰";
        } else if (amount <= 5000) {
            return "😍";
        } else if (amount <= 10000) {
            return "🚀";
        } else if (amount <= 50000) {
            return "🤯";
        } else if (amount <= 100000) {
            return "👾";
        } else {
            return "❤️";
        }
    };
</script>

<div class="flex flex-col gap-4 w-80 h-full mt-32">
    <p class="font-bold">Hello dear anon!</p>
    <span>
        Thank you for using nutstash, an open source Cashu wallet, developed by <a
            class="font-bold underline"
            href="https://gandlaf.com"
            target="_blank"
            rel="noopener noreferrer">@gandlaf21</a
        >.
    </span>
    <span>
        If you like using nutstash, consider showing your appreciation by
        sharing some nuts with the wallet devs.
    </span>
    <MintSelector bind:mint></MintSelector>
    <div>
        Available: {formatAmount(amountAvailable, currentUnit)}
    </div>
    <div class="flex gap-2">
        <Input
            type="number"
            pattern="\d+"
            placeholder="donation amount"
            bind:value={donationAmount}
        />
        <UnitSelector selectedMints={[mint]} bind:currentUnit></UnitSelector>
    </div>
    <div class="flex gap-2 h-20 flex-wrap items-center justify-center">
        {#each [50, 250, 1000, 5000, 10000, 50000, 100000] as a}
            <button onclick={() => (donationAmount = a)}>
                <Badge class=" text-nowrap">
                    {emojiForAmount(a)}
                    {formatAmount(a, currentUnit)}
                </Badge>
            </button>
        {/each}
    </div>
    <div class="flex h-10 w-full items-center justify-center">
        {#if !(isNaN(donationAmount) || donationAmount < 1)}
            <!-- content here -->
            <Badge class="text-xl text-nutstash" variant="outline">
                {emojiForAmount(donationAmount)}
                {formatAmount(donationAmount, currentUnit)}
            </Badge>
        {/if}
    </div>
    <div class="flex gap-2">
        <Button
            variant="outline"
            disabled={isNaN(donationAmount) || donationAmount < 1}
            onclick={openPublicDono}
        >
            <Heart class="text-nutstash"></Heart>
            Public donation
        </Button>
        <Button
            disabled={isNaN(donationAmount) || donationAmount < 1}
            onclick={openAnonDono}
        >
            <Heart class="text-nutstash"></Heart>
            Anon donation
        </Button>
    </div>
</div>

<Dialog.Root bind:open={isPublicOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title
                >You are about to donate {formatAmount(
                    donationAmount,
                    currentUnit,
                )} to nutstash publicly</Dialog.Title
            >
            <Dialog.Description>
                You can add NPUBs, names, or anything else that should be
                credited in the donation note.
            </Dialog.Description>
        </Dialog.Header>
        <div class="flex gap-2">
            <Input
                type="text"
                placeholder="npub1... name... email..."
                bind:value={nameToAdd}
                onkeypress={(e: KeyboardEvent) => {
                    if (e.key === "Enter") {
                        addName();
                    }
                }}
            />
            <Button onclick={addName}>
                <Plus></Plus>
            </Button>
        </div>
        <div>
            <ScrollArea class="h-64">
                {#each namesAdded as name, i}
                    <div class="flex m-3 gap-2 justify-start w-full">
                        <button
                            class="opacity-35"
                            onclick={() => namesAdded.splice(i, 1)}
                        >
                            <X></X>
                        </button>
                        <div class="w-60 overflow-clip text-ellipsis">
                            {name}
                        </div>
                    </div>
                {/each}
            </ScrollArea>
        </div>
        <Dialog.Footer>
            <Button
                variant="outline"
                onclick={() => {
                    isPublicOpen = false;
                }}
            >
                Cancel
            </Button>
            <Button onclick={donatePublic} disabled={isLoading}>
                {#if isLoading}
                    <LoaderCircle class="animate-spin"></LoaderCircle>
                {:else}
                    <Heart class="text-nutstash"></Heart>
                {/if}
                Confirm
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={isAnonOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title
                >You are about to donate {formatAmount(
                    donationAmount,
                    currentUnit,
                )} to nutstash anonymously!</Dialog.Title
            >
            <Dialog.Description>
                the donation for <span class="font-bold">
                    {formatAmount(donationAmount, currentUnit)}
                </span>
                is now ready.
            </Dialog.Description>
        </Dialog.Header>

        <Dialog.Footer>
            <Button
                variant="outline"
                onclick={() => {
                    isAnonOpen = false;
                }}
            >
                Cancel
            </Button>
            <Button onclick={donateAnon} disabled={isLoading}>
                {#if isLoading}
                    <LoaderCircle class="animate-spin"></LoaderCircle>
                {:else}
                    <Heart class="text-nutstash"></Heart>
                {/if}
                Confirm
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
