<script lang="ts">
	import { token } from '../../stores/tokens';
	import { mints } from '../../stores/mints';
	import Sending from './Sending.svelte';
	import Receiving from './Receiving.svelte';
	import Tokens from '../tokens/Tokens.svelte';
	import BackupButton from '../elements/BackupButton.svelte';
	import Melting from './Melting.svelte';
</script>

<div class="flex flex-col w-full h-full items-center justify-center gap-5">
	<div class="flex items-center justify-center flex-col gap-5 w-full">
		<div class="flex flex-col justify-center items-center">
			<p class="text-8xl">
				{$token.reduce((count, t) => {
					return count + t.amount;
				}, 0)}
			</p>

			<p class="text-4xl">satoshi</p>
		</div>
		{#if $mints.filter((m) => m.isAdded).length === 0}
			<button class="btn btn-warning btn-disabled"
				>You have to be connected to a mint to send and receive Tokens.</button
			>
		{:else}
			<div class="flex flex-col gap-4">
				<div class="flex gap-2">
					<label for="receive-modal" class="btn btn-primary btn-outline flex gap-1 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
							/>
						</svg>
						<p>receive</p>
					</label>
					<label for="send-modal" class="btn btn-primary flex gap-1 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
							/>
						</svg>
						<p>send</p>
					</label>
				</div>
				<div class="">
					<label for="melt-modal" class="btn btn-warning w-full font-bold text-xl flex gap-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
							/>
						</svg>
						PAY</label
					>
				</div>
			</div>
		{/if}
	</div>
	<Tokens />
</div>
<Receiving />
<Melting />
<Sending />
