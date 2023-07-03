<script lang="ts">
	import { mints } from "../../stores/mints";
	import { untrustedMints } from "../../stores/untrustedMints";
	import MintRowAdd from "../mint/MintRowAdd.svelte";
    const someMints = ["https://legend.lnbits.com/cashu/api/v1/4gr9Xcmz3XEkUNwiBiQGoC","https://8333.space:3338","https://nuts.semisol.dev"]
    //fetch from server when cors allowed
    // async function getMints() {
    //     const res = await fetch('https://mintindex.gandlaf.com')
    //     const data: Array<string> = await res.json()
    //         if(res.ok){
    //             return data
    //         }
    //         else {
    //             throw new Error('could not fetch')
    //         }
    // }

    const persistMints = () => {
        mints.set($untrustedMints)
    }
</script>

<!-- {#await getMints() then mints} -->
<div>

</div>
<div class="card bg-base-100 col-span-2 flex justify-center">
    <div class="card-body flex flex-col gap-4 w-full items-center justify-start">
        <h1 class="text-xl font-bold">
            Add some mints
        </h1>
        <div class="h-10">
            Remember, the mint you select will have custody over your satoshis.  
        </div>
        {#each someMints as url}
        <MintRowAdd {url} isPredefined={true}></MintRowAdd>
        {/each}
        <MintRowAdd url={''} isPredefined={false}></MintRowAdd>
        <button class="btn {$untrustedMints.length?'btn-primary ':'btn-disabled'}" on:click={persistMints}>
            confirm
        </button>
    </div>
</div>
<div>

</div>
<!-- {:catch error}
    {error}
{/await} -->