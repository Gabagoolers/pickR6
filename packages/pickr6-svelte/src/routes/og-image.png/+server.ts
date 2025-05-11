export const prerender = dev ? false : true;

import { dev } from '$app/environment';
import PreviewImage from '$lib/components/feautres/seo/PreviewImage.svelte';
import { componentToPng } from '$lib/server/renderImage';

export const GET = async () => {
	const width = 1200;
	const height = 600;
	return componentToPng(PreviewImage, {}, height, width);
};
