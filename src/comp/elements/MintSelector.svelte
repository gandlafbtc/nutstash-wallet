<script lang="ts">
	import type { Mint } from '../../model/mint';
	import { mints } from '../../stores/mints';

	export let mint: Mint;
</script>

<button class="dropdown dropdown-bottom join-item">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label
		tabindex="0"
		class="btn join-item"
	>
		<div class="flex items-center gap-1">
			<div class="rounded-full bg-success w-4 h-4 p-0.5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
				</svg>
			</div>
			<p class="truncate max-w-xs text-xs">
				{mint.mintURL}
			</p>
		</div>
	</label>

	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex="0"
		class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48 md:w-72 max-h-56 overflow-scroll flex-row scrollbar-hide"
	>
		{#each $mints as m}
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li
				on:click={() => (mint = m)}
				class="rounded-xl"
			>
                <div class="flex gap-1 items-center">
                    {#if m.mintURL === mint.mintURL}
                    <div class="rounded-full bg-success w-4 h-4 p-0.5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                    {/if}
                    <a>{m.mintURL}</a>
                </div>
			</li>
		{/each}
	</ul>
</button>
