<script lang="ts">
	import { isOnboarded } from '../../stores/message';
	import { mints } from '../../stores/mints';
	import { untrustedMints } from '../../stores/untrustedMints';
	import MintRowAdd from '../mint/MintRowAdd.svelte';
	const someMints = [
		'https://legend.lnbits.com/cashu/api/v1/4gr9Xcmz3XEkUNwiBiQGoC',
		'https://8333.space:3338',
		'https://nuts.semisol.dev',
		'https://testnut.cashu.space',
	];

	export let isRestore = false

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
		mints.set($untrustedMints);
		if (isRestore) {
			return
		}
		isOnboarded.set(true);
	};
</script>

<!-- {#await getMints() then mints} -->

<div class="card bg-base-100 col-span-2 flex justify-center">
	<div class="card-body flex flex-col gap-4 w-full items-center justify-start p-3">
		<h1 class="text-xl font-bold">Add some mints</h1>
		<div class="h-10 text-center">
			Remember, the mint you select will have custody over your satoshis.
		</div>
		{#each someMints as url}
			<MintRowAdd {url} isPredefined={true} />
		{/each}
		<MintRowAdd url={''} isPredefined={false} />
		<button
			class="btn {$untrustedMints.length ? 'btn-primary ' : 'btn-disabled'}"
			on:click={persistMints}
		>
			confirm
		</button>
	</div>
</div>

<!-- {:catch error}
    {error}
{/await} -->
