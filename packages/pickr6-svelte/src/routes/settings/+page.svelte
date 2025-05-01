<script lang="ts">
	import Users from '@lucide/svelte/icons/users';
	import BookUser from '@lucide/svelte/icons/book-user';
	import SettingsCard from '$lib/components/feautres/settings/SettingsCard.svelte';
	import type { ComponentProps } from 'svelte';

	import FactoryReset from '$lib/components/feautres/settings/FactoryReset.svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import DarkModeSwitch from '$lib/components/feautres/settings/DarkModeSwitch.svelte';

	const settingsCards: ComponentProps<typeof SettingsCard>[] = [
		{
			title: 'Owned Operators',
			href: '/settings/owned-operators',
			icon: Users
		}
	];
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<div class="flex h-full flex-grow flex-col justify-between">
	<div>
		<header class="flex flex-row justify-between">
			<Button class="pl-0" variant="ghost" href="/">
				<ArrowLeft />
				Spin</Button
			>
		</header>

		<h1>Settings</h1>

		<section class="grid grid-cols-2 gap-4">
			{#each settingsCards as s}
				<SettingsCard {...s} />
			{/each}
			<DarkModeSwitch />
			<FactoryReset />
		</section>
	</div>

	<footer class="flex flex-row items-center justify-center">
		<p class="text-muted-foreground text-sm">
			<a href={PKG.homepage} target="_blank">pickR6</a>
			<a href={`${PKG.homepage}/releases`} target="_blank">v{PKG.version}</a>
		</p>
	</footer>
</div>
