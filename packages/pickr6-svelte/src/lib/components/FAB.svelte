<script lang="ts">
	import { cn } from '$lib/utils';
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

<div class="fixed bottom-20 right-6">
	<Button size="lg" {...buttonProps} class={cn(buttonProps?.class, 'shadow-lg')}>
		{#if Icon}
			<Icon class="mr-2 size-4" />
		{/if}
		{label}</Button
	>
</div>
