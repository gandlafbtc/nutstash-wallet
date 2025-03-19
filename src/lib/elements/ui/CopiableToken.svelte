<script lang="ts">
import { copyTextToClipboard } from "$lib/util/utils";


import { Copy } from "lucide-svelte";
interface Props {
	token: string;
}

let {  token  }: Props = $props();
let copied = $state(false);

const handleCopy = () => {
	copied = true;
	copyTextToClipboard(token);
    setTimeout(() => {
		copied = false;
	}, 2000);
};

</script>

<div tabindex="0" role="button" class="p-2 h-16 rounded-md border-muted border relative overflow-hidden" onclick={handleCopy} onkeypress={()=> {}}>
    <div class="absolute inset-0 bg-background bg-opacity-90 duration-300 hover:backdrop-blur-sm transition-all flex items-center justify-center cursor-pointer text-muted-foreground hover:text-primary">
        <div class="flex items-center justify-center text-sm p-2 rounded-md bg-background w-24 text-center">
            {#if copied}
            <div class="flex gap-2 items-center text-center">
                Copied!
            </div>
                {:else}
            <div class="flex gap-2 items-center ">
                <Copy class='h-5 w-5'></Copy> Copy
            </div>
            {/if}
        </div>
      </div>
    <div class="text-xs text-ellipsis overflow-clip">
        <code>
            {token}
        </code>
    </div>
</div>