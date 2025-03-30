<script>
	import { add_contact } from '$lib/paraglide/messages';
	import AddContact from './AddContact.svelte';
</script>

<div class="flex h-full flex-col gap-4">
	<p class="font-bold">{add_contact()}</p>
	<AddContact></AddContact>
</div>
