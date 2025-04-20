<script lang="ts">
	import Users from '@lucide/svelte/icons/users';
	import BookUser from '@lucide/svelte/icons/book-user';
	import SettingsCard from '$lib/components/feautres/settings/SettingsCard.svelte';
	import type { ComponentProps } from 'svelte';

	import FactoryReset from '$lib/components/feautres/settings/FactoryReset.svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';

	const settingsCards: ComponentProps<typeof SettingsCard>[] = [
		{
			title: 'Owned Operators',
			href: '/settings/owned-operators',
			icon: Users
		},
		{
			title: 'Custom Sets',
			href: '/custom-sets',
			icon: BookUser
		}
	];
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

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
	<FactoryReset />
</section>
