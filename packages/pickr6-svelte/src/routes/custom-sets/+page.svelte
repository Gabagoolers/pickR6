<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { getPickr6Store } from '$lib/stores/persisted.svelte';
	import { ArrowLeft, Plus } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card';
	import Fab from '$lib/components/FAB.svelte';

	const pickr6Store = getPickr6Store();
</script>

<svelte:head>
	<title>Operator sets</title>
</svelte:head>

<header class="flex flex-row justify-between">
	<Button class="pl-0" variant="ghost" href="/">
		<ArrowLeft />
		Spin</Button
	>
</header>

<h1>Custom sets</h1>

<section class="grid gap-4">
	{#each pickr6Store.value.sets ?? [] as set}
		<a href={`/custom-sets/${set.id}`}>
			<Card.Root>
				<Card.Header>
					<Card.Title>
						{set.name}
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>Contains {set.operators.length} operators</p>
					<p>{new Date(set.date).toLocaleString()}</p>
				</Card.Content>
			</Card.Root>
		</a>
	{:else}
		<span>You have no sets.</span>
	{/each}
</section>

<Fab label="Create" icon={Plus} buttonProps={{ href: '/custom-sets/new' }} />
