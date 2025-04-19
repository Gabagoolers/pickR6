<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import r6operators from 'r6operators';

	import Settings from '@lucide/svelte/icons/settings';
	import ListFilter from '@lucide/svelte/icons/list-filter';

	import { appStore } from '$lib/stores/persisted.svelte';
	import type { OperatorSet } from '$lib/stores/persisted.svelte';

	const selectedSet = $derived<OperatorSet | null>(null);
	const selectedSide = $state<'attacker' | 'defender'>('attacker');
</script>

<header class="flex flex-row justify-between">
	<Button variant="ghost" size="default">
		<Settings class="size-32" />
	</Button>
	<Button variant="ghost">
		<ListFilter />
	</Button>
</header>

<figure>
	{@html r6operators.alibi.toSVG()}
</figure>

<Button class="w-full">Spin</Button>
