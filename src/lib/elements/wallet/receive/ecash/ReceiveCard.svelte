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
		Lock
	} from 'lucide-svelte';
	import { mints } from '$lib/stores/persistent/mints';
	import { formatAmount } from '$lib/util/walletUtils';
	import * as Accordion from '$lib/components/ui/accordion';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { receiveEcash } from '$lib/actions/actions';
	import { params, push } from 'svelte-spa-router';
	import { toast } from 'svelte-sonner';
	import { keysStore } from '$lib/stores/persistent/keys';
	import { getBy } from '$lib/stores/persistent/helper/storeHelper';
	import type { Token } from '@cashu/cashu-ts';
	import { ensureError } from '$lib/helpers/errors';

	interface Props {
		token: Token;
	}

	let { token }: Props = $props();

	let isKnownMint = $derived($mints.find((m) => m.url === token?.mint) ? true : false);

	let lockPubs = $derived.by(() => {
		const pubs: string[] = [];
		token?.proofs.forEach((t) => {
			//check secrets for lock
			try {
				const secret = parseSecret(t.secret);
				if (secret[0] === 'P2PK') {
					pubs.push(secret[1].data);
				}
			} catch {
				// do nothing
			}
		});
		return pubs;
	});

	let isLoading = $state(false);

	const receive = async () => {
		if (!token) {
			return;
		}
		try {
			isLoading = true;
			let privkey;
			if (lockPubs.length) {
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
								class={$keysStore.find((ks) => ks.publicKey === lockPubs[0])
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
			<Button class="w-full" onclick={receive} disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="animate-spin"></LoaderCircle>
				{:else}
					<Download></Download>
				{/if}
				Receive
			</Button>
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
