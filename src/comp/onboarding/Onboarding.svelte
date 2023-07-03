<script lang="ts">
	import { onMount } from 'svelte';
	import { isOnboarded } from '../../stores/message';

	let page: number = 0;

	onMount(() => {
		setTimeout(() => (page = 1), 1000);
	});
</script>

<div />
{#if page != 0}
	<div class="flex flex-col w-full items-center justify-center text-center col-span-2 gap-2">
		<div class="h-56 w-56 flex flex-col items-center justify-center gap-3">
			<img src="/icons/hat.svg" alt="hat" class="{page === 4 ? '' : 'hidden'} w-32" />
			<img src="/icons/shades.svg" alt="shades" class="{page === 2 ? '' : 'hidden'} w-32" />
			<img src="/icons/stache.svg" alt="stache" class="{page === 3 ? '' : 'hidden'} w-32" />
		</div>
		{#if page === 1}
			<h1 class="text-lg font-bold">Welcome to nutstash</h1>
			<p>
				⚠️ Nutstash is still in beta development. Please make sure you understand the <a
					href=""
					class="link link-primary">risks</a
				> before using the app. 👉
			</p>
			<div class="flex gap-2">
				<button class="btn btn-outline invisible"> back </button>
				<button class="btn btn-primary" on:click={() => page++}> next </button>
			</div>
		{:else if page === 2}
			<h1 class="text-lg font-bold">Ecash for Privacy</h1>
			<p>
				nutstash is a custodial lightning wallet that uses the Cashu ecash protocol to protect your
				privacy. 👉
			</p>
			<div class="flex gap-2">
				<button class="btn btn-outline" on:click={() => page--}> back </button>
				<button class="btn btn-primary" on:click={() => page++}> next </button>
			</div>
		{:else if page === 3}
			<h1 class="text-lg font-bold">Transact Anonymously</h1>
			<p>
				Ecash works without accounts. Cashu tokens are bearer assets, that are stored locally on
				your nutstash wallet. 👉
			</p>
			<div class="flex gap-2">
				<button class="btn btn-outline" on:click={() => page--}> back </button>
				<button class="btn btn-primary" on:click={() => page++}> next </button>
			</div>
		{:else if page === 4}
			<h1 class="text-lg font-bold">Choose your custodian</h1>
			<p>
				nutstash is <b> not </b> custodian. The custodian of your sats are the mints you connect to.
			</p>
			<div class="flex gap-2">
				<button class="btn btn-outline" on:click={() => page--}> back </button>
				<button
					class="btn btn-primary"
					on:click={() => {
						isOnboarded.set(true);
					}}
				>
					Set up Mints
				</button>
			</div>
		{/if}
		<div class="w-40 flex mt-10 justify-center gap-3">
			<button
				on:click={() => (page = 0)}
				class="bg-base-100 {page === 1 ? 'opacity-80' : 'opacity-40'} w-2 h-2 rounded-full"
			/>
			<button
				on:click={() => (page = 1)}
				class="bg-base-100 {page === 2 ? 'opacity-80' : 'opacity-40'} w-2 h-2 rounded-full"
			/>
			<button
				on:click={() => (page = 2)}
				class="bg-base-100 {page === 3 ? 'opacity-80' : 'opacity-40'} w-2 h-2 rounded-full"
			/>
			<button
				on:click={() => (page = 3)}
				class="bg-base-100 {page === 4 ? 'opacity-80' : 'opacity-40'} w-2 h-2 rounded-full"
			/>
		</div>
	</div>
    {:else}
    <div class="flex items-center justify-center w-full col-span-2">
        



        <div class="coin">
            <img src="/icons/coin.gif" alt="loading" class="h-20">
        </div>


  
  
    </div>
    {/if}
	<div />


    <style>
  

    </style>