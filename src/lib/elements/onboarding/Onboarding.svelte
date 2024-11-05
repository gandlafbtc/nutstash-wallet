<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {SquareArrowOutUpRight} from "lucide-svelte"
</script>

<div class="flex flex-col gap-5 items-center justify-center p-3 h-full">
	<img src="/nutstash_app.svg" alt="" class="w-32 " />

	<h1 class="font-bold text-xl">Welcome to Nutstash!</h1>
	<p class="flex gap-1 items-center text-yellow-500 opacity-80">
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
	<p>
		<span>
			Nutstash is a cashu ecash wallet that uses the Cashu protocol.
		</span>
	</p>
	<p>
		<span>
			Ecash works without accounts. Cashu tokens are bearer assets, that
			are stored locally on your nutstash wallet.
		</span>
	</p>
	<p>
		<span>
			Nutstash is <b> not </b> the custodian. The custodian of your sats are
			the mints you choose to connect to.
		</span>
	</p>
	<p
	>
		<span>
			for more information, please visit nutstashs <span>
				<a
					href="https://nutstash.app/#faq"
					target="_blank"
					rel="nofollow noreferrer noopener"
					class="font-bold hover:underline inline-flex gap-1"
				>FAQs 
			
			<SquareArrowOutUpRight class="w-5 h-5"></SquareArrowOutUpRight> </a>.
			</span>
		</span>
	</p>

	<Button href="/#/onboarding/pass">OK</Button>
</div>
