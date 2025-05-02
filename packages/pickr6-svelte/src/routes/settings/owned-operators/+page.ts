import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
	const pageMetaTags = Object.freeze({
		title: 'Owned operators'
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags
	};
};
