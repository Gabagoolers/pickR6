<script lang="ts">
	import type { Operator } from 'r6operators';

	interface Props {
		operator: Operator;
	}

	const { operator }: Props = $props();

	console.log(operator.svg);
</script>

<div>
	{@html operator.toSVG()}
	<span>{operator.name}</span>
</div>
