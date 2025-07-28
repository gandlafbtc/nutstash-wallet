<script lang="ts">
	import AmountInput from '$lib/elements/ui/AmountInput.svelte';
	import MintSelector from '$lib/elements/ui/MintSelector.svelte';
	import NumericKeys from '$lib/elements/ui/NumericKeys.svelte';
	import UnitSelector from '$lib/elements/ui/UnitSelector.svelte';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { mintsStore, proofsStore, selectedMint, unit } from '@gandlaf21/cashu-wallet-engine/stores';
	import {
		checkValidPubkey,
		formatAmount,
		getAmountForTokenSet,
		getAproxAmount,
		getProofsOfMintUnit,
		getUnitsForMints
	} from '@gandlaf21/cashu-wallet-engine/util';
	import { ArrowRight, Wallet, Banknote, WifiOff, ScanIcon, LoaderCircle, Lock, Contact } from 'lucide-svelte';

	import { toast } from 'svelte-sonner';
	import {
		amount_too_small,
		invalid_pubkey,
		not_enough_funds,
		npub_or_pubkey,
		t_lock,
	} from '$lib/paraglide/messages';
	import { nip19 } from 'nostr-tools';
	import { ensureError, sendEcash, types } from '@gandlaf21/cashu-wallet-engine';
	import { push } from 'svelte-spa-router';
	import Input from '$lib/components/ui/input/input.svelte';
	import SimpleScanner from '../scanner/simple_scanner/SimpleScanner.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import * as Dialog  from '$lib/components/ui/dialog';
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import CoinSelector from '$lib/elements/ui/CoinSelector.svelte';
	import * as Command from '$lib/components/ui/command';
	import ContactSearch from '$lib/elements/contacts/ContactSearch.svelte';
	let entered = $state('');
	let amount: number | undefined = $state();
	let isLoading = $state(false);
	let scanPubKey = $state(false);

	let contactOpen = $state(false);
	let selectedContact: types.Contact | undefined = $state(undefined);

	$effect(() => {
		if (selectedContact) {
			tokenOptions.pubkey = selectedContact.npub;
			contactOpen = false
		}
	});
	let mint: types.Mint = $state($selectedMint !== -1 ? $mintsStore[$selectedMint] : $mintsStore[0]);


	let currentTab = $state('amount');

	let tokenOptions = $state({
		p2pk: false,
		pubkey: '',
		isOffline: false,
		isValidPubkey: false,
		customIn: false,
		customOut: false,
		includeReceiverFees: false
	});

	const getCurrentUnit = () => {
		if (!mint) {
			return 'sat';
		}
		return getUnitsForMints([mint]).find((u) => u === $unit) ? $unit : 'sat';
	};
	let currentUnit: string = $state(getCurrentUnit());

	const onKeypadPress = (value: string) => {
		if (value === 'delete') {
			entered = entered.slice(0, -1);
		} else if (value === 'clear') {
			entered = '';
		} else {
			entered = entered + value;
		}
		try {
			const newAmount = parseInt(entered);
			amount = Number.isNaN(newAmount) ? 0 : newAmount;
		} catch (error) {
			amount = 0;
		}
	};

	// Calculate available balance
	let availableBalance = $derived(
		getAmountForTokenSet(getProofsOfMintUnit(mint, $proofsStore, currentUnit))
	);

	// Check if amount exceeds available balance
	let insufficientFunds = $derived(amount !== undefined && amount > availableBalance);

	const sendCashu = async () => {
		try {
			if (!mint) {
				toast.warning('No mint selected');
				return;
			}
			isLoading = true;
			if (!amount) {
				toast(amount_too_small());
				return;
			}
			if (amount > availableBalance) {
				toast.warning(not_enough_funds());
				return;
			}
			const sendOptions: {
				unit: string;
				includeFees: boolean;
				pubkey?: string;
				isOffline?: boolean;
			} = {
				unit: currentUnit,
				includeFees: tokenOptions.includeReceiverFees,
				isOffline: tokenOptions.isOffline
			};
			if (tokenOptions.p2pk) {
				if (tokenOptions.pubkey.startsWith('npub')) {
					tokenOptions.pubkey = ('02' + nip19.decode(tokenOptions.pubkey).data) as string;
				}
				if (!checkValidPubkey(tokenOptions.pubkey)) {
					toast.warning(invalid_pubkey());
					return;
				}
				sendOptions.pubkey = tokenOptions.pubkey;
			}
			console.log(sendOptions)
			const { txId } = await sendEcash(mint.url, amount ?? 0, sendOptions);
			
			push('/wallet/send/cashu/' + txId);
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isLoading = false;
		}
	};
	let unitProofs: types.Proof[] = $derived(getProofsOfMintUnit(mint, $proofsStore, currentUnit));

	let selectedProofs: types.Proof[] = $derived(
		getAproxAmount(amount ?? 0, unitProofs, tokenOptions.includeReceiverFees) ?? []
	);
	let selectedCoins = $state([])

	$effect(() => {
		if (currentTab === "coins") {
			amount = getAmountForTokenSet(selectedCoins)		
		}
	})
</script>


<svelte:body onkeydown={(e)=> {
	if (contactOpen) {
		return
	}
	if (e.key === 'Backspace') {
		onKeypadPress('delete');
    }
    else if (e.key === 'Enter') {
		if (!amount || amount === 0 || insufficientFunds || isLoading) {
			return;
        }
        sendCashu();
    }
    else if (e.key >= '0' && e.key <= '9') {
		onKeypadPress(e.key);
    }
}
} />

