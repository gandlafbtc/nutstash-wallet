<script lang="ts">
	import { Bitcoin, Copy, Heart, LoaderCircle, Plus, X, Zap } from 'lucide-svelte';
	import MintSelector from '../ui/MintSelector.svelte';
	import { mints } from '$lib/stores/persistent/mints';
	import { unit } from '$lib/stores/persistent/settings';
	import UnitSelector from '../ui/UnitSelector.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { formatAmount, getAmountForTokenSet, getProofsOfMintUnit } from '$lib/util/walletUtils';
	import { proofsStore } from '$lib/stores/persistent/proofs';
	import { Button } from '$lib/components/ui/button';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { toast } from 'svelte-sonner';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { sendEcash } from '$lib/actions/actions';
	import { NUTSTASH_PUBKEY } from '$lib/stores/static/const';
	import { publishEvent, sendNip17DirectMessageToNpub } from '$lib/actions/nostr';
	import { npubEncode } from 'nostr-tools/nip19';
	import { getEncodedTokenV4 } from '@cashu/cashu-ts';
	import Divider from '../ui/Divider.svelte';
	import { copyTextToClipboard } from '$lib/util/utils';
	import { ensureError } from '$lib/helpers/errors';
	import { consider_showing_appreciation, hello_dear_anon, not_enough_funds, private_donation, public_donation, t_available, t_cancel, t_confirm, thank_you_for_using_nutstash, the_donation_is_now_ready, you_are_about_to_donate, you_can_add_npubs_names_or_anything } from '$lib/paraglide/messages';

	let mint = $state($mints[0]);
	let currentUnit = $state($unit);

	let isLoading = $state(false);

	let nameToAdd = $state('');
	let namesAdded: string[] = $state([]);

	let isPublicOpen = $state(false);
	let isAnonOpen = $state(false);

	//@ts-ignore
	let donationAmount: number = $state();

	let amountAvailable = $derived(
		getAmountForTokenSet(getProofsOfMintUnit(mint, $proofsStore, currentUnit))
	);

	const openPublicDono = () => {
		if (donationAmount > amountAvailable) {
			toast.warning(not_enough_funds());
			return;
		}
		isPublicOpen = true;
	};

	const openAnonDono = () => {
		if (donationAmount > amountAvailable) {
			toast.warning(not_enough_funds());
			return;
		}
		isAnonOpen = true;
	};

	const addName = () => {
		console.log(nameToAdd);
		if (!nameToAdd || namesAdded.includes(nameToAdd)) {
			return;
		}
		namesAdded.push(nameToAdd);
		nameToAdd = '';
	};

	const donatePublic = async () => {
		try {
			isLoading = true;
			const { send } = await sendEcash(mint.url, donationAmount, {
				unit: currentUnit,
				pubkey: '02' + NUTSTASH_PUBKEY
			});
			const token = getEncodedTokenV4({
				mint: mint.url,
				proofs: send,
				unit: currentUnit,
				memo: 'Donated by ' + namesAdded.join(', ')
			});

			const donationString = `New #[0] donation 🔥 🔥 🔥! ${namesAdded.join(', ')} ${'`'}${token}${'`'}`;

			publishEvent(donationString, [['p', NUTSTASH_PUBKEY]]);
			namesAdded = [];
			isPublicOpen = false;
			toast.success(
				`Thank you for your donation of ${formatAmount(getAmountForTokenSet(send), currentUnit)}!`
			);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};

	const donateAnon = async () => {
		try {
			isLoading = true;
			const { send } = await sendEcash(mint.url, donationAmount, {
				unit: currentUnit,
				pubkey: '02' + NUTSTASH_PUBKEY
			});
			sendNip17DirectMessageToNpub(
				npubEncode(NUTSTASH_PUBKEY),
				getEncodedTokenV4({
					mint: mint.url,
					proofs: send,
					unit: currentUnit,
					memo: 'Donated by anon'
				})
			);
			isAnonOpen = false;
			toast.success(
				`Thank you for your donation of ${formatAmount(getAmountForTokenSet(send), currentUnit)}!`
			);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};

	const emojiForAmount = (amount: number) => {
		if (amount > 1000000) {
			return '🧡';
		} else if (amount <= 50) {
			return '🥜';
		} else if (amount <= 100) {
			return '🌰';
		} else if (amount <= 250) {
			return '🔩';
		} else if (amount <= 1000) {
			return '🥰';
		} else if (amount <= 5000) {
			return '😍';
		} else if (amount <= 10000) {
			return '🚀';
		} else if (amount <= 50000) {
			return '🤯';
		} else if (amount <= 100000) {
			return '👾';
		} else {
			return '❤️';
		}
	};
</script>

<div class="flex h-full w-80 flex-col gap-4 xl:w-[600px]">
	<p class="font-bold">{hello_dear_anon()}!</p>
	<span>
		{thank_you_for_using_nutstash()}, by <a
			class="font-bold underline"
			href="https://gandlaf.com"
			target="_blank"
			rel="noopener noreferrer">@gandlaf21</a
		>.
	</span>
	<span>
		{consider_showing_appreciation()}
	</span>
	<MintSelector bind:mint></MintSelector>
	<div>
		{t_available()}: {formatAmount(amountAvailable, currentUnit)}
	</div>
	<div class="flex gap-2">
		<Input type="number" pattern="\d+" placeholder="donation amount" bind:value={donationAmount} />
		<UnitSelector selectedMints={[mint]} bind:currentUnit></UnitSelector>
	</div>
	<div class="flex h-20 flex-wrap items-center justify-center gap-2">
		{#each [50, 250, 1000, 5000, 10000, 50000, 100000] as a}
			<button onclick={() => (donationAmount = a)}>
				<Badge class=" text-nowrap">
					{emojiForAmount(a)}
					{formatAmount(a, currentUnit)}
				</Badge>
			</button>
		{/each}
	</div>
	<div class="flex h-10 w-full items-center justify-center">
		{#if !(isNaN(donationAmount) || donationAmount < 1)}
			<!-- content here -->
			<Badge class="text-xl text-nutstash" variant="outline">
				{emojiForAmount(donationAmount)}
				{formatAmount(donationAmount, currentUnit)}
			</Badge>
		{/if}
	</div>
	<div class="flex gap-2">
		<Button
			variant="outline"
			disabled={isNaN(donationAmount) || donationAmount < 1}
			onclick={openPublicDono}
		>
			<Heart class="text-nutstash"></Heart>
			{public_donation()}
		</Button>
		<Button disabled={isNaN(donationAmount) || donationAmount < 1} onclick={openAnonDono}>
			<Heart class="text-nutstash"></Heart>
			{private_donation()}
		</Button>
	</div>

	<Divider text="Other ways to support"></Divider>
	<div class="flex flex-col flex-wrap gap-2">
		<div class="flex items-center gap-2">
			<a
				href="https://geyser.fund/project/nutstashapp"
				target="_blank"
				rel="nofollow noopener noreferrer"
				class="w-40 rounded-full bg-[#2dd4bf] bg-opacity-35 transition-all hover:bg-opacity-100"
			>
				<img src="/geyser.svg" alt="geyser" />
			</a>
			<button>
				<Copy
					class="h-5 w-5"
					onclick={() => copyTextToClipboard('https://geyser.fund/project/nutstashapp')}
				></Copy>
			</button>
			<p class="w-24 overflow-clip text-ellipsis text-nowrap text-xs">
				https://geyser.fund/project/nutstashapp
			</p>
		</div>
		<div class="flex items-center gap-2">
			<a
				class="flex w-40 items-center gap-1 rounded-full bg-blue-600 bg-opacity-35 p-2 transition-all hover:bg-opacity-100"
				href="bitcoin:+glisteningstruggle62"
			>
				<Bitcoin></Bitcoin>
				<p class="text-xs">PayNym</p>
			</a>
			<button>
				<Copy class="h-5 w-5" onclick={() => copyTextToClipboard('+glisteningstruggle62')}></Copy>
			</button>
			<p class="w-24 overflow-clip text-ellipsis break-all text-xs">+glisteningstruggle62</p>
		</div>
		<div class="flex items-center gap-2">
			<a
				class="flex w-40 items-center gap-1 rounded-full bg-blue-600 bg-opacity-35 p-2 transition-all hover:bg-opacity-100"
				href="bitcoin:PM8TJQQMZMvfVGsJ2bJmbtDnx2BVgcPThnF8XS9ApGvuzYDPWirVuMencyhvK8WBDTgeaLLEoGEYggTMJFwjDkW8HhfqijrYHStMiFhKfA7UYbwXqYB6"
			>
				<Bitcoin></Bitcoin>
				<p class="text-xs">Payment code</p>
			</a>
			<button>
				<Copy
					class="h-5 w-5"
					onclick={() =>
						copyTextToClipboard(
							'PM8TJQQMZMvfVGsJ2bJmbtDnx2BVgcPThnF8XS9ApGvuzYDPWirVuMencyhvK8WBDTgeaLLEoGEYggTMJFwjDkW8HhfqijrYHStMiFhKfA7UYbwXqYB6'
						)}
				></Copy>
			</button>
			<p class="w-24 overflow-clip text-ellipsis text-nowrap text-xs">
				PM8TJQQMZMvfVGsJ2bJmbtDnx2BVgcPThnF8XS9ApGvuzYDPWirVuMencyhvK8WBDTgeaLLEoGEYggTMJFwjDkW8HhfqijrYHStMiFhKfA7UYbwXqYB6
			</p>
		</div>
		<div class="flex items-center gap-2">
			<a
				class="flex w-40 items-center gap-1 rounded-full bg-orange-600 bg-opacity-35 p-2 transition-all hover:bg-opacity-100"
				href="bitcoin:bc1q8sy2kd4c907r5y05wwghldpvvnkapkn7yrvs2u"
			>
				<Bitcoin></Bitcoin>
				<p class="text-xs">Onchain address</p>
			</a>
			<button>
				<Copy
					class="h-5 w-5"
					onclick={() => copyTextToClipboard('bc1q8sy2kd4c907r5y05wwghldpvvnkapkn7yrvs2u')}
				></Copy>
			</button>
			<p class="w-24 overflow-clip text-ellipsis text-xs">
				bc1q8sy2kd4c907r5y05wwghldpvvnkapkn7yrvs2u
			</p>
		</div>
		<div class="flex items-center gap-2">
			<a
				class="flex w-40 items-center gap-1 rounded-full bg-yellow-600 bg-opacity-35 p-2 transition-all hover:bg-opacity-100"
				href="lightning:lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0q0pdmt47mvjvq77n7thpvj9m3hcppl4hu95ue953uq46ej46el9rxqsznmjm9j44w9jntmpsq9eec9002pmyjjf6w75v88dn4472zmctcdxqqvewfj3vxyqv54q4gzy7v60u27kgwnurfzpykxnwz0jr4gzg4swld8pglcv7rlulaemm665l4pmftckhj6vwq2e6l4zk8xc53rgt7dyfdd9j86pgfsgmhx67v4a64lfeqggchfm0uqqs6jz4x5lxj3f6qw7vxe4fg8s4z5"
			>
				<Zap></Zap>
				<p class="text-xs">Bolt 12</p>
			</a>
			<button>
				<Copy
					class="h-5 w-5"
					onclick={() =>
						copyTextToClipboard(
							'lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0q0pdmt47mvjvq77n7thpvj9m3hcppl4hu95ue953uq46ej46el9rxqsznmjm9j44w9jntmpsq9eec9002pmyjjf6w75v88dn4472zmctcdxqqvewfj3vxyqv54q4gzy7v60u27kgwnurfzpykxnwz0jr4gzg4swld8pglcv7rlulaemm665l4pmftckhj6vwq2e6l4zk8xc53rgt7dyfdd9j86pgfsgmhx67v4a64lfeqggchfm0uqqs6jz4x5lxj3f6qw7vxe4fg8s4z5'
						)}
				></Copy>
			</button>
			<p class="w-24 overflow-clip text-ellipsis text-xs">
				lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0q0pdmt47mvjvq77n7thpvj9m3hcppl4hu95ue953uq46ej46el9rxqsznmjm9j44w9jntmpsq9eec9002pmyjjf6w75v88dn4472zmctcdxqqvewfj3vxyqv54q4gzy7v60u27kgwnurfzpykxnwz0jr4gzg4swld8pglcv7rlulaemm665l4pmftckhj6vwq2e6l4zk8xc53rgt7dyfdd9j86pgfsgmhx67v4a64lfeqggchfm0uqqs6jz4x5lxj3f6qw7vxe4fg8s4z5
			</p>
		</div>
		<div class="flex items-center gap-2">
			<a
				class="flex w-40 items-center gap-1 rounded-full bg-yellow-600 bg-opacity-35 p-2 transition-all hover:bg-opacity-100"
				href="lightning:nutstashapp@geyser.fund"
			>
				<Zap></Zap>
				<p class="text-xs">Lightning address</p>
			</a>
			<button>
				<Copy class="h-5 w-5" onclick={() => copyTextToClipboard('nutstashapp@geyser.fund')}></Copy>
			</button>
			<p class="w-24 overflow-clip text-ellipsis text-xs">nutstashapp@geyser.fund</p>
		</div>
	</div>
</div>

<Dialog.Root bind:open={isPublicOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title
				>{you_are_about_to_donate({amount: formatAmount(donationAmount, currentUnit) })}</Dialog.Title
			>
			<Dialog.Description>
				{you_can_add_npubs_names_or_anything()}
			</Dialog.Description>
		</Dialog.Header>
		<div class="flex gap-2">
			<Input
				type="text"
				placeholder="npub1... name... email..."
				bind:value={nameToAdd}
				onkeypress={(e: KeyboardEvent) => {
					if (e.key === 'Enter') {
						addName();
					}
				}}
			/>
			<Button onclick={addName}>
				<Plus></Plus>
			</Button>
		</div>
		<div>
			<ScrollArea class="h-64">
				{#each namesAdded as name, i}
					<div class="m-3 flex w-full justify-start gap-2">
						<button class="opacity-35" onclick={() => namesAdded.splice(i, 1)}>
							<X></X>
						</button>
						<div class="w-60 overflow-clip text-ellipsis">
							{name}
						</div>
					</div>
				{/each}
			</ScrollArea>
		</div>
		<Dialog.Footer>
			<Button
				variant="outline"
				onclick={() => {
					isPublicOpen = false;
				}}
			>
				Cancel
			</Button>
			<Button onclick={donatePublic} disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="animate-spin"></LoaderCircle>
				{:else}
					<Heart class="text-nutstash"></Heart>
				{/if}
				Confirm
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={isAnonOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title
				>{you_are_about_to_donate({amount: formatAmount(donationAmount, currentUnit) })}!</Dialog.Title
			>
			<Dialog.Description>
				{the_donation_is_now_ready()}
			</Dialog.Description>
		</Dialog.Header>

		<Dialog.Footer>
			<Button
				variant="outline"
				onclick={() => {
					isAnonOpen = false;
				}}
			>
				{t_cancel()}
			</Button>
			<Button onclick={donateAnon} disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="animate-spin"></LoaderCircle>
				{:else}
					<Heart class="text-nutstash"></Heart>
				{/if}
				{t_confirm()}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
