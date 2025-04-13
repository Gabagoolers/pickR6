<script lang="ts">
	import r6operators from 'r6operators';

	import { appStore } from '$lib/stores/persisted';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/dropdown-menu';
	import OperatorCard from '$lib/components/OperatorCard.svelte';

	const ownedOperators = $derived.by(() => {
		const operatorData = Object.values(r6operators).filter((e) => typeof e.id === 'string');
		return operatorData.filter((o) => $appStore.ownedOperators.includes(o.id));
	});

	const showAll = $state(false);
</script>

<svelte:head>
	<title>Owned Operators</title>
</svelte:head>

<h1>Owned Operators</h1>

<section class="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
	<div class="flex flex-row justify-end">
		<div class="flex items-center space-x-2">
			<Switch id="show-all" value={false} />
			<Label for="show-all">Show all</Label>
		</div>
	</div>
	<div class="grid grid-cols-3">
		{#each ownedOperators as operator}
			<OperatorCard {operator} />
		{:else}
			<span>You don't have any operators.</span>
		{/each}
	</div>
</section>
