<script lang="ts">
	import { onMount } from 'svelte';
	import { mints } from '../../stores/mints';
	import { unit } from '../../stores/settings';
	import { token } from '../../stores/tokens';
	import { formatAmount, getAmountForTokenSet, getTokensForMint } from '../util/walletUtils';
	import MintSelector from './MintSelector.svelte';
	import { useNostr } from '../../stores/nostr';
	import { receive, send, sendViaNostr } from '../../actions/walletActions';
	import { toast } from '../../stores/toasts';

	export let dialog: HTMLDialogElement;
	let mint = $mints[0];
	let amount =getAmountForTokenSet(getTokensForMint(mint,$token))<100?getAmountForTokenSet(getTokensForMint(mint,$token)):100;
	let inputField: HTMLInputElement

	let walletDevNostrKey = 'c4b5369a9db27a2e1bc97b25faa4862d9fcfa747506b1f272f8f4b36b812dbd6'

	let donationName = 'Anon'

	let message = ''

	let isLoading= false

	onMount(()=> {
		dialog.addEventListener('open', ()=> {
			inputField.focus()
		})
	})
	const donate =async () => {
		let turnOffNostrAfter = false
		if (!$useNostr) {
			useNostr.set(true)
			turnOffNostrAfter = true
		}
		try {
			isLoading = true 
			
			const encodedToken = await send(mint,amount, getTokensForMint(mint, $token), `From ${donationName}: ${message}`, undefined, '02'+walletDevNostrKey)
			await sendViaNostr(walletDevNostrKey,encodedToken)
			toast('secondary','Thank you for supporting nutstash',`${formatAmount(amount, $unit)} donated!`)
			dialog.close()
		} catch (error) {
			toast('error','Error occurred when sending',`Could not donate!`)
		}finally
		{
			isLoading = false
		}
	}
</script>

<dialog bind:this={dialog} class="modal">
	<div class="modal-box flex flex-col gap-3">
		<h3 class="font-bold text-lg">Donate to the wallet devs!</h3>
		<p class="py-4">
			Donations from the community are greatly appreciated and help us keep open source projects
			like <a href="https://nutstash.app" target="_blank" rel="noopener noreferrer" class="link link-secondary">Nutstash</a> and <a href="https://cashu.space" target="_blank" rel="noopener noreferrer" class="link link-secondary">Cashu</a> thriving. <span class="font-bold">We're counting on you, anon!</span>
		</p>
		<div class="flex gap-2 justify-center">
			<MintSelector bind:mint></MintSelector>
			<div class="flex flex-col justify-center">
				<div>
					<p class="flex gap-1 text-sm items-center">
						<span>
							{formatAmount(getAmountForTokenSet(getTokensForMint(mint, $token)) ?? 0, $unit)}
						</span>
						<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-4 h-4 text-warning"
							>
								<path
									d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z"
								/>
								<path
									d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z"
								/>
								<path
									d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z"
								/>
								<path
									d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z"
								/>
							</svg>
						</span>
					</p>
				</div>
				<div class="text-center text-sm text-neutral">
					Available
				</div>
			</div>
		</div>
		<div class="flex flex-wrap gap-3 pt-2 w-full justify-center">
			<button
				class="rounded-full border-warning p-1 px-3 text-sm border"
				class:bg-warning={amount === 100}
				class:text-warning-content={amount === 100}
				on:click={() => (amount = 100)}
			>
				🔆 100
			</button>
			<button
				class="rounded-full border-warning p-1 px-3 text-sm border"
				class:bg-warning={amount === 2100}
				class:text-warning-content={amount === 2100}
				on:click={() => (amount = 2100)}
			>
				⚡ 2 100
			</button>
			<button
				class="rounded-full border-warning p-1 px-3 text-sm border"
				class:bg-warning={amount === 5000}
				class:text-warning-content={amount === 5000}
				on:click={() => (amount = 5000)}
			>
				🧡 5 000
			</button>
			<button
				class="rounded-full border-warning p-1 px-3 text-sm border"
				class:bg-warning={amount === 21000}
				class:text-warning-content={amount === 21000}
				on:click={() => (amount = 21000)}
			>
				🤩 21 000
			</button>
		</div>
		<div class="flex justify-center">
			<input
			bind:this={inputField}
				tabindex="0"
				type="text"
				placeholder="custom"
				class="input input-sm input-warning rounded-full border-warning p-1 px-3 text-sm border bg-base-300 max-w-32 outline-warning outline-offset-1"
				bind:value={amount}
			/>
		</div>
		<div class="flex flex-col gap-2 justify-center py-3 w-full items-center">
			<div class="join">
				<button class="w-32 btn btn-xs join-item btn-disabled">
					From
				</button>
				<input
				type="text"
				placeholder="custom"
				class="w-52 input join-item input-xs input-warning rounded-full border-warning p-1 px-3 text-sm border bg-base-300 outline-warning outline-offset-1"
				bind:value={donationName}
				/>
			</div>
			<div class="join">
				<button class="w-32 btn-xs btn btn-disabled join-item">
					Message
				</button>
				<input
				type="text"
				placeholder="Message..."
				class="w-52 input join-item input-xs input-warning rounded-full border-warning p-1 px-3 text-sm border bg-base-300 outline-warning outline-offset-1"
				bind:value={message}
				/>
			</div>
		</div>
		<div class="modal-action">
			<form method="dialog" class="items-end flex gap-2">
				<button class="btn">Close</button>
				<button class="btn {amount>getAmountForTokenSet(getTokensForMint(mint, $token))||isLoading?'btn-disabled':'btn-secondary'}" on:click|preventDefault={donate}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-6 h-6"
					>
						<path
							d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
						/>
					</svg>
					{#if isLoading}
					<div class="loading">

					</div>
					{:else}
					Donate {formatAmount(amount, $unit)}
					{/if}
				</button>
			</form>
		</div>
	</div>
</dialog>
