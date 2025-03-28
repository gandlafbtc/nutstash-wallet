<script>
	import Label from '$lib/components/ui/label/label.svelte';
	import { dark_mode, t_display, t_language, t_theme } from '$lib/paraglide/messages';
	import LanguageSwitcher from '../ui/LanguageSwitcher.svelte';
	import DarkModeSetting from './DarkModeSetting.svelte';
	import HideBalanceSetting from './settingsElements/HideBalanceSetting.svelte';
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-col gap-1">
		<p class="font-bold">{t_theme()}</p>
		<div class="flex items-center justify-between">
			<Label>{dark_mode()}</Label>
			<DarkModeSetting></DarkModeSetting>
		</div>
	</div>
	<div class="flex items-center justify-between gap-1">
		<p class="font-bold">{t_language()}</p>
		<div class="flex items-center justify-between">
			<LanguageSwitcher></LanguageSwitcher>
		</div>
	</div>
	<div class="flex flex-col gap-1">
		<p class="font-bold">{t_display()}</p>
		<div class="flex items-center justify-between">
			<HideBalanceSetting></HideBalanceSetting>
		</div>
	</div>
</div>
