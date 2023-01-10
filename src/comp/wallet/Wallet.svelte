<script lang="ts">
	import { token } from '../../stores/tokens';
    import { mints } from "../../stores/mints";
	import Sending from './Sending.svelte';
	import Receiving from './Receiving.svelte';
</script>

<div class="flex flex-col w-full h-full items-center justify-center gap-10 ">
	<div class="flex flex-col justify-center items-center">
        <p class="text-8xl">
            {$token.reduce((count, t) => {
                return count + t.amount;
            }, 0)} 
        </p>
		
        <p class="text-4xl">
            satoshi
        </p>
	</div>
    {#if $mints.length===0}
        <button class="btn btn-warning btn-disabled">You have to be connected to a mint to send and receive Tokens.</button>
    {:else}
	<div>
		<label for="receive-modal" class="btn btn-primary btn-outline">
			<p>receive</p>
        </label>
		<label for="send-modal" class="btn btn-primary">
			<p >send</p>
        </label>
	</div>
    {/if}
</div>
<Receiving></Receiving>

<Sending></Sending>