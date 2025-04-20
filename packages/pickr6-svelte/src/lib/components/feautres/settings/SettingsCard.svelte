<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Icon as IconType } from '@lucide/svelte/icons';

	export type SettingsCardProps = {
		title: string;
		icon: typeof IconType;
		href: string;
	};

	const { title, icon, href }: SettingsCardProps = $props();
</script>

<a {href} class="size-full">
	<Card.Root class="size-full">
		<Card.Header>
			<Card.Title>{title}</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col justify-end">
			{@const Icon = icon}
			<Icon class="h-6 w-6" />
		</Card.Content>
	</Card.Root>
</a>
