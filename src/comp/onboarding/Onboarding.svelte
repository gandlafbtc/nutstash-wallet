<script lang="ts">
	import { onMount } from 'svelte';
	import { isOnboarded } from '../../stores/message';
	import RecommendedMints from './RecommendedMints.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

let setUpMint = false
</script>

<div />
{#if !setUpMint}
<div class="flex items-center col-span-2 text-white">
	
	<div class="flex flex-col w-full items-center justify-center text-center col-span-2 gap-2">
		<div class="carousel max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
			<div id="1" class="carousel-item w-full flex flex-col items-center justify-center gap-2">
				
				<h1 class="text-lg font-bold">Welcome to nutstash</h1>
				<p>
					Nutstash is still in beta development. Please use at own risk.
				</p>
				<div class="flex gap-2 items-center h-24">
					<a href="#2" class="">
						<span class="relative flex h-10 w-10">
							<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
							/>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-10 h-10 relative inline-flex rounded-full"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
							/>
						</svg>
					</span>
					</a>
				</div>
			</div>
			<div id="2" class="carousel-item w-full flex flex-col items-center justify-center gap-2">
				<!-- <a class="absolute left-0 z-10" href="#1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-10 h-10"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
						/>
					</svg>
				</a> -->
				<img src="/icons/shades.svg" alt="shades" class=" w-32" />
				<h1 class="text-lg font-bold">Ecash for Privacy</h1>
				<p>
					nutstash is a custodial lightning wallet that uses the Cashu ecash protocol to protect
					your privacy.
				</p>
				<div class="flex gap-2 items-center h-24">
					<a href="#3" class="">
						<span class="relative flex h-10 w-10">
							<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
							/>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-10 h-10 relative inline-flex rounded-full"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
							/>
						</svg>
					</span>
					</a>
				</div>
			</div>
			<div id="3" class="carousel-item w-full flex flex-col items-center justify-center gap-2">
				
				<img src="/icons/stache.svg" alt="stache" class="w-32" />
				<h1 class="text-lg font-bold">Transact Anonymously</h1>
				<p>
					Ecash works without accounts. Cashu tokens are bearer assets, that are stored locally on
					your nutstash wallet.
				</p>
				<div class="flex gap-2 items-center h-24">
					<a href="#4" class="">
						<span class="relative flex h-10 w-10">
							<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
							/>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-10 h-10 relative inline-flex rounded-full"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
							/>
						</svg>
					</span>

					</a>
				</div>
			</div>
			<div id="4" class="carousel-item w-full flex flex-col items-center justify-center gap-2">
				<img src="/icons/hat.svg" alt="hat" class="w-32" />
				<h1 class="text-lg font-bold">Choose your custodian</h1>
				<p>
					nutstash is <b> not </b> the custodian. The custodian of your sats are the mints you connect
					to.
				</p>
				<div class="flex gap-2">
					<button
						class="btn btn-primary"
						on:click={() => {
							setUpMint = true;
						}}
					>
						Set up Mints
					</button>
				</div>
			</div>
		</div>
		<div class="w-40 flex mt-10 justify-center gap-3">
			<a
				href="#1"
				class="bg-base-100 {$page.url.hash === '#1'
					? 'opacity-80'
					: 'opacity-40'} w-2 h-2 rounded-full"
			/>
			<a
				href="#2"
				class="bg-base-100 {$page.url.hash === '#2'
					? 'opacity-80'
					: 'opacity-40'} w-2 h-2 rounded-full"
			/>
			<a
				href="#3"
				class="bg-base-100 {$page.url.hash === '#3'
					? 'opacity-80'
					: 'opacity-40'} w-2 h-2 rounded-full"
			/>
			<a
				href="#4"
				class="bg-base-100 {$page.url.hash === '#4'
					? 'opacity-80'
					: 'opacity-40'} w-2 h-2 rounded-full"
			/>
		</div>
	</div>
	
</div>

<!-- {:else if page!==5}
	<div class="flex items-center justify-center w-full col-span-2">
		<div class="coin">
			<img src="/icons/coin.gif" alt="loading" class="h-20" />
		</div>
	</div> -->
<!-- {/if} -->
{:else}
	 <!-- else content here -->
	<RecommendedMints />
{/if}
<div />
