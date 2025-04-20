<script lang="ts">
	import type { OperatorSet } from '$lib/stores/persisted.svelte';

	interface Props {
		operatorSet: OperatorSet;
	}

	const { operatorSet }: Props = $props();

	const { id, name, date, operators } = operatorSet;
</script>

<a href={`/custom-sets/${id}`}>
	<div class="rounded-md px-4 py-2 shadow-md">
		<h2>{name}</h2>
		<h3>contains {operators?.length ?? 0} operators</h3>
		<span>{new Date(date).toLocaleDateString()}</span>
	</div>
</a>
