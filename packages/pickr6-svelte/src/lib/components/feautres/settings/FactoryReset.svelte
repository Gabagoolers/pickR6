<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	import { ListRestart } from '@lucide/svelte';
	import type { SettingsCardRequiredProps } from './types';

	const { title, icon }: SettingsCardRequiredProps = {
		title: 'Factory Reset',
		icon: ListRestart
	};

	function resetStores() {
		// TODO
	}

	let open = $state(false);
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger>
		<Card.Root role="button">
			<Card.Header>
				<Card.Title class="text-left">{title}</Card.Title>
			</Card.Header>
			<Card.Content>
				{@const Icon = icon}
				<Icon />
			</Card.Content>
		</Card.Root>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will reset all your settings in this app. This will also
				reload the app.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<form
			onsubmit={() => {
				resetStores();
				open = false;
			}}
		>
			<AlertDialog.Footer>
				<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
