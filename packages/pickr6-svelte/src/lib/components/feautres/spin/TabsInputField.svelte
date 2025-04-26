<script lang="ts">
	import { superForm, fieldProxy } from 'sveltekit-superforms/client';

	let { form, options } = $props();

	const side = fieldProxy(form, 'side');

	function tabOnClick(option: string) {
		$side = option;
	}
</script>

<div
	class="bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1"
>
	{#each options as o}
		<button
			type="button"
			onclick={() => tabOnClick(o)}
			data-state={$side === o ? 'active' : undefined}
			class="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm"
		>
			{o}
		</button>
	{/each}
</div>
