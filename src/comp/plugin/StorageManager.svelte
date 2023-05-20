<script>
	import { browser } from '$app/environment';
	//todo update stores without reloading window
	if (browser) {
		window.addEventListener('storage', (e) => {
			if (!e.key ) {
				return
			}
			console.log(`Key Changed: ${e.key}`);
			console.log(`New Value: ${e.newValue}`);
			window.localStorage.setItem(e.key, e.newValue??'');
			window.location.reload();
		});
	}
</script>
