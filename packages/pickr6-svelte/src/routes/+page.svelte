<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import r6operators from 'r6operators';

	import Settings from '@lucide/svelte/icons/settings';
	import ListFilter from '@lucide/svelte/icons/list-filter';

	import { pickr6Store } from '$lib/stores/persisted.svelte';
	import type { OperatorSet } from '$lib/stores/persisted.svelte';
	import { sanitizedOperators } from '$lib/utils/operators';

	import * as Drawer from '$lib/components/ui/drawer';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';

	const selectedSet = $derived<OperatorSet | null>(null);
	const selectedSide = $state<'attacker' | 'defender'>('attacker');

	let randomIndex = $derived.by(() => {
		const randomIndex = Math.floor(Math.random() * pickr6Store.value.ownedOperators.length);
		return randomIndex;
	});

	const randomOperator = $derived.by(() => {
		const randomOperator = pickr6Store.value.ownedOperators[randomIndex];

		const picked = sanitizedOperators.find((operator) => operator.id === randomOperator);
		return picked;
	});
</script>

<header class="flex flex-row justify-end">
	<Drawer.Root>
		<Drawer.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
			<ListFilter />
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Mode settings</Drawer.Title>
				<Drawer.Description>Change how the app shuffles your operators</Drawer.Description>
			</Drawer.Header>
			<div class="p-4 pb-0">
				<div class="flex items-center justify-between space-x-2">
					<Label for="airplane-mode">Include Recruit</Label>
					<Switch id="airplane-mode" />
				</div>
			</div>
			<Drawer.Footer>
				<Button>Submit</Button>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</header>

{#if randomOperator}
	<div class="flex flex-col items-center justify-center gap-4">
		<figure class="size-full">
			{@html randomOperator?.toSVG()}
		</figure>
		<span class="text-2xl font-bold">{randomOperator?.name}</span>
	</div>
	<Button
		class="w-full"
		onclick={() =>
			(randomIndex = Math.floor(Math.random() * pickr6Store.value.ownedOperators.length))}
		>Spin</Button
	>
{:else}
	<span>You don't have any operators.</span>
{/if}
