<script lang="ts">
	import OperatorSetCard from '$lib/components/OperatorSetCard.svelte';
	import { appStore } from '$lib/stores/persisted';

	const sets = $derived($appStore.sets);
</script>

<svelte:head>
	<title>Operator sets</title>
</svelte:head>

<section class="grid gap-2">
	{#each sets as set}
		<OperatorSetCard operatorSet={set} />
	{:else}
		<span>You have no sets.</span>
	{/each}
</section>
