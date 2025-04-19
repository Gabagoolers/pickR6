<script lang="ts">
	import BottomNavbar from '$lib/components/BottomNavbar.svelte';
	import ModeSwitcher from '$lib/components/ModeSwitcher.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-svh flex-col">
	<main class="container mx-auto grow px-4 py-2">
		{@render children()}
	</main>
	<div class="sticky bottom-0 left-0 z-50 w-full">
		<BottomNavbar />
	</div>
</div>
