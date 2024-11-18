<script lang="ts">
    import { scannedTokenStore } from "$lib/stores/session/transitionstores";
    import { getDecodedToken, type Token } from "@cashu/cashu-ts";
    import { parseSecret } from "@cashu/crypto/modules/common/NUT11";
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
        Lock,
    } from "lucide-svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import { formatAmount } from "$lib/util/walletUtils";
    import * as Accordion from "$lib/components/ui/accordion";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { receiveEcash } from "$lib/actions/actions";
    import { params, push } from "svelte-spa-router";
    import Input from "$lib/components/ui/input/input.svelte";
    import { toast } from "svelte-sonner";
    import { keysStore } from "$lib/stores/persistent/keys";
    import { getBy } from "$lib/stores/persistent/helper/storeHelper";
    import ReceiveCard from "./ReceiveCard.svelte";


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
			console.error(error)
            return null;
        }
    };

    let token: Token | null = $derived.by(getTokenFromUrlOrStore);


</script>

{#if token}
    <div class="w-80">
        <ReceiveCard {token}></ReceiveCard>
    </div>
    {:else}
        <Input bind:value={enteredToken} placeholder="cashuA... / cashuB...">
        
        </Input>
{/if}
