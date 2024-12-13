<script>

    import * as DropdownMenu  from "$lib/components/ui/dropdown-menu";
    import { ensureError } from "$lib/helpers/errors";
    import { mints } from "$lib/stores/persistent/mints";
    import { Landmark, Loader, Trash } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    let {mint} = $props()

let isLoading = $state(false)
const fetchMint = async () => {
 try {
     isLoading = true
     toast.promise(mints.fetchMint(mint.url), {
        loading: 'Updating mint', 
        success: "Mint updated"
     })
 } catch (error) {
  console.error(error)
  const err = ensureError(error)
            console.error(err);
  toast.error('Problem updating mint: '+err.message)
 }
 finally {
     isLoading = false
 }
}
</script>
<DropdownMenu.Item class='' onclick={fetchMint}>
    <Loader></Loader>
    Update
</DropdownMenu.Item>
<DropdownMenu.Item class='' onclick={()=>mints.makeDefaultMint(mint)}>
    <Landmark></Landmark>
    Make default
</DropdownMenu.Item>
<DropdownMenu.Item class='text-destructive' onclick={()=>mints.remove(mint.url, "url")}>
    <Trash></Trash>
    Remove Mint
</DropdownMenu.Item>