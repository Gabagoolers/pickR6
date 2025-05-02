import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
	const pageMetaTags = Object.freeze({
		title: 'Create a new set'
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags
	};
};
