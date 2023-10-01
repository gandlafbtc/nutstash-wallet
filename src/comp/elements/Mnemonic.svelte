<script>
	import { browser } from "$app/environment";


	import { mnemonic } from "../../stores/mnemonic";
	import { toast } from "../../stores/toasts";
	const copyMnemonic = () => {
		const text = $mnemonic;
		if (browser) {
			if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
				var textarea = document.createElement('textarea');
				textarea.textContent = text;
				textarea.style.position = 'fixed';
				document.body.appendChild(textarea);
				textarea.select();
				try {
					return document.execCommand('copy');
				} catch (ex) {
					console.warn('Copy to clipboard failed.', ex);
					return prompt('Copy to clipboard: Ctrl+C, Enter', text);
				} finally {
					document.body.removeChild(textarea);
					toast(
						'info',
						`${$mnemonic}`,
						'Copied!'
					);
				}
			}
		}
	};
</script>
<p>Write down these 12 words in the correct order and store them securely</p>
<button on:click={copyMnemonic} class="btn btn-square btn-info"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
	<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>
</button>
<div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
	{#each $mnemonic.split(' ') as word, i}
		<div class="flex gap-1">
			<p>{i + 1}.</p>
			<input type="text" readonly class="input input-sm w-24 bg-base-300" value={word} />
		</div>
	{/each}
</div>
