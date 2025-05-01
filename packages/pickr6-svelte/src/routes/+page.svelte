<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import ListFilter from '@lucide/svelte/icons/list-filter';

	import { sanitizedOperators } from '$lib/utils/operators';

	import * as Drawer from '$lib/components/ui/drawer';
	import { buttonVariants } from '$lib/components/ui/button';
	import { pickableOperatorPool } from '$lib/utils/randomPick';
	import { FileQuestion } from '@lucide/svelte';

	import DrawerContent from '$lib/components/feautres/spin/DrawerContent.svelte';

	import { appState } from '$lib/stores/storage.svelte';

	let randomOperatorId = $state<string | null>(appState.current.selected.spinnedOperatorId);

	const availableOperatorList = $derived.by(() => {
		const ownedSanitizedOperators = sanitizedOperators.filter((e) =>
			appState.current.ownedOperators.includes(e.id)
		);

		const customSet = appState.current.sets.find(
			(e) => e.id === appState.current.selected.selectedCustomSetId
		);

		return pickableOperatorPool(ownedSanitizedOperators, appState.current.options.side, {
			hideStarter: appState.current.options.hideRecruit,
			customSet: customSet?.operators ?? undefined
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
		appState.current.selected.spinnedOperatorId = randomOperatorId;
	}

	let open = $state(false);

	const showButton = $derived(
		appState.current.ownedOperators.length && availableOperatorList.length
	);
</script>

{#snippet ownedOperatorsLink()}
	<a class="text-primary font-medium underline underline-offset-4" href="/settings/owned-operators"
		>Owned Operators</a
	>
{/snippet}

<div class="flex h-full flex-grow flex-col pb-4">
	<header class="flex flex-row justify-end">
		<Drawer.Root bind:open>
			<Drawer.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
				<ListFilter />
			</Drawer.Trigger>
			<DrawerContent bind:open />
		</Drawer.Root>
	</header>

	<div class="flex h-full grow flex-col justify-between">
		{#if !appState.current.ownedOperators.length}
			<section>
				<h2 class="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					You don't have any operators.
				</h2>
				<p>Head over to the {@render ownedOperatorsLink()} page to set which operators you own.</p>
			</section>
		{/if}

		{#if appState.current.ownedOperators.length && !availableOperatorList.length}
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
							<div class="bg-muted rounded-sm">
								<FileQuestion class="size-full p-4" />
							</div>
						</div>
						<p class="text-muted-foreground text-center">
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
