<script lang="ts">

    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { openReceiveDrawer, openScannerDrawer, openSendDrawer } from "$lib/stores/session/drawer";
    import { scannedInvoiceStore, scannedTokenStore } from "$lib/stores/session/transitionstores";
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
            } else if (
                pasted.includes("@") ||
                pasted.toLowerCase().startsWith("lnurl")
            ) {
                lnurlScanned();
            }
            else{
                toast.warning('No known action available for pasted informaion')
            }
            pasted = ''
        }, 100);
    };

    const lnurlScanned = () => {};

    const lnInvoiceScanned = (invoice: string) => {
        closeDrawers();
        scannedInvoiceStore.set(invoice);
        push("/wallet/receive/ln");
    };

    const cashuTokenScanned = (token: string) => {
        closeDrawers();
        scannedTokenStore.set(token);
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