<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { toggleMode } from 'mode-watcher';
	import { Sun, Moon } from '@lucide/svelte';
</script>

<Card.Root role="button" onclick={toggleMode}>
	<Card.Header>
		<Card.Title>Toggle dark mode</Card.Title>
	</Card.Header>
	<Card.Content>
		<Sun class="scale-100 transition-all dark:hidden dark:scale-0" />
		<Moon class="hidden transition-all dark:block" />
	</Card.Content>
</Card.Root>
