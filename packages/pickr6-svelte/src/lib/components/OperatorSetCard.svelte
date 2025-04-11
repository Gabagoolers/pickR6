<script lang="ts">
	import type { OperatorSet } from '$lib/stores/persisted';
	import * as Card from '$lib/components/ui/card';

	interface Props {
		operatorSet: OperatorSet;
	}

	const { operatorSet }: Props = $props();

	const { name, date, operators } = operatorSet;
</script>
