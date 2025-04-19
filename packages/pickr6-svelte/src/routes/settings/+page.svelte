<script lang="ts">
	import type { Icon } from '@lucide/svelte/icons';
	import Users from '@lucide/svelte/icons/users';
	import BookUser from '@lucide/svelte/icons/book-user';
	import * as Card from '$lib/components/ui/card';

	type SettingsCardProps = {
		title: string;
		href: string;
		icon: typeof Icon;
	};

	const settingsCards: SettingsCardProps[] = [
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

{#snippet settingsCard(s: SettingsCardProps)}
	{@const Icon = s.icon}

	<a href={s.href}>
		<Card.Root>
			<Card.Header>
				<Card.Title>{s.title}</Card.Title>
			</Card.Header>
			<Card.Content>
				<Icon class="h-6 w-6" />
			</Card.Content>
		</Card.Root>
	</a>
{/snippet}

<h1>Settings</h1>

<section class="grid grid-cols-2 gap-4">
	{#each settingsCards as s}
		{@render settingsCard(s)}
	{/each}
</section>
