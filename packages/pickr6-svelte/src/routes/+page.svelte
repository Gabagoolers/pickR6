<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import ListFilter from '@lucide/svelte/icons/list-filter';

	import { getPickr6Store, getSpinnedStore, type OperatorSide } from '$lib/stores/persisted.svelte';
	import { sanitizedOperators } from '$lib/utils/operators';

	import * as Drawer from '$lib/components/ui/drawer';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import TabsInput from '$lib/components/feautres/spin/TabsInput.svelte';
	import { pickableOperatorPool } from '$lib/utils/randomPick';
	import { FileQuestion } from '@lucide/svelte';

	const pickr6Store = getPickr6Store();
	const spinnedStore = getSpinnedStore();

	let randomOperatorId = $state<string | null>(spinnedStore.value.spinnedOperatorId);

	const availableOperatorList = $derived.by(() => {
		const ownedSanitizedOperators = sanitizedOperators.filter((e) =>
			pickr6Store.value.ownedOperators.includes(e.id)
		);
		return pickableOperatorPool(ownedSanitizedOperators, pickr6Store.value.options.side, {
			hideStarter: pickr6Store.value.options.hideRecruit
		});
	});

	const randomOperator = $derived.by(() => {
		if (!randomOperatorId) {
			return null;
		}

		return sanitizedOperators.find((operator) => operator.id === randomOperatorId);
	});

	function spinNew() {
		const randomIndex = Math.floor(Math.random() * availableOperatorList.length);
		randomOperatorId = availableOperatorList.at(randomIndex)?.id ?? null;
		if (!randomOperatorId) {
			console.error('Something went wrong while random picking an operator');
			return;
		}
		spinnedStore.value.spinnedOperatorId = randomOperatorId;
	}

	let selected = $state<OperatorSide>(pickr6Store.value.options.side);
	const options: OperatorSide[] = ['attacker', 'defender'] as const;

	$effect(() => {
		pickr6Store.value.options.side = selected;
	});

	let open = $state(false);

	const showButton = $derived(
		pickr6Store.value.ownedOperators.length && availableOperatorList.length
	);
</script>

{#snippet drawerContent()}
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Mode settings</Drawer.Title>
			<Drawer.Description>Change how the app shuffles your operators</Drawer.Description>
		</Drawer.Header>
		<div class="grid grid-cols-1 gap-4 p-4 pb-0 lg:grid-cols-2">
			<div class="flex items-center justify-between space-x-2">
				<Label>Operator side</Label>
				<TabsInput bind:selected {options} />
			</div>
			<div class="flex items-center justify-between space-x-2">
				<Label for="hide-starter"
					>Hide starter operators <span class="truncate text-xs text-muted-foreground">
						Recruit, Striker, Sentry
					</span></Label
				>
				<Switch id="hide-starter" bind:checked={pickr6Store.value.options.hideRecruit} />
			</div>
		</div>
		<form
			onsubmit={() => {
				open = false;
			}}
		>
			<Drawer.Footer>
				<Button type="submit">Close</Button>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
{/snippet}

{#snippet ownedOperatorsLink()}
	<a class="font-medium text-primary underline underline-offset-4" href="/settings/owned-operators"
		>Owned Operators</a
	>
{/snippet}

<div class="flex h-full flex-grow flex-col pb-4">
	<header class="flex flex-row justify-end">
		<Drawer.Root bind:open>
			<Drawer.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
				<ListFilter />
			</Drawer.Trigger>
			{@render drawerContent()}
		</Drawer.Root>
	</header>

	<div class="flex h-full grow flex-col justify-between">
		{#if !pickr6Store.value.ownedOperators.length}
			<section>
				<h2 class="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					You don't have any operators.
				</h2>
				<p>Head over to the {@render ownedOperatorsLink()} page to set which operators you own.</p>
			</section>
		{/if}

		{#if pickr6Store.value.ownedOperators.length && !availableOperatorList.length}
			<section>
				<h2 class="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					There isn't an operator that would match your current filter
				</h2>
				<p>
					Try to adjust the filters or add more operators to the {@render ownedOperatorsLink()} list.
				</p>
			</section>
		{/if}

		{#if showButton}
			<div class="flex flex-col items-center justify-center gap-4">
				<figure class="size-full">
					{#if randomOperator}
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html randomOperator.toSVG()}
					{:else}
						<div class="aspect-square p-16">
							<div class="rounded-sm bg-muted">
								<FileQuestion class="size-full p-4" />
							</div>
						</div>
						<p class="text-center text-muted-foreground">
							Click on the Spin button to get your first operator!
						</p>
					{/if}
				</figure>
				{#if randomOperator}
					<span class="text-2xl font-bold">{randomOperator.name}</span>
					<span>{randomOperator.role}</span>
				{/if}
			</div>
			<Button class="w-full" onclick={() => spinNew()}>Spin</Button>
		{/if}
	</div>
</div>
