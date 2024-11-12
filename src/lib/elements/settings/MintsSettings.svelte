<script>
    import { mints } from "$lib/stores/persistent/mints";
    import { untrack } from "svelte";
    import MintSelector from "../ui/MintSelector.svelte";

    let defaultMint = $state($mints[0])

    $effect(()=> {
        console.log(defaultMint)
        if (defaultMint.url!== untrack(()=>$mints[0]?.url)) {
            mints.makeDefaultMint(defaultMint);
        }
    })

</script>
<div class="flex flex-col gap-4 h-full w-80 mt-32">
    <div>
        <span class="font-bold text-lg">
            Mint Settings
        </span>
    </div>
    <div class="flex flex-col gap-1">
        <span class="text-sm">Default mint</span>
        <MintSelector bind:mint={defaultMint}></MintSelector>
    </div>
</div>