import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
	const pageMetaTags = Object.freeze({
		title: 'Settings'
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags
	};
};
