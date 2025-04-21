<script lang="ts">
	import { page } from '$app/state';
	import OperatorCard from '$lib/components/OperatorCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getPickr6Store } from '$lib/stores/persisted.svelte';
	import { sanitizedOperators } from '$lib/utils/operators';
	import { ArrowLeft } from '@lucide/svelte';
	import { error } from '@sveltejs/kit';

	const pickr6Store = getPickr6Store();

	const customSet = page.params.customSet;

	if (!customSet) {
		throw error(400, 'Custom set parameter is required');
	}

	const selectedSet = pickr6Store.value.sets.find((set) => set.id === customSet);

	if (!selectedSet) {
		throw error(404, `Custom set "${customSet}" not found`);
	}

	const { id, date, name } = selectedSet;

	const mappedSelectedOperators = selectedSet?.operators
		.map((op) => {
			const operator = sanitizedOperators.find((o) => o.id === op);
			return operator;
		})
		.filter((op) => op !== undefined);
</script>

<header class="flex flex-row justify-between">
	<Button class="pl-0" variant="ghost" href="/custom-sets">
		<ArrowLeft />
		Sets</Button
	>
</header>

<h1>{name}</h1>

<section>
	<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Details</h4>
	<span>{id}</span>
	<p>{mappedSelectedOperators.length} operators</p>
	<span>{date.toLocaleString()}</span>
</section>

<section>
	<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Operators</h4>
	<div class="grid grid-cols-4 gap-4">
		{#each mappedSelectedOperators.filter((e) => e !== undefined) ?? [] as operator}
			<OperatorCard {operator} />
		{:else}
			<span>You have no operators.</span>
		{/each}
	</div>
</section>
