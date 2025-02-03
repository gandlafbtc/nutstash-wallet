<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { pendingProofsStore, proofsStore } from "$lib/stores/persistent/proofs";
    import CheckProofSelector from "./CheckProofSelector.svelte";
</script>

<div class="flex flex-col gap-3 items-start">
<p class="text-lg font-bold">
    Check ecash proofs
</p>
<Tabs.Root value="pending" class="w-[400px]">
    <Tabs.List>
      <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
      <Tabs.Trigger value="active">Active</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="pending">
      <div class="flex flex-col gap-3">

        <p class="">
            Check If sent ecash has been claimed. Un-claimed ecash will get added back to the wallet.
        </p>
        <CheckProofSelector proofs={$pendingProofsStore} type='pending'></CheckProofSelector>
    </div>
        
    </Tabs.Content>
    <Tabs.Content value="active">
        <div class="flex flex-col gap-3">

            <p class="text-yellow-400">
                Warning! You should only check active proofs if the wallet state got messed up.
            </p>
            <CheckProofSelector proofs={$proofsStore} type='active'></CheckProofSelector>
        </div>
            
    </Tabs.Content>
  </Tabs.Root>
</div>

<style>

</style>