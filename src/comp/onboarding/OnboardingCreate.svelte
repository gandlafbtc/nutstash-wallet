<script>
	import { mnemonic } from '../../stores/mnemonic';

	import Mnemonic from '../elements/Mnemonic.svelte';

	export let step;
</script>

<h2 class="text-xl font-bold pt-32">New Seed phrase created!</h2>
<Mnemonic />
<div class="card-actions gap-5 flex items-center justify-center w-full pt-3 flex-col">
	<button on:click={() => (step = 'mints')} class="btn btn-primary w-full max-w-4xl">
		I wrote it down
	</button>
	<button
		class="link"
		on:click={() => {
			mnemonic.set([]);
			step = 'select';
		}}
	>
		Abort
	</button>
</div>
