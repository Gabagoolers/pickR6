<script lang="ts">
	import OperatorSetCard from '$lib/components/OperatorSetCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { pickr6Store } from '$lib/stores/persisted.svelte';
	import { ArrowLeft } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Operator sets</title>
</svelte:head>

<header class="flex flex-row justify-between">
	<Button class="pl-0" variant="ghost" href="/">
		<ArrowLeft />
		Spin</Button
	>
	<Button variant="ghost">Edit</Button>
</header>

<h1>Custom sets</h1>

<Button href="/custom-sets/new">Create</Button>

<section class="grid gap-4">
	{#each pickr6Store.value.sets ?? [] as set}
		<OperatorSetCard operatorSet={set} />
	{:else}
		<span>You have no sets.</span>
	{/each}
</section>
