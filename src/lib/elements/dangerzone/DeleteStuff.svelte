<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog  from "$lib/components/ui/dialog";
import { DB } from "$lib/db/db";
    import { init } from "$lib/init/init";
    import { isOnboarded } from "$lib/stores/local/message";
    import { selectedMints } from "$lib/stores/local/selectedMints";
    import { usePassword } from "$lib/stores/local/usePassword";
    import { delay } from "$lib/util/utils";
    import { toast } from "svelte-sonner";

    let isOpen = $state(false)

    const deleteAll = async () => {
        try {
            isOpen=false
            usePassword.set(undefined)
            selectedMints.set([]);
            isOnboarded.set(false);
            DB.deleteDatabase()
            toast.promise(delay(1000), {
                loading: 'Wallet has been deleted. Reloading now...',
                success: "Wallet restart..."
            })
            await delay(2000)
            window.location.reload()
            await delay(2000)
            toast.error('Restart has failed. Please restart the app manually.');
            
        } catch (error) {
			console.error(error)
            toast.error(error.message);
        }
    }
</script>


<div class="w-80 h-full mt-32 flex flex-col gap-5">
 
    <p class="text-destructive">
        <span class="font-bold">
            Warning!
        </span>
        These actions can not be undone. Be sure of what you want to do before proceeding.
    </p>
    <Button variant='destructive' onclick={()=> {isOpen = true}}>
        Delete Wallet
    </Button>
</div>

<Dialog.Root bind:open={isOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title class='text-destructive'
                >Are you sure you want to delete this wallet?</Dialog.Title
            >
            <Dialog.Description>
                This cannot be undone. Your wallet will be gone forever.
            </Dialog.Description>
        </Dialog.Header>
      
        <Dialog.Footer>
            <Button
                variant="outline"
                onclick={() => {
                    isOpen = false;
                }}
            >
                Cancel
            </Button>
            <Button variant='destructive' onclick={deleteAll}>
                Yes, Delete wallet
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>