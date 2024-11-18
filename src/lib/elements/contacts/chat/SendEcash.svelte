<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import { Banknote, Send } from "lucide-svelte";
    import * as Dialog  from "$lib/components/ui/dialog";
    import MintSelector from "$lib/elements/ui/MintSelector.svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import UnitSelector from "$lib/elements/ui/UnitSelector.svelte";
    import { unit } from "$lib/stores/persistent/settings";
    import Input from "$lib/components/ui/input/input.svelte";
    import { formatAmount } from "$lib/util/walletUtils";
    import { sendEcash } from "$lib/actions/actions";
    import { nip19 } from "nostr-tools";
    import { getEncodedTokenV4, type Token } from "@cashu/cashu-ts";


    let {sendCallback, to} = $props()
    let isLoading = $state(false)
    let mint = $state($mints[0])
    let currentUnit = $state($unit)
    let amount = $state(0)
    let sendEcashOpen = $state(false);


    const send = async () => {
        try {
            isLoading = true
            console.log('mint' ,mint)
            const {send} = await sendEcash(mint.url, amount, {unit: currentUnit, includeFees: false})
            const token: Token = {
                proofs: send,
                unit: currentUnit,
                mint: mint.url
            }
            sendCallback(getEncodedTokenV4(token))
        } catch (error) {
            console.error(error)
        }
        finally {
            isLoading = false
        }
    }

</script>

<Dialog.Root bind:open={sendEcashOpen}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Send Ecash to {to.alias}</Dialog.Title>
        <Dialog.Description>
        </Dialog.Description>
      </Dialog.Header>
      <MintSelector bind:mint={mint}></MintSelector>
      <div class="flex gap-2">
          <Input type='number' bind:value={amount}></Input>
          <UnitSelector bind:currentUnit={currentUnit} selectedMints={[mint]}></UnitSelector>
        </div>
        send {formatAmount(amount, currentUnit)} to {to.alias}
      <Dialog.Footer>
          <Button variant="outline" onclick={()=> {sendEcashOpen=false}}>
              Cancel
          </Button>
          <Button onclick={send}>
              <Send></Send>
              Send
          </Button>
      </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<Button onclick={()=> {sendEcashOpen = true}}>
    <Banknote></Banknote>
</Button>