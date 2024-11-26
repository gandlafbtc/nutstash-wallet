<script>

    import Button from "$lib/components/ui/button/button.svelte";
    import { usePassword } from "$lib/stores/local/usePassword";
    import { Lock, LockOpen } from "lucide-svelte";
    import * as Dialog from "$lib/components/ui/dialog"; 
    import Input from "$lib/components/ui/input/input.svelte";
    import { checkIfKeysMatch, decrypt, encrypt, kdf } from "$lib/actions/encryption";
    import { key } from "$lib/stores/session/key";
    import { toast } from "svelte-sonner";
    import { DEFAULT_PASS } from "$lib/stores/static/pass";
    import { reencrypt } from "$lib/init/init";

    let isOpen =$state(false)
    let isLoading = $state(false)

    let pass=$state('')
    const removeEncryption =async () => {
        try {
            if (!$key) {
                throw new Error('No key set')
            }
            isLoading = true 
            if ($usePassword && $key) {
				if (!(await checkIfKeysMatch($key, await kdf(pass)))) {
					return toast.warning("The current password is incorrect");
				}
			}       
            key.set(await kdf(DEFAULT_PASS))
            usePassword.set(false)
            await reencrypt()
            isOpen = false
            toast.info('Encryption disabled')
        } catch (error) {
            
        }
        finally {
            isLoading = false
        }
    }
    
</script>

<div class="h-full gap-3 flex flex-col  w-80">
    <div>
        <span class="font-bold text-lg">
            Security Settings
        </span>
    </div>
    <div class="flex flex-col gap-2">
        
        {#if $usePassword}
            <span class="flex gap-2 text-green-600">
                <Lock></Lock>
                <span>
                    Wallet is protected by passphrase.
                </span>
            </span>

            <div class="flex gap-2">
                <Dialog.Root bind:open={isOpen}>
                    <Dialog.Trigger><Button variant="destructive">
                        Remove passphrase
                    </Button></Dialog.Trigger>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Are you absolutely sure you want to remove your passphrase?</Dialog.Title>
                        <Dialog.Description>
                            This will lead your wallet unencrypted.
                        </Dialog.Description>
                      </Dialog.Header>
                      <div class="flex flex-col gap-2">
                        <span>Enter current passphrase to confirm </span>
                        <Input type="password" placeholder="Current passphrase" bind:value={pass}/>
                      </div>
                      <Dialog.Footer>
                          <Button variant="outline" onclick={()=> {isOpen=false}}>
                              Cancel
                          </Button>
                          <Button variant="destructive" onclick={removeEncryption}>
                              Remove encryption
                          </Button>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Root>
                
                <Button href="/#/wallet/settings/security/changepass">
                    Change passphrase
                </Button>
            </div>
                
        {:else}
        
        <span class="flex gap-2 text-yellow-600">
            <LockOpen></LockOpen>
            <span>
                Wallet is not encrypted!
            </span>
        </span>
        <Button href="/#/wallet/settings/security/changepass">
            Set up passphrase
        </Button>
        {/if}
    </div>
</div>
