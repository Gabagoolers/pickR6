<script lang="ts">
	import type { Operator } from 'r6operators';

	import { sanitizedOperators } from '$lib/utils/operators';

	import { pickr6Store } from '$lib/stores/persisted.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/dropdown-menu';
	import OperatorCard from '$lib/components/OperatorCard.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	let store = pickr6Store;

	type OperatorWithOwnership = Operator & {
		isOwned: boolean;
	};

	const ownedOperators: Array<OperatorWithOwnership> = $derived.by(() => {
		return sanitizedOperators.map((o) => ({
			...o,
			isOwned: store.value.ownedOperators.includes(o.id)
		}));
	});

	const displayedOperators = $derived.by(() => {
		return ownedOperators.filter((o) => {
			if (onlyShowOwned.current) return o.isOwned;
			return true;
		});
	});

	const onlyShowOwned = $state({ current: false });

	function toggleOperatorOwned(operatorId: string) {
		console.log('clicked');
		function add() {
			const n = [...store.value.ownedOperators, operatorId];
			store.value = {
				...store.value,
				ownedOperators: n
			};
		}

		function remove() {
			store.value = {
				...store.value,
				ownedOperators: store.value.ownedOperators.filter((o) => o !== operatorId)
			};
		}

		if (!sanitizedOperators.find((o) => o.id === operatorId)) {
			return;
		}

		const isOwned = store.value.ownedOperators.includes(operatorId);

		if (isOwned) {
			remove();
		} else {
			add();
		}
	}

	function markAllOwned() {
		store.value = {
			...store.value,
			ownedOperators: sanitizedOperators.map((o) => o.id)
		};
	}

	$inspect(store);
</script>

<svelte:head>
	<title>Owned Operators</title>
</svelte:head>

<h1>Owned Operators</h1>

{#snippet operatorListItem(operator: OperatorWithOwnership)}
	<button onclick={() => toggleOperatorOwned(operator.id)}>
		<div class="items-centerjustify-between flex flex-row items-center">
			<div class="flex w-full flex-row items-center gap-4">
				<figure class="size-16">
					{@html operator.toSVG()}
				</figure>
				<h2 class="text-xl">{operator.name}</h2>
			</div>
			<Checkbox class="mr-4" checked={operator.isOwned} />
		</div>
	</button>
{/snippet}

<section class="flex flex-col gap-4 rounded-lg">
	<div class="flex flex-row justify-between">
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button variant="outline">Mark all owned</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you sure?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. You will have to manually unmark the operators you don't
						own.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action onclick={() => markAllOwned()}>Continue</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
		<div class="flex items-center space-x-2">
			<Label for="show-all">Only show owned</Label>
			<Switch id="show-all" bind:checked={onlyShowOwned.current} />
		</div>
	</div>
	<div class="grid grid-cols-1">
		{#each displayedOperators as operator}
			{@render operatorListItem(operator)}
			<Separator class="my-2" />
		{:else}
			<span>You don't have any operators.</span>
		{/each}
	</div>
</section>
