<script lang="ts">
	import r6operators from 'r6operators';
	import type { Operator } from 'r6operators';

	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/';
	import { sanitizedOperators } from '$lib/utils/operators';
	import { pickr6Store } from '$lib/stores/persisted.svelte';

	type SelectableOperator = Operator & {
		selected: boolean;
	};

	let selected = $state<string[]>([]);
	let name = $state<string>('');

	let operators = $derived(
		sanitizedOperators.map((operator) => {
			return {
				...operator,
				selected: selected.includes(operator.id)
			};
		})
	);

	function toggle(id: string) {
		if (!selected.includes(id)) {
			selected.push(id);
		} else {
			selected = selected.filter((selectedId) => selectedId !== id);
		}
	}

	function save() {
		const set = {
			id: crypto.randomUUID(),
			name: name,
			date: new Date().toISOString(),
			operators: selected
		};

		pickr6Store.value = {
			...pickr6Store.value,
			sets: [...pickr6Store.value.sets, set]
		};
	}

	console.log(r6operators);
</script>

{#snippet selectableOperator(operator: SelectableOperator)}
	<button onclick={() => toggle(operator.id)}>
		<div class="flex flex-col items-center justify-center">
			<figure class:saturate-0={!operator.selected} class="size-full">
				{@html operator.toSVG()}
			</figure>
			<span class:font-medium={operator.selected} class="text-center">{operator.name}</span>
		</div>
	</button>
{/snippet}

<h1>Create a set</h1>

<div class="flex w-full max-w-sm flex-col gap-1.5">
	<Label for="name">Name</Label>
	<Input minlength={3} type="text" id="name" placeholder="My set" bind:value={name} />
</div>

<section class="py-4">
	<Label>Operators</Label>
	<div class="grid grid-cols-4 gap-4">
		{#each operators as operator}
			{@render selectableOperator(operator)}
		{/each}
	</div>
</section>

<Button onclick={() => save()}>Save</Button>
