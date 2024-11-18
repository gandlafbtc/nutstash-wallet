<script lang="ts">
    const { children } = $props();
</script>


<div class="m-1 p-2 rounded-xl bg-purple-700 w-64">
    {@render children?.()}
</div>