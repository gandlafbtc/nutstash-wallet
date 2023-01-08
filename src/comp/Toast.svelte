<script lang="ts">
	export let level: string;
	export let messageTitle: string;
	export let message: string;
</script>

<div class="alert alert-{level}">
	<div>
		<span class="font-bold">{messageTitle}</span>
	</div>
	<div>
		<span>{message}</span>
	</div>
</div>

<div class="hidden alert-success"></div>
<div class="hidden alert-info"></div>
<div class="hidden alert-warning"></div>
<div class="hidden alert-error"></div>
