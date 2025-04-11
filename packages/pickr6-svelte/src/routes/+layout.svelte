<script lang="ts">
	import BottomNavbar from '$lib/components/BottomNavbar.svelte';
	import ModeSwitcher from '$lib/components/ModeSwitcher.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div>
	<main class="container mx-auto px-4">
		{@render children()}
	</main>
	<div class="fixed bottom-0 left-0 z-50 w-full">
		<BottomNavbar />
	</div>
</div>
