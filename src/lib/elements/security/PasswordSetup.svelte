<script lang="ts">
	import { isEncrypted } from "$lib/stores/settings";
	import { key } from "$lib/stores/key";
	import { toast } from "$lib/stores/toasts";
	import { kdf } from "$lib/actions/walletActions";
	import { mnemonic } from "$lib/stores/mnemonic";
	import { token } from "$lib/stores/tokens";
	import { pendingTokens } from "$lib/stores/pendingtokens";
	import { offlineTokens } from "$lib/stores/offlinetokens";
	import { spentTokens } from "$lib/stores/spenttokens";
	import { nostrKeys } from "$lib/stores/nostr";
	import Input from "$lib/components/ui/input/input.svelte";
	import * as Form from "$lib/components/ui/form";
	import Button from "$lib/components/ui/button/button.svelte";
    import { Lock } from "lucide-svelte";
    import { onMount } from "svelte";

	let pass = $state("");
	let confPass = $state("");
	let inputFocus: HTMLInputElement | null = $state(null)
    onMount(()=>{
        setTimeout(() => {
            console.log(inputFocus)
            inputFocus?.focus()
        }, 0);
    }) 
	const enableEncryption = async (e: Event) => {
		e.preventDefault();
		if (!pass) {
			toast("Password cannot be empty", "warning");
			setTimeout(() => {
            console.log(inputFocus)
            inputFocus?.focus()
        }, 0);
			return;
		}
		if (pass !== confPass) {
			toast("Passwords do not match", "warning");
			setTimeout(() => {
            console.log(inputFocus)
            inputFocus?.focus()
        }, 0);
			return;
		}
		const k = await kdf(pass);
		if (k) {
			key.set(k);
			isEncrypted.set(true);
			mnemonic.set($mnemonic);
			token.set($token);
			pendingTokens.set($pendingTokens);
			offlineTokens.set($offlineTokens);
			spentTokens.set($spentTokens);
			nostrKeys.set($nostrKeys);
		}
		pass = "";
		confPass = "";
	};
</script>

<div class="flex h-full items-center justify-center">
	<div
		class="w-full flex flex-col gap-3 bg-base-100 max-w-4xl text-center p-5 lg:p-10 rounded-lg"
	>
		<div class="flex flex-col gap-5">
			<p class="text-lg font-bold">Encrypt wallet storage</p>
			<p>Set up wallet encryption to keep your nuts safe.</p>
		</div>
		<form class="flex flex-col gap-2" onsubmit={enableEncryption}>
			<Input bind:ref={inputFocus} type="password" placeholder="Passphrase" bind:value={pass} />
			<Input
				type="password"
				placeholder="Confirm passphrase"
				bind:value={confPass}
			/>
			<Form.Button>
				<Lock></Lock>
				Encrypt</Form.Button>
			<div>
				<Button
					variant="link"
					onclick={() => {
						isEncrypted.set(false);
					}}
				>
					Don't encrypt
				</Button>
			</div>
		</form>
	</div>
</div>
