<script lang="ts">
    let {text}: {text?: string} = $props()
</script>

<div class="relative flex py-1 items-center w-full justify-center opacity-40">
    <div class="flex-grow border-t border-primary {text? '':"my-2"}"></div>
    {#if text}
    <span class="flex-shrink mx-4 text-primary">{text}</span>
    <div class="flex-grow border-t border-primary"></div>
    {/if}
</div>
