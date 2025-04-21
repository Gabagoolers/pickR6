<script lang="ts">
	import { page } from '$app/state';
	import Shell from '@lucide/svelte/icons/shell';
	import Settings from '@lucide/svelte/icons/settings';
	import BookUser from '@lucide/svelte/icons/book-user';

	import type { Icon as IconType } from '@lucide/svelte/icons';

	const routes = [
		{
			label: 'Sets',
			href: '/custom-sets',
			icon: BookUser
		},
		{
			label: 'Spin',
			href: '/',
			icon: Shell
		},
		{
			label: 'Settings',
			href: '/settings',
			icon: Settings
		}
	] as Array<{ href: string; label: string; icon: typeof IconType }>;

	const curr = $derived(page.url.pathname);
</script>

<nav class="grid grid-cols-3 bg-background">
	{#each routes as { href, label, icon }}
		{@const Icon = icon}
		<a class:active={curr === href} {href}>
			<div class="flex flex-col items-center justify-center p-2">
				<Icon />
				<span class="lowercase">{label}</span>
			</div>
		</a>
	{/each}
</nav>

<style lang="postcss">
	a {
		@apply transition;
	}

	.active {
		@apply bg-secondary text-secondary-foreground;
	}
</style>
