<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/';
	import { sanitizedOperators, type ReducedSanitizedOperator } from '$lib/utils/operators';

	import Save from '@lucide/svelte/icons/save';

	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { setSchema } from '$lib/schemas';

	import SuperDebug from 'sveltekit-superforms';
	import { goto } from '$app/navigation';
	import { dev } from '$app/environment';
	import Fab from '$lib/components/FAB.svelte';
	import { appState } from '$lib/stores/storage.svelte';
	import type { OperatorSet } from '$lib/stores/types';

	type SelectableOperator = ReducedSanitizedOperator & {
		selected: boolean;
	};

	let selected = $state<string[]>([]);

	$effect(() => {
		$formData.operators = selected;
	});

	let operators = $derived(
		sanitizedOperators.map((operator) => {
			return {
				...operator,
				selected: selected.includes(operator.id)
			};
		})
	);

	function toggle(id: string) {
		if (!selected.includes(id)) {
			selected.push(id);
		} else {
			selected = selected.filter((selectedId) => selectedId !== id);
		}
	}

	function save(data: OperatorSet) {
		const set = data;
		appState.current.sets.push(set);
	}

	const form = superForm(defaults(zod(setSchema)), {
		SPA: true,
		validators: zod(setSchema),
		async onUpdate({ form }) {
			if (form.valid) {
				const id = crypto.randomUUID();
				const date = new Date();

				save({
					...form.data,
					id,
					date
				});
				await goto(`/custom-sets/${id}`);
			} else {
				console.log('not valid');
				console.log(form);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

{#snippet selectableOperator(operator: SelectableOperator)}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div tabindex="0" role="button" onclick={() => toggle(operator.id)}>
		<div class="flex flex-col items-center justify-center">
			<figure class:saturate-0={!operator.selected} class="size-full">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html operator.toSVG()}
			</figure>
			<span class:font-bold={operator.selected} class="text-center">{operator.name}</span>
		</div>
	</div>
{/snippet}

<h1>Create a set</h1>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<section class="py-4">
		<Label>Operators</Label>
		<div class="grid grid-cols-4 gap-4">
			{#each operators as operator}
				{@render selectableOperator(operator)}
			{/each}
		</div>
	</section>

	<Fab
		label="Save new set"
		icon={Save}
		buttonProps={{
			type: 'submit'
		}}
	/>
</form>

{#if dev}
	<SuperDebug data={$formData} />
{/if}
