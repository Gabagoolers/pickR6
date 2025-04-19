<script lang="ts">
	import OperatorCard from '$lib/components/OperatorCard.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const { id, date, name, operators } = data.customSet;

	console.log(operators);
</script>

<h1>{name}</h1>
<span>{id}</span>
<p>{operators.length} operators</p>
<span>{date.toLocaleString()}</span>

<section class="grid grid-cols-3 gap-4">
	{#each operators.filter((e) => e !== undefined) ?? [] as operator}
		<OperatorCard {operator} />
	{:else}
		<span>You have no operators.</span>
	{/each}
</section>
