<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar";
    import DarkModeSetting from "$lib/elements/settings/DarkModeSetting.svelte";
    import { mints } from "$lib/stores/persistent/mints";
    import { version } from "$lib/stores/static/version";
    import { AlertCircle, ShieldCheck , ArrowLeftRight, Delete, CreditCard, ReceiptText,  House, Bitcoin, Coins, Contact , Database,  Heart, History, Key, Landmark, LifeBuoy, LoaderCircle, Megaphone, Network, Plus, Save, Send, Settings, Trash, X, Wallet, ExternalLink, Scan, QrCode, MessageCircleMore, RefreshCcw, Unplug, FileQuestion, Skull, Tally5, Import, User, NetworkIcon } from "lucide-svelte";
  import MintMenuIetm from "./MintMenuIetm.svelte";
    import { toast } from "svelte-sonner";
    import { reconnect } from "$lib/actions/nostr";
    import { messagesStore } from "$lib/stores/persistent/message";
    import { push } from "svelte-spa-router";
    import { onMount } from "svelte";
    import { ensureError } from "$lib/helpers/errors";
    import { get } from "svelte/store";

    let showAddMint = $state(false);
    let isAddingMint = $state(false);
    let mintUrlToAdd = $state('') 
    let {sidebar = $bindable(Sidebar.useSidebar())} = $props()

    onMount(() => {
        sidebar = Sidebar.useSidebar()
    })

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
            const err = ensureError(error);
			console.error(err)
			toast.error(err.message);
        }
        finally {
            isAddingMint = false;
        }
    }

    
</script>

<Sidebar.Root class='z-20'>
    <Sidebar.Header class=" justify-between flex-row">
        <div class="flex gap-1 w-full justify-between items-center">

            <DarkModeSetting></DarkModeSetting>
            <div class="p-1">
                <button  onclick={()=>sidebar.toggle()}>
                    <X class='w-4 h-4'>
                    </X>
                </button>
            </div>
        </div>

    </Sidebar.Header>

    <Sidebar.Content>
    <Sidebar.Group>
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
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/contacts/chat"} {...props}>
                                    <MessageCircleMore></MessageCircleMore>
                                    Chat
                                </a>
                                {/snippet}
                        </Sidebar.MenuButton>
                        <Sidebar.MenuBadge class='{$messagesStore.filter(m=> !m.isRead).length?'text-destructive':''}'>
                            {$messagesStore.filter(m=> !m.isRead).length}
                        </Sidebar.MenuBadge>
                    </Sidebar.MenuItem>

                 
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/address"} {...props}>
                                    <User></User>
                                    Account
                                </a>
                                {/snippet}
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
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
                            <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/settings/nostr"} {...props}>
                                <NetworkIcon></NetworkIcon>
                                Nostr
                            </a>
                            {/snippet}
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            {#snippet child({ props })}
                            <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/settings"} {...props}>
                                <Settings></Settings>
                                Settings
                            </a>
                            {/snippet}
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                            {#snippet child({ props })}
                            <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"/#/wallet/data"} {...props}>
                                <Database></Database>
                                Data
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
                onclick={() => {
                    showAddMint = !showAddMint
                    setTimeout(() => {
                        if (showAddMint) {
                            document?.getElementById('menu-mint-input')?.focus()
                        }
                    }, 50);
                }}
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
                         <Sidebar.Input id='menu-mint-input' bind:value={mintUrlToAdd} class='flex-grow' onkeypress={(e: KeyboardEvent)=> {
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
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    <Sidebar.GroupLabel class="gap-2">
                        <LifeBuoy></LifeBuoy>
                        Help</Sidebar.GroupLabel>
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
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"https://nutstash.app/#faq"} {...props} target='_blank' rel="noopener noreferrer">
                                    <FileQuestion></FileQuestion>
                                    <span class="flex gap-1 items-center">
                                        FAQ
                                        <ExternalLink class="w-4 h-4"></ExternalLink>
                                    </span>
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a onclick={()=>sidebar.isMobile?sidebar .toggle():''} href={"https://t.me/+DRy-rSe5wQtlYTk1"} target='_blank' rel="noopener noreferrer" {...props} >
                                    <Send></Send>
                                    <span class="flex gap-1 items-center">
                                        Telegram
                                        <ExternalLink class="w-4 h-4"></ExternalLink>
                                    </span>
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        
                    </Sidebar.Menu>
                    </Sidebar.GroupContent>
                </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer class="h-[3.25em] flex flex-col gap-1 items-center bg-gradient-to-b from-secondary to-transparent">
        <div class="flex gap-2">
            <div>
                <Sidebar.MenuButton onclick={()=>push('/wallet/donate')} variant='outline'>
                    <Heart></Heart>
                </Sidebar.MenuButton>
            </div>
            <div>

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
    </div>
    </div>
    </Sidebar.Footer>
</Sidebar.Root>
