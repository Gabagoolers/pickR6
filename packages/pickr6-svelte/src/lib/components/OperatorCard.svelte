<script lang="ts">
	import type { ReducedSanitizedOperator } from '$lib/utils/operators';

	interface Props {
		operator: ReducedSanitizedOperator;
	}

	const { operator }: Props = $props();
</script>

<div>
	{@html operator.toSVG()}
	<span>{operator.name}</span>
</div>
