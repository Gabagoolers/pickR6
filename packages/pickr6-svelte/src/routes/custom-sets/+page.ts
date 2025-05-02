import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
	const pageMetaTags = Object.freeze({
		title: 'Custom sets'
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags
	};
};
