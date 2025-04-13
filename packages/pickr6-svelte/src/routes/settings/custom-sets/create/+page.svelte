<script>
	import r6operators from 'r6operators';

	import Button from '$lib/components/ui/button/button.svelte';
	import OperatorCard from '$lib/components/OperatorCard.svelte';

	console.log(r6operators);
</script>

<section class="grid grid-cols-3">
	{#each Object.entries(r6operators).filter((e) => typeof e[1].id === typeof '') as [name, operator]}
		<OperatorCard {operator} />
	{/each}
</section>
