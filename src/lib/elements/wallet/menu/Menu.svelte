<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import DarkModeSetting from "$lib/elements/settings/DarkModeSetting.svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import { version } from "$lib/stores/static/version";
    import { AlertCircle, ShieldCheck , ArrowLeftRight, Delete, CreditCard, ReceiptText,  House, Bitcoin, Coins, Contact , Database,  Heart, History, Key, Landmark, LifeBuoy, LoaderCircle, Megaphone, Network, Plus, Save, Send, Settings, Trash, X, Wallet, ExternalLink, Scan } from "lucide-svelte";
  import MintMenuIetm from "./MintMenuIetm.svelte";
    import Divider from "$lib/elements/ui/Divider.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { usePassword } from "$lib/stores/local/usePassword";
    import { selectedMints } from "$lib/stores/local/selectedMints";
    import { isOnboarded } from "$lib/stores/local/message";
    import { DB } from "$lib/db/db";
    import { toast } from "svelte-sonner";

    let showAddMint = $state(false);
    let isAddingMint = $state(false);
    let mintUrlToAdd = $state('') 
    const sidebar = Sidebar.useSidebar()

    const addMint = async () => {
        try {
            if (!mintUrlToAdd) {
                toast.warning('No url entered');
                return
            }
            if ($mints.find((mint) => mint.url === mintUrlToAdd)) {
                toast.warning('Mint is already added');
                return;               
            }
          isAddingMint = true;
          await  mints.fetchMint(mintUrlToAdd);
          mintUrlToAdd = ''
          toast.success('Mint added');
        } catch (error) {
			console.error(error)
            toast.error(error.message);
        }
        finally {
            isAddingMint = false;
        }
    }

    const deleteAll = async () => {
        try {
            usePassword.set(undefined)
            selectedMints.set([]);
            isOnboarded.set(false);
            await DB.deleteDatabase()
            toast.success('Database deleted');
        } catch (error) {
			console.error(error)
            toast.error(error.message);
        }
    }
</script>

