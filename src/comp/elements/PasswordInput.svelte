<script>


	import { isEncrypted } from "../../stores/settings";
	import { key } from "../../stores/key";
	import { toast } from "../../stores/toasts";
	import { browser } from "$app/environment";
	import { decrypt, encrypt, kdf } from "../../actions/walletActions";
	import { token } from "../../stores/tokens";
	import { encryptedStorage } from "../../stores/encrypted";

    let pass = '' 
    let confPass = ''

    const enableEncryption =async () => {
        if (!pass) {
            toast('warning', 'Invalid Password','Password cannot be empty')
            return
        }
        if (pass!==confPass) {
            toast('warning', 'Invalid Password', 'Passwords do not match')
            return
        }
        key.set(await kdf(pass))
        $isEncrypted=true
    }

    const unlockWallet =async  () => {
        key.set(await kdf(pass))
        try {
            const decrypted = await decrypt($encryptedStorage)
            token.set(decrypted)
        } catch (error) {
            key.set(undefined)
            toast('error', 'can not unlock', 'wrong password')
        }
    }
</script>
{#if $isEncrypted===undefined}
<div class="w-screen h-screen bg-black bg-opacity-80 z-50 fixed top-0 left-0 flex items-center justify-center">
    <div class="bg-base-100 max-w-2xl rounded-2xl p-10 flex flex-col gap-3">
        <div class="flex flex-col gap-2">
            <p class="text-lg font-bold">
                Encrypt wallet storage
            </p>
            <p>
                Set up an encryption key to keep ecash tokens stored in nutstash safe
            </p>
            <div class="flex justify-between">
                <div class="text-success flex flex-col gap-1">
                    <p>+ lock wallet automatically</p>
                    <p>+ ecash inaccessible outside wallet</p>
                </div>
                <div class="divider-vertical divider"></div>
                <div class="text-error flex flex-col gap-1">

                    <p>
                        - Wallet might be slower
                    </p>
                    <p>
                        - no password reset function
                    </p>
                </div>    
            </div>
        </div>
        <input type="password" class="input input-bordered" placeholder="password" bind:value={pass}>
        <input type="password" class="input input-bordered" placeholder="confirm password" bind:value={confPass}>
        <div class="flex gap-2 justify-end">
            <button class="btn btn-success" on:click={enableEncryption}>
                encrypt
            </button>
        </div>
        <button class="link" on:click={()=> {isEncrypted.set(false)}}>
            don't encrypt
        </button>
    </div>
</div>
{:else if $isEncrypted && !$key}
<div class="w-screen h-screen bg-black bg-opacity-80 z-50 fixed top-0 left-0 flex items-center justify-center">
    <div class="bg-base-100 max-w-2xl rounded-2xl p-10 flex flex-col gap-3">
        <div class="flex flex-col gap-2">
            <p class="text-lg font-bold">
                Unlock Wallet
            </p>
            <p>
                Wallet is locked. Enter your password to unlock.
            </p>
        </div>

        <input type="password" class="input input-bordered" placeholder="password" bind:value={pass}>
        <div class="flex gap-2 justify-end">
            <button class="btn btn-success" on:click={unlockWallet} >
                unlock
            </button>
        </div>
    </div>
</div>
{:else}
    <slot></slot>
{/if}