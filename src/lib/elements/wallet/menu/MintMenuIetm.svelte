<script lang="ts">

import * as Sidebar from "$lib/components/ui/sidebar";
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Ellipsis, Loader, LoaderCircle, Trash } from "lucide-svelte";
  import { mints } from "$lib/stores/persistent/mints";
  import type { Mint } from "$lib/db/models/types";
    import { getHostFromUrl } from "$lib/util/utils";
    import { toast } from "svelte-sonner";


  const {mint}: {mint:Mint} = $props()
    let isLoading = $state(false)

    const fetchMint = async () => {
     try {
         isLoading = true
         await mints.fetchMint(mint.url)
         toast.success('Mint updated')
     } catch (error) {
      console.log(error)
      toast.error('Problem updating mint')
     }
     finally {
         isLoading = false
     }
    }
    

</script>
<Sidebar.MenuItem>
    <Sidebar.MenuButton>
      {#snippet child({ props })}
        <a href={"/#/wallet/mint/"+ getHostFromUrl(mint.url)} {...props}>
          <span class="text-xs">{mint.url}</span>
          {#if isLoading}
            <LoaderCircle class='animate-spin'></LoaderCircle>
          {/if}
        </a>
      {/snippet}
    </Sidebar.MenuButton>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuAction {...props}>
            <Ellipsis />
          </Sidebar.MenuAction>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content side="right" align="start">
          <DropdownMenu.Item class='' onclick={fetchMint}>
              <Loader></Loader>
              Update
          </DropdownMenu.Item>
          <DropdownMenu.Item class='text-destructive' onclick={()=>mints.remove(mint.url, "url")}>
              <Trash></Trash>
              Remove Mint
          </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>