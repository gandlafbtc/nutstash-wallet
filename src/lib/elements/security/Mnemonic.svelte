<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { or_copy_it, write_down_your_12_words } from '$lib/paraglide/messages';
	import { mnemonic } from '$lib/stores/persistent/mnemonic';
	import { copyTextToClipboard } from '$lib/util/utils';
	const copyMnemonic = () => {
		const text = $mnemonic[0].mnemonic;
		if (browser) {
			copyTextToClipboard(text);
		}
	};

</script>

<div class="flex flex-col gap-6">
	<p>{write_down_your_12_words()}</p>
	<div class="flex flex-col items-center justify-center gap-1 rounded-xl">
		<Button onclick={copyMnemonic} class="w"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
				/>
			</svg>
			{or_copy_it()}
		</Button>
	</div>
	<div class="flex w-full justify-center">
		<div class="grid max-w-4xl grid-flow-col grid-rows-6 gap-3">
			{#each $mnemonic[0]?.mnemonic?.split(' ') as word, i}
				<div class="flex items-center gap-1">
					<p class="w-8">{i + 1}.</p>
					<Input type="text" readonly class="" value={word} />
				</div>
			{/each}
		</div>
	</div>
</div>
