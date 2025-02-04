<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { location } from 'svelte-spa-router';

	let crumbs = $derived($location.split('/').slice(1));

	const getCrumbLink = (i: number) => {
		let link = '/#/';
		for (let j = 0; j <= i; j++) {
			link += crumbs[j] + '/';
		}
		return link;
	};
	const getShortened = (crumb: string) => {
		if (crumb.length > 30) {
			return crumb.slice(0, 7) + '...' + crumb.slice(crumb.length - 7, crumb.length);
		}
		if (crumb.length > 10) {
			return crumb.substring(0, 10) + '...';
		}
		return crumb;
	};

	location.subscribe((crumbs) => {
		// console.log(crumbs)
	});
</script>

<div class="flex items-center">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			{#each crumbs as crumb, i}
				<!-- content here -->
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>
						<a href={getCrumbLink(i)}>
							{getShortened(crumb)}
						</a>
					</Breadcrumb.Page>
				</Breadcrumb.Item>
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
</div>
