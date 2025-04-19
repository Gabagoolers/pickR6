<script lang="ts">
	import OperatorSetCard from '$lib/components/OperatorSetCard.svelte';
	import { appStore } from '$lib/stores/persisted.svelte';

	const sets = $derived($appStore.sets);
</script>

<svelte:head>
	<title>Operator sets</title>
</svelte:head>

<h1>Custom sets</h1>

<section class="grid gap-4">
	{#each sets ?? [] as set}
		<OperatorSetCard operatorSet={set} />
	{:else}
		<span>You have no sets.</span>
	{/each}
</section>
