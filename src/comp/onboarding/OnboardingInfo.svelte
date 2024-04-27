<script lang="ts">
	export let step;
	const go = () => {
		step = 'select';
	};
</script>

<img src="/nutstash_app.svg" alt="" class="mt-20" />

<h1 class="font-bold text-xl">Welcome to Nutstash!</h1>
<p class="flex gap-1 items-center text-warning opacity-30">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-5 h-5"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
		/>
	</svg>
	Nutstash is still in beta development. Please use at own risk.
</p>
<p class=" mx-4 p-5 rounded-lg bg-base-200 mt-4 flex gap-2 items-center px-8 w-full max-w-4xl">
	<span>
		Nutstash is a cashu ecash wallet that uses the Cashu protocol.
	</span>
</p>
<p class=" mx-4 p-5 rounded-lg bg-base-200 mt-4 flex gap-2 items-center px-8 w-full max-w-4xl">
	<span>
		Ecash works without accounts. Cashu tokens are bearer assets, that are stored locally on your
		nutstash wallet.
	</span>
</p>
<p class=" mx-4 p-5 rounded-lg bg-base-200 mt-4 flex gap-2 items-center px-8 w-full max-w-4xl">
	<span>
		Nutstash is <b> not </b> the custodian. The custodian of your sats are the mints you choose to connect
		to.
	</span>
</p>
<p class=" mx-4 p-5 rounded-lg bg-base-200 mt-4 flex gap-2 items-center px-8 w-full max-w-4xl">
	<span>
		for more information, please visit nutstashs <a
			href="https://nutstash.app/#faq"
			target="_blank"
			rel="noopener noreferrer"
			class="link link-primary">FAQs</a
		>
	</span>
</p>
<button class="btn btn-primary w-full max-w-4xl mt-8" on:click={go}> OK, let's go </button>
