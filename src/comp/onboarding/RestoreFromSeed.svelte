<script lang="ts">
	import { toast } from '../../stores/toasts';
	import { wordlist } from '@scure/bip39/wordlists/english';
	import { validateMnemonic } from '@scure/bip39';
	import { deriveSeedFromMnemonic } from '@cashu/cashu-ts';
	import { mnemonic, seed } from '../../stores/mnemonic';
	import { checkNonPending, isRestoring } from '../../stores/settings';
	import { isOnboarded } from '../../stores/message';

	export let step;

	let restoreSeed: Array<string> = new Array(12);
	let seedString: string = '';

	const populateSeed = () => {
		setTimeout(() => {
			const seedStringCopy = seedString;
			seedString = '';
			const splitted = seedStringCopy.split(' ');
			if (splitted.length !== 12) {
				toast('warning', 'The seed phrase must be 12 words', 'Mnemonic is not valid');
				return;
			}
			if (!validateMnemonic(seedStringCopy, wordlist)) {
				toast('warning', 'The seed phrase is not valid', 'Mnemonic is not valid');
				return;
			}
			restoreSeed = splitted;
		}, 100);
	};

	function startRestore() {
		if (!validateMnemonic(restoreSeed.join(' '), wordlist)) {
			toast('error', 'The seed phrase was invalid', 'Mnemonic is not valid');
			return;
		}
		mnemonic.set(restoreSeed);
		isRestoring.set(true);
		isOnboarded.set(true);
		checkNonPending.set(true);
	}
</script>

<div class="flex flex-col gap-4 pt-32 w-full max-w-4xl items-center">
	<h2 class="font-bold text-xl">Restore ecash from seed phrase</h2>
	<div class="w-20">
		<img src="/icons/coin.gif" alt="loading" class="" />
	</div>
	<p>Insert your seed phrase in the correct order...</p>
	<input
		type="text"
		class="input input-primary input-sm max-w-4xl w-full"
		placeholder="...or paste seed here"
		on:paste={populateSeed}
		bind:value={seedString}
		on:keydown={(e) => {}}
	/>
	<div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
		{#each restoreSeed as input, i}
			<div class="flex gap-1 items-end">
				<p>{i + 1}.</p>
				<input type="text" class="input input-sm w-24 bg-base-300" bind:value={restoreSeed[i]} />
			</div>
		{/each}
	</div>
	<div class="gap-5 flex flex-col items-center justify-center w-full pt-3">
		<button
			class="btn w-full {restoreSeed.includes(undefined) ? 'btn-disabled' : 'btn-primary'}"
			on:click={startRestore}
		>
			restore
		</button>
		<button class="link" on:click={() => (step = 'select')}> Abort </button>
	</div>
</div>
