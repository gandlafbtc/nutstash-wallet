<script lang="ts">
	import { token } from '../../stores/tokens';
	import type { Mint } from '../../model/mint';
	import { pendingTokens } from '../../stores/pendingtokens';
	import TokenRow from './TokenRow.svelte';
	import type { Proof } from '@cashu/cashu-ts';
	import { onMount } from 'svelte';
	export let mint: Mint | undefined = undefined;
	export let selectedTokens: Proof[] = [];

	$: selectedTokensBool = [];

	$: isPending = mint ? false : true;

	$: page = 20;
	$: tokenSelection = isPending ? $pendingTokens : $token;
	$: tokenFromMint = mint
		? tokenSelection.filter((t: Proof) => mint?.keysets.map((k) => k.id).includes(t.id))
		: tokenSelection;
	$: tokenSub = tokenFromMint.slice(0, page);
	$: selectedTokens = tokenSub.filter((t, i) => selectedTokensBool[i]);

	const loadMore = () => {
		page += 20;
	};

	onMount(() => {});
</script>

<div class="overflow-y-scroll scrollbar-hide max-h-56 w-full">
	<table class="table table-compact table-zebra">
		<thead>
			<tr>
				<th>
					<div class="flex justify-start items-center gap-1">
						{#if !mint}
							<p class="">Pending</p>
							<input
								type="checkbox"
								bind:checked={isPending}
								class="{mint ? 'disabled hidden' : ''} checkbox checkbox-primary"
							/>
						{/if}
					</div>
				</th>

				<th>
					<p class="hidden lg:flex">Amount</p>
					<p class="flex lg:hidden">Amt</p>
				</th>
				<th class="hidden lg:block">Keyset</th>
				<th>Mint</th>
			</tr>
		</thead>
		<tbody class="max-h-1 overflow-y-scroll scrollbar-hide">
			{#each tokenSub as token, i}
				<TokenRow {isPending} {token} {i} {mint} bind:isSelected={selectedTokensBool[i]} />
			{/each}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<tr class="">
				<td colspan="2" class="cursor-pointer w-5 hover:bg-base-200" on:click={loadMore}>
					Load more
				</td>
				<td colspan="2" class="cursor-pointer hover:bg-base-200" on:click={() => (page = 999999)}>
					Load all
				</td>
			</tr>
		</tbody>
	</table>
</div>
