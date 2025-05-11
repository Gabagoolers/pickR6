import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import { read } from '$app/server';
import type { Component } from 'svelte';
import { render } from 'svelte/server';

import noto from '$lib/fonts/noto.ttf';
const fontData = read(noto).arrayBuffer();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function componentToPng<TComponentProps extends Record<string, any>>(
	component: Component<TComponentProps>,
	props: TComponentProps,
	height: number,
	width: number
) {
	const result = render(component, {
		props
	});
	console.log(result);
	const markup = toReactNode(`${result.body}`);
	console.log(markup);
	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Noto Sans',
				data: await fontData,
				style: 'normal'
			}
		],
		height: +height,
		width: +width
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: +width
		}
	});

	const png = resvg.render();

	return new Response(png.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
}
