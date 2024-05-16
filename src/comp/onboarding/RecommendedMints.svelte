<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isOnboarded } from '../../stores/message';
	import { mints } from '../../stores/mints';
	import { untrustedMints } from '../../stores/untrustedMints';
	import MintRowAdd from '../mint/MintRowAdd.svelte';
	let someMints = [
		'https://8333.space:3338',
		'https://mint.minibits.cash/Bitcoin',
		'https://testnut.cashu.space'
	];

	export let isSetupMints = false;

	let isLoading = false;

	onMount(() => {
		isLoading = false;
	});

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
		isOnboarded.set(true);
	};

	const afterAdd = (url: string) => {
		someMints.push(url);
		someMints = [...someMints];
	};
</script>

<!-- {#await getMints() then mints} -->

<div class="">
	<div class="flex flex-col gap-4 w-full items-center justify-start p-2">
		<div class="py-4 flex flex-col items-center gap-3">
			<h1 class="text-xl font-bold text-center">Add some mints</h1>
			<div class="p-3 lg:w-[50%] flex flex-col gap-3">
				<p>Remember, the mint you select will have custody over your satoshis.</p>
				<p>
					You will also need to remember from which mints you hold ecash, in order to be able to
					restore them from your seed phrase.
				</p>
			</div>
		</div>
		<div class="flex flex-col gap-4 w-full">
			{#each someMints as url}
				<MintRowAdd {url} isPredefined={true} afterAdd={() => {}}>
					{#if url === 'https://testnut.cashu.space'}
						<div class="badge badge-error">TEST</div>
					{/if}
				</MintRowAdd>
			{/each}
			<MintRowAdd url={''} isPredefined={false} {afterAdd} />

			<button
				class="btn {$untrustedMints.length || isLoading ? 'btn-primary ' : 'btn-disabled'}"
				on:click={persistMints}
			>
				{#if isLoading}
					<div class="loading"></div>
				{:else}
					confirm
				{/if}
			</button>
			{#if !$untrustedMints.length}
				<button class="link" on:click={persistMints}> skip </button>
			{/if}
		</div>
	</div>
</div>

<!-- {:catch error}
    {error}
{/await} -->
