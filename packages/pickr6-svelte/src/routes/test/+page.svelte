<script lang="ts">
	import { getPickr6Store } from '$lib/stores/persisted.svelte';

	let store = getPickr6Store();
</script>

{JSON.stringify(store.value)}

<button onclick={() => (store.value.options.hideRecruit = !store.value.options.hideRecruit)}
	>asd</button
>
