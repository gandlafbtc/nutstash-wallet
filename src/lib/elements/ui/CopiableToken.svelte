<script lang="ts">
	import { copyTextToClipboard } from '$lib/util/utils';

	import { Copy } from 'lucide-svelte';
	interface Props {
		token: string;
	}

	let { token }: Props = $props();
	let copied = $state(false);

	const handleCopy = () => {
		copied = true;
		copyTextToClipboard(token);
		setTimeout(() => {
			copied = false;
		}, 2000);
	};
</script>

<div
	tabindex="0"
	role="button"
	class="relative h-16 overflow-hidden rounded-md border border-muted p-2"
	onclick={handleCopy}
	onkeypress={() => {}}
>
	<div
		class="absolute inset-0 flex cursor-pointer items-center justify-center bg-background bg-opacity-90 text-muted-foreground transition-all duration-300 hover:text-primary hover:backdrop-blur-sm"
	>
		<div
			class="flex w-24 items-center justify-center rounded-md bg-background p-2 text-center text-sm"
		>
			{#if copied}
				<div class="flex items-center gap-2 text-center">Copied!</div>
			{:else}
				<div class="flex items-center gap-2">
					<Copy class="h-5 w-5"></Copy> Copy
				</div>
			{/if}
		</div>
	</div>
	<div class="overflow-clip text-ellipsis text-xs">
		<code>
			{token}
		</code>
	</div>
</div>
