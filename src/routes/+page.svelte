<script lang="ts">
  import { page } from "$app/stores";
  import Loading from "$lib/elements/base/Loading.svelte";
  import { routes, walletRoutes } from "$lib/routes";
  import { isOnboarded } from "$lib/stores/local/message";
  import { mints } from "$lib/stores/persistent/mints";
  import { isRestoring } from "$lib/stores/persistent/settings";
  import { showShortCuts } from "$lib/stores/session/showShortCuts";
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import { push, pop, replace } from "svelte-spa-router";

  onMount(() => {
    if (!$isOnboarded) {
      replace("/onboarding");
    } else if ($isRestoring) {
      replace("/restore");
    } else {
      // if (![...Object.keys(routes), ...Object.keys(walletRoutes)].includes($page.url.hash)) {
      //   push("/wallet/");
      // }
    }
  });
</script>

<Router {routes}></Router>
<Loading></Loading>