<div class="flex w-80 flex-col gap-2 xl:w-[600px] max-h-[30%] overflow-y-scroll">
	<!-- Header -->
	<div class="flex items-center gap-2 justify-between">
		<div class="flex items-center gap-2 w-full">
			<Banknote class="h-5 w-5 text-purple-500" />
			<h2 class="text-xl font-bold w-full">Send Ecash</h2>
			
		</div>
		<Tabs.Root bind:value={currentTab}>
			<Tabs.List>
			  <Tabs.Trigger value="amount">Amount</Tabs.Trigger>
			  <Tabs.Trigger value="coins">Coins</Tabs.Trigger>
			</Tabs.List>
		  </Tabs.Root>
	</div>

	<Card.Root class="overflow-hidden border shadow-sm ">
		<!-- Amount Section -->
		<Card.Header class="p-3">
			<div class=" font-bold">
				<AmountInput bind:amount {currentUnit} />
			</div>
		</Card.Header>

		<!-- Source Section -->
		<Card.Content class="border-t p-3">
			<div class="space-y-2">
				<div class="flex items-center gap-1.5">
					<Wallet class="h-4 w-4 text-blue-500" />
					<div
					class="flex items-center justify-between rounded-md p-1 {insufficientFunds
						? 'bg-destructive/10'
						: 'bg-muted/30'}"
				>
					<span class="font-medium {insufficientFunds ? 'text-destructive' : ''}">
						{formatAmount(availableBalance, currentUnit)}
					</span>
				</div>
				</div>

				<div class="flex items-center gap-2">
					<div class="flex-1">
						<MintSelector bind:mint />
					</div>
					<UnitSelector bind:currentUnit selectedMints={[mint]} />
				</div>
			</div>
		</Card.Content>

		<Card.Content class="border-t flex flex-col gap-2 p-3">
			{#if mint.info.nuts[10]?.supported}
			<div class="flex justify-between items-center w-full">
				<div class="flex gap-1">
					<Label for="p2pk" class="flex items-center gap-1">
						<Lock ></Lock>{t_lock()}
					</Label>
					{#if tokenOptions.p2pk}
						<button class="flex gap-1 items-center text-xs p-0.5 rounded-md border text-blue-500 border-blue-500 opacity-85 hover:opacity-100 transition-opacity" onclick={()=> {contactOpen=true}}>
							<Contact class='h-3'>
							</Contact>
							Address book
						</button>
					{/if}
				</div>
				<Switch bind:checked={tokenOptions.p2pk}  id="p2pk" />
			</div>		
			{/if}
			{#if tokenOptions.p2pk}
				 <div class="relative">
					<button class="absolute right-2 top-2" onclick={()=>scanPubKey=true}>
						<ScanIcon></ScanIcon>
					</button>
					 <Input
					 placeholder={npub_or_pubkey()}
					 bind:value={tokenOptions.pubkey}
					 oninput={() => (tokenOptions.isValidPubkey = checkValidPubkey(tokenOptions.pubkey))}
					 />
					</div>
			{/if}
		</Card.Content>
		<Card.Content class="border-t flex flex-col gap-2 p-3">

		{#if mint.info.nuts[12]?.supported}
		<div class="flex justify-between items-center w-full">
			<Label for="p2pk" class="flex items-center gap-1">
				<WifiOff ></WifiOff>
				Offline Validation
			</Label>
			<Switch bind:checked={tokenOptions.isOffline}  id="p2pk" />
		</div>		
		{/if}
	</Card.Content>

		<!-- Footer -->
		<Card.Footer class="flex justify-between border-t bg-muted/10 p-3">
				<div class="flex gap-2">
					<!-- {#each selectedProofs as proof}
					<div class="text-[10px] p-[1px] rounded-full border border-purple-500 text-purple-500 aspect-square  flex items-center justify-center">
						{proof.amount}
					</div>
					{/each} -->
				</div>

			<Button
				disabled={!amount || amount === 0 || insufficientFunds || isLoading}
				class="gap-1.5"
				onclick={sendCashu}
			>
				<span>
					{#if getAmountForTokenSet(selectedProofs)===amount && getAmountForTokenSet(selectedProofs)>0 && !tokenOptions.p2pk && !tokenOptions.isOffline}
					Send offline
				  {:else}
					Create token
				  {/if}
				</span>
				{#if isLoading}
				  <LoaderCircle class='animate-spin'></LoaderCircle>
				{:else}
				  
				<ArrowRight class="h-4 w-4" />
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>
	<div class="h-72">
		<!--  -->
	</div>
	<div class="fixed  bottom-5 h-64 w-80 xl:w-[600px]">
		{#if currentTab==='amount'}
			<NumericKeys onkeypressed={onKeypadPress}></NumericKeys>
		{:else}
		  	<CoinSelector {mint} unit={currentUnit} bind:selectedProofs={selectedCoins} ></CoinSelector>
		{/if}
	</div>
</div>

<Dialog.Root bind:open={scanPubKey}>
	<Dialog.Content>
		{#if scanPubKey}
		<SimpleScanner bind:isScanning={scanPubKey} bind:scannedResult={tokenOptions.pubkey}
		></SimpleScanner>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<Command.Dialog bind:open={contactOpen}>
	<ContactSearch bind:selectedContact={selectedContact}></ContactSearch>
</Command.Dialog>