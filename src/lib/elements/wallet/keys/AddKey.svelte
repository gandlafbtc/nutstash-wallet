<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog  from "$lib/components/ui/dialog";
    import Input from "$lib/components/ui/input/input.svelte";
    import { ensureError } from "$lib/helpers/errors";
    import { keysStore } from "$lib/stores/persistent/keys";
    import { add } from "date-fns";
    import { Plus } from "lucide-svelte";
    import { toast } from "svelte-sonner";

    let isLoading = $state(false);
    let isOpen = $state(false);
    let inputKey = $state("");
    const addKey = async () => {
        try {
            isLoading = true;
            if ($keysStore.find((ks)=> ks.privateKey === inputKey)) {
                toast.warning("Key already exists");
                return
            }

            await keysStore.addKey(inputKey);
            isOpen = false
        } catch (error) {
            const err = ensureError(error);
			console.error(err)
			toast.error(err.message);
        } finally {
            isLoading = false;
        }
    };
</script>

    <Button variant='outline' onclick={()=>isOpen=true}>
        <Plus></Plus>
        Add key
    </Button>

<Dialog.Root bind:open={isOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Add key manually</Dialog.Title>
            <Dialog.Description><span class="text-destructive">Attention!</span> Keys that are added manually cannot be restored from the seed phrase</Dialog.Description>
        </Dialog.Header>
        <Input placeholder='private key' bind:value={inputKey}></Input>
        <Dialog.Footer>
            <Button
                variant="outline"
                onclick={() => {
                    isOpen = false;
                }}
            >
                Close
            </Button>
            <Button onclick={addKey}>
                Add
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>