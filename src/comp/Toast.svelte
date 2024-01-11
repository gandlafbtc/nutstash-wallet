<script lang="ts">
	export let level: string;
	export let messageTitle: string;
	export let message: string;
</script>

	<div class="alert alert-{level} flex flex-col gap-1">
		<div>
			<span class="font-bold">{messageTitle}</span>
		</div>
		<div>
			<span>{message}</span>
		</div>
	</div>

<div class="hidden alert-success" />
<div class="hidden alert-info" />
<div class="hidden alert-warning" />
<div class="hidden alert-error" />
