import type { MetaTagsProps } from 'svelte-meta-tags';

export const ssr = false;

export const load = ({ url }) => {
	const title = 'PickR6';
	const description = 'A web app for random picking characters in a game called Rainbow Six Siege.';
	const domain = `${url.protocol}//${url.host}`;

	const baseMetaTags = Object.freeze({
		title: 'Spin',
		titleTemplate: '%s | PickR6',
		description,
		canonical: new URL(url.pathname, url.origin).href,
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: 'en_US',
			title,
			description,
			siteName: title,
			images: [
				{
					url: `${domain}/og-image.png`,
					alt: 'Og Image Alt',
					width: 1200,
					height: 600,
					secureUrl: `${domain}/og-image.png`,
					type: 'image/png'
				}
			]
		}
	}) satisfies MetaTagsProps;

	return {
		baseMetaTags
	};
};
