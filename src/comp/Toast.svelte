<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';

	export let level: string;
	export let messageTitle: string;
	export let message: string;

	const countdown = tweened(100);

	let closed = false

	onMount(() => countdown.set(0, { duration: 8000 }));


</script>

<div class="{closed?'hidden':''} relative">
	<button class="btn btn-ghost btn-circle btn-xs fixed mt-1" on:click={()=> closed = true}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
			<path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
		  </svg>				  
	</button>
	<div class="flex flex-col rounded-sm gap-1 min-w-60"
	class:bg-success={level==='success'}
	class:text-success-content={level==='success'}
	class:bg-info={level==='info'}
	class:text-info-content={level==='info'}
	class:bg-warning={level==='warning'}
	class:text-warning-content={level==='warning'}
	class:bg-error={level==='error'}
	class:text-error-content={level==='error'}>
		<div class="flex flex-col gap-1 m-1 ml-6">
			<div>
				<span class="font-bold text-sm">{messageTitle}</span>
			</div>
			<div>
				<span class="text-xs">{message}</span>
			</div>
		</div>
		<div class="w-full bg-neutral-content h-1 bg-opacity-50">
			<div style="width: {$countdown}%;" class="h-1 bg-neutral-content">
			</div>
		</div>
	</div>

	</div>