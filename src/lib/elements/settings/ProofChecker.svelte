<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import {
		check_ecash_proofs,
		check_if_ecash_has_been_claimed,
		t_active,
		t_pending,
		unclaimed_ecash_will_be_added_back,
		warning_you_should_only_check_active_proofs_when
	} from '$lib/paraglide/messages';
	import { pendingProofsStore, proofsStore } from '$lib/stores/persistent/proofs';
	import CheckProofSelector from './CheckProofSelector.svelte';
</script>

<div class="flex flex-col items-start gap-3">
	<p class="text-lg font-bold">{check_ecash_proofs()}</p>
	<Tabs.Root value="pending" class="w-[400px]">
		<Tabs.List>
			<Tabs.Trigger value="pending">{t_pending()}</Tabs.Trigger>
			<Tabs.Trigger value="active">{t_active()}</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="pending">
			<div class="flex flex-col gap-3">
				<p class="">
					{check_if_ecash_has_been_claimed()}
					{unclaimed_ecash_will_be_added_back()}
				</p>
				<CheckProofSelector proofs={$pendingProofsStore} type="pending"></CheckProofSelector>
			</div>
		</Tabs.Content>
		<Tabs.Content value="active">
			<div class="flex flex-col gap-3">
				<p class="text-yellow-400">
					{warning_you_should_only_check_active_proofs_when()}
				</p>
				<CheckProofSelector proofs={$proofsStore} type="active"></CheckProofSelector>
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>

<style>
</style>
