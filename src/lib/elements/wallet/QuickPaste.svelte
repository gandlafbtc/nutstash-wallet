<script lang="ts">

    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { openReceiveDrawer, openScannerDrawer, openSendDrawer } from "$lib/stores/session/drawer";
    import { scanresultStore } from "$lib/stores/session/transitionstores";
    import { toast } from "svelte-sonner";
    import { push } from "svelte-spa-router";

    let pasted = $state('')

    const onPaste = () => {
        setTimeout(() => {
            if (
                pasted.toLowerCase().startsWith("lightning:") ||
                pasted.toLowerCase().startsWith("lnbc")
            ) {
                if (pasted.toLowerCase().startsWith("lightning:")) {
                    pasted = pasted.split(":")[1];
                }
                lnInvoiceScanned(pasted);
            } else if (pasted.toLowerCase().startsWith("cashu")) {
                if (pasted.toLowerCase().startsWith("cashu:")) {
                    pasted = pasted.split(":")[1];
                }
                if (pasted.startsWith("//")) {
                    pasted = pasted.slice(2);
                }
                const scannedToken = pasted;
                cashuTokenScanned(scannedToken);
            }
            else if (pasted.toLowerCase().startsWith("npub")) {
            npubScanned(pasted);
        } else if (pasted.toLowerCase().startsWith("lnurl")) {
            lnurlScanned(pasted);
        } else if (pasted.includes("@") && pasted.includes(".")) {
            lnAddressScanned(pasted);
        }
            else{
                toast.warning('No known action available for pasted informaion')
            }
            pasted = ''
        }, 100);
    };

    const npubScanned = (npub: string) => {
        closeDrawers();
        push('/wallet/contacts/chat/'+npub);
    };

    const lnAddressScanned = (lnAddress :string) => {
        closeDrawers();
        scanresultStore.set(lnAddress);
        push('/wallet/send/lnurl');
    };

    const lnurlScanned = (lnurl: string) => {
        closeDrawers();
        scanresultStore.set(lnurl);
        push('/wallet/send/lnurl');
    };

    const lnInvoiceScanned = (invoice: string) => {
        closeDrawers();
        scanresultStore.set(invoice);
        push("/wallet/receive/ln");
    };

    const cashuTokenScanned = (token: string) => {
        closeDrawers();
        scanresultStore.set(token);
        push("/wallet/receive/cashu");
    };

    const closeDrawers = () => {
        openScannerDrawer.set(false)
        openReceiveDrawer.set(false)
        openSendDrawer.set(false)
    }

</script>
<Textarea bind:value={pasted} onpaste={(e)=>onPaste()}
class="w-80 border-dashed resize-none rounded-none focus-visible:outline-transparent focus:outline-transparent"

inputmode="none"
placeholder="Quickpaste: paste token, invoice etc." ></Textarea>