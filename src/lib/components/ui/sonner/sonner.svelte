<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";

	let restProps: SonnerProps = $props();
</script>

<Sonner
	theme={$mode}
	class="toaster group"
	toastOptions={{
		classes: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
		},
	}}
	{...restProps}
/>


<!-- hack: makes it work in build -->
<style lang="postcss">
	:global([data-rich-colors='true'] [data-sonner-toast][data-type='success']) {
		background: var(--success-bg) !important;
		border: 1px solid var(--success-border) !important;
		color: var(--success-text) !important;
	}
	:global([data-theme='dark'] [data-sonner-toast][data-type='default'] [data-close-button]) {
		background: var(--normal-bg) !important;
		border: 1px solid var(--normal-border) !important;
		color: var(--normal-text) !important;
	}
	:global([data-rich-colors='true'] [data-sonner-toast][data-type='success'] [data-close-button]) {
		background: var(--success-bg) !important;
		border: 1px solid var(--success-border) !important;
		color: var(--success-text) !important;
	}
	:global(
			[data-rich-colors='true'] [data-sonner-toast][data-type='info'],
			[data-rich-colors='true'] [data-sonner-toast][data-type='info'] [data-close-button]
		) {
		background: var(--info-bg) !important;
		border: 1px solid var(--info-border) !important;
		color: var(--info-text) !important;
	}
	:global(
			[data-rich-colors='true'] [data-sonner-toast][data-type='warning'],
			[data-rich-colors='true'] [data-sonner-toast][data-type='warning'] [data-close-button]
		) {
		background: var(--warning-bg) !important;
		border: 1px solid var(--warning-border) !important;
		color: var(--warning-text) !important;
	}
	:global(
			[data-rich-colors='true'] [data-sonner-toast][data-type='error'],
			[data-rich-colors='true'] [data-sonner-toast][data-type='error'] [data-close-button]
		) {
		background: var(--error-bg) !important;
		border: 1px solid var(--error-border) !important;
		color: var(--error-text) !important;
	}
</style>