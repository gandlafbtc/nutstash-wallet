<script lang="ts">
	import { onMount } from "svelte";
	import type { Tweened } from "svelte/motion";

	const {
		message,
		level = "info",
		messageTitle,
		timer,
	}: {
		level?: "success" | "secondary" | "info" | "warning" | "error";
		messageTitle?: string;
		message: string;
		timer: Tweened<number>;
	} = $props();
	let element: HTMLDivElement;
</script>

<div
	class="flex flex-col rounded-t-sm gap-1 max-w-64 fade-in-element"
	class:bg-green-500={level === "success"}
	class:text-green-900={level === "success"}
	class:bg-pink-500={level === "secondary"}
	class:text-pink-900={level === "secondary"}
	class:bg-sky-500={level === "info"}
	class:text-sky-900={level === "info"}
	class:bg-yellow-500={level === "warning"}
	class:text-yellow-900={level === "warning"}
	class:bg-red-500={level === "error"}
	class:text-red-900={level === "error"}
	bind:this={element}
>
	<div class="flex w-full justify-between">
		<div class="flex mt-1 gap-1 items-center justify-center flex-col">
			<button
				class="btn btn-ghost btn-circle btn-xs"
				on:click={() => element.remove()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-4 h-4"
				>
					<path
						fill-rule="evenodd"
						d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
		<div class="flex flex-col gap-1 m-1 w-full h-full flex-grow">
			<div class="break-words font-bold text-sm max-w-64">
				{messageTitle}
			</div>
			<div
				class="inline-block h-auto break-all text-xs w-64 leading-tight"
				style="overflow-wrap: break-all;"
			>
				<span class="min-w-0 max-w-64 flex overflow-clip">
					{message}
				</span>
			</div>
		</div>
	</div>
	<div class="w-full bg-gray-50 h-0.5 bg-opacity-30">
		<div
			style="width: {$timer}%;"
			class="h-0.5 bg-gray-50 bg-opacity-60"
		></div>
	</div>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translate(0, 20px);
		}
		60% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		
		to {
			opacity: .7;
			transform: translate(0, 0);
		}
	}

	.fade-in-element {
		opacity: .7;
		animation: fadeIn .5s ease-in-out;
	}

	:hover.fade-in-element {
		opacity: 1;
	}

</style>
