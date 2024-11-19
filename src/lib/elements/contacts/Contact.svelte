<script lang="ts">
    import type { Contact } from "$lib/db/models/types";

    let { contact }: { contact: Contact } = $props();
    import * as Avatar from "$lib/components/ui/avatar";
</script>

<div class="rounded-xl border p-2 flex items-center gap-4">
    <Avatar.Root>
        <Avatar.Image src={contact.picture??''} alt={contact.alias} />
        <Avatar.Fallback
            >{contact.alias
                .split(" ")
                .reduce(
                    (acc, cur) => acc + "" + cur[0]?.toUpperCase(),
                    "",
                )}</Avatar.Fallback
        >
    </Avatar.Root>
    <div class="flex flex-col gap-2 justify-between h-full w-60">
        <span class="font-bold">
            {contact.alias}
        </span>
        <span class="text-secondary text-sm overflow-clip overflow-ellipsis">
            <span>
                {contact.npub}
            </span>
        </span>
    </div>
</div>
