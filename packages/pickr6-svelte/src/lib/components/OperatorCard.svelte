<script lang="ts">
	import type { ReducedSanitizedOperator } from '$lib/utils/operators';

	interface Props {
		operator: ReducedSanitizedOperator;
	}

	const { operator }: Props = $props();
</script>

<div class="flex flex-col items-center justify-between">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html operator.toSVG()}
	<span>{operator.name}</span>
</div>
