<script lang="ts">
	import { THEMES } from "../stores/static/themes";


	import { theme } from "../stores/theme";
	import History from "./history/History.svelte";


    const setTheme = (t: string)=>{
        theme.set(t)
    }
</script>
<div class="flex justify-center items-center flex-col">

    <label for="">Theme:</label>
    <div class="dropdown" id="theme-dropdown">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn m-1">{$theme}</label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-56 overflow-scroll">
            <!-- svelte-ignore a11y-missing-attribute -->
            {#each THEMES as theme}
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={()=> setTheme(theme)}><a>{theme}</a></li>
            {/each}
        </ul>
    </div>
    <History></History>
</div>