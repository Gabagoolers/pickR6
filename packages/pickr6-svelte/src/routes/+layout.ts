import type { MetaTagsProps } from 'svelte-meta-tags';

export const ssr = false;

export const load = ({ url }) => {
	const title = 'PickR6';
	const description = 'A web app for random picking characters in a game called Rainbow Six Siege.';

	const baseMetaTags = Object.freeze({
		title: 'Spin',
		titleTemplate: '%s | PickR6',
		description,
		canonical: new URL(url.pathname, url.origin).href,
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: 'en_IE',
			title,
			description,
			siteName: title,
			images: [
				{
					url: 'https://www.example.ie/og-image.jpg',
					alt: 'Og Image Alt',
					width: 800,
					height: 600,
					secureUrl: 'https://www.example.ie/og-image.jpg',
					type: 'image/jpeg'
				}
			]
		}
	}) satisfies MetaTagsProps;

	return {
		baseMetaTags
	};
};
