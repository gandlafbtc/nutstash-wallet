<script lang="ts">
	import { toast } from '../../stores/toasts';
	import { wordlist } from '@scure/bip39/wordlists/english';
	import { validateMnemonic } from '@scure/bip39';
	import { deriveSeedFromMnemonic} from '@cashu/cashu-ts';
	import { mnemonic, seed } from '../../stores/mnemonic';
	import { checkNonPending, isRestoring } from '../../stores/settings';
	import { isOnboarded } from '../../stores/message';

	export let isRestore

	let restoreSeed: Array<string> = new Array(12);
	let seedString: string = '';
	
	const populateSeed = () => {
			setTimeout(() => {
				restoreSeed = seedString.split(' ');
			}, 100);
	};

	function startRestore() {
		if (!validateMnemonic(seedString, wordlist)) {
			toast('error', 'the seed phrase was invalid', 'mnemonic is not valid');
			return;
		}
		mnemonic.set(restoreSeed)
		seed.set(deriveSeedFromMnemonic($mnemonic.join(' ')))
		isRestoring.set(true)
		isOnboarded.set(true)
		checkNonPending.set(true);
	}
</script>
	<div class="flex flex-col gap-4">
		<p>Insert your seed phrase in the correct order</p>
		<input
			type="text"
			class="input input-primary input-sm"
			placeholder="or paste seed here..."
			on:paste={populateSeed}
			bind:value={seedString}
			on:keydown={(e) => {
				
			}}
		/>
		<div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
			{#each restoreSeed as input, i}
				<div class="flex gap-1 items-end justify-end">
					<p>{i + 1}.</p>
					<input type="text" class="input input-sm w-24 bg-base-300" bind:value={restoreSeed[i]} />
				</div>
			{/each}
		</div>
		<div class="gap-5 flex flex-col items-center justify-center w-full pt-3">
			<button
				class="btn {restoreSeed.includes(undefined)
					? 'btn-disabled'
					: 'btn-primary'}"
				on:click={startRestore}
			>
					restore
			</button>
			<button class="link" on:click={() => (isRestore = false)}> abort </button>
		</div>
</div>
