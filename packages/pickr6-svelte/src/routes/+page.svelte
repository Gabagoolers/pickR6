<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import r6operators from 'r6operators';
	import Mail from '@lucide/svelte/icons/mail';

	import { appStore } from '$lib/stores/persisted';
	import type { OperatorSet } from '$lib/stores/persisted';

	const selectedSet = $derived<OperatorSet | null>(null);
	const selectedSide = $state<'attacker' | 'defender'>('attacker');
</script>

<header class="flex flex-row justify-between">
	<div class="w-full bg-black">asd</div>
	<Button
		><Mail class="mr-2 size-4" />
		Attacker</Button
	>
	<Button
		><Mail class="mr-2 size-4" />
		Defender</Button
	>
</header>

<figure>
	{@html r6operators.alibi.toSVG()}
</figure>

<Button>Spin</Button>
