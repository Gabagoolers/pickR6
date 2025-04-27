<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';

	import { Label } from '$lib/components/ui/label';
	import * as Form from '$lib/components/ui/form';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Check, ChevronsUpDown } from '@lucide/svelte';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { getPickr6Store, getSpinnedStore, type OperatorSide } from '$lib/stores/persisted.svelte';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import { slide } from 'svelte/transition';
	import TabsInputField from './TabsInputField.svelte';
	import { useId } from 'bits-ui';

	let { open = $bindable() } = $props();

	const pickr6Store = getPickr6Store();
	const spinnedStore = getSpinnedStore();

	const filterSchema = z
		.object({
			side: z.string().default('defender'),
			hideStarter: z.boolean(),
			useCustomSet: z.boolean(),
			customSet: z.string().nullable()
		})
		.superRefine((data, ctx) => {
			if (data.useCustomSet && !data.customSet) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Custom set is required when using a custom set'
				});
			}
		});

	const derivedData = $derived.by(() => {
		return {
			side: pickr6Store.value.options.side,
			hideStarter: pickr6Store.value.options.hideRecruit,
			useCustomSet: !!spinnedStore.value.selectedCustomSetId,
			customSet: spinnedStore.value.selectedCustomSetId
		};
	});

	let form = $state(
		superForm(defaults(zod(filterSchema)), {
			SPA: true,
			validators: zod(filterSchema),
			async onUpdate({ form }) {
				if (form.valid) {
					const { side, hideStarter, useCustomSet, customSet } = form.data;

					if (useCustomSet) {
						spinnedStore.value.selectedCustomSetId = customSet;
					} else {
						spinnedStore.value.selectedCustomSetId = null;
					}

					pickr6Store.value.options.hideRecruit = hideStarter;
					pickr6Store.value.options.side = side as OperatorSide;

					console.log('Form is valid:', form.data);
					customSetPopoverOpen = false;
					open = false;
				}
			}
		})
	);

	$effect(() => {
		triggerId = useId();

		form = superForm(
			{
				...defaults(zod(filterSchema)),
				data: {
					...derivedData
				}
			},
			{
				SPA: true,
				validators: zod(filterSchema),
				async onUpdate({ form }) {
					if (form.valid) {
						const { side, hideStarter, useCustomSet, customSet } = form.data;

						if (useCustomSet) {
							spinnedStore.value.selectedCustomSetId = customSet;
						} else {
							spinnedStore.value.selectedCustomSetId = null;
						}

						pickr6Store.value.options.hideRecruit = hideStarter;
						pickr6Store.value.options.side = side as OperatorSide;

						console.log('Form is valid:', form.data);
						customSetPopoverOpen = false;
						open = false;
					}
				}
			}
		);
	});

	let { form: formData, enhance } = $derived(form);

	let customSetPopoverOpen = $state(false);
	const selectedCustomSet = $derived(
		pickr6Store.value.sets.find((e) => e.id === $formData.customSet)
	);

	function closeAndFocusTrigger() {
		customSetPopoverOpen = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	const sideOptions = ['defender', 'attacker'];
	let triggerId = $state(useId());
</script>

{#snippet customSetSelector()}
	<div transition:slide class="flex items-center justify-between space-x-2">
		<Label>Select your custom operator set</Label>
		<Popover.Root bind:open={customSetPopoverOpen}>
			<Form.Control id={triggerId}>
				<Popover.Trigger>
					{#snippet child({ props })}
						<Button
							variant="outline"
							class="w-[200px] justify-between"
							{...props}
							role="combobox"
							aria-expanded={customSetPopoverOpen}
						>
							{selectedCustomSet?.name || 'Select a set...'}
							<ChevronsUpDown class="opacity-50" />
						</Button>
					{/snippet}
				</Popover.Trigger>
			</Form.Control>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.List>
						<Command.Empty>Don't use custom set</Command.Empty>
						{#each pickr6Store.value.sets as set}
							<Command.Item
								value={set.id}
								onSelect={() => {
									$formData.customSet = set.id;
									closeAndFocusTrigger();
								}}
							>
								<Check class={cn(selectedCustomSet?.id !== set.id && 'text-transparent')} />
								{set.name}
							</Command.Item>
						{/each}
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</div>
{/snippet}

<Drawer.Content>
	<Drawer.Header>
		<Drawer.Title>Mode settings</Drawer.Title>
		<Drawer.Description>Change how the app shuffles your operators</Drawer.Description>
	</Drawer.Header>
	<form method="POST" use:enhance>
		<div class="grid grid-cols-1 gap-4 p-4 pb-0 lg:grid-cols-2">
			<Form.Field {form} name="side" class="flex items-center justify-between space-x-2">
				<Form.Control>
					{#snippet children()}
						<Form.Label>Operator side</Form.Label>
						<TabsInputField {form} options={sideOptions} />
					{/snippet}
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="hideStarter" class="flex items-center justify-between space-x-2">
				<Form.Control>
					{#snippet children({ props })}
						<div class="space-y-0.5">
							<Form.Label>Hide starter operators</Form.Label>
							<Form.Description>Hide operators like Recruit, Striker and Sentry</Form.Description>
						</div>
						<Switch {...props} bind:checked={$formData.hideStarter} />
					{/snippet}
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="useCustomSet" class="flex items-center justify-between space-x-2">
				<Form.Control>
					{#snippet children({ props })}
						<div class="space-y-0.5">
							<Form.Label>Use a custom operator set</Form.Label>
						</div>
						<Switch {...props} bind:checked={$formData.useCustomSet} />
					{/snippet}
				</Form.Control>
			</Form.Field>
			{#if $formData.useCustomSet}
				{@render customSetSelector()}
			{/if}
		</div>
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
			<Button type="submit">Save</Button>
		</Drawer.Footer>
	</form>
</Drawer.Content>
