<script lang="ts">
	import { Tabs } from 'bits-ui';
	import type { FsSuperForm } from 'formsnap';
	import type { ChangeEventHandler, FormEventHandler } from 'svelte/elements';
	import type { FieldProxy } from 'sveltekit-superforms';

	interface TabsInputProps {
		id: string;
		name: string;
		selected: string;
		options: readonly string[];
		proxy: FieldProxy<any>;
	}

	let { selected = $bindable(), options, name, id, proxy, ...rest }: TabsInputProps = $props();

	function tabOnClick(option: string) {
		$proxy = option;
		//selected = option;
	}

	console.log(rest);
</script>

<Tabs.Root>
	<div
		class="bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1"
	>
		{#each options as o}
			<button
				onclick={() => tabOnClick(o)}
				data-state={selected === o ? 'active' : undefined}
				class="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm"
			>
				{o}
			</button>
		{/each}
	</div>

	<input type="text" {id} {name} bind:value={selected} {...rest} />
</Tabs.Root>
