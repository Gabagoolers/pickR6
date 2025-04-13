<script lang="ts">
	import type { OperatorSet } from '$lib/stores/persisted';
	import * as Card from '$lib/components/ui/card';

	interface Props {
		operatorSet: OperatorSet;
	}

	const { operatorSet }: Props = $props();

	const { id, name, date, operators } = operatorSet;
</script>

<a href={`/settings/custom-sets/${id}`}>
	<div class="rounded-md px-4 py-2 shadow-md">
		<h2>{name}</h2>
		<h3>contains {operators.length} operators</h3>
		<span>{date.toLocaleDateString()}</span>
	</div>
</a>
