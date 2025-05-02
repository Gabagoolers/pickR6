<script lang="ts">
	import BottomNavbar from '$lib/components/feautres/layout/BottomNavbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	let { children } = $props();
</script>

<ModeWatcher />
<div class="flex min-h-dvh flex-col justify-between">
	<main class="container mx-auto flex h-full max-w-screen-sm flex-grow flex-col px-4 py-2">
		{@render children()}
	</main>
	<div class="sticky bottom-0 left-0 z-50 w-full pb-[env(safe-area-inset-bottom)]">
		<BottomNavbar />
	</div>
</div>
