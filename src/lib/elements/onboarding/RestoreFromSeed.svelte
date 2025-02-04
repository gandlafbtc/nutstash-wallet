<script lang="ts">
	import { wordlist } from '@scure/bip39/wordlists/english';
	import { validateMnemonic } from '@scure/bip39';
	import { mnemonic } from '$lib/stores/persistent/mnemonic';
	import { isOnboarded } from '$lib/stores/local/message';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { pop, push } from 'svelte-spa-router';
	import { toast } from 'svelte-sonner';
	import OnboardingHeader from './OnboardingHeader.svelte';

	let restoreSeed: Array<string> = $state(new Array(12));
	let seedString: string = $state('');

	const populateSeed = () => {
		setTimeout(() => {
			const seedStringCopy = seedString;
			seedString = '';
			const splitted = seedStringCopy.split(' ');
			if (splitted.length !== 12) {
				toast.warning('The seed phrase must be 12 words');
				return;
			}
			if (!validateMnemonic(seedStringCopy, wordlist)) {
				toast.warning('The seed phrase is not valid');
				return;
			}
			restoreSeed = splitted;
		}, 100);
	};

	function startRestore() {
		if (!validateMnemonic(restoreSeed.join(' '), wordlist)) {
			toast.error('Invalid seed phrase');
			return;
		}
		mnemonic.add({ mnemonic: restoreSeed.join(' ') });
		isOnboarded.set(true);
		push('/wallet/settings/backup/restore');
	}
</script>

<OnboardingHeader></OnboardingHeader>
<div class="flex h-screen items-center justify-center">
	<Card.Root class="w-80">
		<Card.Header>
			<Card.Title>Restore ecash from seed phrase</Card.Title>
			<Card.Description>Insert your seed phrase in the correct order...</Card.Description>
		</Card.Header>
		<Card.Content class="flex max-w-max flex-col items-center justify-center gap-2">
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
			<div class="grid grid-cols-2 gap-3">
				{#each restoreSeed as input, i}
					<div class="flex items-center gap-1">
						<p class="w-8">{i + 1}.</p>
						<Input type="text" class="input input-sm flex-grow" bind:value={restoreSeed[i]} />
					</div>
				{/each}
			</div>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-4">
			<Button disabled={restoreSeed.includes(undefined)} onclick={startRestore}>restore</Button>
		</Card.Footer>
	</Card.Root>
</div>
