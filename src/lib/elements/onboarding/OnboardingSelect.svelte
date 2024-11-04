<script lang="ts">
	import { isOnboarded } from '$lib/stores/local/message';
	import { mnemonic } from '$lib/stores/persistent/mnemonic';
	import { pop, push, replace } from "svelte-spa-router";
    import Divider from '../ui/Divider.svelte';
    import { usePassword } from '$lib/stores/local/usePassword';
    import { wordlist } from '@scure/bip39/wordlists/english';;
    import { generateMnemonic } from '@scure/bip39';

	const skip = () => {
		usePassword.set(false);
		const m = generateMnemonic(wordlist, 128);
		mnemonic.set(m.split(' '));
		isOnboarded.set(true);
		replace('/wallet/')
	};
	const create = () => {
		const m = generateMnemonic(wordlist, 128);
		mnemonic.set(m.split(' '));
		push('/onboarding/new/secure')
	};
</script>
<div class="w-full flex justify-center h-full">
<div class="p-2 flex w-full flex-col items-center justify-center max-w-4xl">
	<h1 class="font-bold text-xl">Select your way to start!</h1>

	<button
		onclick={create}
		class="items-center gap-3 flex rounded-lg border-2 p-2 w-full max-w-4xl m-2 transition-opacity opacity-70 hover:opacity-100 duration-300 cursor-pointer"
	>
		<svg
			class="w-10 h-10"
			viewBox="0 0 25 25"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M22.7783 4.08667L13.4033 0.180423C13.1177 0.0619557 12.8116 0.000976563 12.5024 0.000976562C12.1933 0.000976563 11.8871 0.0619557 11.6016 0.180423L2.22656 4.08667C1.35254 4.448 0.78125 5.30249 0.78125 6.24976C0.78125 15.9421 6.37207 22.6414 11.5967 24.8191C12.1729 25.0584 12.8223 25.0584 13.3984 24.8191C17.583 23.0759 24.2188 17.0554 24.2188 6.24976C24.2188 5.30249 23.6475 4.448 22.7783 4.08667ZM12.5049 21.7917L12.5 3.18824L21.0889 6.76734C20.9277 14.1599 17.0801 19.5164 12.5049 21.7917Z"
			/>
		</svg>
		<div class="flex-col gap-2 text-start">
			<h2 class="font-bold">Secure nuts (recommended)</h2>
			<p class="text-neutral-content">
				Create a seed phrase backup for this wallet, and encrypt your nutstash with a passphrase
			</p>
			<p class="opacity-40">Select this option to prevent losing your nuts</p>
		</div>
	</button>
	<Divider></Divider>
	<button
		onclick={skip}
		class="items-center gap-3 flex rounded-lg border p-2 w-full max-w-4xl m-2 duration-300 cursor-pointer transition-opacity opacity-70 hover:opacity-100"
	>
		<svg
			class="w-10 h-10"
			viewBox="0 0 18 25"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12.3755 0.0126953C9.07893 0.0601104 5.93335 1.39621 3.6179 3.73251C1.30245 6.06881 0.00290775 9.21787 -0.000152588 12.4998C0.00290775 15.7817 1.30245 18.9308 3.6179 21.2671C5.93335 23.6034 9.07893 24.9395 12.3755 24.9869L12.3755 14.9987C12.3731 14.999 12.3707 14.9994 12.3684 14.9998C12.0385 14.9998 11.712 14.9351 11.4073 14.8095C11.1026 14.6838 10.8257 14.4997 10.5925 14.2676C10.3593 14.0354 10.1743 13.7598 10.0481 13.4565C9.92186 13.1532 9.8569 12.8281 9.8569 12.4998C9.8569 12.1715 9.92186 11.8464 10.0481 11.5431C10.1743 11.2398 10.3593 10.9642 10.5925 10.732C10.8257 10.4999 11.1026 10.3157 11.4073 10.1901C11.712 10.0645 12.0385 9.99981 12.3684 9.99981C12.3707 10.0002 12.3731 10.0005 12.3755 10.0009V0.0126953Z"
			/>
			<path
				d="M7.34546 5C7.34546 7.76142 9.59426 10 12.3683 10C15.1423 10 17.3911 7.76142 17.3911 5C17.3911 2.23858 15.1423 0 12.3683 0C9.59426 0 7.34546 2.23858 7.34546 5Z"
			/>
			<path
				d="M7.34546 20C7.34546 22.7614 9.59426 25 12.3683 25C15.1423 25 17.3911 22.7614 17.3911 20C17.3911 17.2386 15.1423 15 12.3683 15C9.59426 15 7.34546 17.2386 7.34546 20Z"
			/>
		</svg>
		<div class="flex-col gap-2 text-start">
			<h2 class="font-bold">Quick nuts</h2>
			<p class="">
				Go straight to the wallet. You can encrypt it later.
			</p>
			<p class="opacity-40">
				This option is best used for a one-time wallet or throw-away wallet
			</p>
		</div>
	</button>
	<a
		href="/#/onboarding/restore/seed"
		class="items-center gap-3 flex rounded-lg border p-2 w-full max-w-4xl m-2 duration-300 cursor-pointer transition-opacity opacity-70 hover:opacity-100"
	>
		<svg
			class="w-10 h-10"
			viewBox="0 0 25 23"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3.125 3.6875H0C0 9.72754 4.89746 14.625 10.9375 14.625V21.6562C10.9375 22.0859 11.2891 22.4375 11.7188 22.4375H13.2812C13.7109 22.4375 14.0625 22.0859 14.0625 21.6562V14.625C14.0625 8.58496 9.16504 3.6875 3.125 3.6875ZM21.875 0.5625C17.7637 0.5625 14.1895 2.83301 12.3193 6.1875C13.6719 7.66211 14.6729 9.4541 15.2002 11.4414C20.7031 10.8701 25 6.22168 25 0.5625H21.875Z"
			/>
		</svg>

		<div class="flex-col gap-2 text-start">
			<h2 class="font-bold">Restore lost nuts</h2>
			<p class="">Recover ecash from a lost wallet with your seed phrase</p>
			<p class="opacity-40">Select this option to recreate a lost wallet</p>
		</div>
	</a>

	<a
	href="/#/onboarding/restore/file"
	class="items-center gap-3 flex rounded-lg border p-2 w-full max-w-4xl m-2 duration-300 cursor-pointer transition-opacity opacity-70 hover:opacity-100"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-10 h-10"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
			/>
		</svg>

		<div class="flex-col gap-2 text-start">
			<h2 class="font-bold">Import wallet file</h2>
			<p class="">Load a wallet from a backup file</p>
			<p class="opacity-40">
				Select this option if you have exported a nutstash wallet and want to import it
			</p>
		</div>
	</a>
	<div class="mt-4">
		<button
		class="font-bold hover:underline"
		onclick={() => {
			pop()
		}}
	>
	Abort
</button>
	</div>
</div>
</div>
