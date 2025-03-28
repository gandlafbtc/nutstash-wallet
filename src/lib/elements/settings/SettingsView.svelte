<script>
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import * as Accordion from '$lib/components/ui/accordion/';
	import { Banknote, Bitcoin, Settings, Shield, ShieldCheckIcon, Skull } from 'lucide-svelte';
	import GeneralSettings from './GeneralSettings.svelte';
	import DeleteStuff from '../dangerzone/DeleteStuff.svelte';
	import ManipulateCounters from '../dangerzone/ManipulateCounters.svelte';
	import BackupSettings from './BackupSettings.svelte';
	import SecuritySettings from './SecuritySettings.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import CurrencySettings from './CurrencySettings.svelte';
	import EcashSettings from './EcashSettings.svelte';
	import { backup_and_security, cashu_tokens, currencies_units, danger_zone, delete_wallet, general_settings, manipulate_counters, t_encryption } from '$lib/paraglide/messages';
</script>

<div class="flex w-80 flex-col gap-2 xl:w-[600px]">
	<Accordion.Root type="single">
		<Accordion.Item value="item-1">
			<Accordion.Trigger
				><span class="flex gap-2"><Settings></Settings>{general_settings()}</span></Accordion.Trigger
			>
			<Accordion.Content>
				<GeneralSettings></GeneralSettings>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger
				><span class="flex gap-2"><ShieldCheckIcon></ShieldCheckIcon>{backup_and_security()}</span
				></Accordion.Trigger
			>
			<Accordion.Content>
				<div class="flex flex-col gap-10">
					<div class="flex flex-col gap-4">
						<p class="font-bold">{t_encryption()}</p>
						<SecuritySettings></SecuritySettings>
					</div>
					<div class="flex flex-col gap-4">
						<p class="font-bold">{backup_and_security()}</p>
						<BackupSettings></BackupSettings>
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-3">
			<Accordion.Trigger
				><span class="flex gap-2"><Bitcoin></Bitcoin>{currencies_units()}</span></Accordion.Trigger
			>
			<Accordion.Content>
				<CurrencySettings></CurrencySettings>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-4">
			<Accordion.Trigger
				><span class="flex gap-2"><Banknote></Banknote>{cashu_tokens()}</span></Accordion.Trigger
			>
			<Accordion.Content>
				<EcashSettings></EcashSettings>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-99">
			<Accordion.Trigger
				><span class="flex gap-2 text-destructive"><Skull></Skull>{danger_zone()}</span
				></Accordion.Trigger
			>
			<Accordion.Content>
				<div class="flex flex-col gap-5">
					<div class="flex flex-col gap-2">
						<p class="font-bold">{manipulate_counters()}</p>
						<ManipulateCounters></ManipulateCounters>
					</div>
					<div class="flex flex-col gap-2">
						<p class="font-bold">{delete_wallet()}</p>
						<DeleteStuff></DeleteStuff>
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</div>
