<script lang="ts">
	import { isOnboarded } from '../../stores/message';
	import { mints } from '../../stores/mints';
	import { untrustedMints } from '../../stores/untrustedMints';
	import MintRowAdd from '../mint/MintRowAdd.svelte';
	let someMints = [
		'https://8333.space:3338',
		'https://mint.minibits.cash/Bitcoin',
		'https://testnut.cashu.space'
	];

	export let isRestore = false;

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
			return;
		}
		isOnboarded.set(true);
	};
</script>

<!-- {#await getMints() then mints} -->

<div class="card bg-base-100 col-span-2 flex justify-center">
	<div class="card-body flex flex-col gap-4 w-full items-center justify-start p-3">
		<div class="py-6">
			{#if isRestore}
				<h1 class="text-xl font-bold text-center">Mints to restore</h1>
				<div class="p-3">Add the mints you want to restore tokens from</div>
			{:else}
				<h1 class="text-xl font-bold text-center">Add some mints</h1>
				<div class="p-3">
					<p>Remember, the mint you select will have custody over your satoshis.</p>
					<p>
						You will also need to remember from which mints you hold ecash, in order to be able to
						restore them from seed.
					</p>
				</div>
			{/if}
		</div>
		<div class="flex flex-col gap-4">
			{#each someMints as url}
				<MintRowAdd {url} isPredefined={true} afterAdd={() => {}}>
					{#if url === 'https://testnut.cashu.space'}
						<div class="badge badge-error">TEST</div>
					{/if}
				</MintRowAdd>
			{/each}
			<MintRowAdd
				url={''}
				isPredefined={false}
				afterAdd={(url) => {
					someMints.push(url);
					someMints = [...someMints];
				}}
			/>

			<button
				class="btn {$untrustedMints.length ? 'btn-primary ' : 'btn-disabled'}"
				on:click={persistMints}
			>
				confirm
			</button>
		</div>
	</div>
</div>

<!-- {:catch error}
    {error}
{/await} -->
