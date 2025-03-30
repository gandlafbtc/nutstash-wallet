<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { LANGS, type Language } from '$lib/langs';
	import { t_language } from '$lib/paraglide/messages';
	import { locales, getLocale, setLocale, type Locale } from '$lib/paraglide/runtime.js';

	interface Props {
		language?: string;
	}
	const currentLang = getLocale();

	let { language = $bindable() }: Props = $props();
</script>

<Select.Root
	type="single"
	name="favoriteFruit"
	bind:value={language}
	onValueChange={(v) => setLocale(v as Locale)}
>
	<Select.Trigger class="w-[180px]">
		<div class="flex items-center gap-2">
			<span class="fi fi-{currentLang === 'en' ? 'us' : currentLang} h-4"></span>
			{LANGS.find((l) => l.val === currentLang)?.label ?? currentLang}
		</div>
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.GroupHeading>{t_language()}</Select.GroupHeading>
			{#each locales as lang}
				{@const label = LANGS.find((l) => l.val === lang)?.label ?? lang}
				<Select.Item value={lang} {label}>
					<div class="flex items-center gap-2">
						<span class="fi fi-{lang === 'en' ? 'us' : lang} h-4"></span>
						<span>
							{label}
						</span>
					</div>
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
