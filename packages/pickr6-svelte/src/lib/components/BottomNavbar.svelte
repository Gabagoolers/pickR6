<script lang="ts">
	import { page } from '$app/state';
	import Shell from '@lucide/svelte/icons/shell';
	const routes = [
		{
			label: 'Sets',
			href: '/custom-sets'
		},
		{
			label: 'Spin',
			href: '/'
		},
		{
			label: 'Settings',
			href: '/settings'
		}
	] as Array<{ href: string; label: string }>;

	const curr = $derived(page.url.pathname);
</script>

<nav class="bg-background grid grid-cols-3">
	{#each routes as { href, label }}
		<a class:active={curr === href} {href}>
			<div class="flex flex-col items-center justify-center p-2">
				<Shell />
				<span class="lowercase">{label}</span>
			</div>
		</a>
	{/each}
</nav>

<style lang="postcss">
	.active {
		@apply bg-slate-400;
	}
</style>
