<script lang="ts">
	import { toast } from '$lib/stores/toasts';
	import { wordlist } from '@scure/bip39/wordlists/english';
	import { validateMnemonic } from '@scure/bip39';
	import { mnemonic } from '$lib/stores/mnemonic';
	import { checkNonPending, isRestoring } from '$lib/stores/settings';
	import { isOnboarded } from '$lib/stores/message';
    import Input from '$lib/components/ui/input/input.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import * as Card from '$lib/components/ui/card';
    import { pop } from 'svelte-spa-router';

	let restoreSeed: Array<string> = $state(new Array(12));
	let seedString: string = $state('');

	const populateSeed = () => {
		setTimeout(() => {
			const seedStringCopy = seedString;
			seedString = '';
			const splitted = seedStringCopy.split(' ');
			if (splitted.length !== 12) {
				toast( 'The seed phrase must be 12 words','warning', 'Mnemonic is not valid');
				return;
			}
			if (!validateMnemonic(seedStringCopy, wordlist)) {
				toast( 'The seed phrase is not valid','warning', 'Mnemonic is not valid');
				return;
			}
			restoreSeed = splitted;
		}, 100);
	};

	function startRestore() {
		if (!validateMnemonic(restoreSeed.join(' '), wordlist)) {
			toast( 'Invalid seed phrase', 'error');
			return;
		}
		mnemonic.set(restoreSeed);
		isRestoring.set(true);
		isOnboarded.set(true);
		checkNonPending.set(true);
	}
</script>

   <div class="flex m-2 h-full items-center justify-center">
	   <Card.Root class=" lg:max-w-xl lg:h-[42em]">
		   <Card.Header>
			   <Card.Title>Restore ecash from seed phrase</Card.Title>
			   <Card.Description>Insert your seed phrase in the correct order...</Card.Description>
			</Card.Header>
			<Card.Content class="flex gap-2 flex-col justify-center items-center max-w-max">
				<div class="w-20">
					<img src="/icons/coin.gif" alt="loading" class="" />
				</div>
				<p></p>
				<Input
				class="flex-grow"
				type="text"
				placeholder="...or paste seed here"
				onpaste={populateSeed}
				bind:value={seedString}
				onkeydown={(e) => {}}
				/>
				<div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
			{#each restoreSeed as input, i}
			<div class="flex gap-1 items-center">
				<p class="w-8">{i + 1}.</p>
				<Input type="text" class="input input-sm flex-grow" bind:value={restoreSeed[i]} />
			</div>
			{/each}
		</div>
			
	</Card.Content>
	<Card.Footer class='flex gap-4 flex-col'>
		<Button
		disabled={restoreSeed.includes(undefined)}
		onclick={startRestore}
		>
		restore
	</Button>
	<Button variant="link" onclick={()=> {
		
		pop()
	}}> Back </Button>  
	</Card.Footer>
</Card.Root>


</div>