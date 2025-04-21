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

	const pickr6Store = getPickr6Store();
	const spinnedStore = getSpinnedStore();

	let randomOperatorId = $state<string | null>(spinnedStore.value.spinnedOperatorId);

	const randomOperator = $derived.by(() => {
		const v = randomOperatorId;

		if (!v) {
			return null;
		}

		const picked = sanitizedOperators
			.filter((e) => {
				if (pickr6Store.value.options.hideRecruit) {
					return !(e.id.startsWith('recruit') || ['striker', 'sentry'].includes(e.id));
				}
				return true;
			})
			.find((operator) => operator.id === v);
		return picked;
	});

	function spinNew() {
		const randomIndex = Math.floor(Math.random() * pickr6Store.value.ownedOperators.length);
		randomOperatorId = pickr6Store.value.ownedOperators[randomIndex];
		spinnedStore.value.spinnedOperatorId = randomOperatorId;
	}

	let selected = $state<OperatorSide>(pickr6Store.value.options.side);
	const options: OperatorSide[] = ['attacker', 'defender'];

	$effect(() => {
		pickr6Store.value.options.side = selected;
	});

	let open = $state(false);
</script>

<div class="flex h-full flex-grow flex-col pb-4">
	<header class="flex flex-row justify-end">
		<Drawer.Root bind:open>
			<Drawer.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
				<ListFilter />
			</Drawer.Trigger>
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
						<Switch
							disabled={true}
							id="hide-starter"
							bind:checked={pickr6Store.value.options.hideRecruit}
						/>
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
		</Drawer.Root>
	</header>

	<div class="flex h-full grow flex-col justify-between">
		{#if randomOperator}
			<div class="flex flex-col items-center justify-center gap-4">
				<figure class="size-full">
					{@html randomOperator.toSVG()}
				</figure>
				<span class="text-2xl font-bold">{randomOperator.name}</span>
			</div>
		{/if}

		{#if !pickr6Store.value.ownedOperators.length}
			<section>
				<h2 class="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					You don't have any operators.
				</h2>
				<p>
					Head over to the <a
						class="font-medium text-primary underline underline-offset-4"
						href="/settings/owned-operators">Owned Operators</a
					> page to set which operators you own.
				</p>
			</section>
		{:else}
			<Button class="w-full" onclick={() => spinNew()}>Spin</Button>
		{/if}
	</div>
</div>
