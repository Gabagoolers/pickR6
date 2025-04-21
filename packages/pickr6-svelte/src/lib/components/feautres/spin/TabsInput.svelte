<script lang="ts">
	import { Tabs } from 'bits-ui';

	interface TabsInputProps {
		selected: string;
		options: string[];
	}

	let { selected = $bindable(), options }: TabsInputProps = $props();
</script>

<Tabs.Root>
	<div
		class="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
	>
		{#each options as o}
			<button
				onclick={() => (selected = o)}
				data-state={selected === o ? 'active' : undefined}
				class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
			>
				{o}
			</button>
		{/each}
	</div>
</Tabs.Root>
