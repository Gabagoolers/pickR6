<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { toggleMode, mode, resetMode } from 'mode-watcher';
	import { Sun, Moon } from '@lucide/svelte';
</script>

<Card.Root role="button" onclick={toggleMode}>
	<Card.Header>
		<Card.Title>Toggle dark mode</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if mode.current === 'light'}
			<Sun />
		{:else}
			<Moon />
		{/if}
	</Card.Content>
</Card.Root>
