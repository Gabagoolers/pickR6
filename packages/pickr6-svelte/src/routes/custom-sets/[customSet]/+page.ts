import { pickr6Store } from '$lib/stores/persisted.svelte';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import r6operators from 'r6operators';

const filteredOperators = Object.values(r6operators).filter((op) => typeof op.id === 'string');

export const load: PageLoad = async ({ params }) => {
	const customSet = params.customSet;

	if (!customSet) {
		error(400, 'Custom set parameter is required');
	}

	const selectedSet = pickr6Store.value.sets.find((set) => set.id === customSet);

	if (!selectedSet) {
		error(404, `Custom set "${customSet}" not found`);
	}

	console.log(selectedSet);

	return {
		customSet: {
			...selectedSet,
			operators: selectedSet.operators
				.map((op) => {
					const operator = filteredOperators.find((o) => o.id === op);
					return operator;
				})
				.filter((op) => op !== undefined)
		}
	};
};
