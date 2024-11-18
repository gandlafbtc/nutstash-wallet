<script lang="ts">
    const { children } = $props();
</script>

<div class="w-full flex justify-end">
    <div class="m-1 p-2  rounded-xl bg-secondary w-64 ">
        {@render children?.()}
    </div>
</div>