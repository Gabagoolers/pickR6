<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import SuperDebug, { defaults, fieldProxy, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';

	import { Label } from '$lib/components/ui/label';
	import TabsInput from './TabsInput.svelte';
	import * as Form from '$lib/components/ui/form';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { dev } from '$app/environment';
	import { Button } from '$lib/components/ui/button';
	import { Check, ChevronsUpDown } from '@lucide/svelte';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { getPickr6Store } from '$lib/stores/persisted.svelte';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	const pickr6Store = getPickr6Store();

	const sideOptions = ['attacker', 'defender'] as const;

	const filterSchema = z.object({
		side: z.union([z.literal('attacker'), z.literal('defender')]).default('defender'),
		hideStarter: z.boolean(),
		useCustomSet: z.boolean(),
		customSet: z.string().nullable()
	});

	const form = superForm(defaults(zod(filterSchema)), {
		SPA: true,
		validators: zod(filterSchema),
		async onUpdate({ form }) {
			if (form.valid) {
			}
		}
	});

	const { form: formData, enhance } = form;

	const sideFormProxy = fieldProxy(form, 'side');

	let customSetPopoverOpen = $state(false);
	let customSetValue = $state('');
	let customSetPopupTriggerRef = $state<HTMLButtonElement>(null!);
	const selectedCustomSetId = $derived(
		pickr6Store.value.sets.find((e) => e.id === customSetValue)?.name
	);

	function closeAndFocusTrigger() {
		customSetPopoverOpen = false;
		tick().then(() => {
			customSetPopupTriggerRef.focus();
		});
	}

	$inspect($formData);
</script>

{#snippet customSetSelector()}
	<div transition:slide class="flex items-center justify-between space-x-2">
		<Label>Select your custom operator set</Label>
		<Popover.Root bind:open={customSetPopoverOpen}>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button
						variant="outline"
						class="w-[200px] justify-between"
						{...props}
						role="combobox"
						aria-expanded={customSetPopoverOpen}
					>
						{selectedCustomSetId || 'Select a framework...'}
						<ChevronsUpDown class="opacity-50" />
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.List>
						<Command.Empty>Don't use custom set</Command.Empty>
						{#each pickr6Store.value.sets as set}
							<Command.Item
								value={set.id}
								onSelect={() => {
									customSetValue = set.id;
									closeAndFocusTrigger();
								}}
							>
								<Check class={cn(selectedCustomSetId !== set.id && 'text-transparent')} />
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
					{#snippet children({ props })}
						<Form.Label>Operator side</Form.Label>
						<TabsInput
							{...props}
							proxy={sideFormProxy}
							options={sideOptions}
							bind:selected={$formData.side}
						/>
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
			<Button type="submit">Close</Button>
		</Drawer.Footer>
	</form>

	{#if dev}
		<SuperDebug data={$formData} />
	{/if}
</Drawer.Content>
