<script lang="ts">
	import { scanresultStore } from '$lib/stores/session/transitionstores';
	import { getDecodedToken, type Token } from '@cashu/cashu-ts';
	import { params } from 'svelte-spa-router';
	import Input from '$lib/components/ui/input/input.svelte';
	import ReceiveCard from './ReceiveCard.svelte';
	import { ensureError } from '$lib/helpers/errors';
	import { toast } from 'svelte-sonner';

	let enteredToken: string = $state('');

	const getTokenFromUrlOrStore = () => {
		try {
			if ($params?.token) {
				return getDecodedToken($params.token);
			} else if (enteredToken) {
				return getDecodedToken(enteredToken);
			} else if ($scanresultStore) {
				return getDecodedToken($scanresultStore);
			} else return null;
		} catch (error) {
			const err = ensureError(error);
			console.error(err);
			toast.error(err.message);
			return null;
		}
	};

	let token: Token | null = $derived.by(getTokenFromUrlOrStore);
</script>

{#if token}
	<div class="w-80 xl:w-[600px]">
		<ReceiveCard {token}></ReceiveCard>
	</div>
{:else}
	<Input bind:value={enteredToken} placeholder="cashuA... / cashuB..."></Input>
{/if}
