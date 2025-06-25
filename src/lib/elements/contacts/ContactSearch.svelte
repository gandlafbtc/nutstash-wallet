<script lang="ts">
import * as Command from "$lib/components/ui/command/index.js";
	import type { types } from "@gandlaf21/cashu-wallet-engine";
	import { contactsStore } from "@gandlaf21/cashu-wallet-engine/stores";
    interface Props {selectedContact: types.Contact | undefined}
	import * as Avatar from '$lib/components/ui/avatar';
    
    let {selectedContact=$bindable()}: Props = $props();
  </script>
   
       <Command.Root>
           <Command.Input placeholder="Type to search a contact" />
           <Command.List>
               <Command.Empty>No results found.</Command.Empty>
               <Command.Group heading="contacts">
                   {#each $contactsStore as contact}
                        <Command.Item onSelect={()=>selectedContact =contact}>
                            <Avatar.Root>
                                <Avatar.Image src={contact.picture ?? ''} alt={contact.alias} />
                                <Avatar.Fallback
                                    >{contact.alias
                                        .split(' ')
                                        .reduce((acc, cur) => acc + '' + cur[0]?.toUpperCase(), '')}</Avatar.Fallback
                                >
                            </Avatar.Root>
                            {contact.alias}
                        </Command.Item>
                   {/each}
                </Command.Group>
            </Command.List>
        </Command.Root>