<script lang="ts">
  import { page } from "$app/stores";
  import Loading from "$lib/elements/base/Loading.svelte";
  import { routes, walletRoutes } from "$lib/routes";
  import { isOnboarded } from "$lib/stores/local/message";
  import { mints } from "$lib/stores/persistent/mints";
  import { showShortCuts } from "$lib/stores/session/showShortCuts";
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import { push, pop, replace, location } from "svelte-spa-router";

  onMount(() => {
    if ($location === '/#/onboarding/restore/file') {
      return
    }
    if (!$isOnboarded) {
      replace("/onboarding");
    } else {
      if ($location === '/' || $location === '/#' || $location === '/#/' || $location === '') {
        push('/wallet/')
      }
    }
  });
</script>
  <Router {routes}></Router>
