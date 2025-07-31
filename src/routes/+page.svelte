<script lang="ts">
	import { routes} from '$lib/routes';
	import { isOnboarded } from '$lib/stores/local/message';
	import { onMount } from 'svelte';
	import Router from 'svelte-spa-router';
	import { push, replace, location } from 'svelte-spa-router';

	onMount(() => {
		console.log($location);
		if ($location === '/onboarding/restore/file') {
			return;
		}
		if (!$isOnboarded) {
			replace('/onboarding');
		} else {
			if ($location === '/' || $location === '/#' || $location === '/#/' || $location === '') {
				push('/wallet/');
			}
		}
	});
</script>

<Router {routes}></Router>
