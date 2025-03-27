<script>

	import { loading_nutstash } from "$lib/paraglide/messages";

</script>
<div class="flex h-full w-full items-center justify-center">
	<div class="flex items-center justify-center">
		<div class="bg-base-100 flex h-min flex-col items-center justify-center gap-10 rounded-lg p-10">
			<div class="h-32 w-32">
				<img src="/nutstash_app.svg" alt="" />
			</div>
			<p class="font-bold text-primary">{loading_nutstash()}</p>
			<div class="loading-spinner loading-lg loading text-primary"></div>
		</div>
	</div>
</div>
