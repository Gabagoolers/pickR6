<script lang="ts">
	import Button, { type ButtonProps } from './ui/button/button.svelte';
	import type { Icon as IconType } from '@lucide/svelte/icons';

	interface Props {
		label: string;
		icon?: typeof IconType;
		buttonProps?: ButtonProps;
	}

	let { label, icon, buttonProps }: Props = $props();

	const Icon = icon;
</script>

<div class="fixed bottom-20 right-6 shadow-lg">
	<Button {...buttonProps}>
		{#if Icon}
			<Icon class="mr-2 size-4" />
		{/if}
		{label}</Button
	>
</div>
