<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { nwcKeysStore } from '$lib/stores/persistent/nwcConnections';
	import { nwc } from '$lib/stores/session/nwc';
	import { Copy, LoaderCircle, Pen, Trash } from 'lucide-svelte';
	import QrCode from '../ui/QRCode.svelte';
	import { copyTextToClipboard } from '$lib/util/utils';
	import { formatAmount } from '$lib/util/walletUtils';
	import { toast } from 'svelte-sonner';
	import type { NWCConnection } from '$lib/db/models/types';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import { ensureError } from '$lib/helpers/errors';

	let isShow = $state(false);
	let isOpen = $state(false);
	let isOpenAllowance = $state(false);
	let isSwitching = $state(false);

	let inputAllowance = $state('');

	const switchActive = async (conn: NWCConnection) => {
		try {
			isSwitching = true;
			await nwcKeysStore.addOrUpdate(conn.walletPublicKey, conn, 'walletPublicKey');
			if (conn.isActive) {
				await nwc.generateNWCConnection();
				await nwc.listenToNWCCommands();
				toast.success('NWC is ready');
			} else {
				await nwc.unsubscribeNWC();
				toast.info('NWC connection was turned off');
			}
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isSwitching = false;
		}
	};
	const removeConnection = async (conn: NWCConnection) => {
		try {
			isSwitching = true;
			await nwc.unsubscribeNWC();
			await nwcKeysStore.remove(conn.walletPublicKey, 'walletPublicKey');
			toast.info('NWC connection removed');
			isOpen = false;
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isSwitching = false;
		}
	};

	const updateConnection = async (conn: NWCConnection) => {
		try {
			isSwitching = true;
			const connection = { ...conn };
			const allowanceInt = parseInt(inputAllowance);
			if (isNaN(allowanceInt)) {
				toast.warning('Allowance Must be a number');
				return;
			}
			connection.allowanceLeft = allowanceInt;
			await nwcKeysStore.addOrUpdate(connection.walletPublicKey, connection, 'walletPublicKey');
			isOpenAllowance = false;
			toast.info('Allowance updated to ' + formatAmount(allowanceInt));
			inputAllowance = '';
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
		} finally {
			isSwitching = false;
		}
	};
</script>

<div class="flex h-full w-80 flex-col gap-2">
	<Button onclick={nwc.generateNWCConnection} disabled={$nwcKeysStore.length ? true : false}>
		{#if $nwcKeysStore.length}
			Max connections reached (1)
		{:else}
			Create NWC connection
		{/if}
	</Button>

	{#if $nwcKeysStore.length}
		<div class="mt-6 flex flex-col">
			<p>Connections</p>
			{#each $nwcKeysStore as conn}
				{@const connectionString = nwc.getConnectionString(conn)}
				<div class="my-2 flex flex-col gap-4 rounded-lg border p-4">
					<button onclick={() => (isShow = !isShow)}>
						<div class:blur-sm={!isShow}>
							<QrCode data={connectionString} QRsize="medium"></QrCode>
						</div>
					</button>
					<button
						onclick={() => copyTextToClipboard(connectionString)}
						class="flex items-center gap-1 overflow-clip text-ellipsis text-nowrap opacity-50"
					>
						<div>
							<Copy class="h-4 w-4"></Copy>
						</div>
						<div>
							<p class="overflow-clip text-ellipsis text-nowrap text-sm">
								{connectionString}
							</p>
						</div>
					</button>
					<p class="flex flex-col justify-center gap-1">
						<span class="">Allowance </span>
						<span class="flex gap-1">
							<Badge variant="outline">
								{formatAmount(conn.allowanceLeft)}
							</Badge>
							<button class="flex items-center underline" onclick={() => (isOpenAllowance = true)}>
								<Pen class="w-4"></Pen>
								change
							</button>
						</span>
					</p>
					<div class="flex justify-between gap-2">
						<div class="flex gap-2">
							<Switch bind:checked={conn.isActive} onclick={() => switchActive(conn)}></Switch>
							{#if isSwitching}
								<LoaderCircle class="animate-spin"></LoaderCircle>
							{:else if conn.isActive}
								<p class="text-green-500">Connected</p>
							{:else}
								<p class="text-destructive">Disconnected</p>
							{/if}
						</div>
						<button onclick={() => (isOpen = !isOpen)}>
							<Trash class="text-destructive"></Trash>
						</button>
					</div>
				</div>
				<Dialog.Root bind:open={isOpen}>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title
								>Are you sure you want to disconnect and remove this connection?</Dialog.Title
							>
							<Dialog.Description>
								Services connected will no longer be able to access this wallet.
							</Dialog.Description>
						</Dialog.Header>

						<Dialog.Footer>
							<Button
								variant="outline"
								onclick={() => {
									isOpen = false;
								}}
							>
								Cancel
							</Button>
							<Button variant="destructive" onclick={() => removeConnection(conn)}>Remove</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
				<Dialog.Root bind:open={isOpenAllowance}>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Set an allowance amount</Dialog.Title>
							<Dialog.Description>
								This connection will be able to access funds from your wallet, up to the amount set
								as the allowance.
							</Dialog.Description>
						</Dialog.Header>
						<Input
							placeholder="Allowance amount"
							type="number"
							bind:value={inputAllowance}
							onkeypress={(e: KeyboardEvent) => {
								if (e.key === 'Enter') {
									updateConnection(conn);
								}
							}}
						/>

						<Dialog.Footer>
							<Button
								variant="outline"
								onclick={() => {
									isOpenAllowance = false;
								}}
							>
								Cancel
							</Button>
							<Button onclick={() => updateConnection(conn)}>Confirm</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			{/each}
		</div>
	{/if}
</div>
