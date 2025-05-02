import { appState } from '$lib/stores/storage.svelte.js';
import { error } from '@sveltejs/kit';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = ({ params }) => {
	const customSet = params.customSet;

	if (!customSet) {
		error(401);
	}

	const selectedSet = appState.current.sets.find((set) => set.id === customSet);

	if (!selectedSet) {
		error(404, 'Cannot find custom set');
	}

	const pageMetaTags = Object.freeze({
		title: `${selectedSet.name} custom set`
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags,
		selectedSet
	};
};
