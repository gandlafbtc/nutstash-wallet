<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { SquareArrowOutUpRight } from 'lucide-svelte';
</script>

<div class="flex h-screen items-center justify-center">
	<div class="flex w-80 flex-col items-center justify-center gap-5 p-3 text-center">
		<p class="flex items-center gap-1 font-bold text-yellow-500 opacity-80">
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
					/>
				</svg>
			</span>
			Nutstash is still in beta development. Please use at own risk.
		</p>
		<img src="/nutstash_app.svg" alt="" class="w-20" />

		<h1 class="text-xl font-bold">Welcome to</h1>
		<img src="/nutstash-written.svg" alt="logo text" class="w-52" />

		<p>
			<span> Nutstash is a Cashu ecash wallet. </span>
		</p>
		<p>
			<span>
				Ecash works without accounts. Cashu tokens are bearer assets, that are stored locally on
				your nutstash wallet.
			</span>
		</p>
		<p>
			<span>
				Nutstash is <b> not </b> the custodian. The custodian of your sats are the mints you choose to
				connect to.
			</span>
		</p>
		<p>
			<span>
				for more information, please visit nutstashs <span>
					<a
						href="https://nutstash.app/#faq"
						target="_blank"
						rel="nofollow noreferrer noopener"
						class="inline-flex gap-1 font-bold hover:underline"
						>FAQs

						<SquareArrowOutUpRight class="h-5 w-5"></SquareArrowOutUpRight>
					</a>.
				</span>
			</span>
		</p>

		<Button href="/#/onboarding/pass" class="w-full">OK</Button>
	</div>
</div>
