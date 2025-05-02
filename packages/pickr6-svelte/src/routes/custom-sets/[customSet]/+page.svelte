<script lang="ts">
	import OperatorCard from '$lib/components/OperatorCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { sanitizedOperators } from '$lib/utils/operators';
	import { ArrowLeft } from '@lucide/svelte';

	const { data } = $props();

	const { id, date, name } = data.selectedSet;

	const mappedSelectedOperators = data.selectedSet?.operators
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