<Sidebar.Root>
    <Sidebar.Header class=" justify-between flex-row">
        <DarkModeSetting></DarkModeSetting>
        <Sidebar.Trigger></Sidebar.Trigger>
    </Sidebar.Header>

    <Sidebar.Content>
    <Sidebar.Group>
        <Sidebar.GroupLabel class='gap-2'>
            <House></House>
            Home</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/"} {...props}>
                                    <Wallet></Wallet>
                                    Wallet
                                </a>
                                {/snippet}
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/contacts"} {...props}>
                                    <Contact></Contact>
                                    Contacts
                                </a>
                                {/snippet}
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>

                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/scan"} {...props}>
                                    <Scan></Scan>
                                    Scan
                                </a>
                                {/snippet}
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
        <Sidebar.Group>
            <Sidebar.GroupLabel class='gap-2'>
                <Landmark></Landmark>
                Mints</Sidebar.GroupLabel>
            <Sidebar.GroupAction
                title="Add Mint"
                onclick={() => (showAddMint = !showAddMint)}
            >
                {#if showAddMint}
                    <X></X>
                {:else}
                    <Plus /> <span class="sr-only">Add Mint</span>
                {/if}
            </Sidebar.GroupAction>
            <Sidebar.GroupContent >
                <Sidebar.GroupContent>
                    <Sidebar.Menu>
                        {#if showAddMint}
                         <Sidebar.MenuItem class="flex gap-2 w-full">
                         <Sidebar.Input bind:value={mintUrlToAdd} class='flex-grow' onkeypress={(e: KeyboardEvent)=> {
                            if (e.key === 'Enter') {
                                addMint() 
                            }
                         }} />
                         <Sidebar.MenuButton onclick={addMint} class="flex-shrink max-w-min" variant='outline' disabled={isAddingMint}>
                            {#if isAddingMint}
                                <LoaderCircle class="animate-spin">

                                </LoaderCircle>
                            {:else}
                                 <Plus></Plus>
                            {/if}
                            Add
                        </Sidebar.MenuButton>
                         </Sidebar.MenuItem>
                             
                        {/if}
                      {#each $mints as mint}
                        <MintMenuIetm { mint }></MintMenuIetm>
                      {/each}
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
            </Sidebar.GroupContent>

        </Sidebar.Group>
        <Sidebar.Group>
            <Sidebar.GroupLabel class='gap-2'>
                <Settings></Settings>
                Settings</Sidebar.GroupLabel>
                <Sidebar.GroupContent>
                    <Sidebar.Menu>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/settings/mints"} {...props}>
                                    <Landmark></Landmark>
                                    Mints
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/settings/currency"} {...props}>
                                    <Bitcoin></Bitcoin>
                                    Currencies
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/settings/security"} {...props}>
                                    <ShieldCheck></ShieldCheck>
                                    Security
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/settings/keys"} {...props}>
                                    <Key></Key>
                                    Keys
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/settings/nostr"} {...props}>
                                    <Network></Network>
                                    Nostr
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/settings/ecash"} {...props}>
                                    <Coins></Coins>
                                    Ecash settings
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/settings/backup"} {...props}>
                                    <Save></Save>
                                    Backup
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                    </Sidebar.Menu>
                </Sidebar.GroupContent>
        </Sidebar.Group>

        <Sidebar.Group>
            <Sidebar.GroupContent>
                <Sidebar.Menu>

                    <Sidebar.GroupLabel class="gap-2">
                        <LifeBuoy></LifeBuoy>
                        Help</Sidebar.GroupLabel>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"https://github.com/gandlafbtc/nutstash-wallet/issues"} {...props} target='_blank' rel="noopener noreferrer">
                                    <AlertCircle></AlertCircle>
                                    <span class="flex gap-1 items-center">
                                        Report Issue
                                        <ExternalLink class="w-4 h-4"></ExternalLink>
                                    </span>
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/wallet/community"} {...props} >
                                    <Send></Send>
                                    Community
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/donate"} {...props}>
                                    <Heart></Heart>
                                    Donate
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                    </Sidebar.Menu>
                    </Sidebar.GroupContent>
                </Sidebar.Group>
                
        <Sidebar.Group>
        <Sidebar.GroupContent>
            <Sidebar.Menu>

                <Sidebar.GroupLabel class="gap-2">
                    <Database></Database>
                    Data</Sidebar.GroupLabel>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            {#snippet child({ props })}
                            <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/ecash"} {...props}>
                                <Coins></Coins>
                                Ecash
                            </a>
                            {/snippet}
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                        {#snippet child({ props })}
                        <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/history"} {...props}>
                            <History></History>
                            History
                        </a>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                        {#snippet child({ props })}
                        <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/receive/ln"} {...props}>
                            <ReceiptText></ReceiptText>
                            Invoices
                        </a>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                        {#snippet child({ props })}
                        <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/send/ln"} {...props}>
                            <CreditCard></CreditCard>
                            Payments
                        </a>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                        {#snippet child({ props })}
                        <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/send/cashu"} {...props}>
                            <ArrowLeftRight></ArrowLeftRight>
                            Transactions
                        </a>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <!-- <Divider></Divider>
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                        {#snippet child({ props })}
                        <Button onclick={deleteAll} {...props} variant='destructive'>
                            <Delete></Delete>
                            Delete all data
                        </Button>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                 -->
            </Sidebar.Menu>
            </Sidebar.GroupContent>
            
        </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer class="flex flex-col gap-1 items-center bg-gradient-to-b from-secondary to-transparent">
        <p class="text-xs opacity-35">
            Made by <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} class="underline" href="https://github.com/gandlafbtc">
                @gandlaf21
            </a>
        </p>
        <p class="text-xs opacity-85">
            version
            <a
                href="https://github.com/gandlafbtc/nutstash-app"
                target="_blank"
                rel="noopener noreferrer nofollow"
                class="underline"
            >
                {$version}
            </a>
        </p>
    </Sidebar.Footer>
</Sidebar.Root>
