<script lang="ts">
    import { page } from "$app/stores";
  import Loading from "$lib/elements/base/Loading.svelte";
  import PasswordInput from "$lib/elements/security/PasswordInput.svelte";
  import { routes, walletRoutes } from "$lib/routes";
  import { isLoaded } from "$lib/stores/isLoaded";
  import { isOnboarded } from "$lib/stores/message";
  import { isRestoring } from "$lib/stores/settings";
  import { showShortCuts } from "$lib/stores/showShortCuts";
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import { push, pop, replace } from "svelte-spa-router";

  onMount(() => {
    if (!localStorage.getItem("is-loaded")) {
      localStorage.setItem("is-loaded", "true");
      isLoaded.set("true");
    }

    if (!$isOnboarded) {
      replace("/onboarding");
    } else if ($isRestoring) {
      replace("/restore");
    } else {
      // if (![...Object.keys(routes), ...Object.keys(walletRoutes)].includes($page.url.hash)) {
      //   push("/wallet/");
      // }
    }

    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        e.preventDefault();
        showShortCuts.set(true);
      }
    };
    const keyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        e.preventDefault();
        showShortCuts.set(false);
      }
    };
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return () => {
      // this function is called when the component is destroyed
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  });
</script>

<PasswordInput>
  {#if $isLoaded}
    <Router {routes}></Router>
  {:else}
    <Loading></Loading>
  {/if}
</PasswordInput>
