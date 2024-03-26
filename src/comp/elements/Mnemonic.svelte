<script lang="ts">
	import { browser } from '$app/environment';

	import { mnemonic } from '../../stores/mnemonic';
	import { toast } from '../../stores/toasts';
	const copyMnemonic = () => {
		const text = $mnemonic.join(' ');
		if (browser) {
			copyTextToClipboard(text);
		}
	};
	function fallbackCopyTextToClipboard(text: string) {
		var textArea = document.createElement('textarea');
		textArea.value = text;

		// Avoid scrolling to bottom
		textArea.style.top = '0';
		textArea.style.left = '0';
		textArea.style.position = 'fixed';

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			var successful = document.execCommand('copy');
			if (successful) {
				toast('info', 'Copied mnemonic to clipboard', 'copied!');
			}
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		}

		document.body.removeChild(textArea);
	}
	function copyTextToClipboard(text: string) {
		if (!navigator.clipboard) {
			fallbackCopyTextToClipboard(text);
			return;
		}
		navigator.clipboard.writeText(text).then(
			function () {
				toast('info', 'Copied mnemonic to clipboard', 'copied!');
			},
			function (err) {
				console.error('Async: Could not copy text: ', err);
			}
		);
	}
</script>

<div class="flex flex-col gap-6">
	<p>Write down these 12 words in the correct order and store them securely</p>
	<div class="flex flex-col gap-1 items-center justify-center p-2 rounded-xl">
		<button on:click={copyMnemonic} class="btn btn-info btn-sm"
			><svg
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
					d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
				/>
			</svg>
			Or copy it
		</button>
	</div>
	<div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
		{#each $mnemonic as word, i}
			<div class="flex gap-1">
				<p>{i + 1}.</p>
				<input type="text" readonly class="input input-sm w-24 bg-base-300" value={word} />
			</div>
		{/each}
	</div>
</div>
