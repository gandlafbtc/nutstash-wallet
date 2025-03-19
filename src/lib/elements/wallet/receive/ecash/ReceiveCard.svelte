<script lang="ts">
	import { scanresultStore } from '$lib/stores/session/transitionstores';
	import { parseSecret } from '@cashu/crypto/modules/common/NUT11';
	import { Button } from '$lib/components/ui/button/';
	import * as Card from '$lib/components/ui/card/';
	import {
		AlertCircle,
		BookCheck,
		Check,
		Coins,
		Download,
		Landmark,
		LoaderCircle,
		Lock,

	} from 'lucide-svelte';
	import { mints } from '$lib/stores/persistent/mints';
	import { formatAmount, getKeysForKeysetId, parseSecrets } from '$lib/util/walletUtils';
	import * as Accordion from '$lib/components/ui/accordion';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { receiveEcash } from '$lib/actions/actions';
	import { push } from 'svelte-spa-router';
	import { toast } from 'svelte-sonner';
	import { keysStore } from '$lib/stores/persistent/keys';
	import { getBy } from '$lib/stores/persistent/helper/storeHelper';
	import { type Token } from '@cashu/cashu-ts';
	import { hasValidDleq } from '@cashu/cashu-ts';
	import { ensureError } from '$lib/helpers/errors';
	import { offlineProofsStore, pendingProofsStore, proofsStore, spentProofsStore } from '$lib/stores/persistent/proofs';
	import { offlineTransactionsStore } from '$lib/stores/persistent/offlineTransactions';
	import { randDBKey } from '$lib/db/helper';
	import { TransactionStatus, TransactionType } from '$lib/db/models/types';
	import ProgressSuccess from '$lib/components/ui/progress/progressSuccess.svelte';

	
	interface Props {
		token: Token;
	}

	let { token }: Props = $props();

	let mint = $derived($mints.find((m) => m.url === token?.mint))
	
	let isKnownMint = $derived(mint ? true : false);
	
	let isLoading = $state(false);


	//offline checks
	let {lockPubs, allDLEQsValid, timelock} = $derived(parseSecrets(token));
	let isLockedToMe = $derived(lockPubs.filter(lp=> !$keysStore.map((ks) => ks.publicKey).includes(lp)).length?false:true) 
	let noDuplicatesInStorage = $derived(![...$offlineProofsStore, ...$proofsStore, ...$pendingProofsStore, ...$spentProofsStore].map(p=>p.secret).filter(s=> token.proofs.map(tp=> tp.secret).includes(s)).length)
	let is1WeekTimelock = $derived(timelock>(Date.now()/1000)+(60*60*24*7))
	let noDuplicatesInToken = $derived(!token.proofs.filter(num => token.proofs.indexOf(num) !== token.proofs.lastIndexOf(num)).length)
	let trustScore = $derived.by(()=> {
		let score = 0
		if (lockPubs.length) {
			score += 15
		}
		if (lockPubs.length && isLockedToMe) {
			score += 15
		}
		if (allDLEQsValid) {
			score += 30
		}
		if (noDuplicatesInStorage) {
			score += 10
		}
		if (is1WeekTimelock) {
			score += 10
		}
		if (noDuplicatesInToken) {
			score += 20
		}
		return score
		
	});
	let trustVerdict = $derived.by(()=> {
		if (trustScore >= 100) {
				return 'Can be received offline without trusting the sender';
			} else {
				return 'Offline receiving requires trusting the sender';
			}
	})

	const receive = async () => {
		if (!token) {
			return;
		}
		try {
			isLoading = true;
			let privkey;
			if (lockPubs.length) {
				//todo make this work with multiple lock pubs
				privkey = getBy($keysStore, lockPubs[0], 'publicKey')?.privateKey;
			}
			const { proofs } = await receiveEcash(token, { privkey });
			if (proofs) {
				push('/wallet/');
			}
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};

	const trustMint = async () => {
		try {
			isLoading = true;
			if (!token?.mint) {
				return;
			}
			await mints.fetchMint(token?.mint);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};

	const discard = () => {
		scanresultStore.set(undefined);
		push('/wallet/');
	};

	const receiveOffline = () => {
		offlineProofsStore.addMany(token.proofs)
		const id = randDBKey()
		offlineTransactionsStore.addOrUpdate(id, {
			id,
			amount: token.proofs.reduce((acc, proof) => acc + proof.amount, 0),
			in: token.proofs,
			out:token.proofs,
			createdAt: Date.now(),
			lastChangedAt: Date.now(),
			type: TransactionType.OFFLINE,
			state: TransactionStatus.PENDING,
			mintUrl: token.mint,
			unit: token.unit??"sat"
		}, "id")
		toast.info("Offline token received, don't forget to claim it when you're online!")
		push('/wallet/');
	}
</script>

<Card.Root class="">
	<Card.Header>
		<Card.Title>Receive Cashu token</Card.Title>
		<Card.Description class="flex items-center gap-3">
			<div class="relative">
				<Landmark class="h-4 w-4"></Landmark>
				{#if isKnownMint}
					<!-- content here -->
					<Check class="absolute -bottom-2 -right-1 h-3 w-3 text-green-600"></Check>
				{/if}
			</div>
			{token.mint}
		</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<Accordion.Root type="single">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>
					<div>
						{#if lockPubs.length}
							<Lock
								class={ isLockedToMe
									? 'text-green-500'
									: 'text-red-500'}
							></Lock>
							
						{/if}
					</div>
					<p class="w-full text-3xl">
						{formatAmount(
							token.proofs.reduce((acc, curr) => acc + curr.amount, 0),
							token.unit ?? 'sat'
						)}
					</p>
				</Accordion.Trigger>
				<Accordion.Content>
					<ScrollArea class="flex max-h-40 flex-col gap-2">
						{#each token.proofs as proof}
							<div class="flex w-full justify-between">
								<div class="flex items-center gap-2">
									<Coins class="h-5 w-5 text-yellow-300"></Coins>
									{formatAmount(proof.amount, token.unit ?? 'sat')}
								</div>
								<p>
									{proof.id}
								</p>
							</div>
						{/each}
					</ScrollArea>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		{#if !isKnownMint}
			<div class="flex items-center gap-2 text-sm text-yellow-500">
				<AlertCircle class="h-4 w-4"></AlertCircle>
				<span>Token is from unknown mint</span>
			</div>
		{/if}
	</Card.Content>
	<Card.Footer class="flex gap-2">
		{#if isKnownMint}
		<div class="flex flex-col gap-2 w-full">

			<Button class="w-full" onclick={receive} disabled={isLoading}>
				{#if isLoading}
				<LoaderCircle class="animate-spin"></LoaderCircle>
				{:else}
				<Download></Download>
				{/if}
				Receive
			</Button>
			<Accordion.Root type="single">
				<Accordion.Item value="item-1">
					<Accordion.Trigger>
						<div>
							Offline options
						</div>
					</Accordion.Trigger>
					<Accordion.Content>
						<div class="flex flex-col gap-1 p-2 rounded-md border-muted-foreground border mt-4">
							<p class="text-sm text-muted-foreground italic font-bold">
								Offline summary
							</p>
							<div>
								<p class="{trustScore>=100?"text-green-500":"text-red-500"}">
									{
										trustVerdict
									}
							</div>
							<p class="text-sm text-muted-foreground">
								Validated mint signatures
							</p>
							{#if allDLEQsValid}
							  <p class="text-green-500">All signatures valid</p>
							{:else}
							  <p class="text-red-500">Verifiable Signatures were not included</p>
							{/if}
							<p class="text-sm text-muted-foreground">
								Locked to my wallet
							</p>
							{#if lockPubs.length && isLockedToMe}
							  <p class="text-green-500">Locked to me</p>
							  <p class="text-sm text-muted-foreground">
								  Timelocked
							  </p>
							  {#if is1WeekTimelock}
							  <p class="text-green-500">Locked for at least 7 days</p>
							{:else}
							  <p class="text-red-500">Timelock expires</p>
							{/if}
							{:else}
							  <p class="text-red-500">Not locked to me</p>
							{/if}
						  <p class="text-sm text-muted-foreground">
							Unique
						</p>
					{#if noDuplicatesInStorage}
						<p class="text-green-500">Nothing found</p>
					  {:else}
						<p class="text-red-500">Found duplicates in storage</p>
					  {/if}
					  <p class="text-sm text-muted-foreground">
						Duplicates
					</p>
				{#if	noDuplicatesInToken			}
					<p class="text-green-500">Nothing found</p>
				  {:else}
					<p class="text-red-500">Found duplicates</p>
				  {/if}
							<Button variant='outline' class="w-full" onclick={receiveOffline} disabled={isLoading}>
								{#if isLoading}
								<LoaderCircle class="animate-spin"></LoaderCircle>
								{:else}
								<Download></Download>
								{/if}
								Receive offline
							</Button>
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>

		</div>
		{:else}
			<Button class="w-full" variant="outline" onclick={discard} disabled={isLoading}
				>Discard</Button
			>
			<Button class="w-full" onclick={trustMint} disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="animate-spin"></LoaderCircle>
				{:else}
					<BookCheck></BookCheck>
				{/if}
				Trust mint
			</Button>
		{/if}
	</Card.Footer>
</Card.Root>
