<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import * as Form from "$lib/components/ui/form";
	import Button from "$lib/components/ui/button/button.svelte";
    import { Lock } from "lucide-svelte";
    import { onMount } from "svelte";
    import { key } from "$lib/stores/session/key";
    import { kdf } from "$lib/actions/encryption";
    import { usePassword } from "$lib/stores/local/usePassword";
    import { pop, push } from "svelte-spa-router";
    import { toast } from "svelte-sonner";

	let pass = $state("");
	let confPass = $state("");
	let inputFocus: HTMLInputElement | null = $state(null)
    onMount(()=>{
        setTimeout(() => {
            inputFocus?.focus()
        }, 0);
    })
	
	const enableEncryption = async (e: Event) => {
		e.preventDefault();
		if (!pass) {
			toast.warning("Passphrase cannot be empty");
			setTimeout(() => {
            inputFocus?.focus()
        }, 0);
			return;
		}
		if (pass !== confPass) {
			toast.warning("Passphrases do not match");
			setTimeout(() => {
            inputFocus?.focus()
        }, 0);
			return;
		}
		const k = await kdf(pass);
		if (k) {
			key.set(k);
			usePassword.set(true);
		}
		pass = "";
		confPass = "";
		push('/onboarding/select')
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
			<div class="mt-10">
				<Button
					variant="link"
					onclick={() => {
						usePassword.set(false);
						push('/onboarding/select')
					}}
				>
					Don't encrypt
				</Button>
			</div>
		</form>
	</div>
</div>
