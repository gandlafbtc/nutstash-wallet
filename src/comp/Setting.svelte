<script lang="ts">
	import { THEMES } from "../stores/static/themes";


	import { theme } from "../stores/theme";


    const setTheme = (t: string)=>{
        theme.set(t)
    }
</script>
<div class="flex justify-center items-center">

    <label for="">Theme:</label>
    <div class="dropdown" id="theme-dropdown">
        <label tabindex="0" class="btn m-1">{$theme}</label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-56 overflow-scroll">
            {#each THEMES as theme}
            <li on:click={()=> setTheme(theme)}><a>{theme}</a></li>
            {/each}
        </ul>
    </div>
</div>