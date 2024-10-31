<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import DarkModeSetting from "$lib/elements/settings/DarkModeSetting.svelte";
    import { mints } from "$lib/stores/mints";
    import { toast } from "$lib/stores/toasts";
    import { version } from "$lib/stores/version";
    import { AlertCircle, Bitcoin, Coins, Database, Ellipsis, Github, Heart, History, Key, Landmark, LifeBuoy, LoaderCircle, Megaphone, Network, Plus, Save, Send, Settings, Trash, X } from "lucide-svelte";

    let showAddMint = $state(false);
    let isAddingMint = $state(false);
    let mintUrlToAdd = $state('') 

    const addMint = async () => {
        try {
            if (!mintUrlToAdd) {
                toast('No url entered', 'warning', 'Mint not added', );
                return
            }
            if ($mints.find((mint) => mint.mintURL === mintUrlToAdd)) {
                toast('Mint already added', 'warning', 'Mint not added', );
                return;               
            }
          isAddingMint = true;
          await  mints.createMint(mintUrlToAdd);
          toast('Mint added', 'success');
        } catch (error) {
            toast(error.message,  'error', 'Error adding mint', );
        }
        finally {
            isAddingMint = false;
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
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton>
                            {#snippet child({ props })}
                              <a href={"/#/mints/mint/"+mint.mintURL} {...props}>
                                <span class="text-xs">{mint.mintURL}</span>
                              </a>
                            {/snippet}
                          </Sidebar.MenuButton>
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                              {#snippet child({ props })}
                                <Sidebar.MenuAction {...props}>
                                  <Ellipsis />
                                </Sidebar.MenuAction>
                              {/snippet}
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content side="right" align="start">
                              <DropdownMenu.Item class='text-destructive' onclick={()=>mints.remove(mint.mintURL)}>
                                   <Trash></Trash>
                                   Remove Mint
                               </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                        </Sidebar.MenuItem>
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
                                <a href={"/#/"} {...props}>
                                    <Landmark></Landmark>
                                    Mints
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a href={"/#/"} {...props}>
                                    <Bitcoin></Bitcoin>
                                    Currencies
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a href={"/#/"} {...props}>
                                    <Key></Key>
                                    Keys
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a href={"/#/"} {...props}>
                                    <Network></Network>
                                    Nostr
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a href={"/#/"} {...props}>
                                    <Coins></Coins>
                                    Token settings
                                </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                <a href={"/#/"} {...props}>
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
            <Sidebar.GroupLabel class="gap-2">
                <LifeBuoy></LifeBuoy>
                Help</Sidebar.GroupLabel>
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                        {#snippet child({ props })}
                        <a href={"/#/"} {...props}>
                            <AlertCircle></AlertCircle>
                            Report Issue
                        </a>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                        {#snippet child({ props })}
                        <a href={"/#/"} {...props}>
                            <Send></Send>
                            Community
                        </a>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                        {#snippet child({ props })}
                        <a href={"/#/"} {...props}>
                            <Heart></Heart>
                            Donate
                        </a>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
        </Sidebar.Group>

        <Sidebar.Group>
            <Sidebar.GroupLabel class="gap-2">
                <Database></Database>
                Data</Sidebar.GroupLabel>
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                        {#snippet child({ props })}
                        <a href={"/#/"} {...props}>
                            <Coins></Coins>
                            Ecash
                        </a>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                        {#snippet child({ props })}
                        <a href={"/#/"} {...props}>
                            <History></History>
                            History
                        </a>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                        {#snippet child({ props })}
                        <a href={"/#/"} {...props}>
                            <Megaphone></Megaphone>
                            Quotes
                        </a>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
        </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer class="flex flex-col gap-1 items-center bg-gradient-to-b from-secondary to-transparent">
        <p class="text-xs opacity-35">
            Made by <a class="underline" href="https://github.com/gandlafbtc">
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
